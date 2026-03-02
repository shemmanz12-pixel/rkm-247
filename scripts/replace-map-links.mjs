#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd());
const OLD_URL = 'https://share.google/vCD4kQc8elUleD1EE';
const NEW_URL = 'https://share.google/vCD4kQc8elUleD1EE';

function shouldIgnore(filePath) {
  const rel = path.relative(ROOT, filePath);
  if (rel.startsWith('node_modules') || rel.startsWith('.git') || rel.startsWith('dist') || rel.startsWith('public') || rel.endsWith('.png') || rel.endsWith('.jpg') || rel.endsWith('.webp') ) return true;
  return false;
}

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (shouldIgnore(full)) continue;
    if (entry.isDirectory()) await walk(full);
    else if (entry.isFile()) await processFile(full);
  }
}

async function processFile(filePath) {
  try {
    const txt = await fs.promises.readFile(filePath, 'utf8');
    if (txt.includes(OLD_URL)) {
      const updated = txt.split(OLD_URL).join(NEW_URL);
      await fs.promises.writeFile(filePath, updated, 'utf8');
      console.log('Updated:', filePath);
    }
  } catch (e) {
    // ignore binary files or read errors
  }
}

(async () => {
  console.log('Replacing map links across project...');
  await walk(ROOT);
  console.log('Done.');
})();
