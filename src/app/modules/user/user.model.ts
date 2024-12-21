import { model, Schema } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import { UserRoles } from "./user.constant";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema<IUser, UserModel>(
    {
        name: {
            type: String,
            required: [true, `User's name is required`],
        },
        email: {
            type: String,
            required: [true, `User's email is required`],
            unique: [true, `This email is already registered`],
        },
        password: {
            type: String,
            required: [true, `User's password is required`],
        },
        role: {
            type: String,
            enum: {
                values: [...UserRoles],
                message: `{VALUE} is not a valid role`,
            },
            default: `User`,
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

UserSchema.pre(`save`, async function (next) {
    this.password = await bcrypt.hash(
        this.password,
        Number(config?.bcrypt_salt_rounds),
    );
    next();
});

UserSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<IUser, UserModel>(`User`, UserSchema);
