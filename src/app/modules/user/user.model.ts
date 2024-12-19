import { model, Schema } from "mongoose";
import { IUser } from "./user.interface";
import { UserRoles } from "./user.constant";
import bcrypt from 'bcrypt';
import config from "../../config";

const UserSchema = new Schema<IUser> ({
    name: {
        type: String,
        required: [true, `User's name is required`],
    },
    email: {
        type: String,
        required: [true, `User's email is required`],
    },
    password: {
        type: String,
        required: [true, `User's password is required`],
        select: 0,
    },
    role: {
        type: String,
        enum: {
            values: [...UserRoles],
            message: `{VALUE} is not a valid role`
        },
        default: `user`,
        select: 0,
    },
    isBlocked: {
        type: Boolean,
        default: false,
        select: 0,
    },
});

UserSchema.pre(`save`, async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config?.bcrypt_salt_rounds),
    );
    next();
});

export const User = model<IUser>(`User`, UserSchema);