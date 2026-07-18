/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          cyan:   "#00f5ff",
          purple: "#a855f7",
          blue:   "#3b82f6",
          green:  "#10b981",
          amber:  "#f59e0b",
          pink:   "#ec4899",
        },
        dark: {
          950: "#030306",
          900: "#07070f",
          800: "#0d0d1a",
          700: "#12121f",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["Space Mono", "monospace"],
      },
      animation: {
        "blink":      "blink 1.5s ease-in-out infinite",
        "float-up":   "floatUp 3.5s ease-in-out infinite",
        "scan-down":  "scanDown 2.5s linear infinite",
        "spin-slow":  "spin 14s linear infinite",
        "pulse-ring": "pulseRing 2s ease-out infinite",
      },
      keyframes: {
        blink:     { "0%,100%": { opacity: 1 }, "50%": { opacity: 0.2 } },
        floatUp:   { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        scanDown:  { "0%": { top: "15%", opacity: 0 }, "10%": { opacity: 1 }, "90%": { opacity: 1 }, "100%": { top: "82%", opacity: 0 } },
        pulseRing: { "0%": { transform: "scale(0.8)", opacity: 0.8 }, "100%": { transform: "scale(2.2)", opacity: 0 } },
      },
      backdropBlur: { xs: "2px" },
    },
  },
  plugins: [],
};
