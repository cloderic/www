const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      black: colors.black,
      white: colors.white,
      slate: colors.slate,
      blue: {
        dark: '#010332',
        DEFAULT: '#020873',
        light: '#0E1373',
        lighter: '#55468C'
      },
      pink: {
        DEFAULT: '#BFA7F2',
        light: '#C7B3F2',
        lighter: '#D3C4F2'
      }
    },
    extend: {
      backgroundImage: {
        'body-pattern': "url('/body-pattern.png')"
      }
    }
  },
  plugins: []
};
