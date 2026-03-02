/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fbf8eb',
          100: '#f5eecb',
          200: '#ebdb99',
          300: '#e0c261',
          400: '#A6892C',
          500: '#c5a021',
          600: '#a37e1a',
          700: '#826018',
          800: '#6d4f1a',
          900: '#5e431a',
        },
      }
    },
  },
  plugins: [],
}