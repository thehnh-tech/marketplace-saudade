import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F1EADD",
        "paper-2": "#E8DFCF",
        "paper-3": "#DDD2BD",
        bone: "#EDE5D6",
        ink: "#211C17",
        "ink-2": "#4B433A",
        stone: "#8C8175",
        "stone-2": "#A89C8C",
        brick: "#A8443A",
        "brick-deep": "#80322A",
        red: "#A8443A",
        signal: "#C23A2B",
        live: "#C23A2B",
        night: "#171310"
      },
      fontFamily: {
        sans: ["Helvetica Neue", "Helvetica", "var(--font-body)", "Arial", "sans-serif"],
        display: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"],
        body: ["Helvetica Neue", "Helvetica", "var(--font-body)", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "Space Mono", "ui-monospace", "monospace"],
        serif: ["var(--font-serif)", "Cormorant Garamond", "Georgia", "serif"]
      },
      letterSpacing: {
        wider: "0.18em",
        widest: "0.24em",
        loose: "0.28em"
      },
      boxShadow: {
        red: "0 30px 80px -30px rgba(33, 28, 23, 0.55)",
        signal: "0 14px 40px -12px rgba(33, 28, 23, 0.4)",
        editorial: "0 30px 80px -30px rgba(33, 28, 23, 0.5)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        scan: {
          "0%, 100%": { top: "8%" },
          "50%": { top: "90%" }
        },
        scanLine: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(280%)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1", boxShadow: "0 0 0 0 rgba(194,58,43,0.5)" },
          "50%": { opacity: "0.5", boxShadow: "0 0 0 5px rgba(194,58,43,0)" }
        },
        tickerScroll: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50%)" }
        },
        drop: {
          "0%": { opacity: "0", transform: "translateY(-26px) scale(.985)", filter: "blur(8px)" },
          "100%": { opacity: "1", transform: "none", filter: "blur(0)" }
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "none" }
        }
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        scan: "scan 3.4s ease-in-out infinite",
        scanLine: "scanLine 2.2s ease-in-out infinite",
        pulseGlow: "pulseGlow 1.6s ease-in-out infinite",
        ticker: "tickerScroll 26s linear infinite",
        drop: "drop 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        fadeIn: "fadeIn 0.4s ease both"
      }
    }
  },
  plugins: []
};

export default config;
