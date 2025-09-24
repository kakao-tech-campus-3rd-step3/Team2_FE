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
    assetsInclude: ['**/*.lottie'],
    server: {
      host: 'local.pull.it.kr',
      port: 5173,
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: true,
          configure: proxy => {
            proxy.on('proxyReq', (proxyReq, req) => {
              // Vercel 프록시('api/proxy.ts')와 동일한 로직을 적용합니다.
              // '/api/oauth2/...'로 시작하는 요청은 '/api'를 제거하여 백엔드로 전달합니다.
              if (req.url?.startsWith('/api/oauth2/')) {
                proxyReq.path = req.url.substring(4);
              }

              // 기존 Basic 인증 헤더 추가 로직은 그대로 유지합니다.
              if (authHeader) {
                proxyReq.setHeader('Authorization', authHeader);
              }
            });
          },
        },
      },
    },
  };
});
