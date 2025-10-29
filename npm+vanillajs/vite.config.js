import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/web-sdk-tutorial/npm-vanillajs/' : '/',
  server: {
    port: 3001,
    host: '0.0.0.0',
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser'
  }
})
