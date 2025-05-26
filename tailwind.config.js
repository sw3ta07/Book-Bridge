/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f7f2f7',
          100: '#ede5ef',
          200: '#ddcce2',
          300: '#c9acd0',
          400: '#b68dbe',
          500: '#9c6ca5',
          600: '#835689',
          700: '#6a446e',
          800: '#523553',
          900: '#3d2840',
        },
        secondary: {
          50: '#f2f7f5',
          100: '#e3efe9',
          200: '#c7e1d5',
          300: '#a3cebb',
          400: '#7fb8a0',
          500: '#589c80',
          600: '#457d66',
          700: '#376352',
          800: '#2c4d41',
          900: '#233b32',
        },
        accent: {
          50: '#fdf3f3',
          100: '#fbe7e7',
          200: '#f8d0d0',
          300: '#f2acac',
          400: '#e88080',
          500: '#db5757',
          600: '#c93d3d',
          700: '#a82f2f',
          800: '#8b2929',
          900: '#732626',
        },
        cream: {
          50: '#fefdfb',
          100: '#fdf7ed',
          200: '#fbefd8',
          300: '#f7e2bc',
          400: '#f2d199',
          500: '#edc07a',
          600: '#dba55e',
          700: '#b7844c',
          800: '#926840',
          900: '#775536',
        },
      },
      fontFamily: {
        serif: ['Libre Baskerville', 'serif'],
        sans: ['Source Sans 3', 'sans-serif'],
      },
      backgroundImage: {
        'paper-texture': "url('https://images.pexels.com/photos/7130555/pexels-photo-7130555.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        'wood-texture': "url('https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg?auto=compress&cs=tinysrgb&w=1600')",
      },
      animation: {
        'page-turn': 'page-turn 0.5s ease-in-out forwards',
        'fade-in': 'fade-in 0.5s ease-in-out forwards',
      },
      keyframes: {
        'page-turn': {
          '0%': { transform: 'rotateY(0deg)', opacity: 1 },
          '100%': { transform: 'rotateY(-180deg)', opacity: 0 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};