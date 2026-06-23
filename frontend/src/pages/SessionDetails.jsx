import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FlashcardPlayer from "../components/FlaschcardPlayer";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

export default function SessionDetails() {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [selected, setSelected] = useState({}); // track selected answers

  const fetchSession = async () => {
    try {
      const res = await api.get(`/api/study/${id}`);
      setSession(res.data);
      // console.log(res.data);
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
      <h1 className="text-3xl font-bold mb-6">{session.topic}</h1>

      {/* Summary */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-3">Summary</h2>
        <p>{session.summary}</p>
      </div>

      {/* Flashcards */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Flashcards</h2>
        {/* {session.flashcards?.map((card, index) => (
          <div key={index} className="bg-white p-4 rounded shadow mb-3">
            <p><b>Q:</b> {card.question}</p>
            <p><b>A:</b> {card.answer}</p>
          </div>
        ))} */}
        <FlashcardPlayer flashcards={session.flashcards} />
      </div>

      {/* Quiz */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Quiz</h2>
        {session.quizzes?.map((quiz, index) => (
          <div key={index} className="bg-white p-4 rounded shadow mb-4">
            <p className="font-semibold mb-2">
              Q{index + 1}. {quiz.question}
            </p>
            {quiz.options?.map((option, i) => (
              <button
                key={i}
                onClick={() => setSelected({ ...selected, [index]: option })}
                className={`block text-left w-full px-3 py-2 mb-2 border rounded
                  ${selected[index] === option && option === quiz.correctAnswer ? "bg-green-200 border-green-500" : ""}
                  ${selected[index] === option && option !== quiz.correctAnswer ? "bg-red-200 border-red-500" : ""}
                  hover:bg-gray-100`}
              >
                {option}
              </button>
            ))}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
