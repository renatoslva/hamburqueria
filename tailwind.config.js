/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage:{
        "home": "url('/assets/bonp.png')"
      },
      cor: {
        cafe:'#f5f5dc'
      }
    },
  },
  plugins: [],
}
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
