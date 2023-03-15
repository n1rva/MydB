/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        motivaSansTest: ["Motiva Sans Test", "sans-serif"],
      },
      fontWeight: {
        bold: 700,
        semibold: 600,
        regular: 400,
        light: 300,
      },
      colors: {
        logoFirst: "#77a1d380",
        logoSec: "#79cbca80",
        logoLast: "#e684ae80",
        first: "#77a1d3",
        sec: "#79cbca",
        last: "#e684ae",
      },
    },
  },
  plugins: [],
};
