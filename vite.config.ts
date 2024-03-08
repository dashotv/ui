import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import viteTsconfigPaths from 'vite-tsconfig-paths';

import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';
import federation from '@originjs/vite-plugin-federation';
import react from '@vitejs/plugin-react';

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
        name: 'runic',
        remotes: {
          runic: '/api/runic/assets/remote.js',
        },
        shared: [
          'react',
          'react-dom',
          'react-router-dom',
          'axios',
          'react-truncate-inside',
          'dayjs',
          'react-helmet-async',
          'react-hook-form',
          '@mui/material',
          '@mui/icons-material',
          '@tanstack/react-query',
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
          target: 'http://localhost:9000',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: path => path.replace(/^\/api\/tower/, ''),
        },
        '/api/flame': {
          target: 'http://localhost:9001',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: path => path.replace(/^\/api\/flame/, ''),
        },
        '/api/runic': {
          target: 'http://localhost:9002',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: path => path.replace(/^\/api\/runic/, ''),
        },
        '/api/scry': {
          target: 'http://localhost:10080',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: path => path.replace(/^\/api\/scry/, ''),
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
