import mongoose from "mongoose";

import { DB_NAME } from "../constants.js";

const getMongoUri = () => process.env.MONGODB_URI?.trim();

const buildMongoUri = (mongoUri) => {
    const [baseUri, queryString] = mongoUri.split("?");
    const normalizedBaseUri = baseUri.replace(/\/+$/, "");

    if (normalizedBaseUri.endsWith(`/${DB_NAME}`)) {
        return mongoUri;
    }

    const nextUri = `${normalizedBaseUri}/${DB_NAME}`;
    return queryString ? `${nextUri}?${queryString}` : nextUri;
};

const connectDB = async () => {
    const mongoUri = getMongoUri();

    if (!mongoUri) {
        throw new Error("MONGODB_URI is missing in the .env file.");
    }

    if (mongoUri.includes("<") || mongoUri.includes(">")) {
        throw new Error("MONGODB_URI still contains placeholder characters. Replace them with your real MongoDB password.");
    }

    try {
        const connectionInstance = await mongoose.connect(buildMongoUri(mongoUri));
        console.log(`MongoDB connected: ${connectionInstance.connection.host}`);
        return connectionInstance;
    } catch (error) {
        throw new Error(`Error connecting to MongoDB: ${error.message}`);
    }
};

export default connectDB;
