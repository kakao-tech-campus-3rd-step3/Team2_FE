import path from 'path';
import { defineConfig, loadEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const proxyTarget = env.VITE_API_BASE_URL;

  const config: UserConfig = {
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
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq, req) => {
              // Vercel 프록시와 동일하게 '/api/oauth2/...' 요청 경로 수정
              if (req.url?.startsWith('/api/oauth2/')) {
                proxyReq.path = req.url.substring(4);
              }
              // 클라이언트가 보낸 'Authorization' 헤더는 자동으로 전달됩니다.
            });
          },
        },
      },
    },
  };

  // 프로덕션 모드일 때만 빌드 설정을 추가합니다.
  if (mode === 'production') {
    config.build = {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: false,
        },
      },
    };
  }

  return config;
});
