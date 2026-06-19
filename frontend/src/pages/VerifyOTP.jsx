import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import api from "../services/api";

export default function VerifyOTP() {
  const [otp, setOtp] = useState("");

  const [params] = useSearchParams();

  const navigate = useNavigate();

  const email = params.get("email");

  const handleVerify = async () => {
    try {
      await api.post("/api/auth/verify-otp", {
        email,
        otp,
      });

      alert("Verified Successfully");

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (

    <div className="flex flex-col items-center justify-center min-h-screen  ">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Verify OTP</h2>

        <input
          value={otp}
          placeholder="Enter OTP"
          className="w-full p-2 mb-4 border rounded bg-gray-700 text-white"
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={handleVerify}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          Verify
        </button>
      </div>
    </div>
  );
}
