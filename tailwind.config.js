/** @type {import('tailwindcss').Config} */

// const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        chiknpurple: {
          dark: '#191a32',
          light: '#62679f',
          DEFAULT: '#2a2c54',
        },
        chiknred: {
          DEFAULT: '#df3f3d',
        },
        chikngold: {
          DEFAULT: '#FFD700',
        },
      },
    },
  },
  plugins: [],
}
