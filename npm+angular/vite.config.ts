import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig({
  plugins: [
    angular({
      tsconfig: './tsconfig.app.json',
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 3400,
    cors: true,
    headers: {
      'X-Frame-Options': 'ALLOWALL',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    target: 'es2022',
  },
  define: {
    'process.env': {},
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@tiro-health/web-sdk'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});