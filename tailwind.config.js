/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        card: "#fafafa",
        "dark-gray-card": "#4a4a4a",
      },
      fontFamily: {
        "space-mono": ["Space Mono", "monospace"],
      },
    },
  },
  plugins: [],
}

