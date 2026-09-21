/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Professional 5-Color System:
        // 1. #0F172A - Primary (Deep Slate/Navy)
        // 2. #7C3AED - Secondary (Vibrant Violet / Royal Purple)
        // 3. #22D3EE - Accent (Electric Cyan)
        // 4. #A78BFA - Tertiary (Soft Lavender / Lilac Violet)
        // 5. #EDE9FE - Background (Pale Lilac / Lavender Tint)
        theme: {
          primary: '#0F172A',
          secondary: '#7C3AED',
          accent: '#22D3EE',
          tertiary: '#A78BFA',
          canvas: '#EDE9FE',
          surface: '#FFFFFF',
        },
        palette: {
          canvas: '#EDE9FE',
          'canvas-soft': '#DDD6FE',
          surface: '#FFFFFF',
          'surface-soft': '#F5F3FF',
          accent: '#22D3EE',
          'accent-hover': '#06B6D4',
          secondary: '#7C3AED',
          'secondary-hover': '#6D28D9',
          tertiary: '#A78BFA',
          ink: '#0F172A',
          'ink-secondary': '#334155',
          'ink-muted': '#475569',
          border: '#DDD6FE',
          'border-strong': '#C4B5FD',
        },
        academic: {
          bg: '#EDE9FE',
          primary: '#0F172A',
          accent: '#7C3AED',
          'accent-light': '#EDE9FE',
          'accent-secondary': '#22D3EE',
          'accent-tertiary': '#A78BFA',
          surface: '#FFFFFF',
          'surface-soft': '#F5F3FF',
          border: '#DDD6FE',
          'text-primary': '#0F172A',
          'text-secondary': '#334155',
          'text-muted': '#475569',
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
        },
        brand: {
          100: '#EDE9FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#7C3AED',
          600: '#6D28D9',
          700: '#5B21B6',
          900: '#0F172A',
          cyan: '#22D3EE',
        },
        dark: {
          bg: '#0F172A',
          surface: '#1E293B',
          elevated: '#334155',
          border: '#334155',
          'text-primary': '#FFFFFF',
          'text-secondary': '#E2E8F0',
          'text-muted': '#94A3B8',
          accent: '#22D3EE',
          secondary: '#7C3AED',
          tertiary: '#A78BFA',
          'accent-soft': '#1E293B',
        }
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '0.875rem' }],
        'heading-xl': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.025em', fontWeight: '800' }],
        'heading-lg': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading-md': ['1.1rem', { lineHeight: '1.35', letterSpacing: '-0.015em', fontWeight: '700' }],
        'body-lg': ['0.9375rem', { lineHeight: '1.65', letterSpacing: '0.01em' }],
        'body': ['0.8125rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'caption': ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
      },
      letterSpacing: {
        'tight-heading': '-0.025em',
        'snug-heading': '-0.015em',
        'relaxed-body': '0.01em',
        'wide-label': '0.04em',
      },
      fontFamily: {
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        serif: ['"Plus Jakarta Sans"', '"Inter"', 'sans-serif'],
        lexend: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Menlo', 'Consolas', 'monospace']
      },
      boxShadow: {
        'xs': '0 1px 2px 0 rgba(15, 23, 42, 0.04)',
        '2xs': '0 1px 1px 0 rgba(15, 23, 42, 0.02)',
        'subtle-depth': '0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 4px 12px -2px rgba(15, 23, 42, 0.03), inset 0 1px 0 0 rgba(255, 255, 255, 0.8)',
        'elevated-card': '0 1px 3px 0 rgba(15, 23, 42, 0.03), 0 8px 24px -4px rgba(15, 23, 42, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
        'olive-glow': '0 0 20px -3px rgba(124, 58, 237, 0.35)',
        'violet-glow': '0 0 20px -3px rgba(124, 58, 237, 0.35)',
        'accent-glow': '0 0 20px -3px rgba(34, 211, 238, 0.4)',
        'inner-light': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.9)',
        'card-hover': '0 12px 32px -4px rgba(15, 23, 42, 0.08), 0 2px 6px 0 rgba(15, 23, 42, 0.03)',
      },
      borderRadius: {
        '2xl': '18px',
        '3xl': '24px'
      },
      spacing: {
        '8.5': '2.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
      },
      keyframes: {
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'scale-up': {
          '0%': { opacity: '0', transform: 'scale(0.92)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'wave': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '20%, 60%': { transform: 'rotate(14deg)' },
          '40%, 80%': { transform: 'rotate(-14deg)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fade-in 0.2s ease-out forwards',
        'scale-in': 'scale-in 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-up': 'scale-up 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'spin-slow': 'spin-slow 12s linear infinite',
        'wave': 'wave 2s infinite ease-in-out',
      },
    },
  },
  plugins: [],
}
