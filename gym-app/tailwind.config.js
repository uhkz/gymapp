/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist Variable", "sans-serif"],
      },
      backgroundImage: {
        "gradient-black": "linear-gradient(135deg, #000000 0%, #5e5c5c 100%)",
      },
    },
  },
  plugins: [],
};
