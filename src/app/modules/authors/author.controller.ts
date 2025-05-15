import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthorsServices } from "./author.service";
import status from 'http-status';


const getAllAuthors = catchAsync(async(req, res) => {
    const result = await AuthorsServices.getAllAuthorsFromDB();
    //console.log('get cookies', req.cookies)
      sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "All authors are retrieved successfuly",
        data: result
      })

})

const getSingleAuthors = catchAsync(async(req, res) => {
    const {authors_Id} = req.params;
    const result = await AuthorsServices.getSingleAuthorsFromDB(authors_Id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Targeted authors gotted successfully",
        data: result,
    })
});

const deleteAuthorsAndUsers = catchAsync(async(req, res) => {
    const {authors_Id} = req.params;
    const result = await AuthorsServices.deleteAuthorsAndUsersFromDB(authors_Id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "The author as well as user is deleted successfully",
        data: result,
    })
});


const blockedAuthorAndUser = catchAsync(async(req, res) => {
    const {authors_id} = req.params;
    const result = await AuthorsServices.blockedAuthorAndUserFromDB(authors_id);
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "The user as well as author is blocked !",
        data: result,
    })
});

const updateAuthor = catchAsync(async(req, res) => {
    const {authors_id} = req.params;
    const result = await AuthorsServices.updateAuthorFRomDB(authors_id, req.body);
    sendResponse(res, {
        statusCode : status.OK,
        success: true,
        message: "All data are updated",
        data: result,
    })
})

export const AuthorsControllers = {
    getAllAuthors,
    getSingleAuthors,
    deleteAuthorsAndUsers,
    blockedAuthorAndUser,
    updateAuthor,

    
}