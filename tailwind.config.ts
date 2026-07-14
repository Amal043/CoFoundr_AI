import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#060816",
        surface: "#0A1022",
        line: "#223052",
      },
      boxShadow: {
        glow: "0 0 50px rgba(93, 88, 255, 0.22)",
        card: "0 16px 50px rgba(0, 0, 0, 0.25)",
      },
      backgroundImage: {
        "hero-grid": "linear-gradient(rgba(117, 125, 255, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(117, 125, 255, 0.07) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
