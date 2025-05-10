import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthorsServices } from "./author.service";
import status from 'http-status';


const getAllAuthors = catchAsync(async(req, res) => {
    const result = await AuthorsServices.getAllAuthorsFromDB();
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

export const AuthorsControllers = {
    getAllAuthors,
    getSingleAuthors,
    deleteAuthorsAndUsers,

    
}