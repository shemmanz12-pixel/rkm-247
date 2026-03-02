import fs from 'fs';
import path from 'path';

const root = process.cwd();
const src = path.join(root, 'public', 'sitemap.xml');
const destDir = path.join(root, 'dist');
const dest = path.join(destDir, 'sitemap.xml');

try {
  if (!fs.existsSync(src)) {
    console.warn(`copy-sitemap: source not found: ${src} — skipping copy.`);
    process.exit(0);
  }
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  const data = fs.readFileSync(src, 'utf8');
  fs.writeFileSync(dest, data, 'utf8');
  console.log(`copy-sitemap: copied ${src} -> ${dest}`);
  process.exit(0);
} catch (err) {
  console.error('copy-sitemap: failed', err);
  process.exit(1);
}
