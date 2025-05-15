import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminServies } from "./admin.service";

const getAllAdmin = catchAsync(async(req, res) => {
    const result = await adminServies.getAllAdminFromDB();

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message:"All admin are retrieved",
        data: result
    })
})
const getSingleAdmin = catchAsync(async(req, res) => {
    const {admin_id} = req.params
    const result = await adminServies.getSingleAdminFromDB(admin_id);

    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message:"Targeted admin are retrieved",
        data: result
    })
});

const deleteAdminAndUser = catchAsync(async(req, res) => {
    const {admin_id} = req.params;
    const result = await adminServies.deleteAdminAndUserFromDB(admin_id)
    sendResponse(res, {
        statusCode: status.OK,
        success: true,
        message: "Admin as well as user is successfully deleted",
        data: result,
    })

})

export const adminControllers = {
    getAllAdmin,
    getSingleAdmin,
    deleteAdminAndUser,
}