import React, { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, Navigate, useLocation } from "react-router-dom";
const API_URL = import.meta.env.VITE_Backend_URL;

const ResetOTP = () => {
  const [email, setEmail] = useState("");
  const [btn, setBtn] = useState(false);
  const [otpBtn, setOtpBtn] = useState(false);
  const [input, setInput] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();


  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    setOtpSent(true);
    setBtn(true);
    setInput(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/user/reset-email`,
        { email }
      );

      if (response.data.success) {
        toast.success(response.data.msg);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong!");
    }
  };

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    setOtpBtn(true);
    const enteredOtp = otp.join(""); // Ensure it's a string

    if (enteredOtp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/user/verify-otp`,
        {
          email,
          otp: enteredOtp,
        }
      );

      if (response.data.success) {
        navigate("/reset-password", {
          state: {
            email: response.data.email,
            name: response.data.name,
          },
        });
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error("Error in OTP verification:", error);
      toast.error(error.response?.data?.msg || "An unexpected error occurred.");
    }
  };

  if(!location.state){
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center bg-formBg pt-6 pb-9 rounded-lg shadow-lg border border-gray-700 min-h-[280px] flex flex-col items-center justify-center w-[96vw] max-w-sm">
        <h2 className="text-2xl font-bold">Reset Your Password</h2>
        <p className="mt-5 mb-4 text-gray-300">
          Enter your email to receive an OTP.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full mb-3 mt-2 max-w-[320px] pt-3 pb-3 pl-4 bg-inputBg outline-none rounded-md border text-sm border-gray-600 placeholder-stone-600 "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={input}
        />

        {/* Send OTP Button */}
        <button
          className={`mt-4 w-full max-w-[320px] py-2 rounded font-bold text-white outline-none 
                ${
                  btn
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
          onClick={handleSendOtp}
          disabled={btn}
        >
          Send OTP
        </button>

        {/* OTP Input Section */}
        {otpSent && (
          <div className="mt-4 w-full flex flex-col items-center">
            <p className="text-gray-300 mb-4">
              Enter the 6-digit OTP sent to your email.
            </p>
            <div className="flex justify-center gap-2 mt-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="w-10 h-10 text-center text-lg border border-gray-600 rounded bg-inputBg text-white outline-none"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  ref={(el) => (inputRefs.current[index] = el)}
                />
              ))}
            </div>

            {/* Verify OTP Button */}
            <button
              className={`mt-5 w-full max-w-[320px] py-2 rounded font-bold text-white outline-none 
                        ${
                          otpBtn
                            ? "bg-gray-600 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
              onClick={handleVerifyOtp}
              disabled={otpBtn}
            >
              Verify OTP
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetOTP;
