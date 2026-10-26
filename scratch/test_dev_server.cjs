const http = require('http');

function checkUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        url,
        statusCode: res.statusCode,
        headers: res.headers,
        contentType: res.headers['content-type'],
        dataLength: data.length,
        dataSnippet: data.substring(0, 400)
      }));
    }).on('error', reject);
  });
}

async function testAll() {
  const paths = [
    '/terms-of-service',
    '/privacy-policy',
    '/sitemap.xml',
    '/robots.txt',
    '/terms-of-service.html',
    '/privacy-policy.html'
  ];

  for (const p of paths) {
    try {
      const res = await checkUrl(`http://localhost:5173${p}`);
      console.log(`=== PATH: ${p} ===`);
      console.log('Status:', res.statusCode);
      console.log('Content-Type:', res.contentType);
      console.log('Length:', res.dataLength);
      console.log('Snippet:\n', res.dataSnippet);
      console.log('------------------------------------\n');
    } catch (e) {
      console.error(`Error requesting ${p}:`, e.message);
    }
  }
}

testAll();
