// import { useState } from "react";
// import api from "../services/api";
// import { useAuth } from "../context/AuthContext";
// import ReactMarkdown from "react-markdown";
// import remarkMath from "remark-math";
// import rehypeKatex from "rehype-katex";
// export default function QuestionInput() {
//   const { logout } = useAuth();
//   const [question, setQuestion] = useState("");
//   const [file, setFile] = useState(null);
//   const [response, setResponse] = useState({
//     summary: "",
//     flashcards: [],
//     quiz: [],
//   });

//   const [selected, setSelected] = useState({});
//   const [loading, setLoading] = useState(false);

//   const askQuestion = async () => {
//     if (!question.trim()) return;
//     try {
//       setLoading(true);
//       const res = await api.post("/api/study/ask", { question });
//       setResponse(res.data);
//       // console.log(res.data);
//     } catch (error) {
//       if (error.response?.status === 401) {
//         logout();
//       }
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const uploadPdf = async () => {
//     if (!file) return;

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("file", file);
//       const res = await api.post("/api/upload/pdf", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       // setResponse({
//       //   summary: res.data.summary,
//       //   flashcards: res.data.flashcards,
//       //   quiz: res.data.quiz,
//       // });
//       setResponse(res.data);
//       // console.log(res.data);
//     } catch (error) {
//       if (error.response?.status === 401) {
//         logout();
//       }

//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className="flex gap-4 mt-8">
//         <input
//           value={question}
//           onChange={(e) => setQuestion(e.target.value)}
//           className="border p-3 rounded w-full"
//           placeholder="Ask anything..."
//         />

//         <button
//           onClick={askQuestion}
//           disabled={loading}
//           className="bg-blue-500 text-white px-5 rounded"
//         >
//           {loading ? "Generating..." : "Ask AI"}
//         </button>
//       </div>
//       <div className="mt-4 flex gap-4">
//         <input
//           type="file"
//           accept=".pdf,.docs,.txt"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="border rounded px-2 py-1"
//         />

//         <button
//           onClick={uploadPdf}
//           disabled={loading}
//           className={`px-5 rounded text-white ${
//             loading
//               ? "bg-gray-400 cursor-not-allowed"
//               : "bg-green-500 hover:bg-green-600"
//           }`}
//         >
//           {loading ? "Processing PDF..." : "Upload PDF"}
//         </button>
//       </div>

//       {/* Summary */}
//       {response.summary && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold">Summary</h2>
//           <div className="border p-4 rounded mt-3">
//             <ReactMarkdown
//               remarkPlugins={[remarkMath]}
//               rehypePlugins={[rehypeKatex]}
//             >
//               {response.summary}
//             </ReactMarkdown>
//           </div>
//         </div>
//       )}

//       {/* Flashcards */}
//       {response.flashcards.length > 0 && (
//         <div className="mt-8">
//           <h2 className="text-2xl font-bold">Flashcards</h2>
//           {response.flashcards.map((card, index) => (
//             <div key={index} className="border rounded p-4 mt-3">
//               <p>
//                 <b>Q:</b> {card.question}
//               </p>
//               <p>
//                 <b>A:</b> {card.answer}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Quiz */}
//       {response.quiz.length > 0 && (
//         <div className="mt-8">
//           <h2 className="text-xl font-bold mb-4">Quiz</h2>
//           {response.quiz.map((quiz, index) => (
//             <div key={index} className="bg-white p-4 rounded shadow mb-4">
//               <p className="font-semibold mb-2">
//                 Q{index + 1}. {quiz.question}
//               </p>
//               <p>
//                 <span className="font-semibold">Difficulty: </span>
//                 {quiz.difficulty}
//               </p>
//               {quiz.options?.map((option, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelected({ ...selected, [index]: option })}
//                   className={`block text-left w-full px-3 py-2 mb-2 border rounded
//                     ${
//                       selected[index] === option &&
//                       option === quiz.correctAnswer
//                         ? "bg-green-200 border-green-500"
//                         : ""
//                     }
//                     ${
//                       selected[index] === option &&
//                       option !== quiz.correctAnswer
//                         ? "bg-red-200 border-red-500"
//                         : ""
//                     }
//                     hover:bg-gray-100`}
//                 >
//                   {option}
//                 </button>
//               ))}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export default function QuestionInput() {
  const { logout } = useAuth();

  const [question, setQuestion] = useState("");
  const [file, setFile] = useState(null);

  const [response, setResponse] = useState({
    summary: "",
    flashcards: [],
    quiz: [],
  });

  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const res = await api.post("/api/study/ask", {
        question,
      });

      setResponse(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
      }

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadPdf = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/api/upload/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResponse(res.data);
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
      }

      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Ask AI */}
      <div className="flex gap-4 mt-8">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="border p-3 rounded w-full"
          placeholder="Ask anything..."
        />

        <button
          onClick={askQuestion}
          disabled={loading}
          className="bg-blue-500 text-white px-5 rounded"
        >
          {loading ? "Generating..." : "Ask AI"}
        </button>
      </div>

      {/* Upload PDF */}
      <div className="mt-4 flex gap-4">
        <input
          type="file"
          accept=".pdf,.docs,.txt"
          onChange={(e) => setFile(e.target.files[0])}
          className="border rounded px-2 py-1"
        />

        <button
          onClick={uploadPdf}
          disabled={loading}
          className={`px-5 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Processing PDF..." : "Upload PDF"}
        </button>
      </div>

      {/* Summary */}
      {response.summary && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Summary</h2>

          <div className="border p-4 rounded mt-3 prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
            >
              {response.summary}
            </ReactMarkdown>
          </div>
        </div>
      )}

      {/* Flashcards */}
      {response.flashcards.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold">Flashcards</h2>

          {response.flashcards.map((card, index) => (
            <div key={index} className="border rounded p-4 mt-3">
              <p>
                <b>Q:</b> {card.question}
              </p>

              <div className="mt-2">
                <b>A:</b>

                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {card.answer}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quiz */}
      {response.quiz.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Quiz</h2>

          {response.quiz.map((quiz, index) => (
            <div key={index} className="bg-white p-4 rounded shadow mb-4">
              <div className="font-semibold mb-2">
                <ReactMarkdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex]}
                >
                  {`Q${index + 1}. ${quiz.question}`}
                </ReactMarkdown>
              </div>

              <p>
                <span className="font-semibold">Difficulty:</span>{" "}
                {quiz.difficulty}
              </p>

              {quiz.options?.map((option, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setSelected({
                      ...selected,
                      [index]: option,
                    })
                  }
                  className={`block text-left w-full px-3 py-2 mb-2 border rounded
                  ${
                    selected[index] === option && option === quiz.correctAnswer
                      ? "bg-green-200 border-green-500"
                      : ""
                  }
                  ${
                    selected[index] === option && option !== quiz.correctAnswer
                      ? "bg-red-200 border-red-500"
                      : ""
                  }
                  hover:bg-gray-100`}
                >
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                  >
                    {option}
                  </ReactMarkdown>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
