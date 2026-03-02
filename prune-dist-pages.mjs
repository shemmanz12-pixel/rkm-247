#!/usr/bin/env node
import('./scripts/prune-dist-pages.mjs')
  .then(() => process.exit(0))
  .catch(err => { console.error(err); process.exit(1); });
