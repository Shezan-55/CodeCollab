import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const API_URL = import.meta.env.VITE_Backend_URL;


const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigateSignin= ()=>{
    navigate("/")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();



    try {
      const response = await axios.post(`${API_URL}/api/user/signup`, { email, password, name});

      if (response.data.success) {
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

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-formBg shadow-custom lg:pr-6 lg:pl-6 lg:pt-3 lg:pb-5 rounded-md lg:w-96 lg:h-auto text-white  w-[21.8rem] pl-4 pr-4 pt-5 pb-6"
      >
        <h1 className="text-center text-3xl  font-medium">Sign Up</h1>

        <div className="flex flex-col mb-5 mt-5">
          <label htmlFor="name" className="mb-2 text-md">Name</label>
          <input
            className="p-[9px] pt-3 pb-3 bg-inputBg outline-none rounded-md text-sm border border-inputBr placeholder-stone-600"
            type="text"
            placeholder="Enter your name"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col mb-5">
          <label htmlFor="email" className="mb-2 text-md">Email</label>
          <input
            className="p-[9px] pt-3 pb-3 bg-inputBg outline-none rounded-md border text-sm border-inputBr placeholder-stone-600"
            type="email"
            placeholder="Enter your email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col mb-5">
          <label htmlFor="password" className="mb-2 text-md">Password</label>
          <input
            className="p-[9px] bg-inputBg outline-none rounded-md border border-inputBr placeholder-stone-600"
            type="password"
            placeholder="Enter your password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full  mt-2 mb-2 lg:mt-3  lg:m-0 lg:p-3 pt-3 pb-2 bg-submitBtn hover:bg-subHover text-white font-bold rounded-md transition"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-gray-300">
          Already have an account?{" "}
          <span className="text-newAcc hover:text-submitBtn underline cursor-pointer" onClick={navigateSignin}>Sign in</span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
