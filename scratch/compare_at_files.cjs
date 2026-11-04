const fs = require('fs');
const path = require('path');

const root = 'C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2';
const atDir = path.join(root, '@', 'components');
const files = fs.readdirSync(atDir);

files.forEach(f => {
  const atPath = path.join(atDir, f);
  // find equivalent in src/components/ui or src/components
  const uiPath = path.join(root, 'src', 'components', 'ui', f);
  const uiTsxPath = path.join(root, 'src', 'components', 'ui', f.replace('.jsx', '.tsx'));
  
  let matchPath = null;
  if (fs.existsSync(uiPath)) matchPath = uiPath;
  else if (fs.existsSync(uiTsxPath)) matchPath = uiTsxPath;

  const atContent = fs.readFileSync(atPath, 'utf8');
  const atStat = fs.statSync(atPath);

  if (matchPath) {
    const srcContent = fs.readFileSync(matchPath, 'utf8');
    const isIdentical = atContent === srcContent;
    console.log(`${f} (size: ${atStat.size} bytes) -> paired with ${path.relative(root, matchPath).replace(/\\/g, '/')}: IDENTICAL? ${isIdentical}`);
    if (!isIdentical) {
      console.log(`   Diff in length: @ is ${atContent.length} chars, src is ${srcContent.length} chars`);
    }
  } else {
    console.log(`${f} (size: ${atStat.size} bytes) -> NO PAIR FOUND in src/`);
  }
});
