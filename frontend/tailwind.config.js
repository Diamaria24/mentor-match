/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        secondary: "#EC4899",
        accent: "#06B6D4",
        dark: "#0F172A",
        soft: "#1E293B",
        light: "#F8FAFC",
      },
    },
  },
  plugins: [],
};
