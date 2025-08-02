import { heroui } from "@heroui/theme";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeOut: {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(10px)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(720deg)" },
        },
      },
      animation: {
        fadeOut: "fadeOut 0.5s ease-in-out 2.5s forwards",
        spin: "spin 0.5s cubic-bezier(0.42, 0, 0.58, 1)",
      },
      screens: {
        mobile: { max: "768px" },
        tablet: { min: "769px", max: "1279px" },
        pc: { min: "1280px" },
      },
      boxShadow: {
        "soft-md": "0px 6px 10px 0px rgba(0, 0, 0, 0.05)",
      },

      colors: {
        Primary: "#00ADEE",
        Secondary: "#009AD4",
        Tertiary: "#008ABE",
        quaternary: "#0076A2",
        Fifth: "#00516F",
        gra: "#00ADEE",
        bg0: "#F8FDFF",
        bg1: "#FAFBFF",
        bg2: "#F3F4FE",
        bg3: "#E8EAFE",
        bg4: "#DCDFFD",
        bg5: "#D0D4FC",

        warning: "#D1504B",
        new: "#DC2800",
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
        //토스트팝업 색상
        toastSuccess: "#009AD4",
        toastInfo: "#FFFFFF",
        toastInfoBorder: "#FAFAFA",
        toastWarning: "#FFFFFF",
        toastWarningBorder: "#D1504B",
        toastError: "#D1504B",
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;
