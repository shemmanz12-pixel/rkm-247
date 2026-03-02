import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.isFile() && full.endsWith('.html')) {
      try {
        let s = fs.readFileSync(full, 'utf8');
        const orig = s;
        // remove any <link ... rel="canonical" ...> occurrences
        s = s.replace(/<link\s+[^>]*rel=(?:"|')canonical(?:"|')[^>]*>\s*/gi, '');
        if (s !== orig) {
          fs.writeFileSync(full, s, 'utf8');
          console.log('stripped canonical from', path.relative(process.cwd(), full));
        }
      } catch (e) {
        console.warn('failed to process', full, e && e.message);
      }
    }
  }
}

if (!fs.existsSync(publicDir)) {
  console.error('public directory not found:', publicDir);
  process.exit(1);
}

walk(publicDir);
console.log('strip-canonicals: done');
process.exit(0);
