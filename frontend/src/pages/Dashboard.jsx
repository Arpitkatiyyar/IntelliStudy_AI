import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import api from "../services/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalSession: 0,
    totalFlashcards: 0,
    totalQuizzes: 0,
  });

  const [weakTopics, setWeakTopics] = useState([]);
  useEffect(() => {
    const fetchWeakTopics = async () => {
      try {
        const res =await api.get("/api/analytics/weak-topics");
        setWeakTopics(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeakTopics();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/dashboard");
        setStats(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStats();
    console.log("a:", stats.totalSession);
  }, []);

  const statCards = [
    { title: "Total Sessions", value: stats.totalSession },
    { title: "Total Flashcards", value: stats.totalFlashcard },
    { title: "Total Quizzes", value: stats.totalQuizzes },
    { title: "Known Cards", value: stats.knownCards },
    { title: "Difficult Cards", value: stats.difficultCards },
    { title: "Mastery", value: `${stats.masteryPercentage}%` },
  ];

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="text-gray-500">{item.title}</h3>
            <p className="text-3xl font-bold mt-2">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-xl shadow mt-8">
        <h2 className="text-xl font-bold mb-4">Learning Progress</h2>

        <p className="mb-3">Mastery: {stats.masteryPercentage}%</p>

        <div className="w-full bg-gray-300 h-5 rounded-full">
          <div
            className="bg-green-500 h-5 rounded-full transition-all duration-500"
            style={{ width: `${stats.masteryPercentage}%` }}
          ></div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow mt-8">
        <h2 className="text-xl font-bold mb-4">Weak Topics</h2>

        {weakTopics.length === 0 ? (
          <p>No weak topics detected 🎉</p>
        ) : (
          weakTopics.map((topic, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <span>{topic.topic}</span>
              <span>{topic.difficultCount} difficult</span>
            </div>
          ))
        )}
      </div>
    </DashboardLayout>
  );
}
