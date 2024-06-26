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
          Almendra: ['Almendra', 'serif'],
          Roboto: ['Roboto', 'sans-serif'],
          Inter: ["Inter", 'sans-serif']
        },
      },
    },
    plugins: [],
  }
  