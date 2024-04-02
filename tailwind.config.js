module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
      },
      colors: {
        primary: {
          DEFAULT: "#02BFDF",
          100: "#F6FEFF",
        },
        white: {
          DEFAULT: "#FFFFFF",
        },
        gray: {
          DEFAULT: "#EDF0F2",
          100: "#4D696E",
          200: "#667779",
          300: "#94A8AA",
          400: "#F5F6F7",
          600: "#74807B",
        },
        green: {
          DEFAULT: "#20CC65",
          100: "#1CB57A",
        },
        blue: {
          DEFAULT: "#0EDCFE",
          200: "#02BFDF",
        },
        dark: {
          DEFAULT: "#061018",
        },
        red: {
          DEFAULT: "#E52E30",
          100: "#FEF5F5",
          200: "#E93B50",
        },
        yellow: {
          DEFAULT: "#F2B33A",
          100: "#FFF7E7",
        },
      },
      gridTemplateColumns: {
        "1-max": "1fr max-content",
        "max-1": "max-content 1fr",
        "max-1-max": "max-content 1fr max-content",
      },
      lineHeight: {
        14: "14px",
        20: "20px",
        23: "23px",
        110: "110%",
        130: "130%",
        140: "140%",
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        car: ["uzb-auto", "sans-serif"],
      },
      zIndex: {
        90: "90",
        100: "100",
      },
      fontSize: {
        xxs: "11px",
        "2xs": "0.8125rem", // 13px
        "4.5xl": "2.5rem", // 40px
        "3.5xl": "2rem", // 32px
      },
      boxShadow: {
        card: "0px 4px 20px 0px rgba(8, 213, 115, 0.20)",
        select: "0px 0px 50px 0px rgba(82, 63, 105, 0.15)",
        dropdown: "0px 8px 30px 0px rgba(25, 30, 54, 0.12)",
        tab: "0px 4px 8px 0px rgba(18, 28, 37, 0.10);",
        custom_select: "0px 8px 30px 0px rgba(25, 30, 54, 0.20)",
      },
    },
  },
  plugins: [],
};
