import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import commonjs from "vite-plugin-commonjs"

export default defineConfig(() => {
  return {
    base: "",
    build: {
      outDir: "build",
    },
    plugins: [react(), commonjs()],
  }
})
