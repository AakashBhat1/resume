import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./constants/**/*.{ts,tsx,json}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        accent: {
          DEFAULT: "#2dd4bf",
          soft: "#22d3ee",
          deep: "#0ea5e9",
        },
      },
      backgroundImage: {
        "accent-gradient":
          "linear-gradient(130deg, rgba(14,165,233,0.8) 0%, rgba(45,212,191,0.85) 48%, rgba(34,211,238,0.65) 100%)",
        "surface-gradient":
          "radial-gradient(circle at 10% 20%, rgba(14,165,233,0.14) 0%, rgba(15,23,42,0) 55%), radial-gradient(circle at 90% 0%, rgba(45,212,191,0.12) 0%, rgba(15,23,42,0) 45%)",
      },
      boxShadow: {
        glass: "0 20px 60px -30px rgba(8, 47, 73, 0.45)",
        glow: "0 0 0 1px rgba(45,212,191,0.35), 0 12px 35px -15px rgba(45,212,191,0.45)",
      },
      keyframes: {
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "float-slow": "float-slow 8s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
};

export default config;
