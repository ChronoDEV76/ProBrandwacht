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
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(16px) scale(0.98)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 600ms ease-out forwards',
        ticker: 'ticker 30s linear infinite',
      },
    },
  },
  plugins: [typography],
}
