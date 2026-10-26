const http = require('http');
const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const fs = require('fs');
const path = require('path');

const BASE_DEV_URL = 'http://localhost:5173';
const PROD_DOMAIN = 'https://alphaanalyticssol.com';

const routesToAudit = [
  { path: '/', name: 'Homepage', type: 'homepage', minWords: 500 },
  { path: '/aiconsulting.html', name: 'AI Consulting & Implementation', type: 'service', minWords: 800 },
  { path: '/litigationservices.html', name: 'Litigation Services Overview', type: 'service', minWords: 800 },
  { path: '/alphalens.html', name: 'Alpha Lens Platform', type: 'service', minWords: 800 },
  { path: '/divorcefamilylaw.html', name: 'Divorce & Family Law', type: 'practice', minWords: 500 },
  { path: '/economicdamages.html', name: 'Economic Damages', type: 'practice', minWords: 500 },
  { path: '/documentanalysis.html', name: 'Document Analysis', type: 'practice', minWords: 500 },
  { path: '/bankruptcyrestructuring.html', name: 'Bankruptcy & Restructuring', type: 'practice', minWords: 500 },
  { path: '/intellectualproperty.html', name: 'Intellectual Property', type: 'practice', minWords: 500 },
  { path: '/litigationsupport.html', name: 'Litigation Support', type: 'practice', minWords: 500 },
  { path: '/terms-of-service', name: 'Terms of Service', type: 'legal', minWords: 500 },
  { path: '/privacy-policy', name: 'Privacy Policy', type: 'legal', minWords: 500 },
];

function fetchHttp(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        contentType: res.headers['content-type'],
        data
      }));
    }).on('error', reject);
  });
}

