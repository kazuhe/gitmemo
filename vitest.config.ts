import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/__tests__/**/*.+(ts|js)"],
    watch: false,
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
});
