import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "var(--forest)",
        "forest-deep": "var(--forest-deep)",
        "sage-bg": "var(--sage-bg)",
        "sage-mid": "var(--sage-mid)",
        mustard: "var(--mustard)",
        cream: "var(--cream)",
        page: "var(--page)",
        ink: "var(--ink)",
        muted: "var(--muted)",
        soft: "var(--soft)",
        card: "var(--card)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
      boxShadow: {
        card: "0 12px 40px rgba(47, 56, 36, 0.08)",
      },
      borderRadius: {
        blob: "42% 58% 55% 45% / 48% 42% 58% 52%",
      },
    },
  },
  plugins: [],
} satisfies Config;
