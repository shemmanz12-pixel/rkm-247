#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

const ROOT = path.resolve(process.argv[2] || '.');
const OUT = path.join(process.cwd(), 'scripts', 'canonical-audit.txt');
const exts = new Set(['.html', '.htm', '.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs']);

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const res = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || e.name === '.git') continue;
      files.push(...await walk(res));
    } else if (e.isFile()) {
      if (exts.has(path.extname(e.name).toLowerCase())) files.push(res);
    }
  }
  return files;
}

function findMatches(content, regex) {
  const out = [];
  let m;
  while ((m = regex.exec(content)) !== null) {
    const idx = m.index;
    const line = content.slice(0, idx).split(/\r?\n/).length;
    out.push({ match: m[0], index: idx, line });
  }
  return out;
}

(async function main(){
  try {
    const files = await walk(ROOT);
    const results = [];

    const canonicalRegex = /<link\s+[^>]*rel=(?:"|')canonical(?:"|')[^>]*>/gi;
    const dataRhRegex = /data-rh\s*=\s*(?:"|')?true(?:"|')?/i;
    const helmetRegex = /react-helmet|react-helmet-async|Helmet/gi;
    const canonicalWordRegex = /\bcanonical\b/gi;

    for (const file of files) {
      const rel = path.relative(process.cwd(), file);
      const txt = await fs.readFile(file, 'utf8');
      const fileMatches = [];

      const canonicals = findMatches(txt, canonicalRegex);
      if (canonicals.length) {
        for (const c of canonicals) fileMatches.push({ type: 'link[rel=canonical]', text: c.match, line: c.line });
      }

      // find occurrences of data-rh in file
      if (dataRhRegex.test(txt)) fileMatches.push({ type: 'data-rh', text: 'data-rh found', line: null });

      if (helmetRegex.test(txt)) fileMatches.push({ type: 'helmet', text: 'react-helmet usage', line: null });

      // search for the word canonical in code (e.g., meta objects)
      if (canonicalWordRegex.test(txt) && fileMatches.length === 0) fileMatches.push({ type: 'word:canonical', text: '"canonical" word found', line: null });

      if (fileMatches.length) results.push({ file: rel, matches: fileMatches });
    }

    // write report
    let out = `Canonical audit report for ${ROOT}\nGenerated: ${new Date().toISOString()}\n\n`;
    if (results.length === 0) out += 'No matches found.';
    for (const r of results) {
      out += `FILE: ${r.file}\n`;
      for (const m of r.matches) {
        out += `  - ${m.type}` + (m.line ? ` (line ${m.line})` : '') + `: ${m.text}\n`;
      }
      out += '\n';
    }

    await fs.mkdir(path.dirname(OUT), { recursive: true });
    await fs.writeFile(OUT, out, 'utf8');
    console.log('Audit complete. Report written to', OUT);
    console.log('Summary: files with potential canonical-related content:', results.length);
    process.exit(0);
  } catch (err) {
    console.error('Audit failed:', err);
    process.exit(2);
  }
})();
