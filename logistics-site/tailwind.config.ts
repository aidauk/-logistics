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
          DEFAULT: "#dc2626", // Красный как в примере
          dark: "#b91c1c",
          light: "#ef4444",
        },
        accent: {
          DEFAULT: "#dc2626",
          dark: "#b91c1c",
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

