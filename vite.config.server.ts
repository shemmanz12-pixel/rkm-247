import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// This is the config for the server-side build.
// It bundles the app into a single CJS module that can be imported by Node.js.
export default defineConfig({
  plugins: [react()],
  // Prevent Vite from trying to resolve absolute paths in the server build
  resolve: {
    alias: {
      '/': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // The server build output directory
    outDir: 'dist-server',
    // Build as a library
    lib: {
      entry: path.resolve(__dirname, 'src/entry-server.tsx'),
      name: 'Server',
      // The format must be 'cjs' for Node.js compatibility
      formats: ['cjs'],
    },
    // Important for server-side code
    ssr: true,
    // Minify to reduce file size
    minify: 'terser',
    // Ensure we don't have an empty outDir warning
    emptyOutDir: true,
  },
  // Define `global` for any packages that might expect it in a Node environment
  define: {
    'global': 'globalThis',
  },
});
