import { z } from "zod";

const createUser = z.object({
body: z.object({
    password:z.string({ invalid_type_error: "Password must be string"})
    .max(10, {message: "Password should not be more thank 10 characters"})
    .optional(),
    email:z.string().email(),
  })

})
export const UserValidation = {
    createUser,
}