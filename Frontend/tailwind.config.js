/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "farm-green": "#4ade80",
        "farm-dark-green": "#16a34a",
        "farm-brown": "#a16207",
        "farm-light-brown": "#fef3c7",
      },
    },
  },
  plugins: [],
};
