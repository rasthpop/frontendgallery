import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://backend-steel-kappa.vercel.app', // Адреса вашого бекенду
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Перенаправлення шляху
      }
    }
  }
})


