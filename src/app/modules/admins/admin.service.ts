import status from "http-status";
import AppError from "../../Error/AppError";
import { Admin } from "./admin.modelAndSchema"
import mongoose from "mongoose";
import { User } from "../users/user.modelAndSchema";

const getAllAdminFromDB = async()=> {
    const result = await Admin.find();
    return result;
}

const getSingleAdminFromDB = async(_id: string) => {
    const result = await Admin.findById(_id);
    return result;
}

const deleteAdminAndUserFromDB = async(_id: string) => {
    const admin = await Admin.findById(_id);
    if(!admin){
        throw new AppError(status.NOT_FOUND, "This admin is not found");
    }
    if(admin.isDeleted){
        throw new AppError(status.FORBIDDEN, "This admin is already deleted");
    }
    const session = await mongoose.startSession();
     session.startTransaction();

     try{
        const deleteAdmin = await Admin.findByIdAndUpdate(
            _id,
            {isDeleted: true},
            {new: true, session}
        )
        if(!deleteAdmin){
            throw new AppError(status.BAD_REQUEST, "Failed to delete admin");
        };
        const user_id = admin.user;
        const deleteUser = await User.findByIdAndUpdate(
            user_id,
            {isDeleted: true},
            {new: true, session}
        );
        if(!deleteUser){
            throw new AppError(status.BAD_REQUEST, "Failed to delete user");
        }
        await session.commitTransaction();
        await session.endSession();
        return deleteAdmin;

     }catch(err){
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(status.BAD_REQUEST, err)
     }
}
export const adminServies = {
    getAllAdminFromDB,
    getSingleAdminFromDB,
    deleteAdminAndUserFromDB,
}