import { z } from "zod";

const createAdminNameValidation = z.object({
    firstName:z.string().max(20).refine((value)=>/^[A-Z]/.test(value), {
        message: "First letter of First name must be Capital letter!"
    }),
    middleName:z.string().optional(),
    lastName:z.string(),
})

const createAdminValidation = z.object({
    body:z.object({
        // password: z.string({message: "Password must be string"})
    // .max(10, {message:"Passwod can not be more the 10 characters"}),
    email:z.string().email(),
    admin: z.object({
        name:createAdminNameValidation,
        gender:z.string(),
        dateOfBirth:z.string(),
        email:z.string(),
        contactNo:z.string(),
        emergencyContactNo:z.string(),
        presentAddress:z.string(),
        permanentAddress:z.string(),
        profileImage:z.string().optional(),
        isDeleted:z.string()
    })
    })
})

export const adminValidations = {
    createAdminValidation,
}