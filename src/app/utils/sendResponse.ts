import { Response } from "express";

interface IResponse<T> {
    statusCode: number;
    success: boolean;
    message?: string,
    data: T;
};

const sendRestpnse = <T>(res: Response, dataPayload: IResponse<T>) => {
    const {statusCode, success, message, data} = dataPayload;
    res.status(statusCode).json({
        success,
        message,
        data,
    });
};

export default sendRestpnse;