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
        error: '#E31925',
        errorBg: '#FEF0F1',

        success: '#23AC29',
        successBg: '#E2EFDA',

        grey700: '#797979',
        grey500: '#B4B4B4',
        grey400: '#D2D2D2',
        grey300: '#E1E1E1',
        grey200: '#F0F0F0',
        grey100: '#F8F8F8',

        black1000: '#000000',
        black900: '#040501',
        black700: '#1C1D18',
        black500: '#464646',
        black400: '#696969',
        black300: '#7E7E7E',

        blue900: '#0B1729',
        blue700: '#22467A',
        blue500: '#3874CB',
        blue400: '#6090D5',
        blue300: '#88ACE0',
        blue200: '#AFC7EA',
        blue100: '#D7E3F5',

        yellow700: '#896800',
        yellow500: '#E5AE00',
        yellow400: '#EABE33',
        yellow300: '#EFCE66',
        yellow200: '#F5DF99',
        yellow100: '#FBF3DA',

        purple900: '#2C214D',
        purple700: '#614F96',
        purple500: '#957DDE',
        purple400: '#AA97E5',
        purple300: '#BFB1EB',
        purple200: '#D5CBF2',
        purple100: '#EAE5F8',

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
