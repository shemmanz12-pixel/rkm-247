#!/usr/bin/env node
import('./scripts/force-single-canonical.mjs')
  .then(() => process.exit(0))
  .catch(err => { console.error(err); process.exit(1); });
