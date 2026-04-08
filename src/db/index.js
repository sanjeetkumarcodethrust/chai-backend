import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const getMongoUri = () => {
    const mongoUri = process.env.MONGODB_URI?.trim();

    if (!mongoUri || mongoUri.includes("<") || mongoUri.includes(">")) {
        return null;
    }

    return mongoUri;
};

const connectDB = async () => {
    const mongoUri = getMongoUri();

    if (!mongoUri) {
        console.warn("MongoDB URI is missing or still contains placeholder values. Skipping database connection.");
        return null;
    }

    try {
        const connectionInstance = await mongoose.connect(`${mongoUri}/${DB_NAME}`);
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
        return connectionInstance;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        return null;
    }
};

export default connectDB;
