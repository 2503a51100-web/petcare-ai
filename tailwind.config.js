/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          DEFAULT: '#164E43',
          50: '#F0F7F5',
          100: '#DDEEEA',
          200: '#BDDFD6',
          300: '#8DC6B8',
          400: '#53A694',
          500: '#2E8976',
          600: '#217060',
          700: '#164E43',
          800: '#123E36',
          900: '#0E302A',
          950: '#071A17',
        },
        emerald: {
          brand: '#19A58C',
          light: '#2CD4B4',
          dark: '#127F6B',
        },
        coral: {
          DEFAULT: '#FF9478',
          light: '#FFAF9B',
          dark: '#E2765A',
          soft: '#FFF0EC',
        },
        ivory: {
          DEFAULT: '#F8FAF7',
          warm: '#F4F7F3',
          light: '#FCFDFC',
        },
        charcoal: {
          DEFAULT: '#25342F',
          muted: '#526660',
          light: '#7A918A',
        },
        sage: {
          DEFAULT: '#E8F1EC',
          light: '#F2F7F4',
          border: '#D2E3DB',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Cabinet Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(22, 78, 67, 0.06), 0 2px 6px -1px rgba(22, 78, 67, 0.04)',
        'medium': '0 10px 30px -4px rgba(22, 78, 67, 0.08), 0 4px 10px -2px rgba(22, 78, 67, 0.04)',
        'premium': '0 20px 40px -6px rgba(22, 78, 67, 0.12), 0 8px 16px -4px rgba(22, 78, 67, 0.06)',
        'coral-glow': '0 10px 25px -3px rgba(255, 148, 120, 0.35)',
        'emerald-glow': '0 10px 25px -3px rgba(25, 165, 140, 0.35)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.25s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
