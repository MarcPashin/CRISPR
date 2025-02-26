import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0EA5E9',    // Bright blue
        'secondary': '#10B981',  // Green
        'tertiary': '#6366F1',   // Indigo
        'dark': {
          '50': '#f8fafc',
          '100': '#f1f5f9',
          '200': '#e2e8f0',
          '300': '#cbd5e1',
          '400': '#94a3b8',
          '500': '#64748b',
          '600': '#475569',
          '700': '#334155',
          '800': '#1e293b',
          '900': '#0f172a',
          '950': '#020617',
        },
        'accent': '#F472B6',     // Pink
      },
      backgroundColor: {
        'dark-surface': '#0f172a',           // Dark surface
        'dark-surface-light': '#1e293b',     // Lighter dark surface
        'dark-surface-lighter': '#334155',   // Even lighter dark surface
      },
      textColor: {
        'dark-primary': '#f1f5f9',           // Light text for dark mode
        'dark-secondary': '#94a3b8',         // Secondary text for dark mode
      },
      boxShadow: {
        'dark': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
      borderColor: {
        'dark-border': '#334155',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config