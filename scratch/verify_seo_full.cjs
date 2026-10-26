const http = require('http');
const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const fs = require('fs');

async function fetchHttp(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, data }));
    }).on('error', reject);
  });
}

const routes = [
  { path: '/', name: 'Homepage' },
  { path: '/aiconsulting.html', name: 'AI Consulting' },
  { path: '/litigationservices.html', name: 'Litigation Services' },
  { path: '/alphalens.html', name: 'Alpha Lens Platform' },
  { path: '/divorcefamilylaw.html', name: 'Divorce & Family Law' },
  { path: '/economicdamages.html', name: 'Economic Damages' },
  { path: '/documentanalysis.html', name: 'Document Analysis' },
  { path: '/bankruptcyrestructuring.html', name: 'Bankruptcy & Restructuring' },
  { path: '/intellectualproperty.html', name: 'Intellectual Property' },
  { path: '/litigationsupport.html', name: 'Litigation Support' },
  { path: '/terms-of-service.html', name: 'Terms of Service' },
  { path: '/privacy-policy.html', name: 'Privacy Policy' },
];

async function main() {
  console.log('=== SEO AUDIT & VERIFICATION SUITE ===\n');

  // 1. Verify robots.txt and sitemap.xml via HTTP
  console.log('--- 1. Testing robots.txt and sitemap.xml HTTP endpoints ---');
  const robots = await fetchHttp('http://127.0.0.1:4180/robots.txt');
  console.log('robots.txt status:', robots.statusCode);
  console.log('robots.txt content:\n' + robots.data.trim());

  if (robots.statusCode !== 200 || !robots.data.includes('sitemap.xml')) {
    console.error('FAIL: robots.txt does not properly reference sitemap.xml');
  } else {
    console.log('PASS: robots.txt is accessible and references sitemap.xml\n');
  }

  const sitemap = await fetchHttp('http://127.0.0.1:4180/sitemap.xml');
  console.log('sitemap.xml status:', sitemap.statusCode);
  if (sitemap.statusCode !== 200 || !sitemap.data.includes('<urlset')) {
    console.error('FAIL: sitemap.xml is not valid XML or missing <urlset>');
  } else {
    const urls = sitemap.data.match(/<loc>(.*?)<\/loc>/g).map(u => u.replace(/<\/?loc>/g, ''));
    console.log(`sitemap.xml contains ${urls.length} URLs:`);
    urls.forEach(u => console.log('  -', u));
    console.log('PASS: sitemap.xml is valid\n');
  }

  // 2. Launch headless browser for DOM, SPA navigation, and visual verification
  console.log('--- 2. Auditing Static and Rendered DOM Metadata Across Routes ---');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();

  const collectedTitles = new Map();
  const collectedDescriptions = new Map();
  const collectedCanonicals = new Map();

  for (const r of routes) {
    const url = `http://127.0.0.1:4180${r.path}`;
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto(url, { waitUntil: 'networkidle' });

    // Wait briefly for React hydration and SEO hook execution
    await page.waitForTimeout(300);

    const title = await page.title();
    const description = await page.getAttribute('meta[name="description"]', 'content');
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content');
    const ogDesc = await page.getAttribute('meta[property="og:description"]', 'content');
    const ogUrl = await page.getAttribute('meta[property="og:url"]', 'content');
    const ogType = await page.getAttribute('meta[property="og:type"]', 'content');
    const ogImage = await page.getAttribute('meta[property="og:image"]', 'content');
    const twitterCard = await page.getAttribute('meta[name="twitter:card"]', 'content');
    const twitterTitle = await page.getAttribute('meta[name="twitter:title"]', 'content');

    // JSON-LD structured data check
    const jsonLdContent = await page.$$eval('script[type="application/ld+json"]', elements =>
      elements.map(el => el.textContent)
    );
    let validJsonLd = false;
    let schemaType = 'none';
    if (jsonLdContent.length > 0) {
      try {
        const parsed = JSON.parse(jsonLdContent[0]);
        validJsonLd = true;
        schemaType = parsed['@type'] || (parsed['@graph'] ? 'Graph (' + parsed['@graph'].map(g => g['@type']).join(', ') + ')' : 'unknown');
      } catch (e) {
        console.error('Invalid JSON-LD on route:', r.path, e.message);
      }
    }

    // Check horizontal scroll / overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const hasHorizontalOverflow = scrollWidth > clientWidth;

    console.log(`Route [${r.name}] (${r.path}):`);
    console.log(`  Title:        ${title}`);
    console.log(`  Description:  ${description?.substring(0, 75)}...`);
    console.log(`  Canonical:    ${canonical}`);
    console.log(`  OG Title:     ${ogTitle}`);
    console.log(`  OG Image:     ${ogImage}`);
    console.log(`  Twitter Card: ${twitterCard}`);
    console.log(`  JSON-LD:      Valid: ${validJsonLd} (${schemaType})`);
    console.log(`  Overflow:     ${hasHorizontalOverflow ? 'FAIL (Overflow)' : 'PASS (No overflow)'}`);
    console.log(`  Errors:       ${consoleErrors.length}`);

    // Track uniqueness
    if (collectedTitles.has(title)) {
      console.error(`  FAIL: Duplicate title with ${collectedTitles.get(title)}`);
    } else {
      collectedTitles.set(title, r.name);
    }

    if (collectedDescriptions.has(description)) {
      console.error(`  FAIL: Duplicate description with ${collectedDescriptions.get(description)}`);
    } else {
      collectedDescriptions.set(description, r.name);
    }

    if (collectedCanonicals.has(canonical)) {
      console.error(`  FAIL: Duplicate canonical with ${collectedCanonicals.get(canonical)}`);
    } else {
      collectedCanonicals.set(canonical, r.name);
    }

    console.log('');
  }

  // 3. Test Client-Side SPA Route Transitions
  console.log('--- 3. Testing Client-Side SPA Navigation and Dynamic Metadata Updates ---');
  await page.goto('http://127.0.0.1:4180/', { waitUntil: 'networkidle' });
  const homeTitle = await page.title();
  const homeCanonical = await page.getAttribute('link[rel="canonical"]', 'href');
  console.log('At start (Home):', homeTitle, homeCanonical);

  // Click on "AI Consulting & Implementation" navigation link
  const aiLink = await page.$('a[href="/aiconsulting.html"]');
  if (aiLink) {
    await aiLink.click();
    await page.waitForTimeout(600); // Wait for cover-reveal transition
    const aiTitle = await page.title();
    const aiDesc = await page.getAttribute('meta[name="description"]', 'content');
    const aiCanonical = await page.getAttribute('link[rel="canonical"]', 'href');
    console.log('After SPA click to AI Consulting:');
    console.log('  Title:     ', aiTitle);
    console.log('  Canonical: ', aiCanonical);
    console.log('  Desc:      ', aiDesc?.substring(0, 60));
    if (aiTitle.includes('AI Consulting') && aiCanonical.includes('aiconsulting.html')) {
      console.log('PASS: Dynamic SEO update succeeded on internal SPA link transition!\n');
    } else {
      console.error('FAIL: Metadata did not update properly on SPA navigation');
    }
  }

  // 4. Test Mobile Viewport Layout & Overflow
  console.log('--- 4. Testing Mobile Viewport (iPhone 14 / 390x844) ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:4180/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const mobileScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  const mobileClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
  console.log(`Mobile Viewport (390px): scrollWidth=${mobileScrollWidth}, clientWidth=${mobileClientWidth}`);
  if (mobileScrollWidth <= mobileClientWidth) {
    console.log('PASS: Zero mobile horizontal overflow!\n');
  } else {
    console.error('FAIL: Mobile horizontal overflow detected!');
  }

  // Take screenshot of mobile hero and mobile contact
  await page.screenshot({ path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/seo_verified_mobile_hero.png' });
  console.log('Captured mobile screenshot');

  await browser.close();
  console.log('=== VERIFICATION COMPLETE ===');
}

main().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
