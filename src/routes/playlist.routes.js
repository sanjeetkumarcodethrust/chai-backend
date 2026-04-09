import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Playlist routes are available",
    });
});

export default router;
