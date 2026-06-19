import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await api.post("/api/auth/login", form);

      // login({
      //   id: res.data.user.id,
      //   name: res.data.user.name,
      //   email: res.data.user.email,
      //   token: res.data.token,
      // });
      login(res.data);
      alert("Login successful");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  ">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Log In</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* <div className="flex items-center justify-between mb-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>
          <Link to="/forgot-password" className="text-sm text-red-400 hover:underline">
            Forgot Password?
          </Link>
        </div> */}

        <button
          onClick={handleLogin}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          Log In
        </button>

        <p className="mt-4 text-sm text-center">
          Dont have an account?{" "}
          <Link to="/register" className="text-red-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
