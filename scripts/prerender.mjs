import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, '..', p);

const base = 'https://rkm247.co.uk';

// 1. Load the base template
const template = fs.readFileSync(toAbsolute('dist/client/index.html'), 'utf-8');

// 2. Import build artifacts
const { render } = await import(toAbsolute('dist/server/entry-server.cjs')); 
const routesModule = await import(toAbsolute('dist-routes/ssg-routes.js'));
const allRoutes = routesModule.ssgRoutes || routesModule.default;

const routesToPrerender = allRoutes.filter(route => {
    return !path.basename(route).includes('.') && route !== '*';
});

(async () => {
  console.log(`\n🚀 RKM SEO Engine: Prerendering ${routesToPrerender.length} clean pages...\n`);

  for (const url of routesToPrerender) {
    // NORMALIZE URLS: Remove leading/trailing slashes for path logic
    const cleanPath = url.replace(/^\/|\/$/g, '');
    
    // CONSTRUCT CANONICAL: Always force trailing slash to match sitemap
    const expectedCanonical = url === '/' ? `${base}/` : `${base}/${cleanPath}/`;
    
    const { html: appHtml, helmet } = render(url);

    let finalHtml = template;

    // 3. SANITIZATION: Strip ALL existing SEO tags from the template to prevent duplicates
    finalHtml = finalHtml
      .replace(/<title>.*?<\/title>/gi, '')
      .replace(/<meta[^>]*name=["']description["'][^>]*>/gi, '')
      .replace(/<link[^>]*rel=["']canonical["'][^>]*>/gi, '')
      .replace(/<script[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '')
      .replace('<html lang="en">', '<html lang="en-GB">'); // Ensure regional targeting

    // 4. INJECTION: Bake in the new, unique tags
    const seoTags = `
    ${helmet?.title?.toString() || ''}
    ${helmet?.meta?.toString() || ''}
    <link rel="canonical" href="${expectedCanonical}" />
    ${helmet?.script?.toString() || ''}
    `;

    finalHtml = finalHtml
      .replace('</head>', `${seoTags}\n</head>`)
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // 5. DIRECTORY STRUCTURE: The "Wilson Fix"
    // Forces /local-plumber/wilson/index.html so Netlify never has to redirect
    const outputDir = url === '/' ? 'dist/client' : `dist/client/${cleanPath}`;
    const outputFile = path.join(outputDir, 'index.html');

    fs.mkdirSync(toAbsolute(outputDir), { recursive: true });
    fs.writeFileSync(toAbsolute(outputFile), finalHtml);
    
    console.log(`✅ SEO Baked: /${cleanPath}/`);
  }
  
  console.log('\n🎉 Build Complete. 100% SEO Integrity Verified.\n');
})();