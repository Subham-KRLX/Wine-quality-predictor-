/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wine: {
          50: '#fdf4f5',
          100: '#fbe8eb',
          200: '#f7d1d7',
          300: '#f0aab7',
          400: '#e67a91',
          500: '#d64d6e',
          600: '#c13052',
          700: '#a32244',
          800: '#881e3d',
          900: '#722F37',
          950: '#450f1a',
        },
        amber: {
          50: '#fefbf3',
          100: '#fef5e3',
          200: '#fde9c6',
          300: '#fbd89d',
          400: '#f9c270',
          500: '#f1a64b',
          600: '#e28a2f',
          700: '#bd6f25',
          800: '#975823',
          900: '#7a4920',
          950: '#42240f',
        },
        cream: {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
