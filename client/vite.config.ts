import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    // In dev, forward /api to the Express server so no CORS setup is needed.
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
