import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Increase chunk size warning threshold
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks - separate heavy libs from main bundle
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-3d": ["three", "@react-three/fiber", "@react-three/drei"],
          "vendor-animation": ["framer-motion", "gsap"],
          "vendor-ui": ["@radix-ui/react-dialog", "@radix-ui/react-popover", "@radix-ui/react-select"],
          "vendor-ai": ["@google/generative-ai"],
        },
      },
    },
  },
}));
