
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
          purple: '#8B5CF6',
          orange: '#F97316',
          green: '#10B981',
          cyan: '#06B6D4',
          dark: '#121212',
          darker: '#0A0A0A',
          gray: '#222222',
          'gray-light': '#333333',
        },
        // ADD GOLD AND JUNGLE GREEN ACCENTS for 'tribal'
        gold: {
          DEFAULT: '#FFD700',
          dark: '#E6C200',
          soft: '#FFF5CC',
        },
        jungle: {
          green: "#29A354",
          leaf: "#4EDA78"
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
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
        'glow-gold': {
          '0%,100%': { filter: 'drop-shadow(0 0 10px #ffd70088)' },
          '50%': { filter: 'drop-shadow(0 0 16px #ffd700cc)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-subtle': 'pulse-subtle 3s ease-in-out infinite',
        'scale-in': 'scale-in 0.2s ease-out',
        'glow-gold': 'glow-gold 1.2s ease-in-out infinite'
      },
      backgroundImage: {
        'gradient-tribal': 'linear-gradient(135deg, #FFD700 0%, #29A354 100%)',
        'gradient-dark': 'radial-gradient(circle at center, #222222 0%, #121212 100%)',
      },
      boxShadow: {
        'jungle': '0 4px 24px 0 #FFD70022, 0 1.5px 10px -2px #27CB6C55',
        'gold': '0 0 16px 3px #FFD70033',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
