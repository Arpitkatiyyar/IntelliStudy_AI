import { useState } from "react";
import api from "../services/api";

export default function FlashcardPlayer({ flashcards }) {
  if (!flashcards || flashcards.length === 0) {
    return (
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold">
          No Flashcards Found
        </h2>
      </div>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [cards, setCards] = useState(flashcards);

  const currentCard = cards[currentIndex];

  const updateStatus = async (status) => {
    try {
      await api.patch(
        `api/flashcards/${currentCard.id}/status`,
        { status }
      );

      const updatedCards = [...cards];

      updatedCards[currentIndex] = {
        ...currentCard,
        status,
      };

      setCards(updatedCards);

      // Auto move to next card
      if (currentIndex < cards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowAnswer(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const knownCount = cards.filter(
    (card) => card.status === "known"
  ).length;

  const difficultCount = cards.filter(
    (card) => card.status === "difficult"
  ).length;

  const progress =
    (knownCount / cards.length) * 100;

  const getStatusColor = () => {
    if (currentCard.status === "known")
      return "text-green-600";

    if (
      currentCard.status === "difficult"
    )
      return "text-red-600";

    return "text-gray-500";
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          Flashcard {currentIndex + 1} / {cards.length}
        </h2>

        <span
          className={`font-semibold ${getStatusColor()}`}
        >
          Status: {currentCard.status}
        </span>
      </div>

      {/* Question */}

      <div className="border rounded-lg p-6 bg-gray-50 min-h-30 flex items-center">
        <p className="text-lg font-medium">
          {currentCard.question}
        </p>
      </div>

      {/* Show Answer */}

      <button
        onClick={() =>
          setShowAnswer(!showAnswer)
        }
        className="
          mt-4
          bg-green-500
          hover:bg-green-600
          text-white
          px-4
          py-2
          rounded-lg
        "
      >
        {showAnswer
          ? "Hide Answer"
          : "Show Answer"}
      </button>

      {/* Answer */}

      {showAnswer && (
        <div className="mt-4 border-l-4 border-green-500 bg-green-50 p-4 rounded">
          <p className="font-semibold">
            Answer:
          </p>

          <p className="mt-2">
            {currentCard.answer}
          </p>
        </div>
      )}

      {/* Known / Difficult */}

      <div className="flex gap-4 mt-6">
        <button
          onClick={() =>
            updateStatus("known")
          }
          className="
            bg-blue-500
            hover:bg-blue-600
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Known
        </button>

        <button
          onClick={() =>
            updateStatus("difficult")
          }
          className="
            bg-red-500
            hover:bg-red-600
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Difficult
        </button>
      </div>

      {/* Navigation */}

      <div className="flex gap-4 mt-6">
        <button
          disabled={currentIndex === 0}
          onClick={() => {
            setCurrentIndex(
              currentIndex - 1
            );
            setShowAnswer(false);
          }}
          className="
            bg-gray-500
            disabled:opacity-50
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Previous
        </button>

        <button
          disabled={
            currentIndex ===
            cards.length - 1
          }
          onClick={() => {
            setCurrentIndex(
              currentIndex + 1
            );
            setShowAnswer(false);
          }}
          className="
            bg-gray-500
            disabled:opacity-50
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Next
        </button>
      </div>

      {/* Stats */}

      <div className="mt-8">
        <div className="flex justify-between mb-2">
          <p>
            Known: {knownCount}
          </p>

          <p>
            Difficult: {difficultCount}
          </p>
        </div>

        <p className="mb-2 font-semibold">
          Progress: {progress.toFixed(0)}%
        </p>

        <div className="w-full bg-gray-300 h-4 rounded-full">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-300"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}