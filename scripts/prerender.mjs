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
  // Compute expected canonical to match sitemap and Netlify pretty_urls: use trailing-slash form
  const base = 'https://rkm247.co.uk';
  // For root use trailing slash, for others ensure a trailing slash is present
  const expectedCanonical = url === '/' ? `${base}/` : `${base}${url}/`;

  const canonicalRegex = /<link[^>]+rel=["']canonical["'][^>]*>/i;
  const canonicalHrefRegex = /href=["']([^"']+)["']/i;

      const existingCanonicalMatch = finalHtml.match(canonicalRegex);
      if (existingCanonicalMatch) {
  // Replace href with expectedCanonical (keep trailing slash)
  const existing = existingCanonicalMatch[0];
  const newLink = existing.replace(canonicalHrefRegex, `href="${expectedCanonical}"`);
  finalHtml = finalHtml.replace(existing, newLink);
      } else {
        // Insert link rel=canonical before </head>
        const linkTag = `<link rel="canonical" href="${expectedCanonical}"/>`;
        finalHtml = finalHtml.replace('</head>', `${linkTag}\n</head>`);
      }
    } catch (e) {
      // non-fatal
    }

    // Normalize any in-head occurrences of the old .html page URL to the trailing-slash canonical
    try {
      if (url !== '/') {
        // Replace any absolute occurrences like https://rkm247.co.uk{url}.html -> https://rkm247.co.uk{url}/
        const htmlUrl = `${base}${url}.html`;
        const slashUrl = `${base}${url}/`;
        if (finalHtml.includes(htmlUrl)) {
          finalHtml = finalHtml.split(htmlUrl).join(slashUrl);
        }
      }
    } catch (e) {
      // non-fatal
    }

  // Write each route into a folder with index.html so trailing-slash URLs resolve (e.g. /foo/ -> /foo/index.html)
  const filePath = `dist/client${url === '/' ? '/' : url}/index.html`;
  fs.mkdirSync(path.dirname(toAbsolute(filePath)), { recursive: true });
  fs.writeFileSync(toAbsolute(filePath), finalHtml);
    console.log('pre-rendered:', filePath);
  }
})();
