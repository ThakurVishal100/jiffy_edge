import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    mobile: "",
    address: "",
    company: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Signup successful!");
        navigate("/login");
      } else {
        setErrorMessage(data.message || "Signup failed.");
        toast.error(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setErrorMessage("Something went wrong.");
    }
  };

  const handleGoogleSignup = async (credentialResponse) => {
    try {
      const res = await fetch(
        "http://localhost:8080/api/v1/auth/google-signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: credentialResponse.credential }),
        }
      );

      const data = await res.json();
      if (res.ok) {
        toast.success("Google sign-up successful!");
        navigate("/dashboard"); // or login page
      } else {
        toast.error(data.message || "Google sign-up failed.");
      }
    } catch (error) {
      console.error("Google signup error", error);
      toast.error("Something went wrong with Google sign-up.");
    }
  };

  const handleFacebookSignup = () => {
    toast.info("Facebook signup is not integrated yet.");
  };

  return (
    <GoogleOAuthProvider clientId="718629409608-esd92b3isih1jmvet95pmlfjojqnv9qh.apps.googleusercontent.com">
      <div className="flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6 md:p-10">
          <h2 className="text-2xl font-medium mb-2">Sign Up</h2>
          <p className="mb-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>

          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{errorMessage}</p>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSignup}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email address"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* 👁 or 👁️‍🗨️ SVG */}
                {/* same as your current implementation */}
              </button>
            </div>

            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Mobile Number"
              pattern="^[6-9]\d{9}$"
              title="Enter valid Indian mobile number"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSignup}
                  onError={() => toast.error("Google Signup Failed")}
                />
              </div>
              <button
                type="button"
                onClick={handleFacebookSignup}
                className="flex justify-center items-center border border-gray-300 bg-white hover:bg-gray-50 py-2 px-4 rounded-md transition duration-300"
              >
                <svg
                  className="mr-2 text-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82V14.708h-3.437v-3.62h3.437V8.413c0-3.405 2.075-5.261 5.105-5.261 1.452 0 2.7.108 3.063.156v3.55l-2.104.001c-1.65 0-1.969.785-1.969 1.936v2.539h3.937l-.513 3.62h-3.424V24h6.715C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z" />
                </svg>
                Facebook
              </button>
            </div>

            <div className="flex items-center justify-center my-6">
              <div className="h-px bg-gray-300 w-full"></div>
            </div>

            <p className="text-xs text-gray-500 text-left">
              Protected by reCAPTCHA and subject to the Rhombus{" "}
              <Link to="/privacy" className="text-blue-500 hover:text-blue-600">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link to="/terms" className="text-blue-500 hover:text-blue-600">
                Terms of Service
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Signup;
