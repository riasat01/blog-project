import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { TUserRole } from "../user/user.interface";

interface IJwtPayload {
    userId: Types.ObjectId;
    name: string;
    email: string;
    role: TUserRole;
}

export const createToken = (
    jwtPayload: IJwtPayload,
    secret: string,
    //   expiresIn: string,
) => {
    return jwt.sign(jwtPayload, secret, {
        expiresIn: "10d",
    });
};
