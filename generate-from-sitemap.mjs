#!/usr/bin/env node
import('./scripts/generate-from-sitemap.mjs')
  .then(() => process.exit(0))
  .catch(err => { console.error(err); process.exit(1); });
