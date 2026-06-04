#!/usr/bin/env node

/**
 * RKM 24/7 SEO Build Engine
 * This script triggers the final stage of the build: 
 * converting your 200+ React routes into static HTML files.
 */

import('./prerender.mjs')
  .then(() => {
    console.log('✅ SEO Prerender Complete: All town and service pages generated.');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Prerender Failed:', err);
    process.exit(1);
  });