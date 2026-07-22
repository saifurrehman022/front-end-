import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}','./components/**/*.{js,ts,jsx,tsx,mdx}','./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg:       '#ffffff',
        'bg-2':   '#f7f7f7',
        'bg-3':   '#f0f0f0',
        surface:  '#ffffff',
        'surface-2':'#f7f7f7',
        border:   '#e0e0e0',
        black:    '#000000',
        amber:    '#E8C547',
        'amber-2':'#F5D76E',
        'amber-3':'#c9a82e',
         accent:   '#C89A2E',
       'accent-2':'#dcb75a',
        'accent-3':'#a6791f',
        'text-primary':   '#000000',
        'text-secondary': '#555555',
        'text-muted':     '#999999',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'Syne', 'sans-serif'],
        dm:   ['var(--font-dm)',   'DM Sans', 'sans-serif'],
      },
      borderRadius: { pill: '9999px' },
    },
  },
  plugins: [],
}
export default config
