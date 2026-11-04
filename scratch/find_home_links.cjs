const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  const list = fs.readdirSync(dir);
  for (const f of list) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && f !== 'node_modules' && f !== 'dist' && f !== '.git' && f !== 'scratch') {
      scanDir(full);
    } else if (f.endsWith('.tsx') || f.endsWith('.ts') || f.endsWith('.html')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = content.match(/href=["'][^"']*home[^"']*["']/g);
      if (matches) {
        console.log(full, [...new Set(matches)]);
      }
    }
  }
}
scanDir('.');
