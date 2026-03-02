#!/usr/bin/env node
// Dist folder cleanup script (CommonJS .cjs)
// Usage: BASE_URL=https://www.yoursite.com node dist-cleanup.cjs /path/to/dist

const fs = require('fs').promises;
const path = require('path');

const distDir = process.argv[2] || path.join(process.cwd(), 'dist');
const BASE_URL = process.env.BASE_URL || 'https://example.com';

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const res = path.resolve(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(res));
    else if (e.isFile() && res.endsWith('.html')) files.push(res);
  }
  return files;
}

function ensureTrailingSlashInHref(href) {
  // preserve query (# or ?)
  const m = href.match(/^([^?#]*)([?#].*)?$/);
  if (!m) return href;
  let pathname = m[1];
  const rest = m[2] || '';
  if (!pathname.endsWith('/')) pathname += '/';
  return pathname + rest;
}

function buildCanonicalForFile(file) {
  const rel = path.relative(distDir, file).replace(/\\/g, '/');
  let urlPath = '/' + rel;
  if (urlPath.endsWith('index.html')) urlPath = urlPath.slice(0, -'index.html'.length);
  // ensure leading slash
  if (!urlPath.startsWith('/')) urlPath = '/' + urlPath;
  const base = BASE_URL.replace(/\/+$/,'');
  return base + (urlPath === '/' ? '/' : urlPath);
}

async function processFile(file) {
  let html = await fs.readFile(file, 'utf8');
  const canonicalRegex = /<link[^>]*rel=(?:"|')canonical(?:"|')[^>]*>/gi;
  const allCanonicals = [...html.matchAll(canonicalRegex)].map(m => m[0]);

  let dataRhMatches = allCanonicals.filter(tag => /data-rh=(?:"|')true(?:"|')/i.test(tag));

  if (allCanonicals.length === 0) {
    // add one canonical near the end of <head>
    const href = ensureTrailingSlashInHref(buildCanonicalForFile(file));
    const tag = `<link rel="canonical" href="${href}" data-rh="true">`;
    if (/<\/head>/i.test(html)) html = html.replace(/<\/head>/i, tag + '\n</head>');
    else html = tag + '\n' + html;
  } else {
    // keep only one canonical (prefer one with data-rh)
    let keeper = null;
    if (dataRhMatches.length > 0) {
      keeper = dataRhMatches[0];
    } else {
      // promote first canonical to data-rh=true
      keeper = allCanonicals[0];
      // ensure href trailing slash
      const hrefMatch = keeper.match(/href=(?:"|')([^"']*)(?:"|')/i);
      if (hrefMatch) {
        const newHref = ensureTrailingSlashInHref(hrefMatch[1]);
        keeper = keeper.replace(hrefMatch[0], `href=\"${newHref}\"`);
      }
      if (!/data-rh=(?:"|')true(?:"|')/i.test(keeper)) {
        keeper = keeper.replace(/<link/, '<link data-rh="true"');
      }
    }

    // ensure keeper has trailing slash in href
    const hrefMatch2 = keeper.match(/href=(?:"|')([^"']*)(?:"|')/i);
    if (hrefMatch2) {
      const newHref = ensureTrailingSlashInHref(hrefMatch2[1]);
      keeper = keeper.replace(hrefMatch2[0], `href=\"${newHref}\"`);
      if (!/data-rh=(?:"|')true(?:"|')/i.test(keeper)) keeper = keeper.replace(/<link/, '<link data-rh="true"');
    }

    // remove all canonical tags
    html = html.replace(canonicalRegex, '');

    // insert keeper into head (after <head> or before </head>)
    if (/<head[^>]*>/i.test(html)) {
      html = html.replace(/<head[^>]*>/i, match => match + '\n  ' + keeper);
    } else {
      html = keeper + '\n' + html;
    }
  }

  // Normalize: ensure only one canonical tag remains
  const finalCanonicals = [...html.matchAll(canonicalRegex)].map(m => m[0]);
  if (finalCanonicals.length > 1) {
    const first = finalCanonicals[0];
    let idx = 0;
    html = html.replace(canonicalRegex, (m) => (idx++ === 0 ? m : ''));
  }

  // Ensure the remaining canonical has trailing slash
  const remaining = ([...html.matchAll(canonicalRegex)].map(m=>m[0])[0]) || null;
  if (remaining) {
    const hm = remaining.match(/href=(?:"|')([^"']*)(?:"|')/i);
    if (hm) {
      const good = ensureTrailingSlashInHref(hm[1]);
      html = html.replace(hm[0], `href=\"${good}\"`);
    }
    if (!/data-rh=(?:"|')true(?:"|')/i.test(remaining)) {
      html = html.replace(remaining, remaining.replace(/<link/, '<link data-rh="true"'));
    }
  }

  // H1 cleanup: replace instances of 'Coalville' inside <h1> text with 'your area'
  html = html.replace(/(<h1\b[^>]*>)([\s\S]*?)(<\/h1>)/gi, (m, open, text, close) => {
    if (/Coalville/i.test(text)) {
      const newText = text.replace(/Coalville/gi, 'your area');
      return open + newText + close;
    }
    return m;
  });

  await fs.writeFile(file, html, 'utf8');
  return { file, canonCount: (html.match(canonicalRegex) || []).length };
}

(async () => {
  try {
    const files = await walk(distDir);
    let processed = 0;
    for (const f of files) {
      const res = await processFile(f);
      processed++;
      console.log(`Processed: ${path.relative(process.cwd(), res.file)} - canonical count: ${res.canonCount}`);
    }
    console.log(`Done. Files processed: ${processed}`);
    console.log('Run: grep -R "<link .*rel="canonical"" "' + distDir + '" | wc -l  (should be equal to number of files)');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();