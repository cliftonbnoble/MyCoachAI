/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Add custom colors for your theme here if needed
        primary: '#FACC15', // Example yellow
        'dark-bg': '#1a202c',
        'dark-surface': '#2d3748',
        'dark-text': '#e2e8f0',
        'light-bg': '#f3f4f6',
        'light-surface': '#ffffff',
        'light-text': '#2d3748',
      }
    },
  },
  plugins: [],
} 