import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // The site will live at https://brightkakatech.github.io/Portfolio/
  // so Vite must build all file paths starting with /Portfolio/
  base: "/Portfolio/",
});