import { Types } from "mongoose";

export type TAdminsName = {
    firstName: string;
    middleName?:string;
    lastName: string;
}
export type TAdmin = {
    Id: string;
    name:TAdminsName;
    gender:'male' | 'female';
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    user: Types.ObjectId;
    profileImage?: string;
    isDeleted:boolean
}