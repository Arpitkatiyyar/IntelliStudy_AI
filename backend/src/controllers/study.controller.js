import { askAI,askGeminiAI } from "../services/aiService.service.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { ai } from "../services/gemini.service.js";
import { extractJSON } from "../utils/extractJSON.js";
import { saveStudySession } from "../services/study.service.js";
import prisma from "../config/prisma.js";
import axios from "axios";

export const askQuestionWithGemini = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question?.trim()) {
      return res.status(400).json({ message: "Question required" });
    }

    const prompt = buildPrompt(question);

    // const result = await ai.models.generateContent({
    //   model: "gemini-2.5-flash",
    //   contents: [
    //     {
    //       role: "user",
    //       parts: [{ text: prompt }],
    //     },
    //   ],
    // });
    // const textResponse =result?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    
    
    const textResponse = await askGeminiAI(prompt);
    const parsedResponse = extractJSON(textResponse);

    if (!parsedResponse) {
      return res.status(500).json({
        message: "Could not parse AI response",
        raw: textResponse,
      });
    }
    const savedSession = await saveStudySession({
      userId: req.user.userId,
      topic: question,

      summary: parsedResponse.summary,

      flashcards: parsedResponse.flashcards,

      quiz: parsedResponse.quiz,
    });
    res.status(200).json(
      parsedResponse,
    );
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};


export const askQuestionWithOllama = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question?.trim()) {
      return res.status(400).json({ message: "Question required" });
    }

    const prompt = buildPrompt(question);

    // Call Ollama local server
    // const response = await axios.post("http://localhost:11434/api/generate", {
    //   model: "llama3",
    //   prompt,
    //   stream: false,
    // });
    // const textResponse = response.data?.response || "";

    const textResponse = await askAI(prompt);

    const parsedResponse = extractJSON(textResponse);

    if (!parsedResponse) {
      return res.status(500).json({
        message: "Could not parse AI response",
        raw: textResponse,
      });
    }

    const savedSession = await saveStudySession({
      userId: req.user.userId,
      topic: question,
      summary: parsedResponse.summary,
      flashcards: parsedResponse.flashcards,
      quiz: parsedResponse.quiz,
    });

    res.status(200).json(parsedResponse);
  } catch (error) {
    console.error("Ollama error:", error);
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};


export const getHistory = async (req, res) => {
  const session = await prisma.studySession.findMany({
    where: {
      userId: req.user.userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      flashcards: true,
      quizzes: true,
    },
  });
  res.status(200).json(session);
};

export const deleteSession = async (req, res) => {
  const { id } = req.params;
  const userID = req.user.userID;
  const session = await prisma.studySession.findFirst({
    where: {
      id: Number(id),
      userID,
    },
  });
  if (!session) {
    return res.status(404).json({
      message: "Session not found",
    });
  }
  await prisma.studySession.delete({
    where: {
      id: Number(id),
    },
  });
  res.status(200).json({
    message: "Session deleted",
  });
};

export const getSessionById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const session = await prisma.studySession.findFirst({
      where: {
        id: Number(id),
        userId,
      },
      include: {
        flashcards: true,
        quizzes: true,
      },
    });

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    res.status(200).json(session);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};