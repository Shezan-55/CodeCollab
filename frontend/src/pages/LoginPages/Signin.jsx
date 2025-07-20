import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const API_URL = import.meta.env.VITE_Backend_URL;
const Guest_Email = import.meta.env.VITE_Guest_Email;
const Guest_Password = import.meta.env.VITE_Guest_Password;

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateSignup = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error(
        !email && !password
          ? "Please fill in all fields."
          : !email
          ? "Please fill in the email."
          : "Please fill in the password."
      );

      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/user/signin`, {
        email,
        password,
      });
      if (response.data.success) {
        navigate("/welcome", {
          state: {
            email: response.data.email,
            name: response.data.name,
            token: response.data.token,
          },
        });
      } else {
        if (!response.data.active) {
          navigate("/email-verify", {
            state: {
              email: response.data.email,
              name: response.data.name,
            },
          });
        } else {
          toast.error(response.data.msg);
        }
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.msg || "Something went wrong!");
    }
  };

  const handleGuestSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(API_URL);
      const response = await axios.post(`${API_URL}/api/user/signin`, {
        email: Guest_Email,
        password: Guest_Password,
      });
      console.log(response.data);
      if (response.data.success) {
        navigate("/welcome", {
          state: {
            email: response.data.email,
            name: response.data.name,
            token: response.data.token,
          },
        });
      } else {
        if (!response.data.active) {
          navigate("/email-verify", {
            state: {
              email: response.data.email,
              name: response.data.name,
            },
          });
        } else {
          toast.error(response.data.msg);
        }
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.msg || "Something went wrong!");
    }
  };

  const navForgotPass = () => {
    navigate("/reset-verify", {
      state: {
        isReset: true,
      },
    });
  };

  return (
    <div className="flex justify-center items-center w-screen h-screen bg-black">
      <form
        onSubmit={handleSubmit}
        className="bg-formBg shadow-custom lg:pr-6 lg:pl-6 lg:pt-6 lg:pb-8 rounded-md lg:w-96 lg:h-97 text-white  w-[21.8rem] pl-4 pr-4 pt-5 pb-6"
      >
        <h1 className="text-center text-3xl  font-medium">Sign In</h1>

        <div className="flex flex-col mt-3 mb-7">
          <label htmlFor="email" className="mb-2 text-md">
            Email
          </label>
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
        <div className="flex flex-col mb-8">
          <label htmlFor="password" className="mb-2 text-md">
            Password
          </label>
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
          className="w-full  mt-0 mb-4 lg:mb-2 lg:p-3 pt-3 pb-2 bg-submitBtn hover:bg-subHover text-white font-bold rounded-md transition"
        >
          Sign In
        </button>

        <h2 className=" font-bold text-center text-md mb-3">OR</h2>

        <button
          onClick={handleGuestSubmit}
          className="w-full  mt-0 mb-4 lg:mb-2 lg:p-3 pt-3 pb-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-md transition"
        >
          Guest Sign In
        </button>

        <p className="mt-0 text-center text-gray-300">
          Dont have an account?{" "}
          <span
            className="text-newAcc hover:text-submitBtn underline cursor-pointer"
            onClick={navigateSignup}
          >
            Sign Up
          </span>
        </p>
        <p
          className="mt-2 text-center text-gray-300 underline cursor-pointer"
          onClick={navForgotPass}
        >
          Forgot Password?
        </p>
      </form>
    </div>
  );
};

export default Signin;
