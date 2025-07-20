import React from "react";
import { useNavigate } from "react-router-dom";



const FrontPage = () => (
  <svg
    className="w-5 h-5 inline-block mr-2"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.603-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.34-2.22-.253-4.555-1.11-4.555-4.942 0-1.09.39-1.98 1.029-2.677-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.56 9.56 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.697 1.028 1.587 1.028 2.677 0 3.842-2.337 4.686-4.566 4.933.36.31.682.923.682 1.862 0 1.345-.013 2.43-.013 2.76 0 .268.18.58.688.48A10.012 10.012 0 0022 12c0-5.523-4.477-10-10-10z"
      clipRule="evenodd"
    />
  </svg>
);

const LinkedInIcon = () => (
  <svg
    className="w-5 h-5 inline-block mr-2"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 0h-14a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5v-14a5 5 0 00-5-5zm-11.8 20h-3v-10h3v10zm-1.5-11.3c-1 0-1.8-.83-1.8-1.8a1.8 1.8 0 013.6 0c0 .97-.8 1.8-1.8 1.8zm13.3 11.3h-3v-5.6c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.93v5.7h-3v-10h2.88v1.36h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.61 2 3.61 4.58v5.62z" />
  </svg>
);



export default function WelcomePage() {

  const navigate = useNavigate();

 const navigateSignup= ()=>{
    navigate("/signin")
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center text-white overflow-hidden ">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        preload="auto"
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src="/background.mp4"
      />

      {/* Top Right Buttons */}
      <div className="absolute top-6 right-6 flex items-center space-x-6 z-20">
        <a
          href="https://www.linkedin.com/in/ayushdahiwale"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center border-2 border-white hover:bg-white hover:text-black px-4 py-2 rounded-full text-white text-sm font-semibold shadow-md transition"
          aria-label="LinkedIn"
        >
          <LinkedInIcon /> LinkedIn
        </a>
<a
  href="https://github.com/AyushD95"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center border-2 border-white hover:bg-white hover:text-black px-4 py-2 rounded-full text-white text-sm font-semibold shadow-md transition"
  aria-label="GitHub"
>
  <svg
    className="w-5 h-5 inline-block mr-2"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 0C5.37 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.26.82-.577
      0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.385-1.333-1.753-1.333-1.753-1.09-.745.083-.729.083-.729
      1.205.084 1.84 1.237 1.84 1.237 1.07 1.834 2.809 1.304 3.495.996.108-.775.42-1.305.763-1.604-2.665-.305-5.466-1.335-5.466-5.933
      0-1.31.468-2.38 1.236-3.22-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.52 11.52 0 013.003-.404
      11.5 11.5 0 013.003.404c2.29-1.552 3.296-1.23 3.296-1.23.653 1.653.241 2.874.119 3.176.77.84
      1.234 1.91 1.234 3.22 0 4.61-2.804 5.625-5.475 5.922.43.372.823 1.104.823 2.224
      0 1.606-.015 2.898-.015 3.292 0 .319.216.694.825.576C20.565 21.796 24 17.298 24 12
      24 5.373 18.627 0 12 0z"
      clipRule="evenodd"
    />
  </svg>
  GitHub
</a>

  
      </div>

      {/* Main Content */}
      <div className="max-w-xl animate-fadeIn space-y-6 relative z-10 mt-20 sm:mt-32">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-red-500">
          Welcome to <span className="text-white">Code Collab</span>
        </h1>
        <p className="text-white text-lg sm:text-xl leading-relaxed">
          Collaborate on code in real-time with your team. Simplify workflows,
          boost creativity, and build better together.
        </p>

<div className="flex justify-center gap-6">
  <button
    onClick={navigateSignup}
    className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-3xl px-8 sm:px-12 py-3.5 sm:py-4 text-base sm:text-xl shadow-lg transform hover:scale-105 active:scale-95 transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/50"
    aria-label="Get Started"
  >
    Get Started
  </button>

  <a
    href="https://github.com/AyushD95/CodeCollab"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-red-600 hover:bg-red-700 text-white font-semibold rounded-3xl px-7 sm:px-9 py-3.5 sm:py-4 text-base sm:text-xl shadow-lg inline-flex items-center transform hover:scale-105 active:scale-95 transition duration-300 focus:outline-none focus:ring-4 focus:ring-red-500/50"
    aria-label="View Source Code"
  >
    Source Code
  </a>
</div>


        {/* Your Name */}
        <p className="mt-12 text-gray-400 text-md italic">
          Created by <span className="text-white font-semibold">Ayush D</span>
        </p>
      </div>

      {/* Animate fade-in keyframes */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fadeIn {
          animation: fadeIn 0.7s ease forwards;
        }
      `}</style>
    </div>
  );
}
