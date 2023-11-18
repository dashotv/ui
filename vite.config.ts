import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import viteTsconfigPaths from 'vite-tsconfig-paths';

import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // depending on your application, base can also be "/"
  base: '/',
  plugins: [react(), nodePolyfills(), viteTsconfigPaths()],
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
