import * as P from '@phosphor-icons/react';

const mappedIcons = [
  'ArrowRight',
  'Play',
  'Scales',
  'Stack',
  'Cpu',
  'X',
  'ArrowUp',
  'EnvelopeSimple',
  'Phone',
  'List',
  'Lightbulb',
  'MagnifyingGlassPlus',
  'Compass',
  'FileXls',
  'ShieldCheck',
  'ChartBar',
  'Check',
  'Info',
  'Warning',
  'CheckCircle',
  'ShieldWarning',
  'PaperPlaneTilt',
  'Coins',
  'GitMerge',
  'Users',
  'GraduationCap',
  'Medal',
  'TrendDown',
  'FileText',
  'Bank',
  'Briefcase',
  'Exam',
  'ArrowLeft',
  'Globe',
  'UserCheck',
  'SealCheck',
  'FlowArrow',
  'CalendarBlank',
  'ArrowDown',
  'Sparkle',
  'Scissors',
  'FolderSimple',
  'Hash',
  'CopySimple',
  'Receipt',
  'GitFork',
  'FileMagnifyingGlass',
  'Buildings',
  'Wallet',
  'CaretRight'
];

console.log(`Checking ${mappedIcons.length} mapped icons in @phosphor-icons/react:`);
let allValid = true;
for (const icon of mappedIcons) {
  if (!P[icon]) {
    console.error(`[MISSING]: ${icon}`);
    allValid = false;
  }
}
if (allValid) {
  console.log(`ALL ${mappedIcons.length} ICONS EXIST IN @phosphor-icons/react!`);
}
