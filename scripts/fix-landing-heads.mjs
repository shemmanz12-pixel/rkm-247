import fs from "fs";
import path from "path";

if (typeof globalThis.htmlHasFAQ === 'undefined') {
  globalThis.htmlHasFAQ = function(htmlString) {
    return typeof htmlString === 'string' && htmlString.includes('\"@type\": \"FAQPage\"');
  };
}

if (typeof globalThis.htmlHasCanonical === 'undefined') {
  globalThis.htmlHasCanonical = function(htmlString, canonicalUrl) {
    try { return typeof htmlString === 'string' && htmlString.includes(`<link rel=\\"canonical\\" href=\\"${canonicalUrl}\\"`); } catch (e) { return false; }
  };
}

function htmlHasFAQ(htmlString) {
  try {
    return (
      typeof htmlString === "string" &&
      (htmlString.includes('"@type": "FAQPage"') ||
        htmlString.includes('"FAQPage"') ||
        htmlString.includes("FAQPage"))
    );
  } catch (e) {
    return false;
  }
}

const DOMAIN = "https://rkm247.co.uk";
const GBP_LINK = "https://maps.app.goo.gl/hgp9JFbxQPbibPrd6";
const PHONE_DISPLAY = "01530 654 062";
const PHONE_TEL = "01530654062";

const serviceTypes = [
  "heating-engineer",
  "leak-detection",
  "local-plumber",
  "drain-unblocking",
  "emergency-plumber",
];

const serviceCopy = {
  "local-plumber": {
    name: "Local Plumber",
    bullets: [
      "Leaks & burst pipes",
      "Taps, toilets & repairs",
      "Fast local response",
      "No call out fee (as advertised)",
    ],
  },
  "emergency-plumber": {
    name: "Emergency Plumber",
    bullets: [
      "Urgent leaks & burst pipes",
      "Stopcocks & isolations",
      "Rapid attendance (subject to availability)",
      "No call out fee (as advertised)",
    ],
  },
  "drain-unblocking": {
    name: "Drain Unblocking",
    bullets: [
      "Blocked sinks & toilets",
      "Outside drains & gullies",
      "Bad smells & slow draining",
      "Advice to prevent re-blocking",
    ],
  },
  "leak-detection": {
    name: "Leak Detection",
    bullets: [
      "Hidden leaks & damp patches",
      "Pipework checks",
      "Isolation & repair advice",
      "Emergency support if needed",
    ],
  },
  "heating-engineer": {
    name: "Heating Engineer",
    bullets: [
      "Boiler & radiator issues",
      "No heating / no hot water",
      "Bleeding, balancing & leaks",
      "Callouts across the area",
    ],
  },
};

const publicDir = path.resolve("public");
const distDir = path.resolve("dist");
const homepagePath = path.join(publicDir, "index.html");
const sitemapPath = path.join(publicDir, "sitemap.xml");

