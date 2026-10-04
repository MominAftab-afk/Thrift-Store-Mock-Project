/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // shadcn standard semantic tokens (HSL backed)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Pristine Gallery Palette
        surface: {
          DEFAULT: '#FFFFFF',
          muted: '#F9F9FA',
          subtle: '#F4F4F6',
          border: '#E8E8EC',
          borderStrong: '#D6D6DC',
        },
        ink: {
          950: '#0A0A0A',
          900: '#141414',
          800: '#222222',
          700: '#3D3D3D',
          600: '#5A5A5A',
          500: '#767676',
          400: '#9E9E9E',
          300: '#CCCCCC',
          200: '#E5E5E5',
          100: '#F2F2F2',
          50: '#FAFAFA',
        },
        clay: {
          50: '#FAF5F3',
          100: '#F4EAE6',
          200: '#E8D2CA',
          500: '#A04628',
          600: '#8E3C20',
          700: '#753018',
        },
        olive: {
          50: '#F4F7F4',
          100: '#E7EDE7',
          600: '#2D5438',
          700: '#23422C',
        },
        ochre: {
          50: '#FAF7EE',
          100: '#F3ECD6',
          600: '#A47020',
          700: '#865A16',
        },
      },
      fontFamily: {
        serif: ['"Fraunces"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        archival: '0.18em',
        editorial: '0.02em',
        snug: '-0.02em',
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '0.95rem', letterSpacing: '0.04em' }],
        'xs': ['0.75rem', { lineHeight: '1.05rem', letterSpacing: '0.02em' }],
        'sm': ['0.8125rem', { lineHeight: '1.25rem' }],
        'base': ['0.875rem', { lineHeight: '1.45rem' }],
        'md': ['0.9375rem', { lineHeight: '1.5rem' }],
        'lg': ['1.0625rem', { lineHeight: '1.55rem' }],
        'xl': ['1.25rem', { lineHeight: '1.6rem', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.85rem', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '2.2rem', letterSpacing: '-0.025em' }],
        '4xl': ['2.25rem', { lineHeight: '2.6rem', letterSpacing: '-0.03em' }],
      },
      boxShadow: {
        'fine': '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.03), 0 1px 2px -1px rgba(0, 0, 0, 0.03)',
        'lift': '0 6px 16px -4px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'md': '6px',
        'lg': '8px',
        'pill': '9999px',
      }
    },
  },
  plugins: [],
};
