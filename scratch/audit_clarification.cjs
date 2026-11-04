const fs = require('fs');
const path = require('path');

const root = 'C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2';

// 1. CANONICAL URLS
const htmlFiles = fs.readdirSync(root).filter(f => f.endsWith('.html')).sort();
const canonicalResults = htmlFiles.map(f => {
  const content = fs.readFileSync(path.join(root, f), 'utf8');
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const ogUrlMatch = content.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']*)["']/i);
  return {
    file: f,
    canonical: canonicalMatch ? canonicalMatch[1] : null,
    ogUrl: ogUrlMatch ? ogUrlMatch[1] : null,
    title: titleMatch ? titleMatch[1] : null
  };
});

console.log('=== 1. CANONICAL URL AUDIT ===');
console.log(JSON.stringify(canonicalResults, null, 2));
