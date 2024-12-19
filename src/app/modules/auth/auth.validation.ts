import { z } from "zod";

const userLoginValidationSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: `User email is required`,
            invalid_type_error: `User email must be a string`,
        }),
        password: z.string({
            required_error: `Password is required`,
            invalid_type_error: `Password must be a string`,
        }),
    }),
});

export const AuthValidations = {
    userLoginValidationSchema,
};
