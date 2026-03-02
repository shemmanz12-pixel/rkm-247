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

        // remove any existing canonical tags
        s = s.replace(/<link\s+[^>]*rel=(?:"|')canonical(?:"|')[^>]*>\s*/gi, '');

        // compute canonical from file's directory relative to dist
        const rel = path.relative(distDir, full);
        let dir = path.dirname(rel);
        let canonicalPath = '/';
        if (dir && dir !== '.') {
          // ensure forward slashes
          canonicalPath = '/' + dir.split(path.sep).join('/') + '/';
        }

        const canonicalUrl = (ROOT + canonicalPath).replace(/([^:])\/\//g, '$1/');
        const canonicalTag = `<link rel="canonical" href="${canonicalUrl}" data-rh="true">`;

        // insert canonical tag once before </head>
        if (s.includes('</head>')) {
          s = s.replace('</head>', `  ${canonicalTag}\n</head>`);
        } else {
          s = `${canonicalTag}\n${s}`;
        }

        if (s !== orig) {
          fs.writeFileSync(full, s, 'utf8');
          console.log('reset canonical in', path.relative(process.cwd(), full));
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
console.log('reset-canonicals-dist: done');
process.exit(0);
