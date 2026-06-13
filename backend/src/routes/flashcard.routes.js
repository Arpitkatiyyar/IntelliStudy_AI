import express from "express";
import {authMiddleware} from "../middleware/auth.middleware.js";
import { updateFlashcardStatus } from "../controllers/flashcard.controller.js";

const router = express.Router();

router.patch("/:id/status", authMiddleware, updateFlashcardStatus);

export default router;
