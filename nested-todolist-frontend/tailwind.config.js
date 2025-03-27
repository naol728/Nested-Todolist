/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#F3F4F6", // Light gray
          foreground: "#111827", // Dark gray (text)
          primary: "#2563EB", // Blue
          secondary: "#E5E7EB", // Soft gray
          accent: "#6366F1", // Indigo
          border: "#D1D5DB", // Light border
          card: "#FFFFFF", // White card background
          danger: "#DC2626", // Red
        },
        dark: {
          background: "#111827", // Dark gray background
          foreground: "#F9FAFB", // Light gray (text)
          primary: "#3B82F6", // Blue
          secondary: "#1F2937", // Deep gray
          accent: "#818CF8", // Indigo
          border: "#374151", // Dark border
          card: "#1E293B", // Dark card background
          danger: "#EF4444", // Red
        },
      },
    },
  },
  plugins: [],
};
