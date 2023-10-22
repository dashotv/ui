import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // depending on your application, base can also be "/"
  base: '/',
  plugins: [react(), viteTsconfigPaths()],
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
  },
});
