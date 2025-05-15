/* eslint-disable prefer-const */
import mongoose from 'mongoose';
import { TAuthors} from './../authors/authors.interface';
import { TUser } from './user.interface';
import {generatedId } from './user.utils';
import { User } from './user.modelAndSchema';
import AppError from '../../Error/AppError';
import status from 'http-status';
import { Author } from '../authors/author.schemaAndModel';
import { TAdmin } from '../admins/admin.interface';
import { Admin } from '../admins/admin.modelAndSchema';
const createAuthorIntoDB = async(password: string,email:string, authorData:TAuthors) => {
    console.log(email, password)
    let userData: Partial<TUser> = {};
    userData.Id = await generatedId('Author');
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

const getSingleUsersFromDB = async(_id:string) => {
    const result = await User.findById(_id);
    return result;
}

const createAdminIntoDB = async(password:string, email:string, adminData:TAdmin) => {
    let userData: Partial<TUser> = {};
    userData.password = password;
    userData.email = email;
    userData.role = "Admin";
    userData.Id = await generatedId("Admin");

    const session = await mongoose.startSession();
    session.startTransaction();
    try{
       const newUser = await User.create([userData], {session});
       if(!newUser.length){
        throw new AppError(status.BAD_REQUEST, "Failed to create user");
       }

       adminData.Id = newUser[0].Id;
       adminData.user = newUser[0]._id;
       adminData.email = email
       
       const admin = await Admin.create([adminData], {session});
       if(!admin.length){
        throw new AppError(status.BAD_REQUEST, "Failed to create admin");
       };

       await session.commitTransaction();
       await session.endSession();
       return {
         newUser, admin
       }

    }catch(err){
          await session.abortTransaction();
          await session.endSession();
          throw new AppError(status.BAD_REQUEST, err)
    }
}


export const UserServices = {
    createAuthorIntoDB,
    getSingleUsersFromDB,
    createAdminIntoDB,
}