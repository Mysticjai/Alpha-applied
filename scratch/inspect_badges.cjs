const fs = require('fs');

function inspectContent() {
  const content = fs.readFileSync('src/content/siteContent.ts', 'utf8');
  // find badges, eyebrows, titles
  const regex = /(badge|eyebrow|title|subtitle|tagline|categoryLabel):\s*["']([^"']+)["']/g;
  let match;
  console.log('--- siteContent.ts ---');
  while ((match = regex.exec(content)) !== null) {
    console.log(`${match[1]}: "${match[2]}"`);
  }
}

inspectContent();
