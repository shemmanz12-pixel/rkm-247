#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');
const DOMAIN = 'https://rkm247.co.uk';

function listHtmlFiles(rootDir) {
  const out = [];
  if (!fs.existsSync(rootDir)) return out;
  const walk = (dir) => {
    for (const name of fs.readdirSync(dir)) {
      const full = path.join(dir, name);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) walk(full);
      else if (stat.isFile() && full.toLowerCase().endsWith('.html')) out.push(full);
    }
  };
  walk(rootDir);
  return out;
}

function makeCanonicalUrl(filePath, baseDir) {
  const rel = path.relative(baseDir, filePath).replace(/\\/g, '/');
  const dir = path.dirname(rel);
  if (!dir || dir === '.' || dir === '') return `${DOMAIN}/`;
  return `${DOMAIN}/${dir}/`.replace(/([^:])\/\//g, '$1/');
}

function fixFile(file, baseDir) {
  try {
    let html = fs.readFileSync(file, 'utf8');
    const orig = html;
    // remove existing canonical tags
    html = html.replace(/<link\s+[^>]*rel=(?:"|')canonical(?:"|')[^>]*>\s*/gi, '');

    const canonicalUrl = makeCanonicalUrl(file, baseDir);
    const tag = `<link rel="canonical" href="${canonicalUrl}" data-rh="true">`;

    if (html.includes('</head>')) {
      html = html.replace('</head>', `  ${tag}\n</head>`);
    } else {
      html = `${tag}\n${html}`;
    }

    if (html !== orig) {
      fs.writeFileSync(file, html, 'utf8');
      console.log('fixed canonical in', path.relative(ROOT, file));
    }
  } catch (e) {
    console.warn('error processing', file, e && e.message);
  }
}

console.log('force-single-canonical: scanning public and dist...');
const publicFiles = listHtmlFiles(PUBLIC);
const distFiles = listHtmlFiles(DIST);

for (const f of publicFiles) fixFile(f, PUBLIC);
for (const f of distFiles) fixFile(f, DIST);

console.log('force-single-canonical: done');
process.exit(0);
