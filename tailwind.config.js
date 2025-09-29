/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite/**/*.js"
  ],
  
  theme: {
    extend: {
      colors: {
        maincolor : `#ea963e`,
        secondMainColor : `#3D2003`,
        thirdMainColor : `#0000001A`,
      },
    },
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
