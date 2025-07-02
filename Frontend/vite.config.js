import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.REACT_APP_BACKEND_URL': '"https://proyect-desarrollo-software-production.up.railway.app/api"'
  },
  server: {
    host: '0.0.0.0', // Permite conexiones externas
    port: 5173
  },
  preview: {
    host: '0.0.0.0',
    port: 5173
  }
})