import mongoose from "mongoose";
import { Author } from "./author.schemaAndModel"
import { TAuthors } from "./authors.interface"
import AppError from "../../Error/AppError";
import status from "http-status";
import { User } from "../users/user.modelAndSchema";
import { stat } from "fs";


const getAllAuthorsFromDB = async() => {
    const result = await Author.find();
    return result;
};

const getSingleAuthorsFromDB = async(_id: string) => {
    const result = await Author.findById(_id);
    return result;
};

const deleteAuthorsAndUsersFromDB = async(_id: string) => {
    const author = await Author.findById(_id);
    if(!author){
        throw new AppError(status.FORBIDDEN, "This author is not found!")
    }
    //if author is already deleted throw error
    if(author?.isDeleted){
        throw new AppError(status.FORBIDDEN, "This author is already deleted!")
    }
    const session = await mongoose.startSession();
    session.startTransaction()

   try{
    const deleteAuthors = await Author.findByIdAndUpdate(
        _id,
        {isDeleted: true},
        {new: true, session}
    )
    if(!deleteAuthors){
        throw new AppError(status.BAD_REQUEST, "Failed to deletee authors")
    }
    //find out the user _id
    const user_id = author?.user
    const deleteUsers = await User.findByIdAndUpdate(
        user_id,
        {isDeleted: true},
        {new: true, session}

    )
    if(!deleteUsers){
        throw new AppError(status.BAD_REQUEST, "Failed to delete user")
    }
     await session.commitTransaction();
     await session.endSession();
     return deleteAuthors;
   }catch(err){
     await session.abortTransaction();
     await session.endSession();
     throw new AppError(status.BAD_REQUEST, err)
   }
   
}

export const AuthorsServices = {
    //createAuthorsIntoDB,
    getAllAuthorsFromDB,
    getSingleAuthorsFromDB,
    deleteAuthorsAndUsersFromDB,
}