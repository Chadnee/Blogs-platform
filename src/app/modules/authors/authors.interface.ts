import { Types } from "mongoose";

export type TAuthorsName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}
export type TAuthors = {
    Id: string;
    name: TAuthorsName;
    gender: "male" | "female";
    dateOfBirth: string;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    user: Types.ObjectId;
    status: "In-progress" | "Blocked";
    profileImage: string;
    isDeleted: boolean;

}