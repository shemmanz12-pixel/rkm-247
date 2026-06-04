import fs from 'fs';
import path from 'path';
import { glob } from 'glob';

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyFolderSync(from, to) {
  ensureDir(to);
  fs.readdirSync(from).forEach(element => {
    if (fs.lstatSync(path.join(from, element)).isDirectory()) {
      copyFolderSync(path.join(from, element), path.join(to, element));
    } else {
      fs.copyFileSync(path.join(from, element), path.join(to, element));
    }
  });
}

async function permanentSeparationFix() {
  console.log('☢️ Preparing Immaculate Production Deployment Folder...');
  
  const targetDeployDir = path.resolve('dist/netlify-deploy');
  const clientDir = path.resolve('dist/client');
  const distRoutesDir = path.resolve('dist-routes');
  const distDir = path.resolve('dist');

  // 1. Reset and create the fresh deployment folder
  if (fs.existsSync(targetDeployDir)) fs.rmSync(targetDeployDir, { recursive: true, force: true });
  ensureDir(targetDeployDir);

  // 2. Copy the stable React Client App across first
  if (fs.existsSync(clientDir)) {
    copyFolderSync(clientDir, targetDeployDir);
  }

  // 3. Scan ALL generated landing HTML files across the project
  const files = await glob('{dist,dist-routes}/**/*.html');

  for (const file of files) {
    // Skip system directories
    if (file.startsWith('dist/client/') || file.startsWith('dist/server/') || file.startsWith('dist/netlify-deploy/')) continue;

    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    // --- A. DUPLICATE CANONICAL STRIPPER ---
    const canonicalMatches = content.match(/<link[^>]*rel=["']canonical["'][^>]*>/gi);
    if (canonicalMatches && canonicalMatches.length > 1) {
      let canonicalsKept = 0;
      content = content.replace(/<link[^>]*rel=["']canonical["'][^>]*>/gi, (match) => {
        canonicalsKept++;
        return canonicalsKept < canonicalMatches.length ? (modified = true, '') : match;
      });
    }

    // --- B. NOSCRIPT H1 PURGE ---
    const noscriptH1Regex = /(<noscript>[\s\S]*?)<h1([^>]*)>([\s\S]*?)<\/h1>([\s\S]*?<\/noscript>)/gi;
    if (noscriptH1Regex.test(content)) {
      content = content.replace(noscriptH1Regex, '$1<p style="font-size: 2em; font-weight: bold; margin-top: 0.67em; margin-bottom: 0.67em; color: #1a1a1a; text-transform: uppercase; display: block;"$2>$3</p>$4');
      modified = true;
    }

    // --- C. BODY DUPLICATE H1 STRIPPER ---
    const h1Matches = content.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi);
    if (h1Matches && h1Matches.length > 1) {
      let h1Count = 0;
      content = content.replace(/<h1([^>]*)>([\s\S]*?)<\/h1>/gi, (match, attrs, text) => {
        h1Count++;
        if (h1Count > 1) {
          modified = true;
          return `<p style="font-size: 22px; font-weight: bold; margin: 18px 0 8px; color: #0b1220; text-transform: uppercase; display: block;"${attrs}>${text}</p>`;
        }
        return match;
      });
    }

    // --- D. TEXT REPLACEMENTS ---
    if (/Gas Safe/i.test(content)) {
      content = content
        .replace(/Trusted Gas Safe engineers since 2004/gi, 'Trusted plumbing, heating & drainage engineers since 2004')
        .replace(/Expert Gas Safe Registered engineers/gi, 'Expert plumbing, heating & drainage engineers')
        .replace(/Gas Safe Registered specialists/gi, 'Specialists in plumbing, heating & drainage')
        .replace(/Gas Safe Boiler Diagnostics/gi, 'Heating & Boiler Diagnostics');
      modified = true;
    }

    if (modified) {
      content = content.replace(/^\s*[\r\n]/gm, '');
    }

    // --- E. SAFE COALESCING ---
    // Determine the route path and save it inside netlify-deploy safely
    let relativePath = '';
    if (file.startsWith('dist-routes/')) relativePath = path.relative('dist-routes', file);
    else if (file.startsWith('dist/')) relativePath = path.relative('dist', file);

    if (relativePath) {
      const destinationPath = path.join(targetDeployDir, relativePath);
      ensureDir(path.dirname(destinationPath));
      fs.writeFileSync(destinationPath, content, 'utf8');
    }
  }

  console.log('✨ Success! Created a completely bulletproof build folder at dist/netlify-deploy/');
}

permanentSeparationFix().catch(console.error);