#!/usr/bin/env node
// Wrapper to run the real reset script in ./scripts/
import('./scripts/reset-canonicals-dist.mjs')
  .then(() => process.exit(0))
  .catch(err => { console.error(err); process.exit(1); });
