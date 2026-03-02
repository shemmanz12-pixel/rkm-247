import fs from 'fs/promises';
import path from 'path';

async function processFile(filePath) {
  let content = await fs.readFile(filePath, 'utf8');
  const scriptRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const matches = [];
  let m;
  while ((m = scriptRegex.exec(content)) !== null) {
    matches.push({ full: m[0], json: m[1], idx: m.index });
  }

  if (matches.length <= 1) return; // nothing to do

  const faqIndexes = [];
  for (let i = 0; i < matches.length; i++) {
    try {
      const parsed = JSON.parse(matches[i].json);
      if (containsFAQ(parsed)) faqIndexes.push(i);
    } catch (e) {
      // gracefully ignore parse failures
    }
  }

  if (faqIndexes.length <= 1) return; // no duplicates

  // Remove duplicate FAQ scripts, keep the first occurrence
  // iterate from end to avoid messing up indices
  for (let k = faqIndexes.length - 1; k >= 1; k--) {
    const rem = matches[faqIndexes[k]].full;
    content = content.replace(rem, '');
  }

  await fs.writeFile(filePath, content, 'utf8');
  console.log('Deduped FAQ schema in', filePath, '- removed', faqIndexes.length - 1, 'duplicates');
}

function containsFAQ(node) {
  if (!node) return false;
  if (typeof node === 'object' && node['@type'] === 'FAQPage') return true;
  if (Array.isArray(node)) {
    return node.some(item => containsFAQ(item));
  }
  if (node['@graph'] && Array.isArray(node['@graph'])) {
    return node['@graph'].some(item => item && item['@type'] === 'FAQPage');
  }
  return false;
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.isFile() && full.endsWith('.html')) {
      try {
        await processFile(full);
      } catch (e) {
        console.error('Error processing', full, e.message);
      }
    }
  }
}

(async () => {
  const distDir = path.resolve(process.cwd(), 'dist');
  try {
    await walk(distDir);
    console.log('FAQ dedupe complete');
  } catch (err) {
    console.error('Failed to dedupe FAQ schema in dist:', err);
    process.exit(1);
  }
})();