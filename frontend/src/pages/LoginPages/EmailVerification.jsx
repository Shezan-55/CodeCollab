import React, { useState, useEffect } from "react";
import {useNavigate, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
const API_URL = import.meta.env.VITE_Backend_URL;


const EmailVerification = () => {
    const [message, setMessage] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true); // Initially disabled
    const [counter, setCounter] = useState(30); // 30 seconds countdown
  const navigate = useNavigate(); 
    const location = useLocation();
    const name = location.state?.name; 
    const email = location.state?.email; 


    useEffect(() => {
        if (counter > 0) {
            const timer = setTimeout(() => setCounter((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setIsButtonDisabled(false);
        }
    }, [counter]);



    const resendVerification = async() => {
        setMessage("Verification link has been resent. Please check your inbox.");
        setIsButtonDisabled(true);
        setCounter(30);



        try {
            const response = await axios.post(`${API_URL}/api/user/email-verify`, { email,name});

      
            if (response.data.success) {
                toast.success(response.data.msg);
                navigate("/email-verify", {
                    state: {
                      email: response.data.email,
                      name: response.data.name,
                    }
                  });
            } 
            
            else {
              toast.error(response.data.msg);
            }
          } 
          
          catch (error) {
            toast.error(error.response?.data?.msg || "Something went wrong!");    
          }
    };



    if (!name || !email) {
        return <Navigate to="/" />;
    }

    return (
        <div className="flex items-center justify-center h-screen bg-black text-white">
            <div className="text-center bg-formBg lg:pl-8 lg:pr-8 pr-2 pl-2 pt-8 pb-5 rounded-lg shadow-lg lg:w-96 w-[90vw] border border-gray-700 min-h-[250px] flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Hi {name},</h2>
                    <h2 className="text-2xl font-bold">Verify Your Email</h2>
                    <p className="mt-5 text-gray-300">Please check your inbox for a verification email.</p>
                    <p className="mt-3 text-gray-300">Click the link in the email to verify your account.</p>
                </div>
                <div>
                    <button
                        className={`mt-5 text-white font-bold py-2 px-4 rounded transition ${isButtonDisabled ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                        onClick={resendVerification}
                        disabled={isButtonDisabled}
                    >
                        Resend Verification Link
                    </button>
                    {isButtonDisabled && <p className="mt-2 text-red-400">You can resend in {counter}s</p>}
                    <p className="mt-2 text-green-400 min-h-[24px]">{message}</p>
                </div>
            </div>
        </div>
    );
};

export default EmailVerification;
