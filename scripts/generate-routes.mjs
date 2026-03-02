import { build } from 'esbuild';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const routesSrcPath = path.resolve(__dirname, '../src/ssg-routes.ts');
const routesDestPath = path.resolve(__dirname, 'ssg-routes.js');

async function generateRoutes() {
  console.log('Generating routes for prerender...');
  try {
    // Use esbuild to compile the TS file to a JS file
    await build({
      entryPoints: [routesSrcPath],
      outfile: routesDestPath,
      bundle: true,
      platform: 'node',
      format: 'esm',
      external: [], // No externals, bundle everything
    });
    console.log(`Successfully generated ${routesDestPath}`);
  } catch (error) {
    console.error('Failed to generate routes:', error);
    process.exit(1);
  }
}

generateRoutes();
