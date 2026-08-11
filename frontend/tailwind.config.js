/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        whimsical: {
          sky: "#F0F9FF",        // Very soft background blue
          cloud: "#FFFFFF",      // Pure white for cards
          accent: "#38BDF8",     // Vibrant sky blue for buttons
          pastelPink: "#FFEDD5", // Soft coral/pink accent
          pastelGreen: "#DCFCE7",// Soft mint green accent
          textDark: "#1E293B",   // Soft charcoal
          textMuted: "#64748B",  // Slate blue-grey
        },
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'cloud': '0 20px 25px -5px rgba(224, 242, 254, 0.8), 0 8px 10px -6px rgba(224, 242, 254, 0.5)',
      }
    },
  },
  plugins: [],
};