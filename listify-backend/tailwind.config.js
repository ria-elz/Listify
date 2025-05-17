/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",        // all React components
    "./public/index.html",               // HTML file (just in case)
    "./src/components/**/*.{js,jsx}",    // any reusable components
    "./src/pages/**/*.{js,jsx}",         // pages like Login, Dashboard, etc.
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          100: '#dbeafe',
          600: '#2563eb',
          700: '#1d4ed8'
          // Add other shades if needed
        },
      },
      spacing: {
        9: '2.25rem',
        18: '4.5rem',
      }
    }
  }
}