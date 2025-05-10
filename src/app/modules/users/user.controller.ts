import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { User } from "./user.modelAndSchema";

const createAuthor = catchAsync(async(req, res) => {
    const {password, email, author: authorData} = req.body;
    const result = await UserServices.createAuthorIntoDB(password, email, authorData);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Author has been successfully created",
        data: result,
    })
});

const getSingleUsers = catchAsync(async(req, res) => {
    const {users_Id} = req.params;
    const result =  await UserServices.getSingleUsersFromDB(users_Id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "The targeted user is retrieved !",
        data: result,
    })
})

const blockedUserAndAuthor = catchAsync(async(req, res) => {
    const {user_Id} = req.params;
    const result = await UserServices.blockedUserAndAuthorFromDB(user_Id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "The user as well as author is blocked !",
        data: result,
    })
})


export const UserControllers = {
    createAuthor,
    blockedUserAndAuthor,
    getSingleUsers,
}