function prettify(slug) {
  return String(slug)
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function setTitle(html, titleText) {
  const titleRe = new RegExp("<title>[\\s\\S]*?</title>", "i");
  const newTitle = "<title>" + titleText + "</title>";
  if (titleRe.test(html)) return html.replace(titleRe, newTitle);

  const headOpenRe = new RegExp("<head[^>]*>", "i");
  if (headOpenRe.test(html))
    return html.replace(
      headOpenRe,
      (m) => m + "\n    " + newTitle
    );
  return html;
}

function setMetaDescription(html, descText) {
  const descRe = new RegExp(
    '<meta\\s+name=["\']description["\']\\s+content=["\'][^"\']*["\']\\s*/?>',
    "i"
  );
  const newDesc = '<meta name="description" content="' + descText + '">';
  if (descRe.test(html)) return html.replace(descRe, newDesc);

  const titleCloseRe = new RegExp("</title>", "i");
  if (titleCloseRe.test(html))
    return html.replace(titleCloseRe, "</title>\n    " + newDesc);

  const headOpenRe = new RegExp("<head[^>]*>", "i");
  if (headOpenRe.test(html))
    return html.replace(
      headOpenRe,
      (m) => m + "\n    " + newDesc
    );

  return html;
}

function ensureCanonical(html, canonicalUrl) {
  return html;
}

function setDataRoute(html, route) {
  const hasRootRe = new RegExp('id=["\']root["\']', "i");
  if (!hasRootRe.test(html)) return html;

  const hasDataRouteRe = new RegExp('data-route=["\'][^"\']*["\']', "i");
  if (hasDataRouteRe.test(html)) {
    return html.replace(hasDataRouteRe, 'data-route="' + route + '"');
  }
  return html.replace(hasRootRe, 'id="root" data-route="' + route + '"');
}

function homepageSchemaTweaks(html) {
  const geoRadiusStrRe = new RegExp('"geoRadius"\\s*:\\s*"(\\d+)"', "g");
  html = html.replace(geoRadiusStrRe, '"geoRadius": $1');

  const hasSameAsRe = new RegExp('"sameAs"\\s*:', "i");
  if (!hasSameAsRe.test(html)) {
    const telRe = new RegExp('("telephone"\\s*:\\s*"[^"]+",)', "i");
    html = html.replace(
      telRe,
      '$1\n      "sameAs": ["' + GBP_LINK + '"],'
    );
  } else {
    const sameAsArrRe = new RegExp('"sameAs"\\s*:\\s*\\[[\\s\\S]*?\\]', "i");
    html = html.replace(sameAsArrRe, '"sameAs": ["' + GBP_LINK + '"]');
  }
  return html;
}

function getTownSlugsFromSitemap(xml) {
  const urlRe = new RegExp("<loc>([^<]+)</loc>", "g");
  const towns = new Set();

  let m;
  while ((m = urlRe.exec(xml)) !== null) {
    const loc = m[1].trim();
    for (const service of serviceTypes) {
      const prefix = DOMAIN + "/" + service + "/";
      if (loc.startsWith(prefix)) {
        const slug = loc.slice(prefix.length).replace(/\/$/, "");
        if (slug) towns.add(slug);
      }
    }
  }
  return Array.from(towns);
}

function stripExistingSeoBlock(html) {
  const seoBlockRe = new RegExp("<!-- SEO_BLOCK_START -->[\\s\\S]*?<!-- SEO_BLOCK_END -->", "i");
  return html.replace(seoBlockRe, "");
}

function injectSeoBlock(html, blockHtml) {
  html = stripExistingSeoBlock(html);
  const rootDivRe = new RegExp("(<div\\s+id=[\"']root[\"'][^>]*>)", "i");
  if (rootDivRe.test(html)) {
    return html.replace(
      rootDivRe,
      "<!-- SEO_BLOCK_START -->\n" + blockHtml + "\n<!-- SEO_BLOCK_END -->\n$1"
    );
  }
  return html;
}

function seoHtmlFor(service, town, townSlugs) {
  const svc = serviceCopy[service] || { name: prettify(service), bullets: [] };
  const townName = prettify(town);
  const headingText = svc.name + " " + townName;

  const idx = Math.max(0, townSlugs.indexOf(town));
  const near = [];
  for (let i = 1; i <= 8; i++) {
    near.push(townSlugs[(idx + i) % townSlugs.length]);
  }

  const otherServices = serviceTypes
    .filter((s) => s !== service)
    .map((s) => ({ slug: s, name: (serviceCopy[s]?.name || prettify(s)) }));

  const bullets = (svc.bullets || []).map((b) => "<li>" + b + "</li>").join("");

  const otherLinks = otherServices
    .map((s) => `<li><a href="/${s.slug}/${town}">${s.name} in ${townName}</a></li>`)
    .join("");

  const nearLinks = near
    .map((t) => `<li><a href="/${service}/${t}">${svc.name} ${prettify(t)}</a></li>`)
    .join("");

  return `
<main style="max-width: 1000px; margin: 0 auto; padding: 24px 16px;">
  <!-- SEO FIXED: Swapped H1 for styled P tag to prevent conflict with core client app shell rendering -->
  <p style="margin: 0 0 8px; font-size: 34px; font-weight: bold; line-height: 1.15; color: #0b1220; text-transform: uppercase; display: block;">${headingText}</p>
  <p style="margin: 0 0 12px; font-size: 18px;">
    Need a reliable ${svc.name.toLowerCase()} in <strong>${townName}</strong>? RKM Plumbing & Heating provides fast local callouts across North West Leicestershire.
  </p>
  <p style="margin: 0 0 14px;">
    Call <a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a> for help. We’ll confirm availability and give clear advice before any work starts.
  </p>

  <div style="background:#f7f7f7; border-radius:12px; padding:16px; margin:16px 0;">
    <h2 style="margin:0 0 8px; font-size:22px;">${svc.name} in ${townName} – what we help with</h2>
    <ul style="margin:0; padding-left: 18px; line-height: 1.7;">${bullets}</ul>
  </div>

  <h2 style="margin:18px 0 8px; font-size:22px;">Other services in ${townName}</h2>
  <ul style="margin:0; padding-left: 18px; line-height: 1.7;">${otherLinks}</ul>

  <h2 style="margin:18px 0 8px; font-size:22px;">Nearby areas we cover</h2>
  <ul style="margin:0; padding-left: 18px; line-height: 1.7;">${nearLinks}</ul>

  <p style="margin:18px 0 0;">
    <a href="/locations">Browse all service areas</a> •
    <a href="${GBP_LINK}" target="_blank" rel="noreferrer">Google Business Profile</a>
  </p>
</main>
`.trim();
}

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(homepagePath)) {
  const templateIndex = path.join(__dirname, '..', 'index.html');
  if (fs.existsSync(templateIndex)) fs.copyFileSync(templateIndex, homepagePath);
}
if (!fs.existsSync(homepagePath)) {
  console.error('public/index.html not found and no template available.');
  process.exit(1);
}
if (!fs.existsSync(sitemapPath)) {
  console.error('public/sitemap.xml not found. Run buildSitemap.js to generate public/sitemap.xml');
  process.exit(1);
}

