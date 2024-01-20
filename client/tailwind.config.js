/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        form: `linear-gradient(to bottom, rgba(0, 0, 10, 0.5),rgba(0, 0, 30, 0.7)), url('./images/Pixel-background.png');`
      }
    },
  },
  plugins: [],
}
