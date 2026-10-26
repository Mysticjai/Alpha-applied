const fs = require('fs');
const path = require('path');

function getFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, fileList);
    } else if (/\.(tsx?|jsx?)$/.test(file)) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const allIcons = new Set();
const fileIconMap = {};

for (const file of getFiles('src')) {
  const content = fs.readFileSync(file, 'utf8');
  const matches = [...content.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]lucide-react['"]/g)];
  for (const m of matches) {
    const icons = m[1].split(',').map(s => s.trim()).filter(Boolean);
    if (!fileIconMap[file]) fileIconMap[file] = [];
    fileIconMap[file].push(...icons);
    icons.forEach(i => allIcons.add(i));
  }
}

console.log(`Unique Lucide Icons (${allIcons.size}):`);
console.log(JSON.stringify([...allIcons].sort(), null, 2));

console.log('\nPer file:');
for (const [f, icons] of Object.entries(fileIconMap)) {
  console.log(`${path.basename(f)}: ${icons.join(', ')}`);
}
