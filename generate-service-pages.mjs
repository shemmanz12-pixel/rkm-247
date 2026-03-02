#!/usr/bin/env node
import('./scripts/generate-service-pages.mjs')
  .then(() => process.exit(0))
  .catch(err => { console.error(err); process.exit(1); });
