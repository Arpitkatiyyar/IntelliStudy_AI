import express from "express";
import {
  askQuestionWithGemini,
  askQuestionWithOllama,
   
  getHistory,
  deleteSession,
  getSessionById,
} from "../controllers/study.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { studySchema } from "../validations/study.validation.js";
const router = express.Router();

router.post("/ask",authMiddleware,validate(studySchema),askQuestionWithGemini);

// router.post("/ask",authMiddleware,validate(studySchema),askQuestionWithOllama);

router.get("/history", authMiddleware, getHistory);
router.delete("/:id",authMiddleware,deleteSession);
router.get("/:id", authMiddleware, getSessionById);
export default router;
