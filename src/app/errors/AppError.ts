class AppError extends Error {
    public statusCode: number;
    public location: string;
    constructor(
        statusCode: number,
        message: string,
        location: string,
        stack: string = "",
    ) {
        super(message);
        this.statusCode = statusCode;
        this.location = location;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default AppError;
