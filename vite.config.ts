import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  root: "packages/client/src/",
  server: {
    proxy: {
      "/api": "http://localhost:8000",
    },
  },
});
