import { defineConfig, loadEnv } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr';
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
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        onLog(level, log, handler) {
          if (log.code === "MODULE_LEVEL_DIRECTIVE") {
            return;
          }
          handler(level, log);
        },
      },
    },
    plugins: [
      react(),
      nodePolyfills(),
      viteTsconfigPaths(),
      svgr(),
      federation({
        name: 'remote',
        remotes: {
          runic: '/api/runic/assets/remote.js',
          minion: '/api/minion/assets/remote.js',
          rift: '/api/rift/assets/remote.js',
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
          'react-router-dom',
          'react-truncate-inside',
          'react',
          'styled-components',
        ],
      }),
    ],
    optimizeDeps: {
      include: ['@mui/material/Unstable_Grid2/Grid2'], // https://github.com/vitejs/vite/issues/12423#issuecomment-1779443566
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
      host: true,
      proxy: {
        '/thumbs': {
          target: process.env.VITE_APP_PLEX_URL,
          changeOrigin: true,
          secure: false,
          ws: false,
          rewrite: path => path.replace(/^\/thumbs\/(.*)/, '/$1?' + process.env.VITE_APP_PLEX_QUERY),
        },
        '/api/tower': {
          target: 'http://host.docker.internal:59000',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: path => path.replace(/^\/api\/tower/, ''),
        },
        '/api/flame': {
          target: 'http://host.docker.internal:59001',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: path => path.replace(/^\/api\/flame/, ''),
        },
        '/api/runic': {
          target: 'http://host.docker.internal:59002',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: path => path.replace(/^\/api\/runic/, ''),
        },
        '/api/scry': {
          target: 'http://host.docker.internal:59003',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: path => path.replace(/^\/api\/scry/, ''),
        },
        '/api/minion': {
          target: 'http://host.docker.internal:59010',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: path => path.replace(/^\/api\/minion/, ''),
        },
        '/api/rift': {
          target: 'http://host.docker.internal:59006',
          changeOrigin: true,
          secure: false,
          ws: true,
          rewrite: path => path.replace(/^\/api\/rift/, ''),
        },
        '/media-images': {
          target: 'https://www.dasho.tv',
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
  });
};
