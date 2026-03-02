import fs from 'fs';
import path from 'path';

// Ensure DOMAIN is defined
const DOMAIN = process.env.SITE_DOMAIN || 'https://rkm247.co.uk';

// Helper: detect existing FAQPage JSON-LD in HTML (guarded to avoid redeclare errors)
if (typeof global.htmlHasFAQ === 'undefined') {
  global.htmlHasFAQ = function(htmlString) {
    try {
      return typeof htmlString === 'string' && (htmlString.includes('"@type": "FAQPage"') || htmlString.includes('"FAQPage"') || htmlString.includes('FAQPage'));
    } catch (e) {
      return false;
    }
  };
}

if (typeof global.htmlHasCanonical === 'undefined') {
  global.htmlHasCanonical = function(htmlString, canonicalUrl) {
    try {
      return typeof htmlString === 'string' && htmlString.includes(`<link rel="canonical" href="${canonicalUrl}"`);
    } catch (e) {
      return false;
    }
  };
}

// Provide minimal implementations used by script
function ensureCanonical(html, canonicalUrl) {
  if (!canonicalUrl) return html;
  const canonicalTag = `<link rel="canonical" href="${canonicalUrl}">`;
  const canonicalRe = new RegExp('<link\\s+rel=["\']canonical["\']\\s+href=["\'][^"\']*["\']\\s*/?>', 'i');
  if (canonicalRe.test(html)) return html.replace(canonicalRe, canonicalTag);
  if (html.includes('</head>')) return html.replace('</head>', `${canonicalTag}\n</head>`);
  return html;
}

function homepageSchemaTweaks(html) {
  return html; // no-op safe default
}

// Example usage when writing page files:
// let pageHtml = fs.readFileSync(htmlPath, 'utf8');
// if (!htmlHasFAQ(pageHtml)) {
//   pageHtml = pageHtml.replace('</head>', `\n<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>\n</head>`);
// }
// if (!htmlHasCanonical(pageHtml, canonicalUrl)) {
//   pageHtml = pageHtml.replace('</head>', `\n<link rel="canonical" href="${canonicalUrl}" />\n</head>`);
// }

const publicDir = path.resolve("public");
const distDir = path.resolve("dist");
const homepagePath = path.join(publicDir, "index.html");
const sitemapPath = path.join(publicDir, "sitemap.xml");

// Ensure public/ exists and has an index.html
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(homepagePath)) {
  // If public/index.html missing, copy template index.html from project root
  const templateIndex = path.join(__dirname, '..', 'index.html');
  if (fs.existsSync(templateIndex)) fs.copyFileSync(templateIndex, homepagePath);
}

if (!fs.existsSync(homepagePath)) {
  console.error('public/index.html not found and no template available.');
  process.exit(1);
}

// Homepage updates
let homepageHtml = fs.readFileSync(homepagePath, 'utf8');
homepageHtml = homepageSchemaTweaks(homepageHtml);
fs.writeFileSync(homepagePath, homepageHtml, 'utf8');

// Get towns from sitemap (public/sitemap.xml)
if (!fs.existsSync(sitemapPath)) {
  console.error('public/sitemap.xml not found. Run buildSitemap.js to generate public/sitemap.xml');
  process.exit(1);
}
const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
const townSlugs = getTownSlugsFromSitemap(sitemapXml);

// Template shell = homepage output
const template = fs.readFileSync(homepagePath, 'utf8');
console.log('generate-seo: using public/index.html as template');

// For each town, generate a landing page if it doesn't exist
let generated = 0;
for (const town of townSlugs) {
  const townPath = path.join(distDir, `${town}.html`);
  if (!fs.existsSync(townPath)) {
    let townHtml = fs.readFileSync(homepagePath, 'utf8');
    townHtml = townHtml.replace(/<title>.*<\/title>/, `<title>${town} - Your Site Name</title>`);
    townHtml = townHtml.replace(/<h1>.*<\/h1>/, `<h1>Welcome to ${town}</h1>`);
    // Add more replacements as needed for your SEO content
    fs.writeFileSync(townPath, townHtml, 'utf8');
    generated++;
  }
}

console.log(`generate-seo: generated ${generated} landing pages into public/`);
console.log("✅ Homepage updated + generated " + generated + " landing pages with SEO content into dist/");

function getTownSlugsFromSitemap(xml) {
  const urlRe = new RegExp('<loc>([^<]+)<\/loc>', 'g');
  const towns = new Set();
  let m;
  while ((m = urlRe.exec(xml)) !== null) {
    const loc = m[1].trim();
    const parts = loc.replace(/^https?:\/\//i, '').split('/').filter(Boolean);
    // find last part as slug
    if (parts.length >= 2) towns.add(parts[parts.length - 1]);
  }
  return Array.from(towns);
}