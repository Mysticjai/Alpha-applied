const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) results = results.concat(walk(file));
    else if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
  });
  return results;
}

const files = walk('C:\\Users\\jaiav\\OneDrive\\Desktop\\alpha-applied-analytics-v2\\alpha-applied-analytics-v2\\src');
const hrefs = new Set();
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const matches = content.matchAll(/href=["']([^"']+)["']/g);
  for (const match of matches) {
    hrefs.add(match[1]);
  }
});

console.log(Array.from(hrefs).sort());
