/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7dc8fc',
          400: '#38adf8',
          500: '#0d92ea',
          600: '#0172c8',
          700: '#025ba1',
          800: '#064e85',
          900: '#0a426e',
          950: '#072a49',
        },
      },
    },
  },
  plugins: [],
}
