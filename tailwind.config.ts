import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F4F1EC",
        bone: "#FBF8F2",
        ink: "#0A0908",
        red: "#D71920",
        signal: "#FF2C36",
        stone: "#8A857E",
        night: "#070607"
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial", "sans-serif"],
        body: ["var(--font-body)", "Arial", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        serif: ["var(--font-serif)", "Georgia", "serif"]
      },
      boxShadow: {
        red: "0 0 30px rgba(215, 25, 32, 0.24)",
        signal: "0 0 28px rgba(255, 44, 54, 0.45)"
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
