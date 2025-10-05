/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Ensure this is included
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Ensure this is included
    './content/**/*.{md,mdx}', // Ensure this is included
    './src/**/*.{js,ts,jsx,tsx,mdx}', // Ensure this is included
  ],
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
  plugins: [require('@tailwindcss/typography')],
}
export default config;
}
