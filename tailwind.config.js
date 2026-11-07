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
        // White theme with navy ink + orange accent from logo
        brand: {
          DEFAULT: '#FFFFFF',
          deep: '#0B1528',
          soft: '#F5F7FB',
          glow: '#FF7A1A',
        },
        mist: '#EEF2F8',
        blush: '#FFFFFF',
        ink: '#0B1528',
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
          soft: '#E05E00',
          deep: '#C24F00',
        },
        orange: {
          DEFAULT: '#FF7A1A',
          soft: '#E05E00',
          deep: '#C24F00',
        },
        lilac: '#3B82F6',
        teal: {
          DEFAULT: '#3B82F6',
          deep: '#2563EB',
        },
        sky: '#2563EB',
        gold: '#D97706',
        primary: '#FFFFFF',
        secondary: '#F5F7FB',
        accent: '#FF7A1A',
        sunrise: '#D97706',
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
