/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        well: 'var(--color-well)',
        ink: 'var(--dp-color-ink)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          2: 'var(--color-surface-2)',
          raised: 'var(--color-surface-raised)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          strong: 'var(--color-border-strong)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          subtle: 'var(--color-text-subtle)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          soft: 'var(--color-primary-soft)',
          on: 'var(--color-on-primary)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
          soft: 'var(--color-accent-soft)',
        },
        sentiment: {
          positive: 'var(--color-positive)',
          'positive-soft': 'var(--color-positive-soft)',
          negative: 'var(--color-negative)',
          'negative-soft': 'var(--color-negative-soft)',
          neutral: 'var(--color-neutral)',
          'neutral-soft': 'var(--color-neutral-soft)',
        },
      },
      fontFamily: {
        sans: ['var(--dp-typography-sans)'],
        mono: ['var(--dp-typography-mono)'],
      },
      borderRadius: {
        lg: 'var(--dp-radius-key)',
        xl: '0.875rem',
        '2xl': '1.125rem',
      },
      boxShadow: {
        raised: 'var(--shadow-raised)',
        well: 'var(--shadow-well)',
        pressed: 'var(--shadow-pressed)',
        soft: 'var(--shadow-raised)',
        elevated: 'var(--shadow-raised)',
      },
      transitionDuration: { key: 'var(--dp-motion-key)' },
      transitionTimingFunction: { settle: 'var(--dp-motion-settle)' },
    },
  },
  plugins: [],
}
