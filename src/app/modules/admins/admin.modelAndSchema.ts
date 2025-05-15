import { status } from 'http-status';
import { model, Schema } from "mongoose";
import { TAdmin, TAdminsName } from "./admin.interface";
import validator from 'validator'

const adminNameSchema = new Schema<TAdminsName>({
    firstName:{
        type: String,
        required: true,
        validate:{
            validator:(value:string)=>validator.isAlpha(value),
            message:"{VALUE} is not valid"
        }
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        required: true
    }
})

const adminSchema = new Schema<TAdmin>({
    Id : {
        type:String,
        required: true,
        unique: true,
    },
    name: adminNameSchema,
    gender: {
        type:String,
        enum: ["male","female"],
        required: true,
    },
    dateOfBirth: {
        type:String,
        required: true,
    },
    email: {
        type:String,
        required: true,
    },
    contactNo: {
        type:String,
        required: true,
    },
    emergencyContactNo: {
        type:String,
        required: true,
    },
    presentAddress: {
        type:String,
        required: true,
    },
    permanentAddress: {
        type:String,
        required: true,
    },
    user: {
        type:Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    profileImage: {
        type:String,
    },
    isDeleted: {
        type:Boolean,
        default: false
    },
})

export const Admin = model<TAdmin>('Admin', adminSchema)