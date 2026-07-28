import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          DEFAULT: '#00F0FF',
          dark: '#0052D4',
          glow: '#00F0FF',
        },
        neonblue: {
          DEFAULT: '#00F0FF',
          dark: '#0052D4',
          glow: '#00F0FF',
          bright: '#00E5FF',
        },
        ink: '#0A0A0A',
      },
      fontFamily: {
        display: ['var(--font-orbitron)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
