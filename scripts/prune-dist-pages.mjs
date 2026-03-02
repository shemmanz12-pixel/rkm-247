#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const PUBLIC = path.join(ROOT, 'public');
const TS = Date.now();
const BACKUP = path.join(ROOT, 'backups', `pruned_pages_${TS}`);
fs.mkdirSync(BACKUP, { recursive: true });

const keep = new Set([
  'local-plumber',
  'heating-engineer',
  'leak-detection',
  'drain-unblocking',
  'emergency-plumber'
]);

function moveToBackup(fullPath, area) {
  const name = path.basename(fullPath);
  const destDir = path.join(BACKUP, area);
  fs.mkdirSync(destDir, { recursive: true });
  const dest = path.join(destDir, name);
  try {
    fs.renameSync(fullPath, dest);
    console.log('moved', fullPath, '->', dest);
  } catch (e) {
    console.error('failed to move', fullPath, e && e.message);
  }
}

function pruneRootDir(rootDir, area) {
  if (!fs.existsSync(rootDir)) return;
  const entries = fs.readdirSync(rootDir, { withFileTypes: true });
  for (const ent of entries) {
    const name = ent.name;
    const full = path.join(rootDir, name);
    // keep service directories and root index.html and sitemap.xml
    if (keep.has(name)) continue;
    if (ent.isDirectory()) {
      // these are town-only directories — move to backup
      moveToBackup(full, area);
    } else if (ent.isFile()) {
      // keep index.html and sitemap.xml and assets
      if (['index.html', 'sitemap.xml', 'robots.txt', '_redirects'].includes(name)) continue;
      // move other HTML files at root
      if (name.endsWith('.html')) moveToBackup(full, area);
    }
  }
}

console.log('Prune starting — non-destructive. Backup directory:', BACKUP);
pruneRootDir(DIST, 'dist');
pruneRootDir(PUBLIC, 'public');
console.log('Prune complete — please inspect', BACKUP, 'then rebuild/deploy if OK.');
process.exit(0);
