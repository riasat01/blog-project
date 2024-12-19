import { ErrorRequestHandler } from "express";
import httpStatus from "http-status";
import { IErrorResponse } from "../interfaces/IErrorResponse";
import mongoose, { MongooseError } from "mongoose";
import handleValidationError from "../errors/handleValidationError";
import handleMongooseError from "../errors/handleMongooseError";
import { ZodError } from "zod";
import handleZodError from "../errors/handleZodError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    let errorResponse: IErrorResponse = {
        success: false,
        message: `Validation error`,
        statusCode: 400,
        error: {
            details: error?.message,
        },
        stack: error.stack,
    };
    if (error instanceof ZodError) {
        errorResponse = handleZodError(error);
    } else if (error instanceof mongoose.Error.ValidationError) {
        errorResponse = handleValidationError(error);
    } else if (error instanceof MongooseError) {
        errorResponse = handleMongooseError(error);
    }
    res.status(httpStatus.BAD_REQUEST).json(errorResponse);
    next(error);
};

export default globalErrorHandler;