import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const renderHost = process.env.RENDER_EXTERNAL_HOSTNAME;
const allowedHosts = renderHost
  ? [renderHost, "aaruke-brand-identity.onrender.com"]
  : ["aaruke-brand-identity.onrender.com"];

export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 5173,
    allowedHosts,
    hmr: {
      overlay: false,
    },
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
}));
