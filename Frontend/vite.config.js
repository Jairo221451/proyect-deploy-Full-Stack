import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    // Usar JSON.stringify para asegurar el formato correcto
    'process.env.REACT_APP_BACKEND_URL': JSON.stringify(process.env.REACT_APP_BACKEND_URL || 'https://proyect-desarrollo-software-production.up.railway.app/api')
  },
  server: {
    host: '0.0.0.0',
    port: 29575
  },
  preview: {
    host: '0.0.0.0',
    port: 5173
  }
})