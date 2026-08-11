/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050609', // deepest page canvas
          900: '#0C0E18',
          800: '#141821',
          700: '#262B3A',
        },
        brass: {
          400: '#F7A15A',
          500: '#E08532', // primary accent — warm orange gold
          600: '#A75A27',
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
