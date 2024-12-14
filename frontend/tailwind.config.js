/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        greyText: '#647995',
        icon: '#667185',
         blueText: '#0D6EFD',
      },
    },
  },
  plugins: [],
}

