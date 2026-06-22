import crypto from "crypto";
import fs from "fs";
import { extractTextFromDocument } from "../utils/documentExtractor.js";
import { askAI, askGeminiAI } from "../services/aiService.service.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { extractJSON } from "../utils/extractJSON.js";
import { saveStudySession } from "../services/study.service.js";
import redisClient from "../config/redis.js";
import { log } from "console";

export const uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }
    const text = await extractTextFromDocument(req.file.path);
    // console.log("Extracted text length:", text.length);
    const limitedText = text.slice(0, 12000);
    const cacheKey ="pdf:" + crypto.createHash("sha256").update(limitedText).digest("hex");
    const cacheData = await redisClient.get(cacheKey);
    let parsedResponse;
    if (cacheData) {
      // console.log("PDF CACHE HIT");
      parsedResponse = JSON.parse(cacheData);
    } else {
      console.log("PDF CACHE MISS");
      const prompt = buildPrompt(limitedText);
      // const textResponse = await askAI(prompt);
      const textResponse = await askGeminiAI(prompt);
      parsedResponse = extractJSON(textResponse);
      if (!parsedResponse) {
        return res.status(500).json({
          message: "Could not parse AI response",
          raw: textResponse,
        });
      }
      await redisClient.set(cacheKey, JSON.stringify(parsedResponse), {
        EX: 60 * 60 * 24, // 24 Hours
      });
    }
    const savedSession = await saveStudySession({
      userId: req.user.userId,
      topic: req.file.originalname,
      summary: parsedResponse.summary,
      flashcards: parsedResponse.flashcards,
      quiz: parsedResponse.quiz,
    });

    return res.status(200).json({
      ...parsedResponse,
      sessionId: savedSession.id,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  } finally {
    if (req.file?.path) {
      fs.unlink(req.file.path, (err) => {
        if (err) {
          console.log("file delete err", err);
        } else {
          console.log("temp file deleted.");
        }
      });
    }
  }
};
