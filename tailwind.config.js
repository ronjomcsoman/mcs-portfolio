/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'mcs-dark-brown': '#574355',
        'mcs-brown': '#BC8A78',
        'mcs-gold': '#E9A162',
        'mcs-beige': '#FDF5EF',
        'mcs-light-gold': '#F4D0B0',
        'mcs-warm-grey': '#C4BDC3',
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
