import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser> ({
    Id : {
        type: String,
        required: true,
        unique: [true, "Id must be unique"]
    },
    password: {
        type: String,
        required: true,
    },
    needsChangePassword: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email must be unique"]
    },
    role: {
        type: String,
        enum: ["Author", "Admin"],
    },
    status:{
        type: String,
        enum: ["In-progress", "Blocked"],
        default:"In-progress"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, {timestamps: true})
export const User = model<TUser>("User", userSchema);