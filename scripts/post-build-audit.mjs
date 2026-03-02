#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const SITEMAP_PATH = path.join(DIST, 'sitemap.xml');
const BASE_URL = process.env.BASE_URL || 'https://rkm247.co.uk';

const BACKUP_DIR = path.join(ROOT, 'backups', `pruned_pages_${Date.now()}`);
fs.mkdirSync(BACKUP_DIR, { recursive: true });

console.log('--- Starting Post-Build Audit ---');
console.log(`Using base URL: ${BASE_URL}`);
console.log(`Backup directory for pruned files: ${BACKUP_DIR}`);

// --- 1. GET ALL VALID URLS FROM SITEMAP ---
function getSitemapUrls(sitemapPath) {
    if (!fs.existsSync(sitemapPath)) {
        console.error('❌ Sitemap not found at', sitemapPath);
        process.exit(1);
    }
    const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
    const urlRegex = /<loc>(.*?)<\/loc>/g;
    const urls = new Set();
    let match;
    while ((match = urlRegex.exec(sitemapXml)) !== null) {
        urls.add(match[1]);
    }
    console.log(`✅ Found ${urls.size} unique URLs in sitemap.xml`);
    return urls;
}

// --- 2. GET ALL HTML FILES FROM DIST ---
function getHtmlFiles(dir) {
    let files = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            files = files.concat(getHtmlFiles(fullPath));
        } else if (entry.isFile() && entry.name.endsWith('.html')) {
            files.push(fullPath);
        }
    }
    return files;
}

// --- 3. PROCESS AND CLEAN EACH HTML FILE ---
async function processHtmlFile(filePath) {
    const fileUrl = buildUrlForFile(filePath);
    let content = await fs.promises.readFile(filePath, 'utf8');
    const dom = new JSDOM(content);
    const { document } = dom.window;
    let changed = false;

    // --- Canonical Tag Cleanup ---
    const canonicals = document.querySelectorAll('link[rel="canonical"]');
    let keeper = null;

    canonicals.forEach(c => {
        if (c.getAttribute('data-rh') === 'true' && !keeper) {
            keeper = c;
        } else {
            c.remove();
            changed = true;
        }
    });

    if (!keeper) {
        keeper = document.createElement('link');
        keeper.setAttribute('rel', 'canonical');
        document.head.appendChild(keeper);
        changed = true;
    }
    
    // Ensure href has trailing slash
    const correctHref = fileUrl.endsWith('/') ? fileUrl : fileUrl + '/';
    if (keeper.getAttribute('href') !== correctHref) {
        keeper.setAttribute('href', correctHref);
        changed = true;
    }

    // --- H1 Tag Cleanup ---
    const h1 = document.querySelector('h1');
    if (h1 && /coalville/i.test(h1.textContent)) {
        const townName = fileUrl.split('/').filter(Boolean).pop().replace(/-/g, ' ');
        const serviceName = fileUrl.split('/').filter(Boolean).slice(-2, -1)[0].replace(/-/g, ' ');
        
        const toTitleCase = (str) => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

        if (serviceName && townName) {
            const newH1 = `${toTitleCase(serviceName)} in ${toTitleCase(townName)}`;
            if (h1.textContent !== newH1) {
                h1.textContent = newH1;
                changed = true;
            }
        }
    }

    if (changed) {
        await fs.promises.writeFile(filePath, dom.serialize(), 'utf8');
        console.log(`✏️  Cleaned: ${path.relative(ROOT, filePath)}`);
    }
}

// --- HELPER to build a URL from a file path ---
function buildUrlForFile(file) {
    const relPath = path.relative(DIST, file).replace(/\\/g, '/');
    let urlPath = relPath.endsWith('index.html') ? relPath.slice(0, -'index.html'.length) : relPath;
    return `${BASE_URL.replace(/\/$/, '')}/${urlPath.replace(/\/$/, '')}`;
}


// --- MAIN EXECUTION ---
(async () => {
    try {
        const sitemapUrls = getSitemapUrls(SITEMAP_PATH);
        const htmlFiles = getHtmlFiles(DIST);

        console.log(`\n--- Auditing ${htmlFiles.length} HTML files in dist/ ---`);

        // --- Prune orphaned files ---
        let prunedCount = 0;
        htmlFiles.forEach(file => {
            const fileUrl = buildUrlForFile(file);
            const fileUrlWithSlash = fileUrl.endsWith('/') ? fileUrl : fileUrl + '/';
            
            if (!sitemapUrls.has(fileUrl) && !sitemapUrls.has(fileUrlWithSlash)) {
                const backupPath = path.join(BACKUP_DIR, path.relative(DIST, file));
                fs.mkdirSync(path.dirname(backupPath), { recursive: true });
                fs.renameSync(file, backupPath);
                console.log(`🗑️  Pruned orphaned file: ${path.relative(ROOT, file)}`);
                prunedCount++;
            }
        });
         if (prunedCount > 0) {
            console.log(`✅ Pruned ${prunedCount} orphaned files.`);
        } else {
            console.log('✅ No orphaned HTML files to prune.');
        }

        // --- Clean remaining files ---
        const remainingHtmlFiles = getHtmlFiles(DIST); // Re-read after pruning
        for (const file of remainingHtmlFiles) {
            await processHtmlFile(file);
        }
        console.log('✅ File content audit complete.');

        console.log('\n--- Post-Build Audit Complete ---');

    } catch (error) {
        console.error('❌ An error occurred during the post-build audit:');
        console.error(error);
        process.exit(1);
    }
})();
