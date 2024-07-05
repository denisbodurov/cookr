/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#root',
  theme: {
    colors: {
      'backgroundLight': '#FFFCF9',
      'highLight': '#06D6A0',
      'textLight': '#1D201F',
      'secondary': '#cbf3f0'
    },
    extend: {},
  },
  plugins: [],
}
