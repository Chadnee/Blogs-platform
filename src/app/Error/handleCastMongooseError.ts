import mongoose from "mongoose";
import { TErrorSourse, TGenericErrorResponse } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
const errorSource: TErrorSourse = [{
    path: err.path,
    message: err.message,
}]

const statusCode = 400;

return{
    statusCode,
    message: 'Invalid _Id',
    errorSource
}

}

export default handleCastError;