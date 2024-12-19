import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = async (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).then().catch(error => next(error));
    };
};

export default catchAsync;