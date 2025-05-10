import { profile } from "console";
import { z } from "zod";

const authorsNameValidation = z.object({
    firstName: z.string().min(1).max(20).refine((value)=> /^[A-Z]/.test(value), {
        message: "First name must be strat with a capital letter"
    }),
    middleName: z.string().optional(),
    lastName: z.string().min(1).max(20)
})
const createAuthorsValidation = z.object({
    body: z.object({
       email: z.string().email({message: "Email don't support email address"}),
     
    author: z.object({
        name: authorsNameValidation,
        gender: z.enum(["male", "female"]),
        dateOfBirth: z.string(),
        contactNo: z.string(),
        emergencyContactNo: z.string(),
        presentAddress: z.string(),
        permanentAddress: z.string(),
        //user and Id will be generated
        profileImage:z.string()
        })
    })
})

export const AuthorsValidations ={ 
    createAuthorsValidation,
}