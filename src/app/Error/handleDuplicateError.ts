import { TErrorSourse, TGenericErrorResponse } from "../interface/error";

const handleDuplicateError = (err: TGenericErrorResponse) => {
    const match = err.message.match(/dup key:.*?"(.*?)"/);
    const extract_msg = match && match[1];

    const errorSource: TErrorSourse = [
        {
            path: '',
            message:`${extract_msg} is already exist`
        }
    ]

    const statusCode = 400

    return {
        statusCode,
        message: "It make duplicate Error",
        errorSource
    }

}

export default handleDuplicateError;