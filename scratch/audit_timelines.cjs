const fs = require('fs');
const path = require('path');

const root = 'C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === 'dist' || file === '.git' || file === 'scratch' || file === 'reports') continue;
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(walk(full));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(full);
    }
  }
  return results;
}

const files = walk(path.join(root, 'src'));
console.log('Auditing ' + files.length + ' source files...');

files.forEach(f => {
  const rel = path.relative(root, f).replace(/\\/g, '/');
  const content = fs.readFileSync(f, 'utf8');
  const matches = [];
  if (/timeline/i.test(content)) matches.push('timeline');
  if (/methodology/i.test(content)) matches.push('methodology');
  if (/phase\s*0?1/i.test(content)) matches.push('phase 01');
  if (/step\s*0?1/i.test(content)) matches.push('step 01');
  if (/workflow/i.test(content)) matches.push('workflow');
  if (/milestone/i.test(content)) matches.push('milestone');
  
  if (matches.length > 0) {
    console.log(rel + ' --> ' + matches.join(', '));
  }
});
