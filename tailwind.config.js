/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      xsm:'200px',
      sm:'480px',
      xmd:'650px',
      md:'878px',
      lg:'976px',
      xl:'1440px',
    },
    extend: {
      dropShadow: {
        'custom-login': '5px 5px rgba(0, 0, 0, 0.9)',
        'custom-login-white': '5px 5px rgba(255, 255, 255, 0.9)',
        'custom-login2': '3px 3px rgba(0, 0, 0, 0.9)',
      },
      spacing: {
        '128': '32rem',
        '140': '100rem',
        '70': '19rem',
        '90': '22rem',
      }
    },
  },
  plugins: [],
}

