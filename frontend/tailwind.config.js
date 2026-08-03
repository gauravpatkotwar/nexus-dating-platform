/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nexus: {
          bg: "#0B0F19",
          surface: "#111827",
          border: "#1E293B",
          blue: "#3B82F6",
          purple: "#7C3AED",
          cyan: "#06B6D4",
          text: "#FFFFFF",
          muted: "#94A3B8",
          accent: "#F43F5E",
        },
      },
      backgroundImage: {
        "nexus-gradient": "linear-gradient(135deg, #7C3AED 0%, #3B82F6 50%, #06B6D4 100%)",
        "nexus-dark-gradient": "linear-gradient(180deg, #111827 0%, #0B0F19 100%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)",
      },
      boxShadow: {
        "nexus-glow": "0 0 25px -5px rgba(124, 58, 237, 0.4)",
        "cyan-glow": "0 0 25px -5px rgba(6, 182, 212, 0.4)",
        "blue-glow": "0 0 25px -5px rgba(59, 130, 246, 0.4)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "gradient-x": "gradient-x 15s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "gradient-x": {
          "0%, 100%": { "background-size": "200% 200%", "background-position": "left center" },
          "50%": { "background-size": "200% 200%", "background-position": "right center" },
        },
      },
    },
  },
  plugins: [],
};
