const fs = require('fs');
const path = require('path');

const dir = 'C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'index.html');

const target = `<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">`;
const replacement = `<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">\n\n    <!-- Fontshare Fonts: Pilcrow Rounded & Bonny -->\n    <link\n      href="https://api.fontshare.com/v2/css?f[]=pilcrow-rounded@400&f[]=bonny@500&display=swap"\n      rel="stylesheet"\n    />`;

let count = 0;
for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('api.fontshare.com')) {
    console.log(`Skipping ${file}: already contains Fontshare`);
    continue;
  }
  if (content.includes(target)) {
    content = content.replace(target, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
    count++;
  } else {
    console.warn(`Target not found in ${file}`);
  }
}

console.log(`Updated ${count} files.`);
