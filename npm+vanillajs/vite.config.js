import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/web-sdk-tutorial/npm-vanillajs/' : '/',
  server: {
    port: 3000,
    host: '0.0.0.0',
    open: true,
    proxy: {
      '/api/fhir': {
        target: 'https://reports.tiro.health',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/fhir/, '/fhir'),
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser'
  }
})
