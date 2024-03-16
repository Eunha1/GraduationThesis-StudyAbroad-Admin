/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        fontFamily : {
          Fredericka: ['Fredericka the Great','serif'],
          GreatVibes: ['Great Vibes', 'cursive'],
          Almendra: ['Almendra', 'serif']
  
        },
      },
    },
    plugins: [],
  }
  