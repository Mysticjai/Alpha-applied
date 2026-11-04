const fs = require('fs');
const path = require('path');

const root = 'C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2';

const candidates = [
  { id: 'CMP-01', file: 'src/pages/DocumentAnalysisPage.tsx', type: 'Page' },
  { id: 'CMP-02', file: 'src/pages/ForensicServiceDetailPage.tsx', type: 'Page' },
  { id: 'CMP-03', file: 'src/components/sections/AIConsultingSection.tsx', type: 'Section Component' },
  { id: 'CMP-04', file: 'src/components/sections/AlphaLensSection.tsx', type: 'Section Component' },
  { id: 'CMP-05', file: 'src/components/sections/LitigationServicesSection.tsx', type: 'Section Component' },
  { id: 'CMP-06', file: 'src/components/hero/HeroArtwork.tsx', type: 'Hero Component (Option A)' },
  { id: 'CMP-07', file: 'src/components/hero/HeroGeometry.tsx', type: 'Hero Component (Option A)' },
  { id: 'CMP-08', file: 'src/components/hero/HeroScrollCue.tsx', type: 'Hero Component (Option A)' },
  { id: 'CMP-09', file: 'src/components/hero/MobileHeroArtwork.tsx', type: 'Hero Component (Option A)' },
  { id: 'CMP-10', file: 'src/components/services/ServiceDeliverables.tsx', type: 'Service Sub-component' },
  { id: 'CMP-11', file: 'src/components/services/ServiceDetailHero.tsx', type: 'Service Sub-component' },
  { id: 'CMP-12', file: 'src/components/services/ServiceOverview.tsx', type: 'Service Sub-component' },
  { id: 'CMP-13', file: 'src/components/services/ServiceWorkflow.tsx', type: 'Service Sub-component' },
  { id: 'CMP-14', file: 'src/components/services/RelatedServices.tsx', type: 'Service Sub-component' },
  { id: 'CMP-15', file: 'src/components/services/ServiceClosingCta.tsx', type: 'Service Sub-component' },
  { id: 'CMP-16', file: 'src/components/services/visuals/DocumentAnalysisVisual.tsx', type: 'Visual Sub-component' },
  { id: 'CMP-17', file: 'src/components/ui/CompactTrustPills.tsx', type: 'UI Component' },
  { id: 'CMP-18', file: 'src/components/ui/StructuredTrustBar.tsx', type: 'UI Component' },
  { id: 'CMP-19', file: 'src/components/ui/CountUp.jsx', type: 'UI Component (Experimental)' },
  { id: 'CMP-20', file: 'src/components/ui/CurvedLoop.jsx', type: 'UI Component (Experimental)' },
  { id: 'CMP-21', file: 'src/components/ui/FadeContent.jsx', type: 'UI Component (Experimental)' },
  { id: 'CMP-22', file: 'src/components/ui/GradualBlur.jsx', type: 'UI Component (Experimental)' },
  { id: 'CMP-23', file: '@', type: 'Misplaced Root Directory (7 files)' },
  { id: 'CMP-24', file: 'src/lib/utils.ts', type: 'Utility Function (cn helper)' },
];

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

const allCodeFiles = walk(root);

const report = candidates.map(c => {
  const fullPath = path.join(root, c.file);
  const exists = fs.existsSync(fullPath);
  let sizeBytes = 0;
  if (exists) {
    const stat = fs.statSync(fullPath);
    sizeBytes = stat.isDirectory() ? 0 : stat.size;
  }

  const basenameNoExt = path.basename(c.file).replace(/\.[^/.]+$/, '');
  const callers = [];

  allCodeFiles.forEach(cf => {
    // skip self
    if (cf === fullPath) return;
    const rel = path.relative(root, cf).replace(/\\/g, '/');
    const content = fs.readFileSync(cf, 'utf8');
    if (c.file === '@') {
      if (content.includes('@/components') || content.includes("from '@/")) callers.push(rel);
    } else {
      if (content.includes(basenameNoExt)) {
        callers.push(rel);
      }
    }
  });

  return {
    id: c.id,
    file: c.file,
    type: c.type,
    exists,
    sizeBytes,
    callerCount: callers.length,
    callers
  };
});

console.log(JSON.stringify(report, null, 2));
