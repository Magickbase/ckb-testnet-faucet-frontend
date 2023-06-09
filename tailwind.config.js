/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '30': '7.5rem',
        '4.5': '1.125rem',
      },

      width: {
        18: '4.5rem',
      },

      colors: {
        'purple': '#9A2CEC',
        'purple.disabled': '#4B2A63',
        'gray': {
          50: '#F0F0F0',
          100: '#DEDEDE',
          200: '#CCCCCC',
          400: '#999999',
          600: '#777777',
          700: '#666666',
          800: '#333333',
        },
        'orange': '#F6C344',
        'green': '#53A551',
        'red': '#FA504F'
      },
      lineHeight: {
        '12': '3rem',
      },
      fontSize: {
        sm: ['14px', '16px'],
        base: ['16px', '18px'],
        '3xl': ['32px', '38px'],
        '4xl': ['36px', '48px']
      }
    },
  },
  plugins: [],
}

