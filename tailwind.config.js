/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        fadeOut: "fadeOut 3s ease-out forwards",
      },
      keyframes: {
        fadeOut: {
          "0%": { opacity: "1", transform: "scale(1.5)" },
          "100%": { opacity: "0", transform: "scale(0)" },
        },
      },
    },
  },
  plugins: [],
};
