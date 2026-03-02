import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');
const ROOT = 'https://rkm247.co.uk';

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.isFile() && full.endsWith('.html')) {
      try {
        let s = fs.readFileSync(full, 'utf8');
        const orig = s;
        const linkRe = /<link\s+[^>]*rel=(?:"|')canonical(?:"|')[^>]*>/gi;
        const matches = s.match(linkRe) || [];

        if (matches.length === 0) {
          // insert canonical computed from file path
          const rel = path.relative(distDir, full);
          let dirpath = path.dirname(rel);
          let canonicalPath = '/';
          if (dirpath && dirpath !== '.') canonicalPath = '/' + dirpath.split(path.sep).join('/') + '/';
          const canonicalUrl = (ROOT + canonicalPath).replace(/([^:])\/\//g, '$1/');
          const tag = `<link rel="canonical" href="${canonicalUrl}" data-rh="true">`;
          if (s.includes('</head>')) s = s.replace('</head>', `  ${tag}\n</head>`);
          else s = `${tag}\n${s}`;
          console.log('inserted canonical in', path.relative(process.cwd(), full));
        } else if (matches.length > 1) {
          // prefer data-rh if present
          let keep = matches.find(m => /data-rh\s*=\s*(?:"|')/i.test(m));
          if (!keep) keep = matches[0];
          s = s.replace(linkRe, '');
          if (keep) {
            if (s.includes('</head>')) s = s.replace('</head>', `  ${keep}\n</head>`);
            else s = `${keep}\n${s}`;
          }
          console.log('fixed duplicates in', path.relative(process.cwd(), full));
        }

        if (s !== orig) fs.writeFileSync(full, s, 'utf8');
      } catch (e) {
        console.warn('validate failed for', full, e && e.message);
      }
    }
  }
}

if (!fs.existsSync(distDir)) {
  console.error('dist directory not found:', distDir);
  process.exit(1);
}

walk(distDir);
console.log('validate-canonicals-dist: done');
process.exit(0);
