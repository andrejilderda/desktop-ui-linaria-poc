import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import linaria from "@linaria/vite";

export default defineConfig({
  plugins: [
    react(),
    linaria({
      include: ["**/*.{ts,tsx}"],
      exclude: ["**/*.html", "**/node_modules/**"],
      babelOptions: {
        presets: [
          "@babel/preset-typescript",
          "@babel/preset-react",
          "@linaria",
        ],
      },
    }),
  ],
});
