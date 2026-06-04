/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#090D16',
        darkCard: 'rgba(18, 24, 38, 0.7)',
        accentBlue: '#00F2FE',
        accentCyan: '#4FACFE',
        accentNeon: '#39FF14',
        accentGold: '#FFD700',
        panelBorder: 'rgba(255, 255, 255, 0.08)'
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0, 242, 254, 0.2), 0 0 10px rgba(0, 242, 254, 0.2)' },
          '100%': { boxShadow: '0 0 15px rgba(0, 242, 254, 0.6), 0 0 20px rgba(0, 242, 254, 0.4)' },
        }
      }
    },
  },
  plugins: [],
}
