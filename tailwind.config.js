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
          75: '#A1A1A1',
          100: '#DEDEDE',
          200: '#CCCCCC',
          400: '#999999',
          600: '#777777',
          700: '#666666',
          800: '#333333',
        },
        'orange': '#F6C344',
        'green': '#53A551',
        'red': '#FA504F',

        'success': '#00CC9B',
        'warning': '#F68C2A',
        'error': '#C04641'

      },
      lineHeight: {
        '12': '3rem',
      },
      fontSize: {
        xs: ['12px', '14px'],
        sm: ['14px', '16px'],
        base: ['16px', '18px'],
        "lg": ['20px', '24px'],
        'xl': ['28px', '32px'],
        '2xl': ['28px', '32px'],
        '3xl': ['32px', '38px'],
        '4xl': ['36px', '48px']
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms'),
  ],
}

