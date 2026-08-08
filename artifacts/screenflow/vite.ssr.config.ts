import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "..", "..", "attached_assets"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/ssr"),
    emptyOutDir: true,
    ssr: true,
    rollupOptions: {
      input: path.resolve(import.meta.dirname, "src/ssr-entry.tsx"),
      output: {
        entryFileNames: "index.js",
      },
      onwarn(warning, defaultHandler) {
        if (
          warning.code === "SOURCEMAP_ERROR" &&
          warning.message.includes("resolve original location")
        ) {
          return;
        }
        defaultHandler(warning);
      },
    },
  },
  ssr: {
    noExternal: true,
  },
});
