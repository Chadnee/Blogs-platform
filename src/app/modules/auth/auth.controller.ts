import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";
import config from "../../config";

const loginUser = catchAsync(async(req, res) => {
    const result = await AuthServices.createLoginUserIntoDB(req.body);
    const {refreshToken} = result;
    
    res.cookie('refreshToken', refreshToken, {
         secure: config.node_env === 'production', //'http secure' only for production mood
         httpOnly: true,
        })
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Usee is logged in successfully!",
        data: null, //don't send the token for security 
    })
})

const changePassword = catchAsync(async(req, res) => {
    const result = await AuthServices.changePasswordIntoDB(req.user, req.body);
    sendResponse(res , {
        statusCode:status.OK,
        success: true,
        message: "Password has been changed successfully",
        data: result,
    })
})

const createRefreshToken = catchAsync(async(req, res) => {
    const {refreshToken} = req.cookies
    const result = await AuthServices.createTefreshTokenInDB(refreshToken);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message:'Refresh token is find out successfully',
        data:result,
    })
})

export const AuthControllers = {
    loginUser,
    changePassword,
    createRefreshToken,
}