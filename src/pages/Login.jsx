import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { toast } from "react-toastify";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/protectedroute/authSlice.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const loginInProgress = useRef(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginInProgress.current) return;
    loginInProgress.current = true;

    const deviceId = navigator.userAgent;
    const deviceName = navigator.userAgent;

    localStorage.setItem(
      "loginPayload",
      JSON.stringify({
        email,
        password,
        rememberMe,
        deviceId,
        deviceName,
      })
    );

    try {
      const response = await fetch("http://localhost:8080/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          rememberMe,
          deviceId,
          deviceName,
        }),
      });

      const data = await response.json();
      // console.log("Login Response", data);

      localStorage.setItem("token", data.token);

      if (response.ok) {
        // console.log(data.requireOtp);

        // 👉 If OTP required, go to OTP verification
        if (data.requireOtp) {
          localStorage.setItem(
            "pendingUser",
            JSON.stringify({
              userId: data.userId,
              email: data.email,
              role: data.role,
              roleId: data.roleId,
              rememberMe,
              deviceId,
              deviceName,
            })
          );

          // navigate("/verify-otp");
          navigate("/verify-otp", {
            state: {
              email: data.email,
              userId: data.userId,
              rememberMe: true,
              flow: "login",
            },
          });
        } else {
          // 👉 Device is trusted: directly login the user
          localStorage.setItem("token", data.token);
          localStorage.setItem(
            "user",
            JSON.stringify({
              userId: data.userId,
              email: data.email,
              role: data.role,
              roleId: data.roleId,
            })
          );

          navigate("/desktop");
        }
      } else {
        setErrorMessage(data.message || "Login failed!");
      }
    } catch (err) {
      setErrorMessage("Something went wrong!");
      console.error(err);
    } finally {
      loginInProgress.current = false;
    }
  };

  const handleGoogleLogin = async (response) => {
    if (loginInProgress.current) return;
    loginInProgress.current = true;

    try {
      // console.log("Google Login Triggered");

      const result = await axios.post(
        "http://localhost:8080/api/v1/auth/google-login",
        {
          credential: response.credential,
        }
      );

      // console.log("Google Login Response:", result.data);

      if (result.status === 200) {
        const token = result.data.token;
        localStorage.setItem("token", token);

        const decodedToken = jwtDecode(token);
        dispatch(
          loginSuccess({
            email: decodedToken.email,
            role: decodedToken.role,
            userId: decodedToken.userId,
            roleId: decodedToken.roleId,
          })
        );
        const roleId = decodedToken.roleId;
        const userId = decodedToken.userId;

        if (!roleId || !userId)
          throw new Error("Role or userId missing in token.");

        localStorage.removeItem("sessionId");
        localStorage.setItem("userId", userId);
        localStorage.setItem("roleId", roleId);
        toast.success(`Successfully logged in as ${roleId} (Google)`);

        //  Start session
        try {
          console.log(" Starting session...");
          const sessionResponse = await axios.post(
            `http://localhost:8080/api/session/start?userId=${userId}&token=${token}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (
            sessionResponse.status === 200 &&
            sessionResponse.data.sessionId
          ) {
            const sessionId = sessionResponse.data.sessionId;
            localStorage.setItem("sessionId", sessionId);
            console.log("New session started with ID:", sessionId);
          } else {
            console.warn("No active session found.");
          }
        } catch (sessionError) {
          console.warn(
            "Session creation failed:",
            sessionError.response?.data || sessionError.message
          );
        }

        //  extra functionality may be remove later

        if (roleId === 3) {
          navigate("/admin-dashboard");
        } else if (roleId === 2) {
          navigate("/agent-dashboard");
        } else {
          navigate("/supervisor-dashboard");
        }
      }
      
    } catch (error) {
      let errorMsg = "An error occurred during Google login.";
      if (error.response?.data?.message) errorMsg = error.response.data.message;
      else if (error.request)
        errorMsg = "No response from server. Please check your connection.";
      else errorMsg = error.message;

      console.error("Google Login Error:", errorMsg);
      toast.error(errorMsg);
    } finally {
      loginInProgress.current = false;
    }
  };

  // const handleGoogleLogin = async (credentialResponse) => {
  //   const { credential } = credentialResponse;

  //   try {
  //     const response = await fetch("http://localhost:8080/api/v1/auth/google-login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ credential }),
  //     });

  //     const data = await response.json();
  //     console.log("Google Login Response", data);

  //     if (response.ok) {
  //       localStorage.setItem("token", data.token);
  //       localStorage.setItem(
  //         "user",
  //         JSON.stringify({
  //           userId: data.userId,
  //           email: data.email,
  //           role: data.role,
  //           roleId: data.roleId,
  //         })
  //       );
  //       toast.success("Logged in successfully with Google!");
  //       navigate("/user-management");
  //     } else {
  //       toast.error(data.message || "Google login failed!");
  //     }
  //   } catch (err) {
  //     console.error("Google login error:", err);
  //     toast.error("Something went wrong during Google login!");
  //   }
  // };

  return (
    <GoogleOAuthProvider clientId="718629409608-esd92b3isih1jmvet95pmlfjojqnv9qh.apps.googleusercontent.com">
      <div className="flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-md w-full max-w-md p-6 md:p-10">
          <div className="w-full">
            <h2 className="text-2xl font-medium mb-2">Login</h2>
            <p className="mb-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>

            {errorMessage && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p>{errorMessage}</p>
              </div>
            )}

            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="text-sm text-blue-500 hover:text-blue-700 focus:outline-none cursor-pointer"
                  onClick={() => navigate("/forgot-password")}
                >
                  Forgot password?
                </button>
              </div>

              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2"
                />
                <label htmlFor="remember" className="text-sm text-gray-700">
                  Remember Me
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition duration-300 cursor-pointer"
              >
                Sign In
              </button>

              <div className="flex items-center justify-center my-6">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => toast.error("Google Login Failed")}
                  />
                </div>
                <button
                  type="button"
                  className="flex justify-center items-center border border-gray-300 bg-white hover:bg-gray-50 py-2 px-4 rounded-md transition duration-300"
                >
                  <FaFacebook className="mr-2 text-blue-600" size={18} />{" "}
                  Facebook
                </button>
              </div>

              <div className="flex items-center justify-center width-full my-6">
                <div className="h-px bg-gray-300 w-full"></div>
              </div>

              <p className="text-xs text-gray-500 text-left mt-6">
                Protected by reCAPTCHA and subject to the Rhombus{" "}
                <Link
                  to="/privacy"
                  className="text-blue-500 hover:text-blue-600"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link to="/terms" className="text-blue-500 hover:text-blue-600">
                  Terms of Service
                </Link>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
