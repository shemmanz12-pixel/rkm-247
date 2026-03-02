import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, '..', p);

const template = fs.readFileSync(toAbsolute('dist/client/index.html'), 'utf-8');
const { render } = await import(toAbsolute('dist/server/entry-server.cjs'));
const { default: allRoutes } = await import(toAbsolute('dist-routes/ssg-routes.js'));


// Determine which routes to render
const routesToPrerender = allRoutes.filter(route => {
    // Exclude routes that end with a file extension (e.g., .xml, .txt)
    // and specific non-page routes like '*'
    return !path.basename(route).includes('.') && route !== '*';
});


(async () => {
  for (const url of routesToPrerender) {
    const { html: appHtml, helmet } = render(url, {});

    let finalHtml = template;

    // Inject helmet tags into the head if available
    if (helmet) {
      try {
        finalHtml = finalHtml
          .replace(`<html lang="en">`, `<html ${helmet.htmlAttributes.toString()}>`)
          .replace('</head>', `${helmet.title.toString()}\n${helmet.meta.toString()}\n${helmet.link.toString()}\n${helmet.script.toString()}\n</head>`);
      } catch (e) {
        console.warn('Failed to inject helmet for', url, e);
      }
    }

    // Inject the app HTML into the root element
    finalHtml = finalHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    // Always attempt to ensure a proper JSON-LD script exists in the head.
    try {
      // 1) If helmet.script contains @graph, assume it's the page JSON-LD and was already injected.
      const helmetScriptStr = (helmet && helmet.script && typeof helmet.script.toString === 'function') ? helmet.script.toString() : '';

      let jsonldToInject = '';
      if (helmetScriptStr && helmetScriptStr.includes('@graph')) {
        jsonldToInject = helmetScriptStr;
      } else {
        // 2) Fallback: look for an element with id="ssg-jsonld" in the rendered app HTML
        const ssgMatch = appHtml.match(/<script[^>]+id=["']ssg-jsonld["'][^>]*>([\s\S]*?)<\/script>/i);
        if (ssgMatch && ssgMatch[1]) {
          jsonldToInject = `<script type="application/ld+json">${ssgMatch[1]}</script>`;
        } else {
          // 3) Secondary fallback: find the first inline application/ld+json script in the appHtml
          const anyJsonLdMatch = appHtml.match(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/i);
          if (anyJsonLdMatch && anyJsonLdMatch[1]) {
            jsonldToInject = `<script type="application/ld+json">${anyJsonLdMatch[1]}</script>`;
          }
        }
      }

      if (jsonldToInject) {
        if (!finalHtml.includes(jsonldToInject)) {
          finalHtml = finalHtml.replace('</head>', `${jsonldToInject}\n</head>`);
        }
      }
    } catch (e) {
      // non-fatal
    }

    // Ensure a canonical link is present and correct for the prerendered URL.
    try {
      // Compute expected canonical per audit: root -> https://rkm247.co.uk, else https://rkm247.co.uk{url}.html
      const base = 'https://rkm247.co.uk';
      const expectedCanonical = url === '/' ? base : `${base}${url}.html`;

      const canonicalRegex = /<link[^>]+rel=["']canonical["'][^>]*>/i;
      const canonicalHrefRegex = /href=["']([^"']+)["']/i;

      const existingCanonicalMatch = finalHtml.match(canonicalRegex);
      if (existingCanonicalMatch) {
        // Replace href with expectedCanonical
        const existing = existingCanonicalMatch[0];
        const newLink = existing.replace(canonicalHrefRegex, `href="${expectedCanonical.replace(/\/$/, '')}"`);
        finalHtml = finalHtml.replace(existing, newLink);
      } else {
        // Insert link rel=canonical before </head>
        const linkTag = `<link rel="canonical" href="${expectedCanonical.replace(/\/$/, '')}"/>`;
        finalHtml = finalHtml.replace('</head>', `${linkTag}\n</head>`);
      }
    } catch (e) {
      // non-fatal
    }

    const filePath = `dist/client${url === '/' ? '/index' : url}.html`;
    fs.mkdirSync(path.dirname(toAbsolute(filePath)), { recursive: true });
    fs.writeFileSync(toAbsolute(filePath), finalHtml);
    console.log('pre-rendered:', filePath);
  }
})();
