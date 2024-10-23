/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Blue
        secondary: '#4B5563', // Gray
        accent: '#FBBF24', // Yellow
        background: '#F9FAFB', // Light background
        text: '#111827', // Dark text
      },
    },
  },
  plugins: [],
};
