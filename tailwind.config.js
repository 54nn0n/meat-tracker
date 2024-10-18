module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#000000',
          contrast: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#796E63',
        },
        background: {
          DEFAULT: '#F6F4EA',
        },
        status: {
          meatless: '#C6E6CF',
          meat: '#E6B7B7',
          fish: '#B7CFE6',
        },
      },
      borderRadius: {
        'full': '999px',
      },
    },
  },
  plugins: [],
};