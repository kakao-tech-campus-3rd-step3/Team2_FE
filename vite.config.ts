import path from 'path';

import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  const basicUser = env.VITE_BASIC_USER;
  const basicPass = env.VITE_BASIC_PASS;

  const computeAuthHeader = (): string | undefined => {
    if (basicUser && basicPass) {
      const token = Buffer.from(`${basicUser}:${basicPass}`).toString('base64');
      return `Basic ${token}`;
    }
    return undefined;
  };

  const authHeader = computeAuthHeader();

  const proxyTarget = env.VITE_API_BASE_URL;

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: 'local.pull.it.kr',
      port: 5173,
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: true,
          configure: (proxy) => {
            if (!authHeader) return;
            proxy.on('proxyReq', (proxyReq) => {
              proxyReq.setHeader('Authorization', authHeader);
            });
          },
        },
      },
    },
  };
});
