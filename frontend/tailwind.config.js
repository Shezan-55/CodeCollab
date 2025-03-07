/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "formBg":"#1e1e1e",
        "submitBtn":"#8e05c2",
        "subHover":"#b700ff",
        "newAcc":"#b907ff",
        "inputBg":"#121212",
        "inputBr":"#333"
      },
      boxShadow: {
        custom: "0px 0px 7px #808080",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}