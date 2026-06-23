import axios from "axios";
import { ai } from "../services/gemini.service.js";
import { client } from "./cerebras.service.js";
import OpenAI from "openai";
export const askAI = async (prompt) => {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "llama3",
      prompt: prompt,
      stream: false,
    });
    return response.data.response;
  } catch (error) {
    console.log(error);
    throw new Error("AI service failed");
  }
};
export const askGeminiAI = async (prompt) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });
    const textResponse =
      response?.candidates?.[0]?.content?.parts?.[0]?.text  ;
    return textResponse;
  } catch (error) {
    console.error("Gemini API error:", error);
    throw new Error("AI service failed");
  }
};

 export const askCerebrasAI = async (prompt) => {
  const response = await client.chat.completions.create({
    model: "gpt-oss-120b",

    messages: [
      {
        role: "system",
        content:
          "You are IntelliStudy AI, an expert educational assistant that generates structured summaries, flashcards, quizzes, and study notes."
      },
      {
        role: "user",
        content: prompt
      }
    ],

    temperature: 0.4,
    max_tokens: 3000
  });
  return response.choices[0].message.content;
};
