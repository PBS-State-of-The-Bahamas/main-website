/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      openSans: ["Open Sans", "sans-serif"],
    },
    fontSize: {
      sm: '0.75rem',
      base: '1rem',
      xl: '1.25rem',
      'heading-1': ['3rem', {fontWeight: '700', lineHeight: '3rem'}],
      'heading-2': ['2.5rem', {fontWeight: '700'}],
      'heading-3': ['2rem', {fontWeight: '700'}],
      'heading-4': ['1.5rem', {fontWeight: '700'}],
      'heading-5': ['1.25rem', {fontWeight: '700'}],
      'heading-6': ['0.75rem', {fontWeight: '700', letterSpacing: '0.015em', textTransform: 'uppercase'}],
    },
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
        laptop: "1080px",
        sm: "480px",
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
