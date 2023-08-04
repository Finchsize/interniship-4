/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        "2.5xl": "1.25rem",
        "4xl": "2rem",
      },
      fontFamily: {
        icons: ["Material Symbols", "sans-serif"],
      },
    },
  },
  plugins: [],
};
