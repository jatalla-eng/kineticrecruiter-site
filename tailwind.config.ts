import type { Config } from 'tailwindcss'

// Note: This project uses Tailwind CSS v4, which uses CSS-first configuration.
// Brand tokens are defined via @theme in src/app/globals.css.
// This file is kept for reference and tooling compatibility.
const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'kinetic-teal': '#0d8488',
        'kinetic-teal-dark': '#0a6b6e',
        'kinetic-teal-light': '#E8F5F5',
        'kinetic-navy': '#1a2332',
        'kinetic-navy-light': '#2a3a4f',
        'motion-amber': '#E8A838',
        'momentum-violet': '#9B8EC4',
        'flow-cyan': '#7DD3D6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        'content': '1200px',
        'article': '720px',
      },
    },
  },
  plugins: [],
}

export default config
