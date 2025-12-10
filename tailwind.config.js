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
        'mcs-brown': '#8B6F47',
        'mcs-gold': '#D4AF37',
        'mcs-beige': '#F5E6D3',
        'mcs-warm-grey': '#A8A8A8',
        'mcs-dark-brown': '#5C4A2E',
        'mcs-light-gold': '#E8D5A3',
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

