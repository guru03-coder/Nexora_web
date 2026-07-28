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
          DEFAULT: '#C8102E',
          dark: '#7A0C1E',
          glow: '#FF1E3C',
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
