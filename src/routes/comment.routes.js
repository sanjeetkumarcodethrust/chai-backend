import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Comment routes are available",
    });
});

export default router;
// This code defines a simple Express router for handling comment-related routes. Currently, it has a single GET route at the root path ("/") that responds with a JSON message indicating that the comment routes are available. This is likely a placeholder for more specific comment-related routes that will be added in the future.