/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "royal-blue": "#0033a1",
        // e.g. {element}-royal-blue

        "pure-white": "#ffffff",
        // e.g. {element}-pure-white

        "dark-royal-blue": "#002066",
        // e.g. {element}-dark-royal-blue

        feedback: {
          success: "#00a12d",
          // e.g. {element}-feedback-success
          
          warning: "#a10000",
          // e.g. {element}-feedback-warning

        },
        gray: {
          1: "#fafafc",
          // e.g. {element}-gray-1

          2: "#e5e8eb",
          // e.g. {element}-gray-2

          3: "#c7cacc",
          // e.g. {element}-gray-3

          4: "#a2a4a6",
          // e.g. {element}-gray-4

          5: "#353637",
          // e.g. {element}-gray-5

          6: "#141414",
          // e.g. {element}-gray-6

        },
      },
      screens: {
        sm: "0px",
        // => @media (min-width: 640px) { ... }

        md: "768px",
        // => @media (min-width: 768px) { ... }

        lg: "1024px",
        // => @media (min-width: 1024px) { ... }

        xl: "1280px",
        // => @media (min-width: 1280px) { ... }

        "2xl": "1536px",
        // => @media (min-width: 1536px) { ... }

        "max-2xl": { max: "1535px" },
        // => @media (max-width: 1535px) { ... }

        "max-xl": { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        "max-lg": { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        "max-md": { max: "767px" },
        // => @media (max-width: 767px) { ... }

        "max-sm": { max: "639px" },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [],
};
