import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#07080B', 2: '#0C0E13', 3: '#12151C', 4: '#1A1E27' },
        line: { DEFAULT: 'rgba(255,255,255,0.08)', 2: 'rgba(255,255,255,0.14)' },
        fg: { DEFAULT: '#F3F1EA', 2: '#A9ADB6', 3: '#6E737E' },
        gold: { DEFAULT: '#E8B44A', 2: '#F5CF7C', 3: '#B98A2C' },
        cyan: { DEFAULT: '#6EE7F9', 2: '#38BDF8' },
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'Syne', 'sans-serif'],
        dm: ['var(--font-dm)', 'DM Sans', 'sans-serif'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'monospace'],
      },
      borderRadius: { pill: '9999px' },
      maxWidth: { site: '1200px' },
    },
  },
  plugins: [],
}
export default config
