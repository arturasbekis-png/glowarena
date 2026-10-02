import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

const fromRoot = (path: string) => fileURLToPath(new URL(path, import.meta.url));

export default defineConfig({
  base: '/glowarena/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fromRoot('./src'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        main: fromRoot('./index.html'),
        admin: fromRoot('./admin.html'),
      },
    },
  },
});