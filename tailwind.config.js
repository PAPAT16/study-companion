/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'dark-900': '#000000',
        'dark-800': '#111111',
        'dark-700': '#222222',
        'accent-primary': '#4F46E5',
        'accent-secondary': '#7C3AED'
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}
