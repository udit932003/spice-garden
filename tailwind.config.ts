import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fef3f2",
          100: "#fee4e2",
          200: "#fececa",
          300: "#fcaca5",
          400: "#f87a6f",
          500: "#ef4e40",
          600: "#dc2f23",
          700: "#b9241a",
          800: "#99211a",
          900: "#7f221c",
        },
        gold: "#c19a4b",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
