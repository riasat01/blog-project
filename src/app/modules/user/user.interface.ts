import { Model } from "mongoose";

export type TUserRole = `admin` | `user`;

export interface IUser {
    name: string;
    email: string;
    password: string;
    role: TUserRole;
    isBlocked: boolean;
}

export interface UserModel extends Model<IUser> {
    isPasswordMatched(
        // eslint-disable-next-line no-unused-vars
        plainTextPassword: string,
        // eslint-disable-next-line no-unused-vars
        hashedPassword: string,
    ): Promise<boolean>;
}
