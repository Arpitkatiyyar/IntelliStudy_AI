// import { extractTextFromPdf } from "../utils/pdfExtractor.js";
// import { askAI } from "../services/aiService.service.js";
// import { buildPrompt } from "../utils/promptBuilder.js";
// import { extractJSON } from "../utils/extractJSON.js";
// import { saveStudySession } from "../services/study.service.js";
// import axios from 'axios'
// export const uploadPdf = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({
//         message: "No file uploaded",
//       });
//     }

//     const text = await extractTextFromPdf(req.file.path);
//     const limitedText=text.slice(0,12000);
//     const prompt=buildPrompt(limitedText);

//     const response = await axios.post("http://localhost:11434/api/generate", {
//       model: "llama3",
//       prompt,
//       stream: false,
//     });

//     const textResponse = response.data?.response || "";
//     const parsedResponse = extractJSON(textResponse);
//     if (!parsedResponse) {
//       return res.status(500).json({
//         message: "Could not parse AI response",
//         raw: textResponse,
//       });
//     }
//     const savedSession = await saveStudySession({
//         userId: req.user.userId,
//         topic: req.file.originalname,
//         summary: parsedResponse.summary,
//         flashcards: parsedResponse.flashcards,
//         quiz: parsedResponse.quiz,
//     });
//     res.status(200).json(parsedResponse);
//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
import { extractTextFromPdf } from "../utils/pdfExtractor.js";
import { askAI, askGeminiAI } from "../services/aiService.service.js";
import { buildPrompt } from "../utils/promptBuilder.js";
import { extractJSON } from "../utils/extractJSON.js";
import { saveStudySession } from "../services/study.service.js";

export const uploadPdf = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const text = await extractTextFromPdf(req.file.path);
    console.log("Extracted text :", text);
    const limitedText = text.slice(0, 12000);

    const prompt = buildPrompt(limitedText);

    const textResponse = await askAI(prompt);
    // const textResponse = await askGeminiAI(prompt);
    const parsedResponse = extractJSON(textResponse);

    if (!parsedResponse) {
      return res.status(500).json({
        message: "Could not parse AI response",
        raw: textResponse,
      });
    }

    const savedSession = await saveStudySession({
      userId: req.user.userId,

      topic: req.file.originalname,

      summary: parsedResponse.summary,

      flashcards: parsedResponse.flashcards,

      quiz: parsedResponse.quiz,
    });

    res.status(200).json({
      ...parsedResponse,
      sessionId: savedSession.id,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
