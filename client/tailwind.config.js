/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    screens: {
      tablet: { max: "1200px" },
      phone: { max: "750px" },
    },
    colors: {
      backgroundLight: "#FFFCF9",
      highLight: "#06D6A0",
      textLight: "#1D201F",
      secondary: "#cbf3f0",
    },
    extend: {},
  },
  plugins: [],
};