async function runClaudeSeoAudit() {
  console.log('========================================================================');
  console.log('   CLAUDE SEO COMPREHENSIVE MULTI-DIMENSIONAL AUDIT SUITE');
  console.log(`   Auditing Local Dev Target: ${BASE_DEV_URL}`);
  console.log(`   Expected Production Domain: ${PROD_DOMAIN}`);
  console.log('========================================================================\n');

  const auditReport = {
    timestamp: new Date().toISOString(),
    engine: 'Claude SEO Methodology (v2.5.0) via Playwright Engine',
    summary: {
      healthScore: 0,
      totalRoutesAudited: routesToAudit.length,
      passedChecks: 0,
      warnings: 0,
      failures: 0,
    },
    technical: {},
    pages: [],
    images: { total: 0, withAlt: 0, decorative: 0, lazy: 0, eager: 0, unoptimized: 0 },
    eeat: { signalsFound: [], gaps: [] },
    agentic: { status: 'Assessed', details: [] },
    findings: []
  };

  // -------------------------------------------------------------
  // 1. TECHNICAL AUDIT: ROBOTS.TXT & SITEMAP.XML
  // -------------------------------------------------------------
  console.log('--- 1. TECHNICAL AUDIT: ROBOTS.TXT & SITEMAP.XML ---');
  const robotsRes = await fetchHttp(`${BASE_DEV_URL}/robots.txt`);
  const sitemapRes = await fetchHttp(`${BASE_DEV_URL}/sitemap.xml`);

  auditReport.technical.robots = {
    statusCode: robotsRes.statusCode,
    allowsAll: robotsRes.data.includes('User-agent: *') && robotsRes.data.includes('Allow: /'),
    hasSitemap: robotsRes.data.includes('Sitemap: https://alphaanalyticssol.com/sitemap.xml'),
    content: robotsRes.data.trim()
  };

  const sitemapUrls = Array.from(sitemapRes.data.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1]);
  auditReport.technical.sitemap = {
    statusCode: sitemapRes.statusCode,
    isValidXml: sitemapRes.data.includes('<urlset') && sitemapRes.data.includes('</urlset>'),
    urlCount: sitemapUrls.length,
    urls: sitemapUrls,
    hasLocalhost: sitemapUrls.some(u => u.includes('localhost') || u.includes('127.0.0.1')),
    hasAnchors: sitemapUrls.some(u => u.includes('#'))
  };

  console.log('Robots.txt Status: ', auditReport.technical.robots.statusCode);
  console.log('Robots allows all:  ', auditReport.technical.robots.allowsAll);
  console.log('Robots sitemap ref: ', auditReport.technical.robots.hasSitemap);
  console.log('Sitemap.xml Status: ', auditReport.technical.sitemap.statusCode);
  console.log('Sitemap URL count:  ', auditReport.technical.sitemap.urlCount);
  console.log('Sitemap clean URLs: ', !auditReport.technical.sitemap.hasLocalhost && !auditReport.technical.sitemap.hasAnchors);

  // -------------------------------------------------------------
  // 2. PAGE-BY-PAGE AUDIT VIA HEADLESS REAL BROWSER (MSEDGE)
  // -------------------------------------------------------------
  console.log('\n--- 2. PAGE-BY-PAGE IN-DEPTH AUDIT ---');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const allTitles = new Map();
  const allDescriptions = new Map();
  const allCanonicals = new Map();

  for (const r of routesToAudit) {
    const pageUrl = `${BASE_DEV_URL}${r.path}`;
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    // Measure load time
    const t0 = Date.now();
    await page.goto(pageUrl, { waitUntil: 'networkidle' });
    const loadTimeMs = Date.now() - t0;
    await page.waitForTimeout(200);

    // Extract DOM metrics
    const title = await page.title();
    const metaDesc = await page.getAttribute('meta[name="description"]', 'content') || '';
    const canonical = await page.getAttribute('link[rel="canonical"]', 'href') || '';
    const ogTitle = await page.getAttribute('meta[property="og:title"]', 'content') || '';
    const ogDesc = await page.getAttribute('meta[property="og:description"]', 'content') || '';
    const ogUrl = await page.getAttribute('meta[property="og:url"]', 'content') || '';
    const ogImage = await page.getAttribute('meta[property="og:image"]', 'content') || '';
    const twitterCard = await page.getAttribute('meta[name="twitter:card"]', 'content') || '';

    // Headings
    const h1s = await page.$$eval('h1', els => els.map(e => e.textContent.trim().replace(/\s+/g, ' ')));
    const h2Count = (await page.$$('h2')).length;
    const h3Count = (await page.$$('h3')).length;

    // Word count & Content extract
    const bodyText = await page.evaluate(() => document.body.innerText || '');
    const words = bodyText.split(/\s+/).filter(w => w.length > 0).length;

    // Schema.org JSON-LD
    const rawSchemas = await page.$$eval('script[type="application/ld+json"]', els => els.map(e => e.textContent));
    let parsedSchema = null;
    let schemaType = 'none';
    let isSchemaValid = false;
    if (rawSchemas.length > 0) {
      try {
        parsedSchema = JSON.parse(rawSchemas[0]);
        isSchemaValid = true;
        schemaType = parsedSchema['@type'] || (parsedSchema['@graph'] ? 'Graph (' + parsedSchema['@graph'].map(g => g['@type']).join(', ') + ')' : 'Custom');
      } catch (e) {
        schemaType = 'INVALID JSON: ' + e.message;
      }
    }

    // Check images on page
    const pageImages = await page.$$eval('img', els => els.map(img => ({
      src: img.src,
      alt: img.getAttribute('alt'),
      role: img.getAttribute('role'),
      loading: img.getAttribute('loading'),
      width: img.getAttribute('width'),
      height: img.getAttribute('height')
    })));

    // Layout overflow test
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    const hasOverflow = scrollWidth > clientWidth;

    // Claude SEO Heuristic Checks
    const titleLength = title.length;
    const descLength = metaDesc.length;
    const titleOk = titleLength >= 40 && titleLength <= 90;
    const descOk = descLength >= 100 && descLength <= 200;
    const h1CountOk = h1s.length === 1;
    const isTemplatedDesc = metaDesc.startsWith(title) || metaDesc.endsWith('Click here') || metaDesc.endsWith('Buy now');
    const wordCountPass = words >= r.minWords;

    const pageAudit = {
      path: r.path,
      name: r.name,
      type: r.type,
      title,
      titleLength,
      titleOk,
      metaDesc,
      descLength,
      descOk,
      isTemplatedDesc,
      canonical,
      canonicalOk: canonical.startsWith(PROD_DOMAIN),
      ogTitle,
      ogImage,
      twitterCard,
      h1Count: h1s.length,
      h1s,
      h1CountOk,
      h2Count,
      h3Count,
      words,
      wordCountPass,
      schemaType,
      isSchemaValid,
      imageCount: pageImages.length,
      hasOverflow,
      consoleErrors: consoleErrors.length,
      loadTimeMs,
      issues: []
    };

    // Flag issues
    if (!titleOk) pageAudit.issues.push(`Title length ${titleLength} outside ideal 40-90 range`);
    if (!descOk) pageAudit.issues.push(`Description length ${descLength} outside recommended 100-200 range`);
    if (isTemplatedDesc) pageAudit.issues.push('Templated metadata detected');
    if (!pageAudit.canonicalOk) pageAudit.issues.push(`Canonical URL not on production domain: ${canonical}`);
    if (!h1CountOk) pageAudit.issues.push(`Expected exactly 1 <h1>, found ${h1s.length}`);
    if (!wordCountPass) pageAudit.issues.push(`Word count ${words} below topical floor ${r.minWords}`);
    if (!isSchemaValid) pageAudit.issues.push('Schema.org structured data missing or invalid JSON');
    if (hasOverflow) pageAudit.issues.push('Horizontal layout overflow detected');
    if (consoleErrors.length > 0) pageAudit.issues.push(`${consoleErrors.length} console errors detected`);

    // Track uniqueness
    if (allTitles.has(title)) pageAudit.issues.push(`Duplicate title with ${allTitles.get(title)}`);
    else allTitles.set(title, r.name);

    if (allDescriptions.has(metaDesc)) pageAudit.issues.push(`Duplicate description with ${allDescriptions.get(metaDesc)}`);
    else allDescriptions.set(metaDesc, r.name);

    if (allCanonicals.has(canonical)) pageAudit.issues.push(`Duplicate canonical with ${allCanonicals.get(canonical)}`);
    else allCanonicals.set(canonical, r.name);

    auditReport.pages.push(pageAudit);

    console.log(`[${r.name}] (${r.path})`);
    console.log(`  Title (${titleLength}c): ${title}`);
    console.log(`  H1 (${h1s.length}): ${h1s[0] || 'NONE'}`);
    console.log(`  Canonical: ${canonical}`);
    console.log(`  Words: ${words} (min ${r.minWords}) | Schema: ${schemaType} | Issues: ${pageAudit.issues.length}`);
    if (pageAudit.issues.length > 0) {
      pageAudit.issues.forEach(iss => console.log(`    ! ${iss}`));
    }
  }

  // -------------------------------------------------------------
  // 3. IMAGE SEO AUDIT ACROSS SITE
  // -------------------------------------------------------------
  console.log('\n--- 3. IMAGE SEO AUDIT ---');
  await page.goto(`${BASE_DEV_URL}/`, { waitUntil: 'networkidle' });
  const allImages = await page.$$eval('img', els => els.map(img => ({
    src: img.src,
    alt: img.getAttribute('alt'),
    role: img.getAttribute('role'),
    loading: img.getAttribute('loading'),
    width: img.getAttribute('width'),
    height: img.getAttribute('height'),
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight
  })));

  auditReport.images.total = allImages.length;
  allImages.forEach(img => {
    if (img.alt === '' && img.role === 'presentation') auditReport.images.decorative++;
    else if (img.alt && img.alt.trim().length > 0) auditReport.images.withAlt++;
    if (img.loading === 'lazy') auditReport.images.lazy++;
    if (img.loading === 'eager') auditReport.images.eager++;
  });

  console.log(`Total Homepage Images: ${auditReport.images.total}`);
  console.log(`Informative Images with Alt: ${auditReport.images.withAlt}`);
  console.log(`Decorative Images (alt="" role="presentation"): ${auditReport.images.decorative}`);
  console.log(`Lazy-loaded: ${auditReport.images.lazy} | Eager-loaded: ${auditReport.images.eager}`);

  // -------------------------------------------------------------
  // 4. MOBILE RESPONSIVE QA (390px & 430px)
  // -------------------------------------------------------------
  console.log('\n--- 4. MOBILE RESPONSIVE & LAYOUT QA ---');
  const viewports = [{ w: 390, h: 844, name: 'iPhone 14' }, { w: 430, h: 932, name: 'iPhone 14 Pro Max' }];
  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.w, height: vp.h });
    await page.goto(`${BASE_DEV_URL}/`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    const scrollW = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientW = await page.evaluate(() => document.documentElement.clientWidth);
    const overflow = scrollW > clientW;
    console.log(`Viewport ${vp.name} (${vp.w}px): scrollWidth=${scrollW}, clientWidth=${clientW} | Overflow: ${overflow ? 'FAIL' : 'PASS'}`);
  }

  // -------------------------------------------------------------
  // 5. E-E-A-T AUDIT HEURISTICS
  // -------------------------------------------------------------
  console.log('\n--- 5. E-E-A-T & CONTENT QUALITY SIGNALS ---');
  await page.goto(`${BASE_DEV_URL}/`, { waitUntil: 'networkidle' });
  const eeatCheck = await page.evaluate(() => {
    const text = document.body.innerText;
    return {
      hasFounderBio: text.includes('Krishna Dornadula') && text.includes('Founder & Principal'),
      hasDegrees: text.includes('Northwestern University') || text.includes('Binghamton University') || text.includes('University of Illinois'),
      hasDisclaimers: text.includes('general advisory') || text.includes('conflict clearance'),
      hasContactChannels: text.includes('info@alphaanalyticssol.com') && text.includes('WhatsApp'),
      hasLegalDocs: text.includes('Terms of Service') && text.includes('Privacy Policy')
    };
  });
  console.log('E-E-A-T Signals:', eeatCheck);

  // -------------------------------------------------------------
  // 6. CALCULATE CLAUDE SEO HEALTH SCORE
  // -------------------------------------------------------------
  let score = 100;
  let totalIssues = 0;
  auditReport.pages.forEach(p => {
    totalIssues += p.issues.length;
    score -= (p.issues.length * 2.5);
  });
  if (!auditReport.technical.robots.allowsAll) score -= 15;
  if (!auditReport.technical.sitemap.isValidXml) score -= 15;
  if (auditReport.technical.sitemap.hasLocalhost) score -= 10;
  auditReport.summary.healthScore = Math.max(0, Math.round(score));

  console.log(`\nCLAUDE SEO HEALTH SCORE: ${auditReport.summary.healthScore}/100`);
  console.log(`Total Issues / Warnings: ${totalIssues}`);

  await browser.close();

  // Save audit data JSON
  fs.writeFileSync(
    'C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2/scratch/audit_data.json',
    JSON.stringify(auditReport, null, 2),
    'utf8'
  );
  console.log('Saved scratch/audit_data.json');
}

runClaudeSeoAudit().catch(err => {
  console.error('Audit run failed:', err);
  process.exit(1);
});
