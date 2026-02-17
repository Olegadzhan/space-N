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
        'galaxy-purple': '#6a0dad',
        'asteroid-gray': '#2a2a3a'
      },
      fontFamily: {
        'orbitron': ['var(--font-orbitron)'],
        'space-mono': ['var(--font-space-mono)'],
      },
      animation: {
        'pulse-slow': 'pulse-slow 8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s linear infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite'
      },
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.95)' },
          '50%': { opacity: '0.6', transform: 'scale(1.05)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        'scan': {
          '0%': { transform: 'rotate(30deg) translateY(-100%)' },
          '100%': { transform: 'rotate(30deg) translateY(100%)' }
        },
        'twinkle': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}

export default config
