import { ZodError, ZodIssue } from "zod";
import { TErrorSourse, TGenericErrorResponse } from "../interface/error";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
    const errorSource: TErrorSourse = err.issues.map((issue:ZodIssue) => {
        return {
            path: issue?.path[issue.path.length -1],
            message: issue.message
        }
    })
    const statusCode = 400;
    return {
        statusCode,
        message: "Zod validation error",
        errorSource
    }
}

export default handleZodError;