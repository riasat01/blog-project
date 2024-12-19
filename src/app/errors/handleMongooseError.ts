import httpStatus from "http-status";
import { MongooseError } from "mongoose";
import { IErrorResponse } from "../interfaces/IErrorResponse";

const handleMongooseError = (error: MongooseError): IErrorResponse => {
    return {
        success: false,
        message: `Validation error`,
        statusCode: httpStatus.BAD_REQUEST,
        error: {
            details: {
                message: error?.message,
                errorResponse:
                    Object.getOwnPropertyDescriptors(error)?.cause?.value
                        ?.errorResponse,
                // errorResponse: error?.cause?.errorResponse,
            },
        },
        stack: error?.stack as string,
    };
};

export default handleMongooseError;
