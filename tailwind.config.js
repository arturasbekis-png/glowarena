/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#05060f',
          800: '#0a0c1a',
          700: '#11142a',
          600: '#1a1e3a',
          500: '#262b50',
        },
        cyan: {
          DEFAULT: '#00f0ff',
          glow: '#22d3ee',
        },
        electric: {
          DEFAULT: '#3b82f6',
          deep: '#1d4ed8',
        },
        violet: {
          DEFAULT: '#8b5cf6',
          deep: '#6d28d9',
        },
        magenta: {
          DEFAULT: '#ff2d95',
          glow: '#f472b6',
        },
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        ultra: '-0.04em',
        tight2: '-0.02em',
      },
      animation: {
        'fade-up': 'fadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fadeIn 1.2s ease forwards',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
        'menu-in': 'menuIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'menu-item': 'menuItem 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        menuIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        menuItem: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
};
