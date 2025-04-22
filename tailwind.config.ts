
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        tribal: {
          darkest: '#0f0f0f',
          dark: '#1a1a1a',
          'dark-light': '#2a2a2a',
          gray: '#333333',
          'gray-light': '#444444',
        },
        'acid-yellow': '#ccff00',
        'fire-orange': '#ff6b00',
        'jungle-green': '#2ecc40',
        gold: {
          DEFAULT: '#FFD700',
          dark: '#E6C200',
          soft: '#FFF5CC',
          glow: '#FFD70066',
        },
        jungle: {
          green: "#29A354",
          leaf: "#4EDA78",
          neon: "#afff00",
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        tribal: ['Oswald', 'Anton', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-tribal': 'linear-gradient(135deg, #afff00 0%, #29A354 100%)',
        'gradient-dark': 'linear-gradient(to bottom, #0f0f0f 0%, #1a1a1a 100%)',
        'tribal-pattern': "url(\"data:image/svg+xml,%3Csvg width='60' height='10' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h10L5 10zM10 0h10l-5 10zM20 0h10l-5 10zM30 0h10l-5 10zM40 0h10l-5 10zM50 0h10l-5 10z' fill='%23ccff00' fill-opacity='0.35'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'jungle': '0 4px 24px 0 rgba(175, 255, 0, 0.15), 0 1.5px 10px -2px rgba(46, 204, 64, 0.3)',
        'acid': '0 0 20px 3px rgba(204, 255, 0, 0.2)',
        'glow': '0 0 25px 5px rgba(175, 255, 0, 0.25)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'glow-tribal': {
          '0%,100%': { filter: 'drop-shadow(0 0 8px #afff0088)' },
          '50%': { filter: 'drop-shadow(0 0 15px #afff00cc)' }
        },
        'float': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'scale-in': 'scale-in 0.2s ease-out',
        'glow-tribal': 'glow-tribal 1.5s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
