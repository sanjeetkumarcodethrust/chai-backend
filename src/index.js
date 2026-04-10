import dotenv from "dotenv";

import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path: "./.env",
});

const port = Number(process.env.PORT) || 8000;

const server = app.listen(port, () => {
    console.log(`Server is running at port : ${port}`);
});

server.on("error", (error) => {
    console.error("Server startup failed:", error.message);
    process.exit(1);
});

connectDB().catch((error) => {
    console.error("MongoDB connection failed:", error.message);
});
