// import axios from "axios";
// import { buildPrompt } from "../AI STUDY PROJECT/backend/src/utils/promptBuilder.js";
// const response = await axios.post("http://localhost:11434/api/generate", {
//   model: "qwen2.5-coder:14b",
//   prompt:" what is transactions",
//   stream: false,
// });

// console.log(response.data);
import axios from "axios";
import { buildPrompt } from "../AI STUDY PROJECT/backend/src/utils/promptBuilder.js";

async function run() {
  try {
    const response = await axios.post("http://localhost:11434/api/generate", {
      model: "qwen2.5-coder:14b", 
      prompt: "what is transactions",
      stream: false,
    });

    console.log(response.data.response);
  } catch (error) {
    console.error("Error calling Ollama:", error.response?.data || error.message);
  }
}

run();
