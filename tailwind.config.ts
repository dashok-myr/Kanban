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
      colors: {
        "dark-purple": "#635FC7",
        "light-purple": "#A8A4FF",
        gray: "#828FA3",
        "light-gray": "#F4F7FD",
      },
    },
  },
  plugins: [],
};
export default config;
