import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        forest: '#1a3328',
        'forest-mid': '#254d3c',
        gold: '#c9973a',
        'gold-light': '#e8b85a',
        cream: '#faf7f2',
        'cream-dark': '#f0ebe1',
        'text-muted': '#6b6b6b',
        border: '#d8d0c4',
        error: '#c0392b',
        success: '#1a7a4a',
      },
      fontFamily: {
        heading: ['var(--font-cormorant)', 'serif'],
        body: ['var(--font-dm-sans)', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(6px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease',
      },
    },
  },
  plugins: [],
}

export default config
