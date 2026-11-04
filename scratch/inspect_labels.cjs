const fs = require('fs');
const path = require('path');

function scan(dir, results = []) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === 'dist' || f === '.git' || f === 'scratch') continue;
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scan(fullPath, results);
    } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      const text = fs.readFileSync(fullPath, 'utf8');
      const lines = text.split('\n');
      lines.forEach((l, i) => {
        // Look for uppercase tracking or font-mono eyebrow patterns or badge properties
        if (l.includes('tracking-') && (l.includes('uppercase') || l.includes('font-mono'))) {
          results.push({ file: fullPath.replace(/\\/g, '/'), line: i + 1, text: l.trim() });
        } else if (l.includes('badge:') || l.includes('eyebrow:')) {
          results.push({ file: fullPath.replace(/\\/g, '/'), line: i + 1, text: l.trim() });
        }
      });
    }
  }
  return results;
}

const res = scan('src');
console.log('Found', res.length, 'potential eyebrow/badge instances:');
res.forEach(r => console.log(`${r.file}:${r.line} -> ${r.text}`));
