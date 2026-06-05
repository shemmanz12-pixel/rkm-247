import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, '..', p);

// Clean duplicate headings across both build paths simultaneously
const targetDirectories = [
  toAbsolute('dist/client'),
  toAbsolute('dist/netlify-deploy')
];

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file === 'index.html') {
      let html = fs.readFileSync(fullPath, 'utf-8');
      const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      
      if (bodyMatch) {
        let bodyContent = bodyMatch[1];
        const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/gi;
        const matches = [...bodyContent.matchAll(h1Regex)];
        
        if (matches.length > 1) {
          let count = 0;
          bodyContent = bodyContent.replace(h1Regex, (match) => {
            count++;
            if (count === 1) return match;
            return match.replace(/<h1/i, '<h2').replace(/<\/h1>/i, '</h2>');
          });
          
          html = html.replace(/(<body[^>]*>)[\s\S]*?(<\/body>)/i, `$1${bodyContent}$2`);
          fs.writeFileSync(fullPath, html, 'utf-8');
        }
      }
    }
  }
}

console.log('\n🔍 Running H1 Post-Build Sanitization Pass...');
targetDirectories.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`   Processing asset path: ${path.basename(dir)}`);
    processDirectory(dir);
  }
});
console.log('✨ H1 Post-Build Sanitization Pass Complete.\n');