import path from 'path';
import { defineConfig, type UserConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // .env 파일 로드를 위해 다음 줄을 추가합니다.
  const env = loadEnv(mode, process.cwd(), '');

  const config: UserConfig = {
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    assetsInclude: ['**/*.lottie'],
    server: {
      host: 'localhost',
      port: 5173,
      https: {
        key: path.resolve(__dirname, 'localhost-key.pem'),
        cert: path.resolve(__dirname, 'localhost.pem'),
      },
      // 아래 proxy 객체를 추가합니다.
      proxy: {
        '/api/notifications/subscribe': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false, // SSL 인증서 검증 무시
          ws: true, // SSE/웹소켓을 위한 옵션입니다.
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
