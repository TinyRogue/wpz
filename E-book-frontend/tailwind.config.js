/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    {
      pattern: /grid-cols-./,
    },
  ],
  theme: {
    extend: {
      colors: {
        grey700: '#797979',
        grey500: '#B4B4B4',

        black900: '#040501',
        black700: '#1C1D18',
        black500: '#464646',

        blue700: '#22467A',
        blue500: '#3874CB',

        white900: '#FFFFFF',
        white700: '#FDFDFD',
      },
    },
    boxShadow: {
      wn: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
      activeButton: '0px 1px 2px rgba(0, 0, 0, 0.3), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
    },
  },
  plugins: [],
};
