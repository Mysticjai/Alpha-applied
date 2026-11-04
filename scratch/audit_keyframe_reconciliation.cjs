const fs = require('fs');
const path = require('path');

const root = 'C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2';
const animCss = fs.readFileSync(path.join(root, 'src/styles/animations.css'), 'utf8');

const keyframes = [...animCss.matchAll(/@keyframes\s+([\w-]+)\s*\{([^}]*)\}/g)].map(m => m[1]);

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

const keyframeAnalysis = keyframes.map(kf => {
  // Find which selectors in animations.css use this keyframe in an animation property
  const regex = new RegExp(`\\.([a-zA-Z0-9_-]+)[^{]*\\{[^}]*animation[^:]*:[^;]*\\b${kf}\\b`, 'g');
  const classesUsingKeyframe = [];
  let match;
  while ((match = regex.exec(animCss)) !== null) {
    classesUsingKeyframe.push(match[1]);
  }

  // Also check if animation-name property is used
  const regexName = new RegExp(`\\.([a-zA-Z0-9_-]+)[^{]*\\{[^}]*animation-name\\s*:[^;]*\\b${kf}\\b`, 'g');
  while ((match = regexName.exec(animCss)) !== null) {
    classesUsingKeyframe.push(match[1]);
  }

  const uniqueClasses = [...new Set(classesUsingKeyframe)];

  // Find callers of these classes in code
  const activeCallers = [];
  const deadCallers = [];

  uniqueClasses.forEach(cls => {
    codeFiles.forEach(cf => {
      const rel = path.relative(root, cf).replace(/\\/g, '/');
      const content = fs.readFileSync(cf, 'utf8');
      if (content.includes(cls)) {
        if (rel.includes('Option A') || rel.includes('HeroArtwork') || rel.includes('HeroGeometry') || rel.includes('HeroScrollCue') || rel.includes('DocumentAnalysisPage')) {
          deadCallers.push({ class: cls, file: rel });
        } else {
          activeCallers.push({ class: cls, file: rel });
        }
      }
    });
  });

  let status = 'UNUSED_DEFINITION_ONLY';
  if (uniqueClasses.length > 0) {
    if (activeCallers.length > 0) {
      status = 'ACTIVE_PRODUCTION';
    } else if (deadCallers.length > 0) {
      status = 'LEGACY_DEAD_COMPONENT';
    } else {
      status = 'ORPHANED_CLASS_RULE';
    }
  }

  return {
    keyframe: kf,
    uniqueClasses,
    status,
    activeCallers,
    deadCallers
  };
});

console.log(JSON.stringify(keyframeAnalysis, null, 2));
