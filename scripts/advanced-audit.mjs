import fs from 'fs';
import path from 'path';
import { glob } from 'glob';
import { JSDOM } from 'jsdom';

const distDir = path.resolve(process.cwd(), 'dist/client');
const htmlFiles = glob.sync(`${distDir}/**/*.html`);

const results = {
  passed: 0,
  failed: 0,
  errors: [],
};

const BATCH_SIZE = 50; // Process 50 files at a time
const GENERIC_TITLE = "RKM 24/7 Plumbing & Heating | 24 Hour Emergency Plumber";
const GENERIC_DESCRIPTION = "Your reliable, 24/7 emergency plumber in Coalville and the surrounding areas. We offer a wide range of plumbing and heating services. Call us now!";

async function auditBatch(batch) {
  console.log(`--- Auditing batch of ${batch.length} files ---`);
  for (const file of batch) {
    const relativePath = path.relative(distDir, file);
    const fileUrl = `https://rkm247.co.uk/${relativePath.replace(/index\.html$/, '')}`;

    try {
      const html = await fs.promises.readFile(file, 'utf8');
      const dom = new JSDOM(html);
      const { document } = dom.window;

      let hasError = false;

      // 1. Check for unique and non-generic title
      const title = document.querySelector('title');
      if (!title || !title.textContent || title.textContent === GENERIC_TITLE) {
          hasError = true;
          results.errors.push(`[${relativePath}] FAILED: Title is generic or missing.`);
      }

      // 2. Check for unique and non-generic description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription || !metaDescription.content || metaDescription.content === GENERIC_DESCRIPTION) {
          hasError = true;
          results.errors.push(`[${relativePath}] FAILED: Meta description is generic or missing.`);
      }

      // 3. Check for correct canonical URL
      const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
      const expectedCanonical = fileUrl.replace(/index\.html$/, '').replace(/\/$/, '');
      const foundCanonical = canonical.replace(/\/$/, '');

      if (!canonical || expectedCanonical !== foundCanonical) {
        hasError = true;
        results.errors.push(`[${relativePath}] FAILED: Canonical URL mismatch. Expected: ${expectedCanonical}, Found: ${foundCanonical}`);
      }

    // 4. Check JSON-LD: look for any <script type="application/ld+json"> that contains an @graph
    const jsonLdScripts = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
    if (jsonLdScripts.length === 0) {
      hasError = true;
      results.errors.push(`[${relativePath}] FAILED: JSON-LD script tag not found.`);
    } else {
      // Accept the page if any JSON-LD script contains an @graph
      let foundGraph = false;
      for (const s of jsonLdScripts) {
        const text = s.textContent || '';
        try {
          const parsed = JSON.parse(text);
          if (parsed && parsed['@graph']) {
            foundGraph = true;
            break;
          }
        } catch (e) {
          // Fallback: check raw text for @graph token
          if (text.includes('@graph')) {
            foundGraph = true;
            break;
          }
        }
      }

      const isServicePage = fileUrl.includes('/local-plumber/') ||
                fileUrl.includes('/emergency-plumber/') ||
                fileUrl.includes('/drain-unblocking/') ||
                fileUrl.includes('/heating-engineer/') ||
                fileUrl.includes('/leak-detection/');

      if (isServicePage && !foundGraph) {
        hasError = true;
        results.errors.push(`[${relativePath}] FAILED: Page-specific JSON-LD with @graph not found.`);
      }
    }

      if (hasError) {
        results.failed++;
      } else {
        results.passed++;
      }

    } catch (e) {
      results.failed++;
      results.errors.push(`[${relativePath}] FAILED: Could not read or parse file. Error: ${e.message}`);
    }
  }
}

async function runAudit() {
  console.log(`--- Starting Advanced Content Audit of ${htmlFiles.length} HTML files ---`);

  for (let i = 0; i < htmlFiles.length; i += BATCH_SIZE) {
    const batch = htmlFiles.slice(i, i + BATCH_SIZE);
    await auditBatch(batch);
  }

  console.log('\n--- Advanced Content Audit Complete ---');
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);

  if (results.failed > 0) {
    console.log('\n--- ERRORS ---');
    results.errors.forEach(err => console.error(err));
    process.exit(1); // Exit with error code if any test fails
  } else {
    console.log('\n🎉 All files passed the advanced content audit!');
  }
}

runAudit();
