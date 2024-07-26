/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'key-yellow': '1px 1px 0px #E58918cc',
      },
      fontFamily: {
        rubik: ['Rubik', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        pops: ['Poppins', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulseSlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': {
            opacity: 1.0, // Lower opacity
            backgroundColor: 'white', // Custom color (e.g., tomato)
          },
          '50%': {
            opacity: 1.0, // Lower opacity at the midpoint
            backgroundColor: '#FFFCF4', // Custom color at the midpoint (e.g., orange-red)
          },
        },
      },
    },
  },
  plugins: [],
};
