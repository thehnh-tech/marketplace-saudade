import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F1ED",
        bone: "#FFFAF7",
        ink: "#1B1616",
        red: "#B61E33",
        signal: "#CF4458",
        stone: "#7C6666",
        night: "#0D0A0B"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Arial", "sans-serif"],
        body: ["var(--font-body)", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      boxShadow: {
        red: "0 10px 24px rgba(182, 30, 51, 0.12)",
        signal: "0 12px 28px rgba(207, 68, 88, 0.18)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        },
        scan: {
          "0%": { transform: "translateY(-120%)" },
          "100%": { transform: "translateY(420%)" }
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" }
        }
      },
      animation: {
        marquee: "marquee 22s linear infinite",
        scan: "scan 2.8s ease-in-out infinite",
        pulseGlow: "pulseGlow 2.3s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
