import path from 'path';
import { defineConfig, type UserConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const publicBasePath = env.VITE_PUBLIC_BASE_PATH || (mode === 'production' ? '/pull-it/' : '/');
  const developmentApiOrigin = env.PULLIT_DEV_API_ORIGIN?.trim();
  const publicBasePrefix = publicBasePath.replace(/\/$/, '');

  const isLocalDevelopmentOrigin = (origin: string) => {
    const hostname = new URL(origin).hostname;
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
  };

  const proxyPath = (suffix: string) => `${publicBasePrefix}${suffix}`;
  const stripPublicBasePrefix = (requestPath: string) =>
    requestPath.startsWith(publicBasePrefix)
      ? requestPath.slice(publicBasePrefix.length) || '/'
      : requestPath;

  const developmentApiProxy = developmentApiOrigin
    ? {
        [proxyPath('/api')]: {
          target: developmentApiOrigin,
          changeOrigin: true,
          secure: !isLocalDevelopmentOrigin(developmentApiOrigin),
          rewrite: stripPublicBasePrefix,
          ws: true,
        },
        [proxyPath('/auth')]: {
          target: developmentApiOrigin,
          changeOrigin: true,
          secure: !isLocalDevelopmentOrigin(developmentApiOrigin),
          rewrite: stripPublicBasePrefix,
        },
        [proxyPath('/oauth2')]: {
          target: developmentApiOrigin,
          changeOrigin: true,
          secure: !isLocalDevelopmentOrigin(developmentApiOrigin),
          rewrite: stripPublicBasePrefix,
        },
        [proxyPath('/login/oauth2')]: {
          target: developmentApiOrigin,
          changeOrigin: true,
          secure: !isLocalDevelopmentOrigin(developmentApiOrigin),
          rewrite: stripPublicBasePrefix,
        },
      }
    : undefined;

  const config: UserConfig = {
    base: publicBasePath,
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
      proxy: developmentApiProxy,
    },
  };

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
