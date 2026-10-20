import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Radiant Saffron Orange
          600: '#ea580c', // Vibrant Kesariya
          700: '#c2410c', // Deep Royal Orange
          800: '#9a3412',
          900: '#7c2d12',
          950: '#431407',
        },
        kesariya: {
          DEFAULT: '#ff6600',
          light: '#ff8533',
          dark: '#cc5200',
        },
      },
    },
  },
  plugins: [],
};
export default config;
