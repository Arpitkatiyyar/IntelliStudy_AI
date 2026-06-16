import axios from "axios";
import { ai } from "../services/gemini.service.js";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
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
    // throw new Error("AI service failed");
  }
};


const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY, // safer: load from .env
  baseURL: "https://api.groq.com/openai/v1", // ✅ correct Groq endpoint
});
export const askGroqAI = async (prompt) => {
  try {
    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile", // or "openai/gpt-oss-20b" if supported
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200, // optional: control length
    });

    const textResponse = response?.choices?.[0]?.message?.content || "";
    return textResponse;
  } catch (error) {
    console.error("Groq API error:", error);
    return "";
  }
};

