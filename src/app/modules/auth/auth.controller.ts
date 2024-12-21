import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AuthServices } from "./auth.service";
import { JwtPayload } from "jsonwebtoken";

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUserService(req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: `Login successful`,
        data: result,
    });
});

const blockUser = catchAsync(async (req, res) => {
    await AuthServices.blockUserIntoDB(
        req.params.userId,
        req.user as JwtPayload,
    );
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `User blocked successfully`,
        data: undefined,
    });
});

export const AuthControllers = {
    loginUser,
    blockUser,
};
