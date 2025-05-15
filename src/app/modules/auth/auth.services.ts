import status from "http-status";
import AppError from "../../Error/AppError";
import { User } from "../users/user.modelAndSchema"
import { TLogin } from "./auth.interface"
import config from "../../config";
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { createToken } from "./auth.utils";

const createLoginUserIntoDB = async(payload:TLogin) => {
     const user = await User.findOne({Id:payload.Id});
     console.log(user)
     if(!user){
        throw new AppError(status.NOT_FOUND, "The user is not found")
     }
     if(user.isDeleted) {
        throw new AppError(status.FORBIDDEN, "The user has been already deleted");
     }
     if(user.status === "Blocked"){
        throw new AppError(status.FORBIDDEN, "The user is blocked!!")
     }
    
     //iff password dot match with previous or correct
     if(!await User.isPasswordMatched(payload.password, user?.password)){
       // console.log(payload.Id, isUserExist.Id)
        throw new AppError(status.FORBIDDEN, "Password dont matched!!")
     }
     
     const jwtPayload = {
      userId: user.Id,
      role: user.role
     };

     const accessToken = createToken(jwtPayload, 
      config.jwt_access_token as string,
      config.jwt_access_expires_in as string)
      
      //refresh token has to sent in controller, after it check controller
      const refreshToken = createToken(jwtPayload,
      config.jwt_refresh_token as string,
      config.jwt_refresh_expires_in as string
      )

   //   const accessToken =  jwt.sign(jwtPayload,
   //    config.jwt_access_token as string, { expiresIn:'10d'});

      return {
         accessToken,
         refreshToken,
         needsChangePassword: user.needsChangePassword
      }

    // console.log(payload)
}    

const changePasswordIntoDB = async(user:JwtPayload, payload: {
   oldPassword: string; newPassword: string}) => {
    const userData = await User.isUserExistsbyId(user.userId);
    if(!userData){
      throw new AppError(status.NOT_FOUND, "No user is found!!")
    }
    if(userData.isDeleted){
      throw new AppError(status.FORBIDDEN, "This user is already deleted")
    };
    if(userData.status === "Blocked"){
      throw new AppError(status.FORBIDDEN, "This user is already blocked")
    };
    if(!await User.isPasswordMatched(payload.oldPassword, userData.password)){
      throw new AppError(status.UNAUTHORIZED, "This user is unauthorized(pass unmatched)");
    };
    const newHashedPassword = await bcrypt.hash(
      payload.newPassword,
      Number(config.bcrypt_salt_rounds)
   )

   const result = await User.findOneAndUpdate(
    {  Id : userData.Id,
      role: userData.role},
      {password: newHashedPassword,
       needsChangePassword: false,
       passwordChangedAt: new Date,
      }
   )
return null;

}

const createTefreshTokenInDB = async(token: string) => {

}

export const AuthServices = {
    createLoginUserIntoDB,
    changePasswordIntoDB,
    createTefreshTokenInDB,
}