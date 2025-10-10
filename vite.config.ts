import path from 'path';
import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
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
