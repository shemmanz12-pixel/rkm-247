#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const TOWN_CONFIG = path.join(ROOT, 'src', 'townConfig.ts');
const PUBLIC_DIR = path.join(ROOT, 'public');
const SITEMAP = path.join(PUBLIC_DIR, 'sitemap.xml');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function extractObjectLiteral(src) {
  const m = src.match(/export\s+const\s+towns[\s\S]*?=\s*({[\s\S]*})\s*;?\s*$/m);
  if (!m) return null;
  return m[1];
}

function tsObjectToJson(text) {
  // Quote unquoted keys that look like identifiers wrapped in single quotes already
  // Convert single-quoted keys to double-quoted keys
  let t = text.replace(/'([a-zA-Z0-9_\-]+)'\s*:/g, '"$1":');
  // Convert single-quoted string values to double quotes if any
  t = t.replace(/:\s*'([^']*)'/g, ': "$1"');
  // Remove trailing commas before closing braces/brackets
  t = t.replace(/,\s*([}\]])/g, '$1');
  return t;
}

function parseTowns() {
  if (!fs.existsSync(TOWN_CONFIG)) {
    console.error('townConfig.ts not found at', TOWN_CONFIG);
    process.exit(1);
  }
  const src = fs.readFileSync(TOWN_CONFIG, 'utf8');

  // Extract MAIN_MAP_LINK value so we can replace references inside the object literal
  const mainLinkMatch = src.match(/const\s+MAIN_MAP_LINK\s*=\s*["']([^"']+)["']/);
  const mainMapValue = mainLinkMatch ? mainLinkMatch[1] : MAIN_MAP_LINK;

  const objText = extractObjectLiteral(src);
  if (!objText) {
    console.error('Could not find exported towns object in townConfig.ts');
    process.exit(1);
  }

  // Replace MAIN_MAP_LINK usages with the actual quoted value to make the object JSON/eval-safe
  const safeObjText = objText.replace(/\bMAIN_MAP_LINK\b/g, JSON.stringify(mainMapValue));

  const jsonLike = tsObjectToJson(safeObjText);
  try {
    const parsed = JSON.parse(jsonLike);
    return parsed;
  } catch (e) {
    // Fallback: evaluate safely in new Function
    try {
      // Wrap in parentheses to return the object
      // eslint-disable-next-line no-new-func
      const fn = new Function('return (' + safeObjText + ');');
      const evaluated = fn();
      return evaluated;
    } catch (err) {
      console.error('Failed to parse or eval towns object:', err.message);
      process.exit(1);
    }
  }
}

function buildLandingHtml(slug, data) {
  const title = data.name ? `${data.name} Plumber | Local & Emergency Plumbing` : 'Local Plumber';
  const desc = data.metaDescription || data.description || data.localSpice || `Local plumbing and heating services in ${data.name || slug}. Call ${data.phone || '01530 654062'}.`;
  const phone = data.phone || '01530 654062';
  const mapLink = data.mapSrc || '/';

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(desc)}">
  <!-- canonical tag removed: canonical management handled during postbuild reset -->
  <link rel="icon" href="/logo-square.webp" type="image/webp">
  <style>body{font-family:Arial,Helvetica,sans-serif;margin:0;padding:24px;color:#111}h1{color:#0b1220}a{color:#A6892C}</style>
</head>
<body>
  <main style="max-width:900px;margin:0 auto">
    <h1>${escapeHtml(title)}</h1>
    <p>${escapeHtml(desc)}</p>
    <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
    <p><strong>Serving:</strong> ${escapeHtml(data.name || slug)}</p>
    <p><a href="/locations/">Browse all service areas</a> • <a href="/services/">View services</a></p>
    <div style="margin-top:18px;border-radius:10px;overflow:hidden;height:360px;border:1px solid #e5e7eb">
      <iframe src="${escapeAttr(mapLink)}" width="100%" height="100%" style="border:0" loading="lazy" title="Service area map"></iframe>
    </div>
  </main>
</body>
</html>`;
}

function escapeHtml(s) {
  if (!s) return '';
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function escapeAttr(s) { return escapeHtml(s).replace(/'/g, '&#39;'); }

function ensureSitemapIncludes(slugs) {
  if (!fs.existsSync(SITEMAP)) {
    console.warn('public/sitemap.xml missing, creating minimal sitemap');
    const base = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://rkm247.co.uk/</loc><priority>1.0</priority></url>\n</urlset>`;
    fs.writeFileSync(SITEMAP, base, 'utf8');
  }
  let xml = fs.readFileSync(SITEMAP, 'utf8');
  for (const slug of slugs) {
    const loc = `https://rkm247.co.uk/${slug}/`;
    if (!xml.includes(`<loc>${loc}</loc>`)) {
      // insert before </urlset>
      xml = xml.replace(/<\/urlset>\s*$/m, `  <url>\n    <loc>${loc}</loc>\n    <priority>0.7</priority>\n    <changefreq>weekly</changefreq>\n  </url>\n</urlset>`);
      console.log('Added to sitemap:', loc);
    }
  }
  fs.writeFileSync(SITEMAP, xml, 'utf8');
}

(async function main(){
  const towns = parseTowns();
  ensureDir(PUBLIC_DIR);

  const slugs = Object.keys(towns);
  for (const slug of slugs) {
    const data = towns[slug] || {};
    const outDir = path.join(PUBLIC_DIR, slug);
    ensureDir(outDir);
    const html = buildLandingHtml(slug, data);
    fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
    console.log('Wrote landing page for', slug);
  }

  // Add town root URLs to sitemap
  ensureSitemapIncludes(slugs);

  console.log('Done: generated', slugs.length, 'landing pages into public/');
})();
