const typography = require('@tailwindcss/typography')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          500: '#0a63ff',
          700: '#003cc2',
        },
      },
    },
  },
  plugins: [typography],
}
