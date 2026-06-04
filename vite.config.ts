import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import path from 'path';
import fs from 'fs';

// Import your routes to guarantee the sitemap matches the built pages exactly
import ssgRoutes from './src/ssg-routes'; 

// Custom plugin to generate sitemap.xml automatically after build
function generateSitemap() {
  return {
    name: 'generate-sitemap',
    // closeBundle runs after Vite has finished writing the dist folder
    closeBundle() {
      const hostname = 'https://rkm247.co.uk';
      const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
      
      // Build the XML structure
      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ssgRoutes.map((route) => `  <url>
    <loc>${hostname}${route === '/' ? '' : route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>`;
      
      // Determine output directory based on your config (dist/client)
      const outDir = path.resolve(__dirname, 'dist/client');
      const sitemapPath = path.resolve(outDir, 'sitemap.xml');
      
      // Write the file
      if (fs.existsSync(outDir)) {
        fs.writeFileSync(sitemapPath, sitemap, 'utf-8');
        console.log(`\n✅ Sitemap successfully generated with ${ssgRoutes.length} URLs at ${sitemapPath}\n`);
      }
    }
  };
}

export default defineConfig(({ mode }) => {
  const isLibBuild = mode === 'library';

  return {
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: 'public/robots.txt',
            dest: '',
          },
        ],
      }),
      // Only generate the sitemap during the main client build, not the library build
      !isLibBuild && generateSitemap(),
    ],
    // ADDED: Force Vite to bundle react-router modules into the SSR bundle directly
    // This stops it from generating raw require('react-router-dom') calls that break commonJS boundaries
    ssr: {
      noExternal: ['react-router-dom', 'react-router', '@remix-run/router'],
    },
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