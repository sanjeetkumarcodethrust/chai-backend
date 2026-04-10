import { ApiError } from "../utils/ApiError.js";

const errorHandler = (error, _req, res, _next) => {
    const statusCode = error instanceof ApiError ? error.statusCode : 500;
    const message = error?.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false,
        message,
        errors: error instanceof ApiError ? error.errors : [],
    });
};

export { errorHandler };
