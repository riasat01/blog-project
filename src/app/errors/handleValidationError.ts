import mongoose from "mongoose";
import { IErrorResponse } from "../interfaces/IErrorResponse";
import httpStatus from "http-status";

const handleValidationError = (
    error: mongoose.Error.ValidationError,
): IErrorResponse => {
    return {
        success: false,
        message: `Validation error`,
        statusCode: httpStatus.BAD_REQUEST,
        error: {
            details: {
                message: error?.message,
                errors: error?.errors,
            },
        },
        stack: error?.stack as string,
    };
};

export default handleValidationError;
