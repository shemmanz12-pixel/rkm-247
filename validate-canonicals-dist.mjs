#!/usr/bin/env node
import('./scripts/validate-canonicals-dist.mjs')
  .then(() => process.exit(0))
  .catch(err => { console.error(err); process.exit(1); });
