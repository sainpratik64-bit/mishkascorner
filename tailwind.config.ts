import type { Config } from 'tailwindcss';
import tailwindcssAnimate from 'tailwindcss-animate';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        brand: {
          black: '#000000',
          white: '#FFFFFF',
          gray: '#EEEEEE',
          muted: '#737373',
          sale: '#ee3a45',
        },
      },
      maxWidth: {
        bonkers: '1440px',
      },
      width: {
        'bonkers-sidebar': 'clamp(250px, 22%, 285px)',
      },
      fontSize: {
        'bc-announcement': ['13px', { lineHeight: '1', letterSpacing: '0.03em' }],
        'bc-product': ['0.9375rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
        'bc-price': ['0.9375rem', { lineHeight: '1', letterSpacing: '0.02em' }],
        'bc-badge': ['10px', { lineHeight: '1', letterSpacing: '0.05em' }],
        'bc-nav': ['0.8rem', { lineHeight: '1', letterSpacing: '0.1em' }],
        'bc-sort': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.1em' }],
        'bc-filter-sm': ['12px', { lineHeight: '1.2', letterSpacing: '0.02em' }],
        'bc-filter-lg': ['17px', { lineHeight: '1.2', letterSpacing: '0.02em' }],
        'bc-atc-sm': ['0.5625rem', { lineHeight: '1', letterSpacing: '0.1em' }],
        'bc-atc-lg': ['0.6875rem', { lineHeight: '1', letterSpacing: '0.1em' }],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        pill: '50px',
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Ubuntu',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        marquee: 'marquee 60s linear infinite',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
