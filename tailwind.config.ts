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
        primary: {
          DEFAULT: "#2563eb", // Синий как в логотипе Patron ZU
          dark: "#1d4ed8",
          light: "#3b82f6",
        },
        accent: {
          DEFAULT: "#2563eb",
          dark: "#1d4ed8",
        },
        gray: {
          DEFAULT: "#6b7280",
          light: "#9ca3af",
          dark: "#374151",
          darker: "#1f2937",
          darkest: "#111827",
        },
      },
    },
  },
  plugins: [],
};
export default config;

