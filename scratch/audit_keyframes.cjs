const fs = require('fs');
const path = require('path');

const root = 'C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2';
const animCssPath = path.join(root, 'src/styles/animations.css');
const animCss = fs.readFileSync(animCssPath, 'utf8');

// Find all @keyframes
const keyframeMatches = [...animCss.matchAll(/@keyframes\s+([\w-]+)/g)];
const keyframes = keyframeMatches.map(m => m[1]);

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === 'dist' || file === '.git' || file === 'scratch' || file === 'reports') continue;
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (/\.(tsx|ts|jsx|js|css|html)$/.test(file)) {
      results.push(full);
    }
  }
  return results;
}

const allFiles = walk(root);

const keyframeUsage = keyframes.map(kf => {
  const references = [];
  allFiles.forEach(f => {
    const rel = path.relative(root, f).replace(/\\/g, '/');
    const content = fs.readFileSync(f, 'utf8');
    // Check if keyframe name appears
    // If it's in animations.css, count how many times
    if (rel === 'src/styles/animations.css') {
      const occurrences = [...content.matchAll(new RegExp(`\\b${kf}\\b`, 'g'))].length;
      if (occurrences > 1) {
        references.push({ file: rel, count: occurrences, note: 'Used in CSS animation property' });
      } else {
        references.push({ file: rel, count: occurrences, note: 'Definition only (never referenced in animation rule)' });
      }
    } else {
      const occurrences = [...content.matchAll(new RegExp(`\\b${kf}\\b`, 'g'))].length;
      if (occurrences > 0) {
        references.push({ file: rel, count: occurrences });
      }
    }
  });
  return { keyframe: kf, references };
});

console.log('=== KEYFRAME USAGE AUDIT ===');
console.log(JSON.stringify(keyframeUsage, null, 2));
