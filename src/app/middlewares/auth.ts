import status from "http-status";
import AppError from "../Error/AppError";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { TUserRole } from "../modules/users/user.interface";
import { User } from "../modules/users/user.modelAndSchema";
import notFound from "./notFound";


/**
 * 1. At first set jwt acccess token in env file , import it in configer file and set it in auth.service.ts , then set the token in headers
 *    by postman from specific route in which you try to send request / aslo set from browser by client instead to manually setting.
 * 2. auth.ts--->
 *    1. get the token by  "const token = req.headers.authorization;"
 *    2. check the token is exist or not.
 *    3. verify the finding token is valid or invalid by decoded const which also provide some info in object
 *    4. destructure the decoded object
 *   ## they by add the last 
 *        "req.user = decoded as JwtPayload;
           next()" you can set only 'auth()' middlware in specific route to authenticate which called authentication that means it will not 
           allowed without log in or jwt token to get data, but it not implement specific role's permission of authorization.
           then if you want to implement the authorization you have to implement the next step from requiredRoles 
           condition "if(requiredRoles && !requiredRoles.includes(role))" then the next step (Authorization):
           
      5. create a TUserRole as in user.interface and take a perameter in auth as rest operator called by TUserRole as array, 
         it will check the role is permitted or not by jwt token verification
      6. find the user as userData const by calling 'isUserExistedbyId' static method 
      7. check the validation weather user bloced or deleted.
      8. then the other important part in the time of chaning password that if the password will changed, then existing token will be invalid reason of condition of time of
         passwordChangedAt and issued time since no hacker can continue with existing token after chaning password, that means existing token will not permit to get data
         As well as new token will be needed after changing password by loggin again with new password.it is a static method called from schema and interface.
      9. set req.user as decoded  as jwtPayload
         
 */

const auth = (...requiredRoles:TUserRole[])=>{
    return catchAsync(async(req, res, next) =>{
        const token = req.headers.authorization;
        //console.log(token);
       //if token not found
        if(!token) {
            throw new AppError(status.UNAUTHORIZED, "You are not authorized(Without token)");
        };
    
        //token verified
         const decoded = jwt.verify(token, config.jwt_access_token as string) as JwtPayload;
         const {role, userId, iat} = decoded;
        
         if(requiredRoles && !requiredRoles.includes(role)){
            throw new AppError(status.UNAUTHORIZED, 'You are not authorized (role not matched)')
         }
        //console.log({userId})
       const userData = await User.isUserExistsbyId(userId);
         //console.log('u',userData);
         if(!userData){
            throw new AppError(status.NOT_FOUND, "User not found")
         }
        if(userData?.isDeleted){
            throw new AppError(status.FORBIDDEN, "User is already deleted")
        }
        if(userData?.status === "Blocked"){
            throw new AppError(status.FORBIDDEN, "User is akready blocked");
        }
        if (userData?.passwordChangedAt) {
            const isIssuedBefore = await User.isJwtIssuedBeforePasswordChanged(
              userData.passwordChangedAt,
              iat as number
            );
          
            console.log('🔍 isJwtIssuedBeforePasswordChanged:', isIssuedBefore);
          
            if (isIssuedBefore) {
              throw new AppError(status.UNAUTHORIZED, 'You are not authorized! (password changed!)');
            }
          }
        // if(userData?.passwordChangedAt && User.isJwtIssuedBeforePasswordChanged(
        //     userData.passwordChangedAt,
        //     iat as number,
        // )){   
        //     throw new AppError(status.UNAUTHORIZED, 'You are not authorized!(password changed!)')
        // }

        //decoded is valid
        req.user = decoded as JwtPayload;
        next()
    })
}

export default auth;