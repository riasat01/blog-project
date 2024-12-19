import { z } from "zod";

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: `User's name is required`,
            invalid_type_error: `User's name must be a string`,
        }),
        email: z.string({
            required_error: `User's email is required`,
            invalid_type_error: `User's email must be a string`,
        }),
        password: z.string({
            required_error: `User's password is required`,
            invalid_type_error: `User's password must be a string`,
        }),
    }),
});

export const UserValidations = {
    createUserValidationSchema,
};
