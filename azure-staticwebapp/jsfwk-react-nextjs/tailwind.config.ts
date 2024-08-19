import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./public/**/*.html",
    flowbite.content(),
  ],
  theme: {
    colors: {
      primary: {
        600: '#2563eb',
        700: '#1d4ed8',
      },
    }
  },
  darkMode: 'media',
  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
