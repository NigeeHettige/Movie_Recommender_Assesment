import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/authentication": {
        target: "https://api.themoviedb.org/3",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/authentication/, "/authentication"),
      },
      "/api": {
        target: "https://api.themoviedb.org/3",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      
    },}
})
