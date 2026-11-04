const fs = require('fs');
const files = [
  'index.html', 'aiconsulting.html', 'alphalens.html', 'litigationservices.html',
  'divorcefamilylaw.html', 'documentanalysis.html', 'economicdamages.html',
  'bankruptcyrestructuring.html', 'intellectualproperty.html', 'litigationsupport.html',
  'terms-of-service.html', 'privacy-policy.html'
];
const base = 'C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2/';

const oldTarget = `    <!-- Preconnect to Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Fontshare Fonts: Pilcrow Rounded & Bonny -->
    <link
      href="https://api.fontshare.com/v2/css?f[]=pilcrow-rounded@400&f[]=bonny@500&display=swap"
      rel="stylesheet"
    />`;

const newTarget = `    <!-- Fontshare Typography: General Sans & Satoshi -->
    <link
      href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&f[]=satoshi@400,500,600,700&display=swap"
      rel="stylesheet"
    />`;

let count = 0;
for (const f of files) {
  const p = base + f;
  const content = fs.readFileSync(p, 'utf8');
  if (content.includes(oldTarget)) {
    const updated = content.replace(oldTarget, newTarget);
    fs.writeFileSync(p, updated, 'utf8');
    console.log('Updated:', f);
    count++;
  } else {
    console.warn('Target not matched in:', f);
  }
}
console.log(`Successfully updated ${count}/${files.length} HTML files.`);
