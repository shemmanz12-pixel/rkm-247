import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isLibBuild = mode === 'library';

  return {
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: 'public/_redirects',
            dest: '',
          },
          {
            src: 'public/robots.txt',
            dest: '',
          },
          {
            src: 'public/sitemap.xml',
            dest: '',
          },
        ],
      }),
    ],
    build: {
      lib: isLibBuild
        ? {
            entry: 'src/ssg-routes.ts',
            name: 'ssgRoutes',
            fileName: 'ssg-routes',
            formats: ['es'],
          }
        : undefined,
      outDir: isLibBuild ? 'dist-routes' : 'dist/client',
      rollupOptions: {
        // ... rollup options if needed
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});