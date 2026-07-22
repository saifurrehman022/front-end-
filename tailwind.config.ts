import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg:        '#f5f8f5',
        'bg-2':    '#edf3ed',
        'bg-3':    '#e2ebe2',
        surface:   '#f5f8f5',
        'surface-2':'#edf3ed',
        border:    '#cfdfcf',
        'border-2':'#dbe8db',
        black:     '#000000',
        amber:     '#E8C547',
        'amber-2': '#F5D76E',
        'amber-3': '#c9a82e',
        accent:    '#C89A2E',
        'accent-2':'#dcb75a',
        'accent-3':'#a6791f',
        'text-primary':   '#0c140c',
        'text-secondary': '#4a564a',
        'text-muted':     '#7c8a7c',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'Syne', 'sans-serif'],
        dm:   ['var(--font-dm)',   'DM Sans', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      borderRadius: { pill: '9999px' },
    },
  },
  plugins: [],
}
export default config
