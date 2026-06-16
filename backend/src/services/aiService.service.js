import axios from "axios";
import { ai } from "../services/gemini.service.js";
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
    // throw new Error("AI service failed");
  }
};

 