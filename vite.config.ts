import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    // 8080 é a porta do backend Spring Boot — manter portas separadas.
    port: 5173,
  },
  plugins: [react(), vanillaExtractPlugin()],
  resolve: {
    alias: {
      "@theme": path.resolve(__dirname, "./src/design-system"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
