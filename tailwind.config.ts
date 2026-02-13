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
        'space-black': '#0a0a12',
        'deep-purple': '#4a00ff',
        'neon-blue': '#00f3ff',
        'cosmic-pink': '#ff00ff',
        'star-white': '#ffffff',
      },
      fontFamily: {
        'orbitron': ['var(--font-orbitron)'],
        'space-mono': ['var(--font-space-mono)'],
      },
      animation: {
        'pulse': 'pulse 0.5s infinite alternate',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: '0.3', transform: 'scaleY(0.5)' },
          '50%': { opacity: '1', transform: 'scaleY(1)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
