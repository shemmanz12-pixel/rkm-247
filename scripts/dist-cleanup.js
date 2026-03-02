#!/usr/bin/env node
// Dist folder cleanup script
// - Recursively scan .html files in the provided directory (default: ./dist)
// - Remove any <link rel="canonical"> tags that do NOT include data-rh
// - Ensure the remaining canonical (data-rh) has a trailing slash before any query/hash
// - Replace <h1> content containing the word "Coalville" with a generic label
// - Save files back to disk

const fs = require('fs').promises;
const path = require('path');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(full));
    } else if (entry.isFile() && full.toLowerCase().endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function ensureTrailingSlashInHref(href) {
  if (!href) return href;
  // Split off query and hash
  const qIdx = href.indexOf('?');
  const hIdx = href.indexOf('#');
  let cut = href.length;
  if (qIdx !== -1) cut = Math.min(cut, qIdx);
  if (hIdx !== -1) cut = Math.min(cut, hIdx);
  const base = href.slice(0, cut);
  const rest = href.slice(cut);
  if (base.endsWith('/')) return base + rest;
  return base + '/' + rest;
}

async function processFile(filePath) {
  let content = await fs.readFile(filePath, 'utf8');
  const original = content;

  // 1) Find all canonical link tags
  const canonicalRegex = /<link\b[^>]*rel\s*=\s*["']canonical["'][^>]*>/gi;
  const matches = content.match(canonicalRegex) || [];

  // Remove those WITHOUT data-rh attribute
  for (const m of matches) {
    if (!/data-rh\s*=\s*["']/i.test(m)) {
      content = content.replace(m, '');
    }
  }

  // 2) Ensure the remaining canonical (if any) has a trailing slash in href
  // Find canonical tags again after removals
  const remaining = content.match(canonicalRegex) || [];
  if (remaining.length > 0) {
    // For each remaining canonical, try to normalize href
    for (const tag of remaining) {
      const hrefMatch = tag.match(/href\s*=\s*(["'])(.*?)\1/i);
      if (hrefMatch) {
        const quote = hrefMatch[1];
        const href = hrefMatch[2];
        const fixed = ensureTrailingSlashInHref(href);
        if (fixed !== href) {
          const fixedTag = tag.replace(hrefMatch[0], `href=${quote}${fixed}${quote}`);
          content = content.replace(tag, fixedTag);
        }
      }
    }
  }

  // 3) Ensure exactly one canonical reference remains in markup (grep -c == 1)
  // If after removals there are multiple canonical tags, keep only the first and remove the rest.
  const finalMatches = content.match(canonicalRegex) || [];
  if (finalMatches.length > 1) {
    // Keep the first occurrence, remove others
    let seenFirst = false;
    content = content.replace(canonicalRegex, (m) => {
      if (!seenFirst) { seenFirst = true; return m; }
      return '';
    });
  }

  // 4) Replace H1s that contain 'Coalville' (case-insensitive) with a generic label
  content = content.replace(/<h1\b([^>]*)>([\s\S]*?)<\/h1>/gi, (full, attrs, inner) => {
    if (/Coalville/i.test(inner)) {
      // Preserve attributes but use generic text
      return `<h1${attrs}>Local Plumber</h1>`;
    }
    return full;
  });

  // If changed, write back
  if (content !== original) {
    await fs.writeFile(filePath, content, 'utf8');
    return { file: filePath, changed: true };
  }
  return { file: filePath, changed: false };
}

async function main() {
  const target = process.argv[2] || path.join(process.cwd(), 'dist');
  try {
    const files = await walk(target);
    const results = [];
    for (const f of files) {
      try {
        results.push(await processFile(f));
      } catch (err) {
        console.error('Error processing', f, err.message);
      }
    }
    const changed = results.filter(r => r.changed).length;
    const total = results.length;
    console.log(`Processed ${total} .html files — ${changed} modified.`);
    console.log('Tip: run `grep -R -c "rel=\"canonical\""', target, 'to verify there is exactly 1 canonical per file.');
  } catch (err) {
    console.error('Failed:', err.message);
    process.exit(1);
  }
}

if (require.main === module) main();
