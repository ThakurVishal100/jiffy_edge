import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/auth/send-otp?email=${email}`, {
        method: "POST",
      });
  
      if (response.ok) {
        setMessage("OTP sent to your email!");
        navigate("/verify-otp", {
          state: {
            email: email,
            flow: "forgot", 
          },
        });
      } else {
        const data = await response.text(); 
        setMessage(data || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error sending OTP", error);
      setMessage("Failed to send OTP.");
    }
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
      <input
        type="email"
        placeholder="Enter your registered email"
        className="w-full p-2 border rounded mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        onClick={handleSendOtp}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer"
      >
        Send OTP
      </button>
      {message && <p className="mt-4 text-sm text-center text-gray-700">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
