/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-outfit)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-sora)', 'var(--font-outfit)', 'sans-serif'],
      },
      colors: {
        // Navy + orange from Calculadora Científica logo
        brand: {
          DEFAULT: '#0B1528',
          deep: '#060D1A',
          soft: '#122038',
          glow: '#FF7A1A',
        },
        mist: '#152848',
        blush: '#0B1528',
        ink: '#E8EEF8',
        pink: {
          DEFAULT: '#FF7A1A',
          soft: '#FF9A4D',
          deep: '#E05E00',
        },
        coral: {
          DEFAULT: '#FF7A1A',
          deep: '#E05E00',
        },
        violet: {
          DEFAULT: '#FF7A1A',
          soft: '#FF9A4D',
          deep: '#E05E00',
        },
        orange: {
          DEFAULT: '#FF7A1A',
          soft: '#FF9A4D',
          deep: '#E05E00',
        },
        lilac: '#8EB6FF',
        teal: {
          DEFAULT: '#3B82F6',
          deep: '#2563EB',
        },
        sky: '#8EB6FF',
        gold: '#FFB020',
        primary: '#0B1528',
        secondary: '#122038',
        accent: '#FF7A1A',
        sunrise: '#FFB020',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'soft-pulse': {
          '0%, 100%': { opacity: '0.55' },
          '50%': { opacity: '1' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'soft-pulse': 'soft-pulse 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
    },
  },
  plugins: [],
}
