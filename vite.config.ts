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
      host: 'localhost',
      port: 5173,
      https: {
        key: path.resolve(__dirname, 'localhost-key.pem'),
        cert: path.resolve(__dirname, 'localhost.pem'),
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
