import mongoose from "mongoose"
import { TErrorSourse } from "../interface/error"

const handleValidationMongooseError = (err: mongoose.Error.ValidationError) => {
    const errorSource: TErrorSourse = Object.values(err.errors).map(
        (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
            return {
                path: value?.path,
                message: value.message
            }
        }
    )

    const statusCode = 400;
    return {
        statusCode,
        message: "Validation Error",
        errorSource
    }
}

export default handleValidationMongooseError;