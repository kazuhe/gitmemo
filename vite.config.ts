import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "node:path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  root: path.join(__dirname, "src", "client"),
  build: {
    outDir: path.join(__dirname, "dist", "client"),
  }
})
