import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { IAuth } from "./auth.interface";
import httpStatus from "http-status";
import { createToken } from "./auth.utils";
import { JwtPayload } from "jsonwebtoken";

const loginUserService = async (payload: IAuth) => {
    const user = await User.findOne({
        email: payload.email,
    });
    if (!user) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            `Couldn't find the user`,
            `loginUserService`,
        );
    }
    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            `Password do not matched`,
            `loginUserService`,
        );
    }

    if (user.isBlocked) {
        throw new AppError(
            httpStatus.FORBIDDEN,
            `User is blocked`,
            `loginUserService`,
        );
    }

    const jwtPayload = {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
    );
    return {
        token: `Bearer ${accessToken}`,
    };
};

const blockUserIntoDB = async (userId: string, user: JwtPayload) => {
    if (!user) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            `Unauthorized access`,
            `blockUserIntoDB`,
        );
    }

    if (user.role !== `Admin`) {
        throw new AppError(
            httpStatus.UNAUTHORIZED,
            `Unauthorized access`,
            `blockUserIntoDB`,
        );
    }
    const result = await User.findByIdAndUpdate(userId, {
        isBlocked: true,
    });
    return result;
};

export const AuthServices = {
    loginUserService,
    blockUserIntoDB,
};
