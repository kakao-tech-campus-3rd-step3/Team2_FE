import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: 'local.pull.it.kr', // ← 추가
    port: 5173, // (원하는 포트, 기본 5173인데 3000으로 고정해도 됨)
  },
});
