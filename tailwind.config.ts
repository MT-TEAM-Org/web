import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
      },
      animation: {
        fadeOut: "fadeOut 0.5s ease-in-out 2.5s forwards",
      },
      colors: {
        Primary: "#1228EF",
        Secondary: "#1024D3",
        Tertiary: "#0E1FAD",
        Quaternary: "#09126D",
        Fifth: "#000641",
        bg1: "#FAFBFF",
        bg2: "#F3F4FE",
        bg3: "#E8EAFE",
        bg4: "#DCDFFD",
        bg5: "#D0D4FC",
        warning: "#D1504B",
        alert: "F89E21",
        ing: "#04C52E",
        finish: "#0066FF",
        white: "#FFFFFF",
        gray1: "#FAFAFA",
        gray2: "#EEEEEE",
        gray3: "#DBDBDB",
        gray4: "#CBCBCB",
        gray5: "#A6A6A6",
        gray6: "#656565",
        gray7: "#424242",
        gray8: "#303030",
        gray9: "#181818",
        black: "#000000",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
