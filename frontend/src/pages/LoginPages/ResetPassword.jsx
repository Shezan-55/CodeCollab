import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_Backend_URL;

const ResetPassword = () => {

  const [password, setPassword] = useState("");
  const [input, setInput] = useState(false);
  const [subBtn, setSubBtn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const name = location.state?.name || "";

  const resetPassword= async()=>{
    setInput(true);
    setSubBtn(true);
    if(!password){
      toast.error("Please Enter the Password")
    }
    
    try{

      const response= await axios.post(`${API_URL}/api/user/reset-password`,{email, password})

      if (response.data.success) {
        toast.success(response.data.msg)
        navigate("/signin")
      }

      else {
        toast.error(response.data.msg);
      }
    }

    catch (error) {
          toast.error(error.response?.data?.msg || "An unexpected error occurred.");
    }
  }

  if(!location.state){
    return <Navigate to="/signin" replace />;
  }
  return (
    <div className="flex items-center justify-center h-screen bg-black text-white">
      <div className="text-center bg-formBg pt-6 pb-9 rounded-lg shadow-lg border border-gray-700 min-h-[280px] flex flex-col items-center justify-center w-[96vw] max-w-sm">
        <h2 className="text-2xl font-bold">Reset Your Password</h2>
        <p className="mt-5 mb-2  text-gray-300 font-semibold">
          Hi, {name}
        </p>
        <p className=" mb-2  text-gray-300">
          Enter your new password 
        </p>
        <input
          type="password"
          placeholder="Enter your new Password"
          className="w-full mb-3 mt-2 max-w-[320px] pt-3 pb-3 pl-3 bg-inputBg outline-none rounded-md border text-md border-gray-600 placeholder-stone-600"
          value={password}
          onChange={(e) => setPassword(e.target.value)}  // Fixed here
          disabled={input}
        />

        <button
          className={`mt-4 w-full max-w-[320px] py-2 rounded font-bold text-white outline-none 
                ${
                  subBtn
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
          onClick={resetPassword}
          disabled={subBtn}
        >
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
