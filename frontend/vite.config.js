import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', 
  build: {
    outDir: 'dist', 
    sourcemap: true, 
  },
  server: {
    proxy: {
      // Proxy for authentication endpoints during development
      "/authentication": {
        target: "https://api.themoviedb.org/3",
        changeOrigin: true,
        // Remove redundant rewrite (already proxies to /authentication)
      },
      // Proxy for other TMDB API endpoints during development
      "/api": {
        target: "https://api.themoviedb.org/3",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});