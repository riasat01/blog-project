import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { IAuth } from "./auth.interface";
import httpStatus from "http-status";
import { createToken } from "./auth.utils";

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
    console.log(payload?.password, user?.password);
    if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
        throw new AppError(
            httpStatus.FORBIDDEN,
            `Password do not matched`,
            `loginUserService`,
        );
    }
    //create token and sent to the  client

    const jwtPayload = {
        userEmail: user.email,
        userName: user.name,
    };

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
    );
    return {
        token: `Bearer ${accessToken}`,
    };
};

export const AuthServices = {
    loginUserService,
};
