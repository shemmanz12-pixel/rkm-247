import fs from 'fs';
import path from 'path';

const distDir = path.join(process.cwd(), 'dist');

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
        if (matches.length === 0) continue;

        // prefer canonical that contains data-rh attribute
        let keep = matches.find(m => /data-rh\s*=\s*(?:"|')/i.test(m));
        if (!keep) keep = matches[0];

        // remove all canonical tags
        s = s.replace(linkRe, '');

        // ensure keep is present once in <head> before </head>
        if (keep) {
          if (s.includes('</head>')) {
            s = s.replace('</head>', `  ${keep}\n</head>`);
          } else {
            // fallback: prepend to file
            s = `${keep}\n${s}`;
          }
        }

        if (s !== orig) {
          fs.writeFileSync(full, s, 'utf8');
          console.log('deduped canonical in', path.relative(process.cwd(), full));
        }
      } catch (e) {
        console.warn('failed to process', full, e && e.message);
      }
    }
  }
}

if (!fs.existsSync(distDir)) {
  console.error('dist directory not found:', distDir);
  process.exit(1);
}

walk(distDir);
console.log('strip-canonicals-dist: done');
process.exit(0);
