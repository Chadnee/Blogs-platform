import { ZodError } from 'zod';
import { TErrorSourse } from './../interface/error';
import { ErrorRequestHandler } from "express";
import handleZodError from '../Error/handleZodError';
import handleValidationMongooseError from '../Error/handleValidationMongooseError';
import handleCastError from '../Error/handleCastMongooseError';
import handleDuplicateError from '../Error/handleDuplicateError';
import AppError from '../Error/AppError';
import config from '../config';

const globalErrorHandler:ErrorRequestHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "Something went wrong";

    let errorSource: TErrorSourse = [
        {
            path: '',
            message:'Something went wrong',
        }
    ]
    if(err instanceof ZodError) {
        const simplifiedZodError = handleZodError(err);
        statusCode = simplifiedZodError.statusCode;
        message = simplifiedZodError.message;
        errorSource = simplifiedZodError.errorSource

    } else if(err.name === "validationError"){
        const simplifiMongooseValidationError = handleValidationMongooseError(err);
        statusCode= simplifiMongooseValidationError?.statusCode;
        message = simplifiMongooseValidationError?.message;
        errorSource = simplifiMongooseValidationError?.errorSource
   
    } else if(err.name === "CastError"){
        const simplifiCastValidationError = handleCastError(err);
        statusCode = simplifiCastValidationError?.statusCode;
        message = simplifiCastValidationError?.message;
        errorSource = simplifiCastValidationError?.errorSource

    }else if(err.code === 11000) {
        const simplifiDuplicateError = handleDuplicateError(err);
        statusCode = simplifiDuplicateError?.statusCode;
        message = simplifiDuplicateError?.message;
        errorSource = simplifiDuplicateError?.errorSource;

    }  else if (err instanceof AppError) {
    statusCode= err.statusCode;
    message = err.message;
    errorSource = [
      {
        path: '',
        message: err?.message
      }
    ]
  } else if (err instanceof Error) {
    message = err.message;
    errorSource = [
      {
        path :'',
        message : err.message
      }
    ]
  }

return res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack : config.node_env === 'development'?err.stack:null
})

}

export default globalErrorHandler;