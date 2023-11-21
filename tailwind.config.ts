import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      visibility: ["group-hover"],
      colors: {
        "dark-purple": "#635FC7",
        "light-purple": "#A8A4FF",
        "dark-black": "#000112",
        "dark-gray1": "#20212C",
        "dark-gray": "#2B2C37",
        "med-gray": "#3E3F4E",
        gray1: "#E4EBFA",
        gray: "#828FA3",
        "light-gray": "#F4F7FD",
        destructive: "#EA5555",
        "destructive-light": "#FF9898",
      },
    },
  },
  plugins: [],
};
export default config;
