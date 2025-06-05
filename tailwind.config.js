/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./**/*.html",    // All HTML files in any subdirectory
    "./js/**/*.js",   // All JS files in js directory and subdirectories
    "./src/**/*.css"  // All CSS files in src directory and subdirectories
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        secondary: '#f0f4f8'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}