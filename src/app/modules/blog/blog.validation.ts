import { z } from "zod";

const blogPostValidationSchema = z.object({
    body: z.object({
        title: z.string({
            required_error: `Blog title is required`,
            invalid_type_error: `Blog title must be a string`,
        }),
        content: z.string({
            required_error: `Blog content is required`,
            invalid_type_error: `Blog content must be a string`,
        }),
    }),
});

const blogUpdateValidationSchema = z.object({
    body: z.object({
        title: z
            .string({
                invalid_type_error: `Blog title must be a string`,
            })
            .optional(),
        content: z
            .string({
                invalid_type_error: `Blog content must be a string`,
            })
            .optional(),
    }),
});

export const BlogValidations = {
    blogPostValidationSchema,
    blogUpdateValidationSchema,
};
