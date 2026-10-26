const fs = require('fs');
const files = [
  'index.html',
  'aiconsulting.html',
  'alphalens.html',
  'litigationservices.html',
  'divorcefamilylaw.html',
  'economicdamages.html',
  'documentanalysis.html',
  'bankruptcyrestructuring.html',
  'intellectualproperty.html',
  'litigationsupport.html',
  'terms-of-service.html',
  'privacy-policy.html'
];
files.forEach(f => {
  const content = fs.readFileSync('C:\\Users\\jaiav\\OneDrive\\Desktop\\alpha-applied-analytics-v2\\alpha-applied-analytics-v2\\' + f, 'utf8');
  const title = (content.match(/<title>(.*?)<\/title>/) || [])[1];
  const desc = (content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i) || [])[1];
  const canonical = (content.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/i) || [])[1];
  console.log(f + ':');
  console.log('  title:    ', title);
  console.log('  desc:     ', desc);
  console.log('  canonical:', canonical);
});
