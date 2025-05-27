import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      animation: {
        "bounce-slow": "bounce 3s infinite",
      },
    },
  },
  plugins: [react(), tailwindcss()],
});
