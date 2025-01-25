/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '378px',
      'md': '710px',
      'lg': '990px',
      'xl': '1364px',
      '2xl': '1570px' 
    },
    extend: {

    },
  },
  plugins: [],
}

