module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow:{
        '2xl': '0 10px 50px -8px rgba(255, 255, 255, 0.5)',
      }
    },
  },
  variants: {
    extend: {
      margin:['first'],
      borderRadius:['last'],
    },
  },
  plugins: [],
}
