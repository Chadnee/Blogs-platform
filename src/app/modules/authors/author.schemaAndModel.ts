import { model, Schema } from "mongoose";
import { TAuthors, TAuthorsName } from "./authors.interface";
import validator from 'validator'

const authorsNameSchema = new Schema<TAuthorsName>({
    firstName: {
        type: String,
        required:[true, "First Name must be needed"],
        validate: {
            validator: (value: string) => validator.isAlpha(value),
            message: "{VALUE} is not valid"
        },
    },
    middleName: {
        type: String,
    }, 
    lastName: {
        type: String,
        required: [true, 'Last name must be required'],
        validate: {
            validator: (value: string) => validator.isAlpha(value),
            message:"{VALUE} is not valid or supported"
        }
    }
})
const authorsSchema = new Schema<TAuthors>({
    Id: {
        type: String,
        required: true
    },
    name: authorsNameSchema,
    gender: {
        type: String,
        required: true,
        enum: {values:["male", "female"], message:'{VALUE} is not valid or supported'},
    },
    dateOfBirth: {
         type: String,
         required: true
     },
     email: {
        type: String,
        required: true,
        unique:[true, 'Email should be unique']
     },
     contactNo:{
        type: String,
        required: true
    },
      emergencyContactNo : {
        type: String,
        required: true
    },
    presentAddress: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["In-progress" , "Blocked"],
        default:"In-progress"
    },
    profileImage: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true})

export const Author = model<TAuthors>("Authors", authorsSchema)