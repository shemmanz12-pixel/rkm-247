import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// This is the config for the server-side build.
// It bundles the app into a single CJS module used by your SSG script to generate the HTML.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // 1. Aligned with your client config to prevent import "Not Found" errors
      '@': path.resolve(__dirname, './src'),
      // Kept your original alias just in case your entry-server uses it
      '/': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist/server',
    ssr: true, // Crucial: Tells Vite to compile for Node.js, not the browser
    lib: {
      entry: path.resolve(__dirname, 'src/entry-server.tsx'),
      name: 'Server',
      formats: ['cjs'],
      fileName: () => 'entry-server.cjs', // Explicitly name the output file to match the actual output
    },
    rollupOptions: {
      // 2. Externalize core React libraries
      // This prevents the dreaded "Multiple instances of React" error during the SSG build
      external: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
    },
    // 3. Disabled minification for the server build
    // Minifying the SSG script just slows down your build time. The end-user never downloads this file.
    minify: false,
    emptyOutDir: true,
  },
  ssr: {
    // Ensure Node doesn't try to bundle these into the CJS file
    external: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
  },
  define: {
    'global': 'globalThis',
  },
});