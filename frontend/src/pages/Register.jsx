import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading,setLoading]= useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }
    try {
      setLoading(true);
      const res = await api.post("/api/auth/register", form);
      // login({
      //   id: res.data.user.id,
      //   name: res.data.user.name,
      //   email: res.data.user.email,
      //   token: res.data.token,
      // });
      // login(res.data);
      // navigate("/");
      navigate(`/verify-otp?email=${form.email}`);
      alert("Registered successfully");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Registration failed");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

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

        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        <label className="flex items-center mb-4">
          <input type="checkbox" className="mr-2" /> I agree to the privacy
          policy
        </label>

        <button
          disabled={loading}
          onClick={handleRegister}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-red-400 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
