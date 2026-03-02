#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');
const DIST = path.join(ROOT, 'dist');

const services = [
  { slug: 'local-plumber', label: 'Local Plumber' },
  { slug: 'emergency-plumber', label: 'Emergency Plumber' },
  { slug: 'drain-unblocking', label: 'Drain Unblocking' },
  { slug: 'heating-engineer', label: 'Heating Engineer' },
  { slug: 'leak-detection', label: 'Leak Detection' }
];

function listTownDirs() {
  if (!fs.existsSync(PUBLIC)) return [];
  return fs.readdirSync(PUBLIC, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .filter(n => n !== '' && !n.startsWith('.'));
}

function readTownHtml(town) {
  const p = path.join(PUBLIC, town, 'index.html');
  if (!fs.existsSync(p)) return null;
  return fs.readFileSync(p, 'utf8');
}

function stripCanonical(html) {
  return html.replace(/<link\s+[^>]*rel=(?:"|')canonical(?:"|')[^>]*>\s*/gi, '');
}

function setTitleAndH1(html, serviceLabel, townName) {
  // replace <title>...</title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${serviceLabel} ${townName} | Local & Emergency Plumbing</title>`);
  // replace first <h1>...</h1>
  html = html.replace(/<h1>[\s\S]*?<\/h1>/i, `<h1>${serviceLabel} ${townName}</h1>`);
  return html;
}

function ensureDir(dir) { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); }

const towns = listTownDirs();
if (!towns.length) {
  console.error('No town directories found in public/. Aborting.');
  process.exit(1);
}

let created = 0;
for (const svc of services) {
  for (const town of towns) {
    const townHtml = readTownHtml(town);
    if (!townHtml) continue;

    const outDir = path.join(DIST, svc.slug, town);
    const outFile = path.join(outDir, 'index.html');
    if (fs.existsSync(outFile)) continue; // skip existing

    let html = townHtml;
    html = stripCanonical(html);
    // prettify town name for title/h1
    const pretty = town.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    html = setTitleAndH1(html, svc.label, pretty);

    ensureDir(outDir);
    fs.writeFileSync(outFile, html, 'utf8');
    console.log('wrote', path.relative(ROOT, outFile));
    created++;
  }
}

console.log('generate-service-pages: done — created', created, 'pages');
process.exit(0);
