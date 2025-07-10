/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./layouts/**/*.html",
    "./themes/stylite/layouts/**/*.html",
    "./content/**/*.md",
    "./assets/js/**/*.js"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'stylite-red': '#dc2626',
        'stylite-dark': '#111111',
        'stylite-gray': '#1a1a1a',
        'stylite-light-gray': '#2a2a2a',
        'stylite-text': '#ffffff',
        'stylite-text-muted': '#a1a1aa'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Consolas', 'monospace']
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#ffffff',
            a: {
              color: '#dc2626',
              textDecoration: 'none',
              '&:hover': {
                color: '#ef4444'
              }
            },
            h1: { color: '#ffffff' },
            h2: { color: '#ffffff' },
            h3: { color: '#ffffff' },
            h4: { color: '#ffffff' },
            strong: { color: '#ffffff' },
            code: { color: '#dc2626' },
            blockquote: {
              color: '#a1a1aa',
              borderLeftColor: '#dc2626'
            }
          }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}