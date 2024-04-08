import { defineConfig } from "vite";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: resolve(__dirname, "src/main.ts"),
      name: "Simple Event Target",
      fileName: "simple-event-target",
    },
  },
  test: {
    root: "./src/simple-event-target",
  },
  plugins: [dts({ exclude: "**/*.test.*" })],
});
