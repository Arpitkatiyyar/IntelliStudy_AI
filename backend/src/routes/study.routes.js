import express from "express";
import {
  askQuestionWithGemini,
  askQuestionWithOllama,
  askQuestionWithCerebras,
  getHistory,
  deleteSession,
  getSessionById,
} from "../controllers/study.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { studySchema } from "../validations/study.validation.js";
const router = express.Router();

// route for using gemini model
// router.post("/ask",authMiddleware,validate(studySchema),askQuestionWithGemini);

//route for using cerebras inference model
router.post("/ask",authMiddleware,validate(studySchema),askQuestionWithCerebras);

//route for using ollama locally on machine
// router.post("/ask",authMiddleware,validate(studySchema),askQuestionWithOllama);

router.get("/history", authMiddleware, getHistory);
router.delete("/:id",authMiddleware,deleteSession);
router.get("/:id", authMiddleware, getSessionById);
export default router;
