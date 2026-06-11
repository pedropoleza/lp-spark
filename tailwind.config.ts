import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        // ——— Base (near-black / off-white) ———
        ink: "#0D0D0D", // base profunda (cor pedida)
        graphite: "#0D0D0D",
        card: "#141416", // superfície elevada
        cream: "#FCFCFC", // texto/branco (cor pedida)
        muted: "#8B9499", // texto secundário

        // ——— Tokens semânticos brutalistas (via CSS vars de :root) ———
        paper: "var(--paper)",
        "ink-deep": "var(--ink-deep)",
        "marker-red": "var(--marker-red)",
        "marker-blue": "var(--marker-blue)",
        "terminal-green": "var(--terminal-green)",

        // ——— Acento único (teal) e derivados para profundidade ———
        accent: "#00A4C6", // cor de acento pedida
        // Aliases legados remapeados para a família teal (cohesão monocromática):
        spark: "#00A4C6",
        electric: "#2FD2EE",
        glow: "#00788F",
        lime: "#38E5CE",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        heavy: ["var(--font-heavy)", "var(--font-display)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        // Brutalismo = cantos mais contidos; glass cards usam estes.
        card: "16px",
        "card-lg": "20px",
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(0,0,0,0.7)",
        glow: "0 0 60px -12px rgba(0,164,198,0.45)",
        "glow-blue": "0 0 60px -12px rgba(0,164,198,0.45)",
        plan: "0 30px 90px -30px rgba(0,0,0,0.9)",
        // borda dura brutalista
        hard: "4px 4px 0 0 rgba(0,164,198,0.9)",
        "hard-cream": "4px 4px 0 0 rgba(252,252,252,0.9)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "border-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        marquee: "marquee 28s linear infinite",
        "border-spin": "border-spin 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
