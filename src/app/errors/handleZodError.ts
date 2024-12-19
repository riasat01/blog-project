import { ZodError } from "zod";
import { IErrorResponse } from "../interfaces/IErrorResponse";
import httpStatus from "http-status";

const handleZodError = (error: ZodError): IErrorResponse => {
    return {
        success: false,
        message: `Validation error`,
        statusCode: httpStatus.BAD_REQUEST,
        error: {
            details: {
                issues: error.issues,
            },
        },
        stack: error?.stack as string,
    };
};

export default handleZodError;
