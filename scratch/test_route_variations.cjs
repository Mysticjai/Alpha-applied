const http = require('http');

function checkUrl(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:5173${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const titleMatch = data.match(/<title>(.*?)<\/title>/);
        const canonicalMatch = data.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/);
        resolve({
          path,
          status: res.statusCode,
          title: titleMatch ? titleMatch[1] : 'NONE',
          canonical: canonicalMatch ? canonicalMatch[1] : 'NONE',
          htmlSnippet: data.substring(0, 150).replace(/\s+/g, ' ')
        });
      });
    });
  });
}

async function testAll() {
  const testPaths = [
    '/',
    '/aiconsulting',
    '/aiconsulting.html',
    '/litigationservices',
    '/litigationservices.html',
    '/alphalens',
    '/alphalens.html',
    '/divorcefamilylaw',
    '/divorcefamilylaw.html',
    '/terms-of-service',
    '/terms-of-service.html',
    '/privacy-policy',
    '/privacy-policy.html'
  ];

  console.log('Testing Route Variations on Vite Dev Server (http://localhost:5173):\n');
  for (const p of testPaths) {
    const res = await checkUrl(p);
    console.log(`Path: ${p}`);
    console.log(`  Status:    ${res.status}`);
    console.log(`  Title:     ${res.title}`);
    console.log(`  Canonical: ${res.canonical}`);
    console.log('');
  }
}

testAll();
