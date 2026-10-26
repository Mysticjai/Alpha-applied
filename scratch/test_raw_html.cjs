const http = require('http');

function checkHtml(path) {
  return new Promise((resolve) => {
    http.get(`http://localhost:5173${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const titleMatch = data.match(/<title>(.*?)<\/title>/);
        const canonicalMatch = data.match(/<link\s+rel=["']canonical["']\s+href=["'](.*?)["']/);
        const descMatch = data.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/);
        resolve({
          path,
          title: titleMatch ? titleMatch[1] : 'NONE',
          canonical: canonicalMatch ? canonicalMatch[1] : 'NONE',
          desc: descMatch ? descMatch[1] : 'NONE'
        });
      });
    });
  });
}

async function run() {
  const paths = ['/', '/terms-of-service', '/terms-of-service.html', '/privacy-policy', '/privacy-policy.html'];
  for (const p of paths) {
    const res = await checkHtml(p);
    console.log(p, '=>');
    console.log('  title:    ', res.title);
    console.log('  canonical:', res.canonical);
    console.log('  desc:     ', res.desc.substring(0, 60));
  }
}

run();
