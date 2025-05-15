import { z } from "zod";

const loginValidation = z.object({
  body: z.object({
    Id: z.string({required_error: "Id is required"}),
    password: z.string({required_error: "Pass is required"})
  })
});

const ChangePasswordValidation = z.object({
    body: z.object({
        oldPassword:z.string({required_error: "Old pass is required"}),
        newPassword: z.string({required_error: "new pass is required"})
    })
})

const refreshTokenValidation = z.object({
    cookies: z.object({
        refreshToken: z.string({required_error: "refresh token is required"})
    })
})

export const AuthValidation = {
    loginValidation,
    ChangePasswordValidation,
    refreshTokenValidation,
}
