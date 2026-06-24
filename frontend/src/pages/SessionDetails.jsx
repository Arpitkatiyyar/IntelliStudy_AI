import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import FlashcardPlayer from "../components/FlaschcardPlayer";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

export default function SessionDetails() {
  const { id } = useParams();

  const [session, setSession] = useState(null);
  const [selected, setSelected] = useState({});

  const fetchSession = async () => {
    try {
      const res = await api.get(`/api/study/${id}`);
      setSession(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSession();
  }, [id]);

  if (!session) {
    return (
      <DashboardLayout>
        <div>Loading...</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">
        {session.topic}
      </h1>

      {/* Summary */}
      <div className="bg-white p-6 rounded shadow prose max-w-none">
        <h2 className="text-xl font-bold mb-3">
          Summary
        </h2>

        <ReactMarkdown
          remarkPlugins={[remarkMath]}
          rehypePlugins={[rehypeKatex]}
        >
          {session.summary}
        </ReactMarkdown>
      </div>

      {/* Flashcards */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">
          Flashcards
        </h2>

        <FlashcardPlayer
          flashcards={session.flashcards}
        />
      </div>

      {/* Quiz */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">
          Quiz
        </h2>

        {session.quizzes?.map((quiz, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded shadow mb-4"
          >
            <div className="font-semibold mb-2">
              <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
              >
                {`Q${index + 1}. ${quiz.question}`}
              </ReactMarkdown>
            </div>

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
                  selected[index] === option &&
                  option === quiz.correctAnswer
                    ? "bg-green-200 border-green-500"
                    : ""
                }
                ${
                  selected[index] === option &&
                  option !== quiz.correctAnswer
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
    </DashboardLayout>
  );
}
