import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();  
export const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});
// console.log(process.env.GEMINI_API_KEY)
 