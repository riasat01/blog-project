/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import catchAsync from "../../utils/catchAsync";
import sendRestpnse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AuthServices } from "./auth.service";

const loginUser = catchAsync(async (req, res, next) => {
    const result = await AuthServices.loginUserService(req.body);
    sendRestpnse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: `Login successful`,
        data: result,
    });
});

export const AuthControllers = {
    loginUser,
};
