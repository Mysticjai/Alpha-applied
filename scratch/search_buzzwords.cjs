const fs = require('fs');
const path = require('path');

const patterns = [
  /\bseamless/i,
  /\bcutting[- ]edge/i,
  /\brevolution/i,
  /\bunparallel/i,
  /\bunlock/i,
  /\bempower/i,
  /\btransform/i,
  /\bgame[- ]chang/i,
  /\bnext[- ]gen/i,
  /\bsupercharg/i,
  /\bdelivering value/i,
  /\bworld[- ]class/i,
  /\brobust/i,
  /\beffortlessly/i,
];

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    if (f === 'node_modules' || f === 'dist' || f === '.git' || f === 'scratch') continue;
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      searchDir(fullPath);
    } else if (f.endsWith('.ts') || f.endsWith('.tsx') || f.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, i) => {
        // Skip css class names or svg transforms
        for (const p of patterns) {
          if (p.test(line) && !line.includes('transform-') && !line.includes('transition-transform') && !line.includes('will-change-[transform') && !line.includes('transform:')) {
            console.log(`${fullPath.replace(/\\/g, '/')}:${i+1}: ${line.trim()}`);
            break;
          }
        }
      });
    }
  }
}

searchDir('src');
