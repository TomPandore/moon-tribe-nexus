
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px"
      }
    },
    extend: {
      colors: {
        border: "#22291c",
        input: "#181d16",
        ring: "#8ebe23",
        background: "#0f0f0f",
        foreground: "#ccff00",
        primary: {
          DEFAULT: "#ccff00",
          foreground: "#141f0a"
        },
        secondary: {
          DEFAULT: "#161616",
          foreground: "#afff00"
        },
        destructive: {
          DEFAULT: "#ED4245",
          foreground: "#fae7e7"
        },
        muted: {
          DEFAULT: "#212c0f",
          foreground: "#a3ac61"
        },
        accent: {
          DEFAULT: "#ffa800",
          foreground: "#141f0a"
        },
        tribal: {
          gold: "#ffb300",
          green: "#ccff00",
          "neo-green": "#afff00",
          yellow: "#ffe445",
          cyan: "#6dffe9"
        }
      },
      borderRadius: {
        lg: "1.5rem",
        md: "1rem",
        sm: "0.5rem"
      },
      fontFamily: {
        oswald: ["Oswald", "Oswald Variable", "sans-serif"],
        grotesk: ["Space Grotesk", "SpaceGrotesk", "sans-serif"],
        black: ["Inter", "sans-serif"]
      },
      keyframes: {
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(12px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "scale-in": {
          "0%": { transform: "scale(0.98)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1"}
        }
      },
      animation: {
        "fade-in": "fade-in 0.6s ease",
        "scale-in": "scale-in 0.3s ease"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
