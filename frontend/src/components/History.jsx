import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function History() {
  const [history, setHistory] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/api/study/history");

        setHistory(res.data);
      } catch (error) {
        if (error.response?.status === 401) {
          logout();
        }
        console.error(error);
      }
    };

    fetchHistory();
  }, [logout]);

  const deleteSession = async (id) => {
    try {
      const confirmDelete = window.confirm("Delete this study session?");

      if (!confirmDelete) {
        return;
      }
      await api.delete(`/api/study/${id}`);
      setHistory((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">Study History</h2>

      {history.map((item) => (
        <div key={item.id} className="border p-4 mt-3 rounded">
          <h3 className="font-bold">{item.topic}</h3>

          <p>{item.summary}</p>
          <button
            onClick={() => navigate(`/session/${item.id}`)}
            className="bg-blue-500 text-white px-3 py-2 rounded mr-2 gap-4"
          >
            View
          </button>

          <button
            onClick={() => deleteSession(item.id)}
            className="bg-red-500 text-white px-3 py-2 rounded mt-3"
          >
            Delete
          </button>

        </div>
      ))}
    </div>
  );
}
