import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: 'rgb(var(--ink) / <alpha-value>)', 2: 'rgb(var(--ink-2) / <alpha-value>)', 3: 'rgb(var(--ink-3) / <alpha-value>)', 4: 'rgb(var(--ink-4) / <alpha-value>)' },
        line: { DEFAULT: 'var(--line)', 2: 'var(--line-2)' },
        fg: { DEFAULT: 'rgb(var(--fg) / <alpha-value>)', 2: 'rgb(var(--fg-2) / <alpha-value>)', 3: 'rgb(var(--fg-3) / <alpha-value>)' },
        gold: { DEFAULT: 'rgb(var(--gold) / <alpha-value>)', 2: 'rgb(var(--gold-2) / <alpha-value>)', 3: 'rgb(var(--gold-3) / <alpha-value>)' },
        cyan: { DEFAULT: 'rgb(var(--cyan) / <alpha-value>)', 2: 'rgb(var(--cyan-2) / <alpha-value>)' },
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
