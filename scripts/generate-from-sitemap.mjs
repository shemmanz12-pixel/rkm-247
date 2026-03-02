#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const SITEMAP = path.join(ROOT, 'public', 'sitemap.xml');
const PUBLIC = path.join(ROOT, 'public');
const DIST = path.join(ROOT, 'dist');

if (!fs.existsSync(SITEMAP)) {
  console.error('sitemap.xml not found at', SITEMAP);
  process.exit(1);
}

const xml = fs.readFileSync(SITEMAP, 'utf8');
const locRe = /<loc>([^<]+)<\/loc>/gi;
let m;
const urls = [];
while ((m = locRe.exec(xml)) !== null) urls.push(m[1]);

function prettyName(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function stripCanonical(html) {
  return html.replace(/<link\s+[^>]*rel=(?:"|')canonical(?:"|')[^>]*>\s*/gi, '');
}

function ensureDir(dir) { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); }

let created = 0;
for (const u of urls) {
  try {
    const url = new URL(u);
    const parts = url.pathname.split('/').filter(Boolean);
    if (parts.length !== 2) continue; // we only handle /service/town
    const [service, town] = parts;

    // source html: prefer public/<town>/index.html
    const srcTown = path.join(PUBLIC, town, 'index.html');
    const srcRoot = path.join(PUBLIC, 'index.html');
    let html = null;
    if (fs.existsSync(srcTown)) html = fs.readFileSync(srcTown, 'utf8');
    else if (fs.existsSync(srcRoot)) html = fs.readFileSync(srcRoot, 'utf8');
    else html = `<!doctype html>\n<html><head><meta charset="utf-8"><title>${service} ${prettyName(town)}</title></head><body><h1>${service} ${prettyName(town)}</h1><p>Content placeholder.</p></body></html>`;

    html = stripCanonical(html);

    // update title and first h1
    const label = service.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const prettyTown = prettyName(town);
    if (/<title>[\s\S]*?<\/title>/i.test(html)) {
      html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${label} ${prettyTown} | Local & Emergency Plumbing</title>`);
    } else if (html.includes('</head>')) {
      html = html.replace('</head>', `<title>${label} ${prettyTown} | Local & Emergency Plumbing</title>\n</head>`);
    }

    if (/<h1>[\s\S]*?<\/h1>/i.test(html)) {
      html = html.replace(/<h1>[\s\S]*?<\/h1>/i, `<h1>${label} ${prettyTown}</h1>`);
    } else if (html.includes('<body')) {
      html = html.replace(/(<body[^>]*>)/i, `$1\n  <h1>${label} ${prettyTown}</h1>`);
    }

    // write to dist/service/town/index.html if missing or overwrite
    const outDir = path.join(DIST, service, town);
    ensureDir(outDir);
    const outFile = path.join(outDir, 'index.html');
    fs.writeFileSync(outFile, html, 'utf8');
    console.log('wrote', path.relative(ROOT, outFile));
    created++;
  } catch (e) {
    // ignore invalid urls
  }
}

console.log('generate-from-sitemap: done — created', created, 'pages');
process.exit(0);
