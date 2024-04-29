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
      gray: colors.gray,
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
    fontFamily: {
      title: ['var(--font-urbanist)', 'system-ui']
    },
    extend: {
      backgroundImage: {
        'body-pattern': "url('/body-pattern.png')"
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-headings': theme('colors.blue.DEFAULT'),
            '--tw-prose-links': theme('colors.blue.DEFAULT'),
            '--tw-prose-bullets': theme('colors.blue.DEFAULT'),
            '--tw-prose-quote-borders': theme('colors.pink.DEFAULT'),
            '--tw-prose-pre-bg': theme('colors.pink.light')
          }
        }
      })
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
