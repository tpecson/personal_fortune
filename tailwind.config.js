/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        halloween: {
          background: '#1a1625', // Deep purple-black
          card: '#2d2438',      // Lighter purple-black
          accent: '#ff6b1a',    // Pumpkin orange
          secondary: '#8b44ef', // Mystical purple
          text: {
            primary: '#ffffff',  // White
            secondary: '#b8b8b8' // Light gray
          },
          border: '#3d3450'     // Purple border
        }
      }
    },
  },
  plugins: [],
};