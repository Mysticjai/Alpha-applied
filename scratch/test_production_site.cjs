const https = require('https');
const http = require('http');
const dns = require('dns');

async function resolveDns(domain) {
  return new Promise((resolve) => {
    dns.lookup(domain, { all: true }, (err, addresses) => {
      if (err) resolve({ error: err.message, addresses: [] });
      else resolve({ addresses });
    });
  });
}

async function fetchHttps(url) {
  return new Promise((resolve) => {
    const req = https.get(url, { timeout: 10000 }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        url,
        statusCode: res.statusCode,
        headers: res.headers,
        dataLength: data.length,
        snippet: data.substring(0, 300)
      }));
    });
    req.on('error', (err) => resolve({ url, error: err.message }));
    req.on('timeout', () => {
      req.destroy();
      resolve({ url, error: 'Connection timed out (10s)' });
    });
  });
}

async function runAudit() {
  console.log('=== PRODUCTION ENVIRONMENT INSPECTION (https://alphaanalyticssol.com) ===\n');
  const domain = 'alphaanalyticssol.com';
  
  console.log(`1. Resolving DNS for ${domain}...`);
  const dnsRes = await resolveDns(domain);
  console.log('DNS Result:', JSON.stringify(dnsRes, null, 2));

  const urls = [
    'https://alphaanalyticssol.com/',
    'https://alphaanalyticssol.com/robots.txt',
    'https://alphaanalyticssol.com/sitemap.xml',
    'https://alphaanalyticssol.com/terms-of-service',
    'https://alphaanalyticssol.com/privacy-policy',
    'http://alphaanalyticssol.com/'
  ];

  for (const u of urls) {
    console.log(`\nTesting: ${u}`);
    const res = await fetchHttps(u.startsWith('https:') ? u : u.replace('http:', 'https:'));
    if (res.error) {
      console.log(`  ERROR: ${res.error}`);
    } else {
      console.log(`  Status: ${res.statusCode}`);
      console.log(`  Content-Type: ${res.headers['content-type']}`);
      console.log(`  Location: ${res.headers['location'] || 'none'}`);
      console.log(`  Server: ${res.headers['server'] || 'unknown'}`);
      console.log(`  Snippet: ${res.snippet.replace(/\s+/g, ' ').substring(0, 150)}`);
    }
  }
}

runAudit();
