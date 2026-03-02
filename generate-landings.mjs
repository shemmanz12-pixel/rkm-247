#!/usr/bin/env node

import('./scripts/generate-landings.mjs')
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('generate-landings failed:', err);
    process.exit(1);
  });