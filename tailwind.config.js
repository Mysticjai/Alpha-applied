/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#004643',
          dark: '#003634',
          light: '#005a56',
        },
        'surface-warm': {
          DEFAULT: '#F0EDE5',
          light: '#F8F6F2',
          card: '#FAF9F6',
          sand: '#E6E1D5',
        },
        accent: {
          DEFAULT: '#C62835',
          hover: '#A81E29',
          light: '#E24B57',
        },
        'brand-taupe': {
          DEFAULT: '#A79277',
          light: '#C4B5A2',
          dark: '#857159',
        },
        'brand-dark': '#243432',
        'brand-slate': '#526174',
        'brand-border': '#E4E2DA',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      screens: {
        'xs': '480px',
        '2xl': '1536px',
        '3xl': '1680px',
      },
    },
  },
  plugins: [],
}
