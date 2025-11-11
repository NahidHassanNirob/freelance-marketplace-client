/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Space Grotesk", "system-ui", "sans-serif"],
        sans: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      colors: {
        lemon: {
          50: "#fffbe6",
          100: "#fff7cc",
          200: "#fff099",
          300: "#ffe866",
          400: "#ffe033",
          500: "#ffd800",
        },
        sky: {
          50: "#f0f8ff",
          100: "#d9eeff",
          200: "#b3ddff",
          300: "#8dccff",
          400: "#66bbff",
          500: "#40aaff",
        },
        coral: {
          50: "#fff1f0",
          100: "#ffd9d6",
          200: "#ffb3ad",
          300: "#ff8c85",
          400: "#ff665c",
          500: "#ff4033",
        },
        navy: "#19224a",
      },
      boxShadow: {
        playful: "0 12px 30px -10px rgba(12, 29, 74, 0.18)",
      },
      borderRadius: {
        squircle: "32px",
      },
      maxWidth: {
        content: "1100px",
      },
      minHeight: {
        touch: "44px",
        "touch-lg": "48px",
      },
      height: {
        dvh: "100dvh",
        "screen-safe": "calc(100vh - env(safe-area-inset-top) - env(safe-area-inset-bottom))",
      },
      padding: {
        safe: "env(safe-area-inset-bottom)",
      },
      screens: {
        mobile: "375px",
        "mobile-lg": "430px",
        tablet: "768px",
        desktop: "1024px",
      },
    },
  },
  // 👇 DaisyUI প্লাগইন যোগ করা হয়েছে 👇
  plugins: [
    require("daisyui"), 
  ],
  
  // 👇 ঐচ্ছিক: DaisyUI থিম কনফিগারেশন 👇
  daisyui: {
    themes: ["light", "dark", "cupcake"], // আপনি চাইলে থিমগুলো পরিবর্তন করতে পারেন
  },
}