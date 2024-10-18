module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primitives
        black: '#000000',
        white: '#FFFFFF',
        gray: {
          100: '#F6F4EA',
          200: '#AEA499',
          300: '#796E63',
        },
        green: {
          100: '#C6E6CF',
        },
        red: {
          100: '#E6B7B7',
        },
        blue: {
          100: '#B7CFE6',
        },

        // Semantics
        primary: {
          DEFAULT: 'var(--color-black)',
          contrast: 'var(--color-white)',
        },
        secondary: 'var(--color-gray-300)',
        background: 'var(--color-gray-100)',
        future: 'var(--color-gray-200)',
        status: {
          meatless: 'var(--color-green-100)',
          meat: 'var(--color-red-100)',
          fish: 'var(--color-blue-100)',
        },
      },
      borderRadius: {
        'full': '999px',
      },
      fontFamily: {
        'jost': ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
};