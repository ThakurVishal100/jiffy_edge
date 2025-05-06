import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getDeviceId,
  getDeviceInfo,
  getPendingUser,
  removePendingUser,
} from "../utils/authUtils";
import { apiPost } from "../services/apiService";

const VerifyOtp = () => {
  const [countDown, setCountDown] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [otp, setOtp] = useState("");
  const [pendingUser, setPendingUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (countDown > 0) {
      const timer = setTimeout(() => setCountDown(countDown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setResendDisabled(false);
    }
  }, [countDown]);

  useEffect(() => {
    const stateData = location?.state;
    const localPendingUser = getPendingUser();
    sessionStorage.removeItem("otpSent");

    const sendOtp = async (email) => {
      try {
        await apiPost(`v1/auth/send-otp?email=${email}`, {});
        toast.success("OTP sent to your email");
        sessionStorage.setItem("otpSent", "true");
      } catch {
        toast.error("Failed to send OTP");
      }
    };

    if (stateData?.email) {
      const userObj = {
        email: stateData.email,
        userId: stateData?.userId,
        rememberMe: stateData?.rememberMe,
        flow: stateData?.flow,
      };
      localStorage.setItem("pendingUser", JSON.stringify(userObj));
      setPendingUser(userObj);

      setTimeout(() => {
        sendOtp(stateData.email);
      }, 100);

      // sendOtp(stateData.email);
    } else if (localPendingUser) {
      setPendingUser(localPendingUser);

      setTimeout(() => {
        sendOtp(localPendingUser.email);
      }, 100);

      // sendOtp(localPendingUser.email);
    } else {
      navigate("/login");
    }
  }, [navigate, location]);

  const handleOtpVerify = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const isLoginFlow = pendingUser?.flow === "login";
      const isForgotFlow = pendingUser?.flow === "forgot";

      if (isForgotFlow) {
        // Forgot Password Flow
        await apiPost("v1/auth/verify-otp", {
          email: pendingUser.email,
          otp,
        });
        toast.success("OTP verified. Redirecting to reset password...");
        removePendingUser();
        navigate("/reset-password", { state: { email: pendingUser.email } });
      } else if (isLoginFlow) {
        // Login Flow
        const payload = {
          userId: pendingUser.userId,
          email: pendingUser.email,
          otp,
          deviceId: getDeviceId(),
          deviceName: getDeviceInfo(),
          rememberMe: pendingUser.rememberMe,
        };

        const data = await apiPost("v1/auth/verify-otp", payload);

        toast.success("OTP verified!");

        localStorage.setItem("roleId", data.roleId);
        localStorage.setItem("userId", data.userId);

        if (pendingUser.rememberMe) {
          localStorage.setItem("token", data.token);
        } else {
          sessionStorage.setItem("token", data.token);
        }

        localStorage.setItem("user", JSON.stringify(data));
        removePendingUser();

        try {
          const sessionResponse = await apiPost(
            `session/start?userId=${data.userId}&token=${data.token}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${data.token}`,
                "Content-Type": "application/json",
              },
            }
          );

          if (sessionResponse?.sessionId) {
            localStorage.setItem("sessionId", sessionResponse.sessionId);
            console.log("Session started:", sessionResponse.sessionId);
          } else {
            console.warn("Session start failed or sessionId not returned.");
          }
        } catch (sessionErr) {
          console.error("Error starting session:", sessionErr);
        }

        //  extra functionality may be remove later
        const roleId = data.roleId;
        // console.log("Role ID:", roleId);
        
        if (roleId === 3) {
          navigate("/admin-dashboard", { state: { email: pendingUser.email } });
        } else if (roleId === 2) {
          navigate("/agent-dashboard", { state: { email: pendingUser.email } });
        } else {
          navigate("/supervisor-dashboard", {
            state: { email: pendingUser.email },
          });
        }
      } else {
        toast.error("Invalid verification flow.");
      }
    } catch (err) {
      toast.error(err.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendDisabled) return;
    const stored = getPendingUser();
    if (!stored) {
      toast.error("User info not found. Please login again.");
      return;
      a;
    }

    try {
      const response = await apiPost(
        `v1/auth/send-otp?email=${stored.email}`,
        {}
      );
      // toast.success("OTP resent successfully");
      if (response.status === 200) {
        toast.success("OTP resent successfully");
        setResendDisabled(true);
        setCountDown(30);
      }
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-4 bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          OTP Verification
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          OTP sent to{" "}
          <span className="font-medium text-gray-700">
            {pendingUser?.email}
          </span>
        </p>

        <form onSubmit={handleOtpVerify} className="space-y-5">
          <input
            type="text"
            maxLength="6"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center tracking-widest text-lg"
            placeholder="Enter OTP"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 text-center">
          Didn't receive the code?{" "}
          {countDown > 0 ? (
            <span className="text-blue-600">Resend in {countDown}s</span>
          ) : (
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={handleResendOtp}
            >
              Resend
            </span>
          )}
        </p>
      </div>
    </div>
  );
};

export default VerifyOtp;
