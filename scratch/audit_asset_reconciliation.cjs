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
    } else {
      results.push(full);
    }
  }
  return results;
}

const allFiles = walk(root);
const codeFiles = allFiles.filter(f => /\.(tsx|ts|jsx|js|html|css|json)$/.test(f));
const imageExtensions = /\.(png|jpg|jpeg|svg|webp|gif|ico)$/i;
const imageFiles = allFiles.filter(f => imageExtensions.test(f));

console.log(`Found ${imageFiles.length} total image/icon files in repository.`);

const imageInventory = imageFiles.map(img => {
  const rel = path.relative(root, img).replace(/\\/g, '/');
  const basename = path.basename(img);
  const ext = path.extname(img);
  const sizeBytes = fs.statSync(img).size;
  const sizeFormatted = (sizeBytes / (1024 * 1024)).toFixed(2) + ' MB (' + (sizeBytes / 1024).toFixed(1) + ' KB)';
  
  // Search for references by basename or relative path or public path
  // E.g. for public/images/cards/foo.webp -> matches foo.webp, /images/cards/foo.webp, etc.
  const callers = [];
  const publicPath = rel.startsWith('public/') ? rel.slice('public'.length) : null;

  codeFiles.forEach(cf => {
    const codeRel = path.relative(root, cf).replace(/\\/g, '/');
    const content = fs.readFileSync(cf, 'utf8');
    
    let isReferenced = false;
    // Check direct basename match
    if (content.includes(basename)) isReferenced = true;
    if (publicPath && content.includes(publicPath)) isReferenced = true;
    if (content.includes(rel)) isReferenced = true;

    if (isReferenced) {
      callers.push(codeRel);
    }
  });

  return {
    path: rel,
    basename,
    sizeBytes,
    sizeFormatted,
    callerCount: callers.length,
    callers
  };
});

// Group into Referenced vs Unreferenced
const unreferenced = imageInventory.filter(img => img.callerCount === 0);
const referenced = imageInventory.filter(img => img.callerCount > 0);

console.log('\n=== UNREFERENCED ASSETS (0 CALLERS) ===');
let totalUnreferencedBytes = 0;
unreferenced.forEach(img => {
  totalUnreferencedBytes += img.sizeBytes;
  console.log(`- ${img.path}: ${img.sizeFormatted}`);
});
console.log(`TOTAL UNREFERENCED ASSETS: ${unreferenced.length} files, ${(totalUnreferencedBytes / (1024 * 1024)).toFixed(2)} MB`);

console.log('\n=== REFERENCED ASSETS (>= 1 CALLERS) ===');
let totalReferencedBytes = 0;
referenced.forEach(img => {
  totalReferencedBytes += img.sizeBytes;
  console.log(`- ${img.path}: ${img.sizeFormatted} -> callers: [${img.callers.join(', ')}]`);
});
console.log(`TOTAL REFERENCED ASSETS: ${referenced.length} files, ${(totalReferencedBytes / (1024 * 1024)).toFixed(2)} MB`);
