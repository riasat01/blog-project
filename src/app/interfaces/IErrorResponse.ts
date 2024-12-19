export interface IErrorResponse {
    success: boolean;
    message: string;
    statusCode: number;
    error: {
        details: Record<string, unknown>;
    };
    stack: string;
}
