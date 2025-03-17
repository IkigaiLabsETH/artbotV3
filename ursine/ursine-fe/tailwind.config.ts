import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        berry: "#3d84ff",
        jelly: "#ff70b8",
        kiwi: "#37d277",
        lemon: "#f5be00",
        plum: "#8d70ff",
        mint: "#55bbff",
        tango: "#ff932e",
        cherry: "#ff5752",
        "dark-primary": "#111827",
        "dark-secondary": "#1f2937",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        'safe-bottom': 'env(safe-area-inset-bottom)',
      },
    },
  },
  plugins: [],
};
export default config;
