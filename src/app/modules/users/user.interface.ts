import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser  {
    Id : string;
    password:string;
    needsChangePassword:boolean;
    passwordChangedAt?: Date;
    email:string;
    role: "Author" | "Admin";
    status:"In-progress" | "Blocked";
    isDeleted: boolean

}

export interface UserModel extends Model<TUser>{
    isPasswordMatched(
        plainTextPassword: string,
        hashedPassword: string
    ): Promise<boolean>;

    isUserExistsbyId(Id: string):Promise<TUser>;

    isJwtIssuedBeforePasswordChanged(
        passwordChangedTimestamp: Date,
        jwtIssuedTimestamp: number,
    ):boolean;

}

export type TUserRole =keyof typeof  USER_ROLE;
// export type TUser = {
//     Id : string;
//     password:string;
//     needsChangePassword:boolean;
//     email:string;
//     role: "Author" | "Admin";
//     status:"In-progress" | "Blocked";
//     isDeleted: boolean

// }

