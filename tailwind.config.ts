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
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        card: "rgb(var(--surface) / <alpha-value>)",
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          hover: "rgb(var(--primary-hover) / <alpha-value>)",
        },
        marigold: "rgb(var(--marigold) / <alpha-value>)",
        cranberry: "rgb(var(--cranberry) / <alpha-value>)",
        moss: "rgb(var(--moss) / <alpha-value>)",
      },
      boxShadow: {
        warm: "0 1px 0 rgb(43 30 22 / .04), 0 8px 24px -12px rgb(120 60 20 / .18)",
        "warm-hover": "0 2px 4px rgb(43 30 22 / .06), 0 12px 28px -10px rgb(120 60 20 / .24)",
      },
    },
  },
};

export default config;
