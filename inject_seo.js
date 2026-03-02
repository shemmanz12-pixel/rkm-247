const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
            walkDir(filePath);
        } else if (file.endsWith('index.html')) {
            // Get town name from folder structure (dist/service/town/index.html)
            const parts = filePath.split(path.sep);
            const townSlug = parts[parts.length - 2];
            
            // Skip if it's the root folder
            if (townSlug === 'dist' || townSlug === 'build') return;

            // Format Name: ravenstone -> Ravenstone
            const townName = townSlug.split('-')
                .map(w => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' ');

            // Define the Schema
            const schema = {
                "@context": "https://schema.org",
                "@graph": [
                    {
                        "@type": "LocalBusiness",
                        "name": "RKM Plumbing",
                        "telephone": "01530654062",
                        "areaServed": townName
                    },
                    {
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "What plumbing issues are common in " + townName + "?",
                                "acceptedAnswer": { "@type": "Answer", "text": "In " + townName + ", we frequently resolve pipe corrosion and drainage issues in the local area." }
                            },
                            {
                                "@type": "Question",
                                "name": "How fast can you attend in " + townName + "?",
                                "acceptedAnswer": { "@type": "Answer", "text": "Our engineers are operating across the area, allowing rapid response times throughout " + townName + "." }
                            }
                        ]
                    }
                ]
            };

            const scriptTag = '<script type="application/ld+json">' + JSON.stringify(schema) + '</script>';
            let content = fs.readFileSync(filePath, 'utf8');

            // Inject if missing
            if (!content.includes('"@type":"FAQPage"')) {
                // Replace closing body tag with script + closing body tag
                const newContent = content.replace('</body>', scriptTag + '</body>');
                fs.writeFileSync(filePath, newContent);
                console.log('✅ Injected FAQ for: ' + townName);
            }
        }
    });
}

console.log('Starting SEO Injection...');
walkDir('dist');
console.log('Finished.');
