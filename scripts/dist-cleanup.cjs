#!/usr/bin/env node
// scripts/dist-cleanup.cjs
// Post-build cleanup for dist HTML files.
// - Remove hardcoded <link rel="canonical"> tags that do NOT include data-rh="true"
// - Ensure exactly one canonical per file (data-rh="true") with trailing slash
// - Replace <h1> contents that include 'Coalville' on non-root pages with a generic heading

const fs = require('fs');
const path = require('path');

const distDir = process.argv[2] || path.join(process.cwd(), 'dist');
const BASE_URL = process.env.BASE_URL || 'https://rkm247.co.uk';

function walk(dir) {
  const files = [];
  for (const name of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, name.name);
    if (name.isDirectory()) files.push(...walk(full));
    else if (name.isFile() && full.toLowerCase().endsWith('.html')) files.push(full);
  }
  return files;
}

function ensureTrailingSlash(href) {
  if (!href) return href;
  const idx = href.search(/[?#]/);
  const base = idx === -1 ? href : href.slice(0, idx);
  const rest = idx === -1 ? '' : href.slice(idx);
  if (base.endsWith('/')) return base + rest;
  // Avoid adding slash to file-like paths (have extension)
  if (/\.[a-z0-9]{1,6}$/i.test(base.split('/').pop())) return base + rest;
  return base + '/' + rest;
}

function removeHardcodedCanonicals(html) {
  return html.replace(/<link\b[^>]*rel=(?:"|')canonical(?:"|')[^>]*>/gi, (tag) => {
    if (/data-rh\s*=\s*(?:"|')true(?:"')?/i.test(tag)) return tag;
    return '';
  });
}

function findCanonicalTags(html) {
  const re = /<link\b[^>]*rel=(?:"|')canonical(?:"|')[^>]*>/gi;
  const out = [];
  let m;
  while ((m = re.exec(html)) !== null) out.push(m[0]);
  return out;
}

function normalizeCanonicalTag(tag) {
  // ensure data-rh and trailing slash on href
  let t = tag;
  if (!/data-rh\s*=\s*(?:"|')true(?:"')?/i.test(t)) {
    t = t.replace(/<link/, '<link data-rh="true"');
  }
  const hrefMatch = t.match(/href\s*=\s*(["'])(.*?)\1/i);
  if (hrefMatch) {
    const quote = hrefMatch[1];
    const href = hrefMatch[2];
    const fixed = ensureTrailingSlash(href);
    if (fixed !== href) t = t.replace(hrefMatch[0], `href=${quote}${fixed}${quote}`);
  }
  return t;
}

function updateH1s(html, relPath) {
  // Only change H1s on non-root pages
  if (/^index\.html$/i.test(relPath)) return html;
  return html.replace(/(<h1\b[^>]*>)([\s\S]*?)(<\/h1>)/gi, (full, open, inner, close) => {
    if (/coalville/i.test(inner)) return `${open}Plumbing Services | Local & Emergency Plumbing${close}`;
    return full;
  });
}

function insertCanonicalIntoHead(html, tag) {
  if (/<head[^>]*>/i.test(html)) {
    return html.replace(/<head[^>]*>/i, match => match + '\n  ' + tag);
  }
  return tag + '\n' + html;
}

try {
  if (!fs.existsSync(distDir)) {
    console.error('Dist folder not found:', distDir);
    process.exit(1);
  }

  const files = walk(distDir);
  let modifiedCount = 0;

  for (const file of files) {
    let html = fs.readFileSync(file, 'utf8');
    const original = html;

    // 1) remove hardcoded canonicals (no data-rh)
    html = removeHardcodedCanonicals(html);

    // 2) examine remaining canonicals
    let canonicals = findCanonicalTags(html);

    if (canonicals.length === 0) {
      // create canonical based on file path
      let rel = path.relative(distDir, file).replace(/\\/g, '/');
      let route = '/';
      if (!/^index\.html$/i.test(rel)) {
        route = '/' + rel.replace(/\/index\.html$/i, '').replace(/\.html$/i, '') + '/';
      }
      const href = (BASE_URL || '').replace(/\/$/, '') + route;
      const newTag = `<link rel="canonical" href="${href}" data-rh="true">`;
      html = insertCanonicalIntoHead(html, newTag);
      canonicals = findCanonicalTags(html);
    }

    if (canonicals.length > 1) {
      // Keep first data-rh if present, otherwise keep first. Remove others.
      const dataRhIndex = canonicals.findIndex(t => /data-rh\s*=\s*(?:"|')true(?:"')?/i.test(t));
      const keepIndex = dataRhIndex !== -1 ? dataRhIndex : 0;
      const keepTag = normalizeCanonicalTag(canonicals[keepIndex]);
      // Remove all canonical tags
      html = html.replace(/<link\b[^>]*rel=(?:"|')canonical(?:"|')[^>]*>/gi, '');
      // Insert normalized keepTag
      html = insertCanonicalIntoHead(html, keepTag);
    } else if (canonicals.length === 1) {
      // Normalize the single canonical href and ensure data-rh
      const normalized = normalizeCanonicalTag(canonicals[0]);
      if (normalized !== canonicals[0]) html = html.replace(canonicals[0], normalized);
    }

    // 3) Update H1 if needed
    const relPath = path.relative(distDir, file).replace(/\\/g, '/');
    html = updateH1s(html, relPath);

    if (html !== original) {
      fs.writeFileSync(file, html, 'utf8');
      modifiedCount++;
    }
  }

  console.log('Dist cleanup finished. Files scanned:', files.length, 'Files modified:', modifiedCount);
  process.exit(0);
} catch (err) {
  console.error('Error during dist cleanup:', err);
  process.exit(2);
}
