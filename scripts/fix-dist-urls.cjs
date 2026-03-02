#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

const DIST = process.argv[2] || path.join(process.cwd(), 'dist');
const OUT = path.join(process.cwd(), 'scripts', 'dist-url-fix.txt');

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const res = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...await walk(res));
    else if (e.isFile() && res.endsWith('.html')) files.push(res);
  }
  return files;
}

function ensureTrailing(href) {
  if (!href) return href;
  const idx = href.search(/[?#]/);
  const base = idx === -1 ? href : href.slice(0, idx);
  const rest = idx === -1 ? '' : href.slice(idx);
  if (base.endsWith('/')) return base + rest;
  if (base.match(/\.[a-z0-9]{1,6}$/i)) return base + rest; // likely file
  return base + '/' + rest;
}

(async function main(){
  try {
    const files = await walk(DIST);
    let report = [];
    for (const f of files) {
      let txt = await fs.readFile(f, 'utf8');
      let orig = txt;
      // fix canonical hrefs
      txt = txt.replace(/<link\s+([^>]*rel=(?:"|')canonical(?:"|')[^>]*)>/gi, (m, inner) => {
        const hrefMatch = inner.match(/href=(?:"|')([^"']+)(?:"|')/i);
        if (!hrefMatch) return `<link ${inner}>`;
        const old = hrefMatch[1];
        const nw = ensureTrailing(old);
        if (nw !== old) {
          const replaced = inner.replace(/href=(?:"|')([^"']+)(?:"|')/i, `href="${nw}"`);
          return `<link ${replaced}>`;
        }
        return `<link ${inner}>`;
      });

      if (txt !== orig) {
        await fs.writeFile(f, txt, 'utf8');
        report.push(`${f}: updated`);
      }
    }
    await fs.mkdir(path.dirname(OUT), { recursive: true });
    await fs.writeFile(OUT, report.join('\n'), 'utf8');
    console.log('Dist URL fix complete. Report:', OUT);
  } catch (e) {
    console.error('Failed:', e.message);
    process.exit(1);
  }
})();
