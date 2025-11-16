const typography = require('@tailwindcss/typography')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#dce9ff',
          200: '#bbd3ff',
          300: '#95bbff',
          400: '#659dff',
          500: '#0a63ff',
          600: '#084fd4',
          700: '#003cc2',
          800: '#002b92',
          900: '#001d63',
          950: '#001041',
        },
      },
    },
  },
  plugins: [typography],
}
