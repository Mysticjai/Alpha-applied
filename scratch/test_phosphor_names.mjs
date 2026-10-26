import * as Phosphor from '@phosphor-icons/react';

const candidates = [
  'Warning', 'WarningCircle', 'WarningTriangle',
  'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp',
  'Award', 'Medal', 'Trophy',
  'ChartBar', 'ChartLine',
  'Briefcase',
  'Buildings', 'Building',
  'Calendar', 'CalendarBlank',
  'Check', 'CheckCircle',
  'CaretRight', 'ChevronRight',
  'Coins',
  'Compass',
  'Copy', 'CopySimple', 'Files',
  'Cpu',
  'FileCheck', 'FileDoc', 'FileText', 'FileSearch', 'FileMagnifyingGlass', 'FileXls', 'FileCsv', 'Table',
  'Folder', 'Folders', 'FolderSimple', 'TreeStructure',
  'GitFork', 'GitMerge', 'GitBranch',
  'Globe', 'GlobeSimple', 'GlobeHemisphereWest',
  'GraduationCap',
  'Hash',
  'Info',
  'Bank', 'Landmark',
  'Stack', 'Layers',
  'Lightbulb',
  'Envelope', 'EnvelopeSimple',
  'List', 'Menu',
  'Phone',
  'Play',
  'Receipt',
  'Scales', 'Scale',
  'Scissors',
  'MagnifyingGlass', 'MagnifyingGlassPlus',
  'PaperPlaneTilt', 'PaperPlane',
  'ShieldWarning', 'ShieldCheck', 'Shield',
  'Sparkle', 'Sparkles',
  'TrendDown', 'TrendUp',
  'UserCheck', 'Users', 'User',
  'Wallet',
  'FlowArrow', 'ArrowsSplit', 'TreeStructure', 'Path',
  'X'
];

console.log('--- TESTING CANDIDATES ---');
for (const name of candidates) {
  if (Phosphor[name]) {
    console.log(`[EXISTS] ${name}`);
  } else {
    console.log(`[MISSING] ${name}`);
  }
}
