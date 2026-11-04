const fs = require('fs');
const path = require('path');

const root = 'C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2';
const animCssPath = path.join(root, 'src/styles/animations.css');
const animCss = fs.readFileSync(animCssPath, 'utf8');

// Extract all class selectors in animations.css (.anim-*)
const classMatches = [...animCss.matchAll(/\.([a-zA-Z0-9_-]+)\s*\{/g)];
const classNames = [...new Set(classMatches.map(m => m[1]))];

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === 'dist' || file === '.git' || file === 'scratch' || file === 'reports') continue;
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (/\.(tsx|ts|jsx|js|html)$/.test(file)) {
      results.push(full);
    }
  }
  return results;
}

const codeFiles = walk(root);

const classUsage = classNames.map(cls => {
  const matches = [];
  codeFiles.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    if (content.includes(cls)) {
      matches.push(path.relative(root, f).replace(/\\/g, '/'));
    }
  });
  return { className: cls, callers: matches };
});

console.log('=== ANIMATION CLASS USAGE IN CODE ===');
console.log(JSON.stringify(classUsage, null, 2));
