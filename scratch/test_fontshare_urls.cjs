const https = require('https');

const urls = [
  'https://api.fontshare.com/v2/css?f[]=pilcrow-rounded@400&f[]=bonny@500&display=swap',
  'https://api.fontshare.com/v2/css?f[]=pilcrow-rounded@400&f[]=bonny@500',
  'https://api.fontshare.com/v2/css?f[0]=pilcrow-rounded@400&f[1]=bonny@500&display=swap',
  'https://api.fontshare.com/v2/css?f[]=bonny@500',
  'https://api.fontshare.com/v2/css?f[]=pilcrow-rounded@400',
  'https://api.fontshare.com/v2/css?f[]=pilcrow-rounded@400&display=swap&f[]=bonny@500&display=swap'
];

async function testUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          length: data.length,
          pilcrow: data.includes('Pilcrow Rounded'),
          bonny: data.includes('Bonny'),
          data: data
        });
      });
    }).on('error', (err) => resolve({ url, error: err.message }));
  });
}

(async () => {
  for (const u of urls) {
    const res = await testUrl(u);
    console.log(`URL: ${u}`);
    console.log(`  Pilcrow: ${res.pilcrow}, Bonny: ${res.bonny}, Length: ${res.length}\n`);
  }
})();
