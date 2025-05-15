import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";
const userSchema = new Schema<TUser, UserModel> ({
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
    passwordChangedAt:{
        type:Date,
    },
    email: {
        type: String,
        required: true,
        unique: [true, "email must be unique"]
    },
    role: {
        type: String,
        enum: ["Admin", "Author"],
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


userSchema.pre('save', async function(next) {
    const user = this;
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
});

userSchema.statics.isPasswordMatched= async function(plainTextPassword, hashedPassword){
    return await bcrypt.compare(plainTextPassword, hashedPassword)
};
userSchema.statics.isUserExistsbyId = async function(Id:string){
    return await User.findOne({Id}).select('+password')
}
userSchema.statics.isJwtIssuedBeforePasswordChanged = async function(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
){
    const passwordChangedTime = 
    new Date(passwordChangedTimestamp).getTime()/1000;
    return passwordChangedTime > jwtIssuedTimestamp
}

export const User = model<TUser, UserModel>("User", userSchema);


