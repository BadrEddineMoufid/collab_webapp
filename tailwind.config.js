module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'deep-cerulean': {
          '50': '#ebf8ff',
          '100': '#dbf3ff',
          '200': '#b8e6ff',
          '300': '#85d4ff',
          '400': '#38b9ff',
          '500': '#0098eb',
          '600': '#0077b6',
          '700': '#005a8a',
          '800': '#004c75',
          '900': '#003f61',
        },'congress-blue': {
          '50': '#f5f9ff',
          '100': '#e6f1ff',
          '200': '#d2e5fe',
          '300': '#aacefe',
          '400': '#7cb4fd',
          '500': '#4a97fc',
          '600': '#0972fb',
          '700': '#0354bf',
          '800': '#0349a6',
          '900': '#023e8a',
      }
      },
      boxShadow: {
        default: '0px 10px 20px rgba(150, 150, 187, 0.1)',
      },
      fontSize: {
        '2rem': '2rem',
      },
      primary: {
        DEFAULT: '#24292E',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}