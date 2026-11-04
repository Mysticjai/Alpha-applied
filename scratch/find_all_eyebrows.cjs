const fs = require('fs');
const path = require('path');

function searchEyebrows(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      searchEyebrows(fullPath);
    } else if (f.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((l, i) => {
        if (l.includes('.badge') || l.includes('.eyebrow') || l.includes('COMPREHENSIVE') || l.includes('bg-accent inline-block')) {
          console.log(`${fullPath.replace(/\\/g, '/')}:${i+1}: ${l.trim()}`);
        }
      });
    }
  }
}

searchEyebrows('src');
