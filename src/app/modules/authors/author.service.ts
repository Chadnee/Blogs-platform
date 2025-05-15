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

const blockedAuthorAndUserFromDB = async(_id: string) => {
    //if author is not exist or already blocked
   const author = await Author.findById(_id);
   if(!author){
      throw new AppError(status.NOT_FOUND, "This author is not found")
   };
   if(author.status === "Blocked"){
    throw new AppError(status.FORBIDDEN, "This author is already blocked!!");
   }

   const session = await mongoose.startSession();
   session.startTransaction();
   try{
      const blockedAuthor = await Author.findByIdAndUpdate(
        _id,
        {status: "Blocked"},
        {new: true, session}
      )
      if(!blockedAuthor){
        throw new AppError(status.BAD_REQUEST, "Faild to block author");
      }
      //find out user _id
      const user_Id = author.user;

      const blockedUser = await Author.findByIdAndUpdate(
        user_Id,
        {status:"Blocked"},
        {new: true, session}
      )
      if(!blockedUser){
        throw new AppError(status.BAD_GATEWAY, "Failed to block user");
      }
      await session.commitTransaction();
      await session.endSession();
      return blockedAuthor;
   }catch(err) {
      await session.abortTransaction();
      await session.endSession();
      throw new AppError(status.BAD_REQUEST, err)
   }
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

// Add this type here
type NestedAuthorPayload = {
    author: Partial<TAuthors>;
  };
  
const updateAuthorFRomDB = async(_id:string, payload: NestedAuthorPayload) => {
    const {author} = payload
   if(payload.author.Id){
    throw new AppError(status.NOT_ACCEPTABLE, "Id is out of your access, Dont do this!!")
   }
   const findAuthor = await Author.findById(_id);
   if(!findAuthor){
    throw new AppError(status.NOT_FOUND, "This author is not exist!")
   }
   const {name, ...remainingData} = author
    const modifiedUpdatedData: Record<string, unknown> = {
        ...remainingData,
    }
    
   if (name && Object.keys(name).length){
    for (const [key, value] of Object.entries(name)){
        modifiedUpdatedData[`name.${key}`] = value;
    }
   } 
   const email = payload.author.email;
   if(email){
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
     const updateAuthor = await Author.findByIdAndUpdate(
       _id, modifiedUpdatedData,
       {new: true, runValidators: true, session},
      )
      if(!updateAuthor){
        throw new AppError(status.BAD_REQUEST, "Failed to update author")
      }
      //  console.log(email)
       const user_id = findAuthor.user;
      // console.log("hh",user_id)
       const updateUser = await User.findByIdAndUpdate(
        user_id, modifiedUpdatedData,
        {new: true, runValidators: true, session},
       )
       if(!updateAuthor){
        throw new AppError(status.BAD_REQUEST, "Failed to update user")
       }
      // console.log('tuku',modifiedUpdatedData, result)
      await session.commitTransaction();
      await session.endSession();
       return {updateAuthor, updateUser};
       
      } catch(err){
        await session.abortTransaction()
        await session.endSession();
        throw new AppError(status.BAD_REQUEST, err)
       }
     } else {
      const updateAuthor = await Author.findByIdAndUpdate(
        _id, modifiedUpdatedData,
        {new: true, runValidators: true},
       )
       return updateAuthor;
    }
   } 
export const AuthorsServices = {
    //createAuthorsIntoDB,
    getAllAuthorsFromDB,
    getSingleAuthorsFromDB,
    deleteAuthorsAndUsersFromDB,
    blockedAuthorAndUserFromDB,
    updateAuthorFRomDB,
}