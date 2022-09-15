import path from "node:path";
import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: path.join(__dirname, "src", "client"),
  build: {
    outDir: path.join(__dirname, "dist", "client"),
  },
  server: {
    proxy: {
      "/api": "http://localhost:3000",
      "/socket.io": {
        target: "ws://localhost:3000",
        ws: true,
      },
    },
  },
});
