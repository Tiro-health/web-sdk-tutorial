import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/web-sdk-tutorial/npm-react/' : '/',
  server: {
    proxy: {
      '/api/fhir': {
        target: 'https://reports.tiro.health',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/fhir/, '/fhir'),
        secure: false,
      }
    }
  }
})
