// // import axios from "axios";
// // import { buildPrompt } from "../AI STUDY PROJECT/backend/src/utils/promptBuilder.js";
// // const response = await axios.post("http://localhost:11434/api/generate", {
// //   model: "qwen2.5-coder:14b",
// //   prompt:" what is transactions",
// //   stream: false,
// // });

// // console.log(response.data);
// import axios from "axios";
// import { buildPrompt } from "../AI STUDY PROJECT/backend/src/utils/promptBuilder.js";

// async function run() {
//   try {
//     const response = await axios.post("http://localhost:11434/api/generate", {
//       model: "qwen2.5-coder:14b", 
//       prompt: "what is transactions",
//       stream: false,
//     });

//     console.log(response.data.response);
//   } catch (error) {
//     console.error("Error calling Ollama:", error.response?.data || error.message);
//   }
// }

// run();



import OpenAI from "openai";
const client = new OpenAI({
    apiKey: "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",
    baseURL: "https://api.groq.com/openai/v1",
});

const response = await client.responses.create({
    model: "openai/gpt-oss-20b",
    input: "Explain transactions",
});
console.log(response.output_text);
