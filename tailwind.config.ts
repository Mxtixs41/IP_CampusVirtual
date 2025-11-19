import type { Config } from "tailwindcss";

const config: Config = {
  // Aquí está el truco: agregamos rutas para "app", "pages" y "components" por si acaso
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#003366',
          yellow: '#FFB81C',
          light: '#F3F4F6',
        },
      },
    },
  },
  plugins: [],
};
export default config;