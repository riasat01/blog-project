import {z} from 'zod';
import { UserRoles } from './user.constant';

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string({required_error: `User's name is required`}),
        email: z.string({required_error: `User's email is required`}),
        password: z.string({required_error: `User's password is required`}),
        role: z.enum([...UserRoles] as [string, ...string[]]).optional(),
        isBlocked: z.boolean().optional(),
    })
});

export const UserValidations = {
    createUserValidationSchema,
};