const http = require('http');
const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const fs = require('fs');

const BASE_DEV_URL = 'http://localhost:5173';
const ARTIFACT_DIR = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function fetchHttp(url) {
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

async function verifyAll() {
  console.log('================================================================');
  console.log('   LOCAL DEVELOPMENT ENVIRONMENT SEO VERIFICATION SUITE');
  console.log(`   Target Server: ${BASE_DEV_URL} (npm.cmd run dev)`);
  console.log('================================================================\n');

  const results = {
    tos: { status: 'PENDING', contentVerified: false, issues: [] },
    pp: { status: 'PENDING', contentVerified: false, issues: [] },
    sitemap: { status: 'PENDING', contentVerified: false, issues: [] },
    robots: { status: 'PENDING', contentVerified: false, issues: [] }
  };

  // -------------------------------------------------------------
  // 1. XML SITEMAP TEST
  // -------------------------------------------------------------
  console.log('--- TEST 1: XML Sitemap (/sitemap.xml) ---');
  try {
    const smRes = await fetchHttp(`${BASE_DEV_URL}/sitemap.xml`);
    console.log(`Status: ${smRes.statusCode}, Content-Type: ${smRes.contentType}`);
    
    if (smRes.statusCode !== 200) {
      results.sitemap.issues.push(`HTTP status was ${smRes.statusCode}, expected 200`);
    }
    if (!smRes.contentType || !smRes.contentType.includes('xml')) {
      results.sitemap.issues.push(`Content-Type was ${smRes.contentType}, expected XML`);
    }
    if (smRes.data.includes('<!doctype html>') || smRes.data.includes('<div id="root">')) {
      results.sitemap.issues.push('Returned React HTML fallback instead of XML');
    }
    if (!smRes.data.includes('<urlset') || !smRes.data.includes('</urlset>')) {
      results.sitemap.issues.push('Malformed XML or missing <urlset> tags');
    }

    const locMatches = Array.from(smRes.data.matchAll(/<loc>(.*?)<\/loc>/g)).map(m => m[1]);
    console.log(`Found ${locMatches.length} URLs in sitemap:`);
    let hasLocalhost = false;
    let hasAnchors = false;

    locMatches.forEach(u => {
      console.log('  *', u);
      if (u.includes('localhost') || u.includes('127.0.0.1')) hasLocalhost = true;
      if (u.includes('#')) hasAnchors = true;
    });

    if (hasLocalhost) results.sitemap.issues.push('Sitemap contains localhost/dev URLs');
    if (hasAnchors) results.sitemap.issues.push('Sitemap contains anchor fragments (#)');
    if (locMatches.length !== 12) results.sitemap.issues.push(`Expected 12 canonical URLs, found ${locMatches.length}`);

    if (results.sitemap.issues.length === 0) {
      results.sitemap.status = 'Pass';
      results.sitemap.contentVerified = true;
      console.log('>> PASS: XML Sitemap is well-formed, contains 12 production canonical URLs, zero localhost/anchors.\n');
    } else {
      results.sitemap.status = 'Fail';
      console.log('>> FAIL: Sitemap issues:', results.sitemap.issues, '\n');
    }
  } catch (err) {
    results.sitemap.status = 'Fail';
    results.sitemap.issues.push(`Fetch error: ${err.message}`);
    console.error('Fetch error:', err.message);
  }

  // -------------------------------------------------------------
  // 2. ROBOTS.TXT TEST
  // -------------------------------------------------------------
  console.log('--- TEST 2: Robots.txt (/robots.txt) ---');
  try {
    const rbRes = await fetchHttp(`${BASE_DEV_URL}/robots.txt`);
    console.log(`Status: ${rbRes.statusCode}, Content-Type: ${rbRes.contentType}`);
    console.log(`Content:\n${rbRes.data.trim()}`);

    if (rbRes.statusCode !== 200) {
      results.robots.issues.push(`HTTP status was ${rbRes.statusCode}, expected 200`);
    }
    if (rbRes.data.includes('<!doctype html>')) {
      results.robots.issues.push('Returned React HTML fallback instead of robots.txt text');
    }
    if (!rbRes.data.includes('User-agent: *')) {
      results.robots.issues.push('Missing User-agent: * directive');
    }
    if (!rbRes.data.includes('Allow: /')) {
      results.robots.issues.push('Missing Allow: / directive');
    }
    if (!rbRes.data.includes('Sitemap: https://alphaanalyticssol.com/sitemap.xml')) {
      results.robots.issues.push('Missing or incorrect Sitemap reference');
    }

    if (results.robots.issues.length === 0) {
      results.robots.status = 'Pass';
      results.robots.contentVerified = true;
      console.log('>> PASS: Robots.txt is valid, allows crawling, and references production sitemap.\n');
    } else {
      results.robots.status = 'Fail';
      console.log('>> FAIL: Robots.txt issues:', results.robots.issues, '\n');
    }
  } catch (err) {
    results.robots.status = 'Fail';
    results.robots.issues.push(`Fetch error: ${err.message}`);
    console.error('Fetch error:', err.message);
  }

  // -------------------------------------------------------------
  // 3. PLAYWRIGHT BROWSER AUDIT: TERMS OF SERVICE & PRIVACY POLICY
  // -------------------------------------------------------------
  console.log('--- LAUNCHING REAL BROWSER (MSEDGE) ---');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  const consoleLogs = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleLogs.push(msg.text());
  });

  // -------------------------------------------------------------
  // 3A. TERMS OF SERVICE DIRECT NAVIGATION & DEEP LINK TEST
  // -------------------------------------------------------------
  console.log('\n--- TEST 3A: Terms of Service Direct Navigation (/terms-of-service) ---');
  await page.goto(`${BASE_DEV_URL}/terms-of-service`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const tosTitle = await page.title();
  const tosCanonical = await page.getAttribute('link[rel="canonical"]', 'href');
  const tosDescription = await page.getAttribute('meta[name="description"]', 'content');
  const tosOgTitle = await page.getAttribute('meta[property="og:title"]', 'content');
  const tosTwitter = await page.getAttribute('meta[name="twitter:card"]', 'content');
  
  console.log('Document Title:    ', tosTitle);
  console.log('Canonical Link:    ', tosCanonical);
  console.log('Meta Description:  ', tosDescription?.substring(0, 75));
  console.log('OG Title:          ', tosOgTitle);
  console.log('Twitter Card:      ', tosTwitter);

  if (tosTitle !== 'Terms of Service | Alpha Applied Analytics Solutions') {
    results.tos.issues.push(`Unexpected document title: ${tosTitle}`);
  }
  if (tosCanonical !== 'https://alphaanalyticssol.com/terms-of-service') {
    results.tos.issues.push(`Canonical URL is ${tosCanonical}, expected https://alphaanalyticssol.com/terms-of-service`);
  }
  if (!tosDescription || !tosDescription.includes('Terms of Service')) {
    results.tos.issues.push('Meta description missing or invalid');
  }

  // Verify all 17 numbered sections in Terms of Service
  const expectedTosSections = [
    { num: '1', name: 'Acceptance of Terms' },
    { num: '2', name: 'Description of Services' },
    { num: '3', name: 'Client Relationship and Engagement' },
    { num: '4', name: 'Professional Standards and Limitations' },
    { num: '5', name: 'Confidentiality and Data Protection' },
    { num: '6', name: 'Payment Terms' },
    { num: '7', name: 'Intellectual Property' },
    { num: '8', name: 'Limitation of Liability' },
    { num: '9', name: 'Indemnification' },
    { num: '10', name: 'Website Use and Restrictions' },
    { num: '11', name: 'Third-Party Links and Services' },
    { num: '12', name: 'Termination' },
    { num: '13', name: 'Modifications to Terms' },
    { num: '14', name: 'Governing Law and Dispute Resolution' },
    { num: '15', name: 'Severability' },
    { num: '16', name: 'Entire Agreement' },
    { num: '17', name: 'Contact Information' },
  ];

  let missingTosSections = 0;
  for (const sec of expectedTosSections) {
    const hasSec = await page.evaluate((title) => {
      return Array.from(document.querySelectorAll('h2, h3, div, span, p')).some(el =>
        el.textContent.includes(title)
      );
    }, sec.name);
    if (!hasSec) {
      missingTosSections++;
      results.tos.issues.push(`Missing Section ${sec.num}: ${sec.name}`);
    }
  }
  console.log(`Verified 17 Sections: ${expectedTosSections.length - missingTosSections}/${expectedTosSections.length} present`);

  // Verify Effective Date
  const hasTosDate = await page.evaluate(() => document.body.textContent.includes('April 1, 2026'));
  console.log('Effective Date "April 1, 2026" displayed:', hasTosDate);
  if (!hasTosDate) results.tos.issues.push('Missing effective date "April 1, 2026"');

  // Verify Structured Data JSON-LD
  const tosSchemas = await page.$$eval('script[type="application/ld+json"]', els => els.map(e => e.textContent));
  let tosSchemaValid = false;
  if (tosSchemas.length > 0) {
    try {
      const parsed = JSON.parse(tosSchemas[0]);
      if (parsed['@type'] === 'BreadcrumbList') tosSchemaValid = true;
    } catch(e) {}
  }
  console.log('JSON-LD BreadcrumbList valid:', tosSchemaValid);
  if (!tosSchemaValid) results.tos.issues.push('Invalid or missing BreadcrumbList JSON-LD schema');

  // Take screenshot
  await page.screenshot({ path: `${ARTIFACT_DIR}/dev_verified_terms_of_service.png`, fullPage: false });

  // TEST REFRESH on /terms-of-service
  console.log('Testing page reload on /terms-of-service...');
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const reloadedTosTitle = await page.title();
  const reloadedTosCanonical = await page.getAttribute('link[rel="canonical"]', 'href');
  console.log('After reload - Title:', reloadedTosTitle, 'Canonical:', reloadedTosCanonical);
  if (reloadedTosTitle !== 'Terms of Service | Alpha Applied Analytics Solutions') {
    results.tos.issues.push('Title changed or corrupted after reload');
  }

  if (results.tos.issues.length === 0) {
    results.tos.status = 'Pass';
    results.tos.contentVerified = true;
    console.log('>> PASS: Terms of Service page verified directly and after reload.\n');
  } else {
    results.tos.status = 'Fail';
    console.log('>> FAIL: Terms of Service issues:', results.tos.issues, '\n');
  }

  // -------------------------------------------------------------
  // 3B. PRIVACY POLICY DIRECT NAVIGATION & DEEP LINK TEST
  // -------------------------------------------------------------
  console.log('--- TEST 3B: Privacy Policy Direct Navigation (/privacy-policy) ---');
  await page.goto(`${BASE_DEV_URL}/privacy-policy`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  const ppTitle = await page.title();
  const ppCanonical = await page.getAttribute('link[rel="canonical"]', 'href');
  const ppDescription = await page.getAttribute('meta[name="description"]', 'content');
  const ppOgTitle = await page.getAttribute('meta[property="og:title"]', 'content');
  const ppTwitter = await page.getAttribute('meta[name="twitter:card"]', 'content');

  console.log('Document Title:    ', ppTitle);
  console.log('Canonical Link:    ', ppCanonical);
  console.log('Meta Description:  ', ppDescription?.substring(0, 75));
  console.log('OG Title:          ', ppOgTitle);
  console.log('Twitter Card:      ', ppTwitter);

  if (ppTitle !== 'Privacy Policy | Alpha Applied Analytics Solutions') {
    results.pp.issues.push(`Unexpected document title: ${ppTitle}`);
  }
  if (ppCanonical !== 'https://alphaanalyticssol.com/privacy-policy') {
    results.pp.issues.push(`Canonical URL is ${ppCanonical}, expected https://alphaanalyticssol.com/privacy-policy`);
  }
  if (!ppDescription || !ppDescription.includes('Privacy Policy')) {
    results.pp.issues.push('Meta description missing or invalid');
  }

  // Verify all 12 numbered sections in Privacy Policy
  const expectedPpSections = [
    { num: '1', name: 'Information We Collect' },
    { num: '2', name: 'How We Use Your Information' },
    { num: '3', name: 'Data Sharing and Disclosure' },
    { num: '4', name: 'Data Security' },
    { num: '5', name: 'Data Retention' },
    { num: '6', name: 'Your Rights and Choices' },
    { num: '7', name: 'Cookies and Tracking Technologies' },
    { num: '8', name: 'Third-Party Links' },
    { num: '9', name: "Children's Privacy" },
    { num: '10', name: 'International Data Transfers' },
    { num: '11', name: 'Changes to This Privacy Policy' },
    { num: '12', name: 'Contact Us' },
  ];

  let missingPpSections = 0;
  for (const sec of expectedPpSections) {
    const hasSec = await page.evaluate((title) => {
      return Array.from(document.querySelectorAll('h2, h3, div, span, p')).some(el =>
        el.textContent.includes(title)
      );
    }, sec.name);
    if (!hasSec) {
      missingPpSections++;
      results.pp.issues.push(`Missing Section ${sec.num}: ${sec.name}`);
    }
  }
  console.log(`Verified 12 Sections: ${expectedPpSections.length - missingPpSections}/${expectedPpSections.length} present`);

  // Verify Effective Date
  const hasPpDate = await page.evaluate(() => document.body.textContent.includes('April 1, 2026'));
  console.log('Effective Date "April 1, 2026" displayed:', hasPpDate);
  if (!hasPpDate) results.pp.issues.push('Missing effective date "April 1, 2026"');

  // Verify Structured Data JSON-LD
  const ppSchemas = await page.$$eval('script[type="application/ld+json"]', els => els.map(e => e.textContent));
  let ppSchemaValid = false;
  if (ppSchemas.length > 0) {
    try {
      const parsed = JSON.parse(ppSchemas[0]);
      if (parsed['@type'] === 'BreadcrumbList') ppSchemaValid = true;
    } catch(e) {}
  }
  console.log('JSON-LD BreadcrumbList valid:', ppSchemaValid);
  if (!ppSchemaValid) results.pp.issues.push('Invalid or missing BreadcrumbList JSON-LD schema');

  // Take screenshot
  await page.screenshot({ path: `${ARTIFACT_DIR}/dev_verified_privacy_policy.png`, fullPage: false });

  // TEST REFRESH on /privacy-policy
  console.log('Testing page reload on /privacy-policy...');
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(300);
  const reloadedPpTitle = await page.title();
  const reloadedPpCanonical = await page.getAttribute('link[rel="canonical"]', 'href');
  console.log('After reload - Title:', reloadedPpTitle, 'Canonical:', reloadedPpCanonical);
  if (reloadedPpTitle !== 'Privacy Policy | Alpha Applied Analytics Solutions') {
    results.pp.issues.push('Title changed or corrupted after reload');
  }

  if (results.pp.issues.length === 0) {
    results.pp.status = 'Pass';
    results.pp.contentVerified = true;
    console.log('>> PASS: Privacy Policy page verified directly and after reload.\n');
  } else {
    results.pp.status = 'Fail';
    console.log('>> FAIL: Privacy Policy issues:', results.pp.issues, '\n');
  }

  // -------------------------------------------------------------
  // 4. INTERNAL LINK & TRANSITION TESTING
  // -------------------------------------------------------------
  console.log('--- TEST 4: Internal Navigation & Browser History ---');
  await page.goto(`${BASE_DEV_URL}/`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Click Footer "Terms of Service" link
  console.log('Clicking Footer Terms of Service link...');
  const footerTosLink = await page.$('footer a[href="/terms-of-service"]');
  if (footerTosLink) {
    await footerTosLink.click();
    await page.waitForTimeout(500); // Allow directional cover/reveal
    const navTosTitle = await page.title();
    const navTosUrl = page.url();
    console.log('Navigated via footer to:', navTosUrl, '| Title:', navTosTitle);
    if (!navTosUrl.includes('/terms-of-service') || !navTosTitle.includes('Terms of Service')) {
      console.error('FAIL: Footer navigation to Terms of Service failed');
    } else {
      console.log('PASS: Footer link successfully navigates to Terms of Service');
    }
  } else {
    console.error('FAIL: Footer link to /terms-of-service not found');
  }

  // From Terms of Service, click cross-link to Privacy Policy
  console.log('Clicking cross-policy link to Privacy Policy in Terms of Service...');
  const crossPpLink = await page.$('main a[href="/privacy-policy"]');
  if (crossPpLink) {
    await crossPpLink.click();
    await page.waitForTimeout(500);
    const navPpUrl = page.url();
    const navPpTitle = await page.title();
    console.log('Cross-navigated to:', navPpUrl, '| Title:', navPpTitle);
    if (navPpUrl.includes('/privacy-policy') && navPpTitle.includes('Privacy Policy')) {
      console.log('PASS: Cross-link between legal policies works smoothly');
    } else {
      console.error('FAIL: Cross-link navigation failed');
    }
  }

  // Test Browser Back and Forward
  console.log('Testing browser BACK button...');
  await page.goBack();
  await page.waitForTimeout(400);
  console.log('Back to URL:', page.url(), '| Title:', await page.title());

  console.log('Testing browser FORWARD button...');
  await page.goForward();
  await page.waitForTimeout(400);
  console.log('Forward to URL:', page.url(), '| Title:', await page.title());

  // Check if any link on page contains accidental .html for legal links
  const accidentalHtmlLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a'))
      .map(a => a.getAttribute('href'))
      .filter(href => href && (href.includes('terms-of-service.html') || href.includes('privacy-policy.html')));
  });
  console.log('Accidental .html legal links found on page:', accidentalHtmlLinks.length);
  if (accidentalHtmlLinks.length > 0) {
    console.error('FAIL: Found unintended .html legal links:', accidentalHtmlLinks);
  } else {
    console.log('PASS: All legal links use clean extensionless routes');
  }

  console.log('\nTotal console errors during full test run:', consoleLogs.length);
  if (consoleLogs.length > 0) {
    console.log('Console errors:', consoleLogs);
  }

  await browser.close();

  // Print Summary Table
  console.log('\n================================================================');
  console.log('   FINAL SUMMARY TABLE');
  console.log('================================================================');
  console.log('| Local path         | Result | Content verified | Issues                     |');
  console.log('|--------------------|--------|------------------|----------------------------|');
  console.log(`| /terms-of-service  | ${results.tos.status}   | ${results.tos.contentVerified ? 'Pass' : 'Fail'}             | ${results.tos.issues.length ? results.tos.issues.join('; ') : 'None. All 17 sections, metadata & reload OK'} |`);
  console.log(`| /privacy-policy    | ${results.pp.status}   | ${results.pp.contentVerified ? 'Pass' : 'Fail'}             | ${results.pp.issues.length ? results.pp.issues.join('; ') : 'None. All 12 sections, metadata & reload OK'} |`);
  console.log(`| /sitemap.xml       | ${results.sitemap.status}   | ${results.sitemap.contentVerified ? 'Pass' : 'Fail'}             | ${results.sitemap.issues.length ? results.sitemap.issues.join('; ') : 'None. Valid XML, 12 canonical URLs'} |`);
  console.log(`| /robots.txt        | ${results.robots.status}   | ${results.robots.contentVerified ? 'Pass' : 'Fail'}             | ${results.robots.issues.length ? results.robots.issues.join('; ') : 'None. Correct rules & sitemap ref'} |`);
  console.log('================================================================\n');
}

verifyAll().catch(err => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
