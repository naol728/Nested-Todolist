/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: {
          background: "#f8f9fa", // Light mode background
          foreground: "#212529", // Dark text on light mode
          primary: "#007bff", // Main button color
          secondary: "#6c757d", // Secondary button color
          card: "#ffffff", // Card background
          border: "#dee2e6", // Border color
        },
        dark: {
          background: "#121212", // Dark mode background
          foreground: "#f8f9fa", // Light text on dark mode
          primary: "#1e90ff", // Main button color (softer blue in dark mode)
          secondary: "#495057", // Secondary button color (grayish)
          card: "#1c1c1e", // Card background in dark mode
          border: "#343a40", // Border color in dark mode
        },
        danger: "#dc3545", // Delete button color (Red)
        success: "#28a745", // Success button color (Green)
        warning: "#ffc107", // Warning messages (Yellow)
      },
    },
  },
  plugins: [],
};
