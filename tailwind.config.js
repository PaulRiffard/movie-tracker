// tailwind.config.js
module.exports = {
  purge: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
  
    extend: {
      colors:{
        red: '#931621',
        lightred: '#A01823',
        title: '#FF3A3A',
        black:'#1A1B1C',
        lightblack: '#353B3C',
        blue:'#735CDD',
        purple:'#C69AFF'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}