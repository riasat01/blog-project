import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/user/user.model";

const auth = () => {
    return catchAsync(
        async (req: Request, res: Response, next: NextFunction) => {
            const token = req.headers?.authorization?.split(" ")[1];
            if (!token) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    `You are not authorized`,
                    `auth`,
                );
            }
            const decoded = jwt.verify(
                token,
                config.jwt_access_secret as string,
            ) as JwtPayload;
            const user = await User.findById(decoded.userId);
            if (!user) {
                throw new AppError(
                    httpStatus.UNAUTHORIZED,
                    `You are not authorized`,
                    `auth`,
                );
            }
            req.user = decoded;
            next();
        },
    );
};

export default auth;
