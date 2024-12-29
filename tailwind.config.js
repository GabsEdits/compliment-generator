/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: { max: "800px" },
    },
    extend: {
      fontFamily: {
        sans: ["Geist Variable", "sans-serif"],
        mono: ["Geist Mono Variable", "monospace"],
      },
    },
  },
  plugins: [],
};
