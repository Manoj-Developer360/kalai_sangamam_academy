/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070504', // deepest page canvas
          900: '#100D0A',
          800: '#181410',
          700: '#2C2620',
        },
        brass: {
          400: '#E69A3F',
          500: '#C97B28', // primary accent — warm gold
          600: '#A76422',
        },
        maroon: {
          500: '#852B38', // secondary accent — rich temple red
          600: '#61202B',
        },
        parchment: {
          100: '#F7F0E8', // bright cream text on dark
          300: '#DCCFBC',
        },
        slate: {
          400: '#8D94A5',
          500: '#767A8D',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
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
