import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#A3BBAC",
        secondary: "#FCDC94",
        accent: "#C8CFA0",
        muted: "#EF9C66",
      },
    },
  },
  plugins: [daisyui],
};

export default config;
