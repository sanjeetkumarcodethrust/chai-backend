import mongoose from "mongoose";

export const requireDbConnection = (_req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        return res.status(503).json({
            success: false,
            message: "Database is not connected. Please try again after MongoDB reconnects.",
        });
    }

    next();
};
