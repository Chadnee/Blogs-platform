/* eslint-disable prefer-const */
import mongoose from 'mongoose';
import { TAuthors, TAuthorsName } from './../authors/authors.interface';
import { TUser } from './user.interface';
import { generatedAuthorId } from './user.utils';
import { User } from './user.modelAndSchema';
import AppError from '../../Error/AppError';
import status from 'http-status';
import { Author } from '../authors/author.schemaAndModel';
const createAuthorIntoDB = async(password: string,email:string, authorData:TAuthors) => {
    console.log(email, password)
    let userData: Partial<TUser> = {};
    userData.Id = await generatedAuthorId();
    userData.password = password;
    userData.email = email;
    userData.role = "Author";

    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        //create user collection
        const newUser = await User.create([userData], {session});
        if(!newUser.length){
            throw new AppError(status.BAD_REQUEST, "Failed to create User")
        };

        //genereted author Id and _id named 'user'
        authorData.Id = newUser[0].Id ;
        authorData.user = newUser[0]._id;
        authorData.email = email;

        //create AuthorCollection
        const author = await Author.create([authorData], {session})
        if(!author.length){
            throw new AppError(status.BAD_REQUEST, "Failed to create Author")
        }

        await session.commitTransaction();
        await session.endSession();
        return author;

    }catch(err){
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(status.BAD_REQUEST, err)
    }
    
};

const getSingleUsersFromDB = async(_id) => {
    const result = await User.findById(_id);
    return result;
}
const blockedUserAndAuthorFromDB = async(_id: string) => {
    //if author is not exist or already blocked
   const user = await User.findById(_id);
   if(!user){
      throw new AppError(status.NOT_FOUND, "This user is not found")
   };
   if(user.status === "Blocked"){
    throw new AppError(status.FORBIDDEN, "This user is already blocked!!");
   }

   const session = await mongoose.startSession();
   session.startTransaction();
   try{
      const blockedUser = await User.findByIdAndUpdate(
        _id,
        {status: "Blocked"},
        {new: true, session}
      )
      if(!blockedUser){
        throw new AppError(status.BAD_REQUEST, "Faild to block user");
      }
      //find out user _id
      const authorId = user.Id;
    console.log(authorId)
      const blockedAuthor = await Author.findOneAndUpdate(
        {Id:authorId},
        {status:"Blocked"},
        {new: true, session}
      )
      if(!blockedAuthor){
        throw new AppError(status.BAD_GATEWAY, "Failed to block author");
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


export const UserServices = {
    createAuthorIntoDB,
    blockedUserAndAuthorFromDB,
    getSingleUsersFromDB,
}