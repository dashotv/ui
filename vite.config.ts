import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import viteTsconfigPaths from 'vite-tsconfig-paths';

import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    // depending on your application, base can also be "/"
    base: '/',
    build: {
      target: 'esnext', //browsers can handle the latest ES features
    },
    plugins: [
      react(),
      nodePolyfills(),
      viteTsconfigPaths(),
      federation({
        name: 'remote',
        remotes: {
          runic: '/api/runic/assets/remote.js',
          minion: '/api/minion/assets/remote.js',
        },
        shared: [
          '@emotion/react',
          '@emotion/styled',
          '@mui/icons-material',
          '@mui/material',
          '@tanstack/react-query-devtools',
          '@tanstack/react-query',
          '@trivago/prettier-plugin-sort-imports',
          'axios',
          'dayjs',
          'notistack',
          'prettier',
          'react-dom',
          'react-error-boundary',
          'react-helmet-async',
          'react-hook-form',
          'react-icons',
          'react-router-dom',
          'react-truncate-inside',
          'react',
        ],
      }),
    ],
    optimizeDeps: {
      esbuildOptions: {
        plugins: [esbuildCommonjs(['react-moment'])],
      },
    },
    //   test: {
    //     globals: true,
    //     environment: 'jsdom',
    //     setupFiles: './src/setupTests.ts',
    //     css: true,
    //     reporters: ['verbose'],
    //     coverage: {
    //       reporter: ['text', 'json', 'html'],
    //       include: ['src/**/*'],
    //       exclude: [],
    //     },
    //   },
    server: {
      // this ensures that the browser opens upon server start
      open: true,
      // this sets a default port to 3000
      port: 3000,
      proxy: {
        '/thumbs': {
          target: process.env.VITE_APP_PLEX_URL,
          changeOrigin: true,
          secure: false,
          ws: false,
          rewrite: path => path.replace(/^\/thumbs\/(.*)/, '/$1?' + process.env.VITE_APP_PLEX_QUERY),
        },
        '/api/tower': {
          target: 'http://localhost:59000',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: path => path.replace(/^\/api\/tower/, ''),
        },
        '/api/flame': {
          target: 'http://localhost:59001',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: path => path.replace(/^\/api\/flame/, ''),
        },
        '/api/runic': {
          target: 'http://localhost:59002',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: path => path.replace(/^\/api\/runic/, ''),
        },
        '/api/scry': {
          target: 'http://localhost:59003',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: path => path.replace(/^\/api\/scry/, ''),
        },
        '/api/minion': {
          target: 'http://localhost:59010',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: path => path.replace(/^\/api\/minion/, ''),
        },
        '/media-images': {
          target: 'http://seer.dasho.net/',
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
  });
};