let homepageHtml = fs.readFileSync(homepagePath, "utf8");
homepageHtml = ensureCanonical(homepageHtml, DOMAIN + "/");
homepageHtml = homepageSchemaTweaks(homepageHtml);
fs.writeFileSync(homepagePath, homepageHtml, "utf8");
console.log('fix-landing-heads: updated public/index.html');

const sitemapXml = fs.readFileSync(sitemapPath, "utf8");
const townSlugs = getTownSlugsFromSitemap(sitemapXml);

if (!townSlugs.length) {
  console.log("⚠️ No town slugs found in sitemap.xml. Ensure it contains /service/town URLs.");
  process.exit(0);
}

const template = fs.readFileSync(homepagePath, "utf8");

let generated = 0;

for (const town of townSlugs) {
  for (const service of serviceTypes) {
    const route = "/" + service + "/" + town;
    const outDir = path.join(distDir, service, town);
    const outFile = path.join(outDir, "index.html");

    const svcName = serviceCopy[service]?.name || prettify(service);
    const townName = prettify(town);

    let html = template;

    html = setTitle(html, svcName + " " + townName + " | 24/7 Service | RKM");
    html = setMetaDescription(
      html,
      "Need " + svcName.toLowerCase() + " in " + townName + "? Fast local response. Call " + PHONE_DISPLAY + "."
    );
    html = ensureCanonical(html, DOMAIN + route);
    html = setDataRoute(html, route);

    const seoBlock = seoHtmlFor(service, town, townSlugs);
    html = injectSeoBlock(html, seoBlock);
    html = removeNoscript(html);

    ensureDir(outDir);
    fs.writeFileSync(outFile, html, "utf8");
    generated++;
  }
}

console.log("✅ Homepage updated + generated " + generated + " landing pages with SEO content into dist/");
console.log('fix-landing-heads: finished injecting SEO blocks into public/');

function removeNoscript(html) {
  const noscriptRe = new RegExp("<noscript>[\\s\\S]*?<\\/noscript>", "i");
  return html.replace(noscriptRe, "");
}