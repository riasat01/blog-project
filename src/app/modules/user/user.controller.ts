/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import catchAsync from "../../utils/catchAsync";
import sendRestpnse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from "http-status";

const createUser = catchAsync(async (req, res, next) => {
    const payload = req.body;
    const result = await UserServices.createUserIntoDB(payload);
    sendRestpnse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: `User registered successfully`,
        data: result,
    });
});

export const UserControllers = {
    createUser,
};
