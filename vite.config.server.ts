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
      // 2. ONLY externalize raw react core to prevent multiple instance conflicts.
      // Removed 'react-router-dom' and 'react-helmet-async' from here so they get bundled!
      external: ['react', 'react-dom'],
    },
    // 3. Disabled minification for the server build
    minify: false,
    emptyOutDir: true,
  },
  ssr: {
    // FORCE Vite to pull router modules into the compilation bundle.
    // This stops them from creating raw runtime require() statements that crash under Node 20.
    noExternal: ['react-router-dom', 'react-router', '@remix-run/router', 'react-helmet-async'],
    external: ['react', 'react-dom'],
  },
  define: {
    global: 'globalThis',
  },
});