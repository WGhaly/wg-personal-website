import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./components/**/*.{js,ts,jsx,tsx,mdx}', './app/**/*.{js,ts,jsx,tsx,mdx}', './lib/**/*.{js,ts}'],
  theme: {
    extend: {
      // Dark ground, cards set apart by colour. Gold belongs to the liquid only (globals.css: --liquid).
      colors: {
        ground: '#0B0B0C',
        card: '#151517',
        raised: '#1E1E21',
        line: '#2A2A2E',
        ink: '#F4F2EC',
        'ink-muted': '#9C998F',
        gold: '#D4AF37',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
