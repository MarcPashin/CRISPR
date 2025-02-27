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
        'crispr-blue': '#3b82f6', // CRISPR project blue
        'primary': '#0EA5E9',     // Bright blue
        'secondary': '#10B981',   // Green
        'tertiary': '#6366F1',    // Indigo
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
        'accent': '#F472B6',      // Pink
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
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            h1: {
              color: '#111827',
              fontWeight: '700',
              fontSize: '2.25rem',
              marginTop: '2rem',
              marginBottom: '1.25rem',
            },
            h2: {
              color: '#111827',
              fontWeight: '700',
              fontSize: '1.875rem',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              color: '#111827',
              fontWeight: '600',
              fontSize: '1.5rem',
              marginTop: '1.75rem',
              marginBottom: '0.75rem',
            },
            p: {
              fontSize: '1.125rem',
              lineHeight: '1.75',
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
            },
            ul: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
            },
            li: {
              marginTop: '0.375rem',
              marginBottom: '0.375rem',
              paddingLeft: '0.375rem',
            },
            img: {
              borderRadius: '0.5rem',
            },
            a: {
              color: '#0EA5E9', // Using your primary color
              '&:hover': {
                color: '#0284c7',
              },
            },
          },
        },
        // Improved dark mode typography
        dark: {
          css: {
            color: '#f1f5f9', // dark-primary
            h1: {
              color: '#f8fafc',
            },
            h2: {
              color: '#f8fafc',
            },
            h3: {
              color: '#f8fafc',
            },
            h4: {
              color: '#f8fafc',
            },
            p: {
              color: '#94a3b8', // dark-secondary
            },
            strong: {
              color: '#f8fafc',
            },
            em: {
              color: '#cbd5e1',
            },
            code: {
              color: '#c7d2fe',
              backgroundColor: '#1e293b', // dark-surface-light
            },
            pre: {
              backgroundColor: '#1e293b', // dark-surface-light
              color: '#e2e8f0',
            },
            blockquote: {
              color: '#cbd5e1',
              borderLeftColor: '#334155', // dark-border
            },
            ul: {
              color: '#94a3b8', // dark-secondary
            },
            ol: {
              color: '#94a3b8', // dark-secondary
            },
            li: {
              color: '#94a3b8', // dark-secondary
            },
            a: {
              color: '#0EA5E9', // primary
              '&:hover': {
                color: '#38bdf8',
              },
            },
            hr: {
              borderColor: '#334155', // dark-border
            },
            thead: {
              color: '#f8fafc',
              borderBottomColor: '#334155', // dark-border
            },
            tbody: {
              tr: {
                borderBottomColor: '#334155', // dark-border
              },
            },
            img: {
              borderRadius: '0.5rem',
            },
            figure: {
              figcaption: {
                color: '#94a3b8', // dark-secondary
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config