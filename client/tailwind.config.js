/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)",
        ],
      },
      Keyframes: {
        unfold: {
          "0%": { transform: "scaleY(.005);", transform: "scaleX(0)" },
          "50%": {
            transform: "scaleY(.005);",
            transform: "scaleX(1);",
          },
          " 100%": {
            transform: "scaleY(1);",
            transform: "scaleX(1);",
          },
        },
      },
      animation: {
        unfold: "unfold 1s linear 1",
        fold: "fold 1s linear 1",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        black: colors.black,
        white: colors.white,
        gray: colors.gray,
        emerald: colors.emerald,
        indigo: colors.indigo,
        yellow: colors.yellow,
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
