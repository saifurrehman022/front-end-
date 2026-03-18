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
        bg: '#05050a',
        'bg-2': '#0d0d18',
        surface: '#111127',
        'surface-2': '#191935',
        accent: '#6c6aff',
        'accent-2': '#a78bfa',
        'accent-3': '#38d9a9',
        'text-primary': '#f0f0fa',
        'text-secondary': '#9898b8',
        'text-muted': '#5a5a80',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 4s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'spin-slow': 'spin 12s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'accent-glow': 'radial-gradient(circle at 50% 50%, rgba(108,106,255,0.15) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
export default config
