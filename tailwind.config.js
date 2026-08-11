/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0D0F17', // primary background — deep indigo-black
          900: '#12151F',
          800: '#1B1F2C',
          700: '#262B3B',
        },
        brass: {
          400: '#DDB65E',
          500: '#C89B3C', // primary accent — brass ring on a silambam stick
          600: '#A67D28',
        },
        maroon: {
          500: '#7A2331', // secondary accent — temple vermillion
          600: '#5E1A25',
        },
        parchment: {
          100: '#F3EFE7', // primary text on dark
          300: '#D8D2C4',
        },
        slate: {
          400: '#9296A6',
          500: '#7A7E8E',
        },
      },
      fontFamily: {
        display: ['"Oswald"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'stick-sweep': 'linear-gradient(105deg, transparent 48%, #C89B3C 48.5%, #C89B3C 50%, transparent 50.5%)',
      },
    },
  },
  plugins: [],
};
