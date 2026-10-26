const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const ARTIFACTS_DIR = 'C:\\Users\\jaiav\\.gemini\\antigravity\\brain\\8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function runPhosphorVerification() {
  console.log('=== STARTING PHOSPHOR ICONS MIGRATION VERIFICATION ===\n');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  let passCount = 0;
  let failCount = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passCount++;
    } else {
      console.error(`[FAIL] ${message}`);
      failCount++;
    }
  }

  try {
    // 1. Homepage Verification
    console.log('--- TEST 1: HOMEPAGE PHOSPHOR ICONS ---');
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    // Track console errors
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('http://127.0.0.1:4175/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Verify Header icons
    const headerCtaIcon = page.locator('header a:has-text("Book a Call") svg');
    assert(await headerCtaIcon.isVisible(), 'Header "Book a Call" CTA has visible Phosphor icon');

    // Verify Core Practice Pillars icons
    const pillars = page.locator('#pillars .pillar-card');
    assert((await pillars.count()) === 3, 'Found 3 Core Practice Pillars cards');

    // Each pillar card icon container has an SVG
    for (let i = 0; i < 3; i++) {
      const iconSvg = pillars.nth(i).locator('svg').first();
      assert(await iconSvg.isVisible(), `Pillar ${i + 1} icon SVG is visible`);
    }

    // Capture screenshot of Core Practice Pillars
    const pillarsSection = page.locator('#pillars');
    await pillarsSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const pillarsScreenshot = path.join(ARTIFACTS_DIR, 'phosphor_homepage_pillars.png');
    await pillarsSection.screenshot({ path: pillarsScreenshot });
    console.log(`Saved screenshot: ${pillarsScreenshot}`);

    // Verify Who We Serve icons
    console.log('\n--- TEST 2: WHO WE SERVE ICONS ---');
    const whoWeServe = page.locator('#who-we-serve');
    await whoWeServe.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const whoIcons = whoWeServe.locator('.site-container svg');
    const whoCount = await whoIcons.count();
    assert(whoCount >= 3, `Who We Serve has audience icons (found: ${whoCount})`);

    const whoScreenshot = path.join(ARTIFACTS_DIR, 'phosphor_who_we_serve.png');
    await whoWeServe.screenshot({ path: whoScreenshot });
    console.log(`Saved screenshot: ${whoScreenshot}`);

    // Verify Founder & About icons
    console.log('\n--- TEST 3: FOUNDER PROFILE ICONS ---');
    const aboutSection = page.locator('#about');
    await aboutSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    // Trigger reveal of all parts
    await aboutSection.locator('text=Academic Background').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await aboutSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    const expertiseRows = aboutSection.locator('text=01, 02, 03, 04, 05');
    assert(await aboutSection.locator('text=Forensic Financial Analytics').isVisible(), 'Founder expertise row visible');
    assert(await aboutSection.locator('text=Academic Background').isVisible(), 'Founder academic background visible');

    // Hide sticky header momentarily for clean screenshot
    await page.evaluate(() => {
      const h = document.querySelector('header');
      if (h) h.style.visibility = 'hidden';
    });
    const aboutScreenshot = path.join(ARTIFACTS_DIR, 'phosphor_founder_about.png');
    await aboutSection.screenshot({ path: aboutScreenshot });
    await page.evaluate(() => {
      const h = document.querySelector('header');
      if (h) h.style.visibility = 'visible';
    });
    console.log(`Saved screenshot: ${aboutScreenshot}`);

    // 2. Litigation Services Page
    console.log('\n--- TEST 4: LITIGATION SERVICES PAGE ---');
    await page.goto('http://127.0.0.1:4175/litigationservices.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    const litCards = page.locator('.litigation-service-card');
    assert((await litCards.count()) === 6, 'Found 6 Litigation Service cards');

    for (let i = 0; i < 6; i++) {
      const cardSvg = litCards.nth(i).locator('svg').first();
      assert(await cardSvg.isVisible(), `Litigation card ${i + 1} has visible Phosphor icon`);
    }

    const litScreenshot = path.join(ARTIFACTS_DIR, 'phosphor_litigation_services.png');
    await page.locator('section:has(h1)').screenshot({ path: litScreenshot });
    console.log(`Saved screenshot: ${litScreenshot}`);

    // 3. Editorial Detail Page
    console.log('\n--- TEST 5: EDITORIAL SERVICE DETAIL PAGE ---');
    await page.goto('http://127.0.0.1:4175/documentanalysis.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    const backLink = page.locator('a:has-text("Back to Litigation Services")').first();
    assert(await backLink.isVisible(), 'Back link to litigation overview is visible');
    const backSvg = backLink.locator('svg');
    assert(await backSvg.isVisible(), 'Back link has visible Phosphor ArrowLeft icon');

    // 4. AlphaLens Platform Page
    console.log('\n--- TEST 6: ALPHALENS PLATFORM ICONS ---');
    await page.goto('http://127.0.0.1:4175/alphalens.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const pipelineTabs = page.locator('[role="tab"]');
    assert((await pipelineTabs.count()) === 4, 'Found 4 pipeline module tabs');

    // Click module tab 2 (Extraction)
    await pipelineTabs.nth(1).click();
    await page.waitForTimeout(300);

    const activeTab = await page.locator('[role="tab"][aria-selected="true"]').textContent();
    assert(activeTab?.includes('Extraction'), 'Module 2 (Extraction) activated on click');

    const moduleSection = page.locator('section:has-text("Four Modules. Sixteen Specialized Tools.")').first();
    const alphalensScreenshot = path.join(ARTIFACTS_DIR, 'phosphor_alphalens_module.png');
    await moduleSection.screenshot({ path: alphalensScreenshot });
    console.log(`Saved screenshot: ${alphalensScreenshot}`);

    // Verify Crypto Hub & Spoke icons
    const cryptoSection = page.locator('section:has-text("Cross-Asset & Cryptocurrency Tracing")').first();
    await cryptoSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const cryptoIcons = cryptoSection.locator('svg');
    assert((await cryptoIcons.count()) >= 5, 'Crypto section has hub, arrows, and satellite icons');

    // 5. AI Consulting Page
    console.log('\n--- TEST 7: AI CONSULTING PAGE ICONS ---');
    await page.goto('http://127.0.0.1:4175/aiconsulting.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    const navChips = page.locator('a[href^="#ai-"]');
    assert((await navChips.count()) === 4, 'Found 4 in-page quick nav chips with Phosphor ArrowRight icons');

    const serviceHeaders = page.locator('h2');
    assert((await serviceHeaders.count()) >= 4, 'Found 4 AI consulting service section headers');

    const aiScreenshot = path.join(ARTIFACTS_DIR, 'phosphor_ai_consulting.png');
    await page.locator('#ai-assessment-strategy').screenshot({ path: aiScreenshot });
    console.log(`Saved screenshot: ${aiScreenshot}`);

    // 6. Mobile Viewport Check (390x844)
    console.log('\n--- TEST 8: MOBILE VIEWPORT & DRAWER ICONS ---');
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto('http://127.0.0.1:4175/', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(300);

    // Open mobile menu
    const menuBtn = mobilePage.locator('button[aria-label="Open mobile navigation menu"]');
    assert(await menuBtn.isVisible(), 'Mobile menu button is visible');
    await menuBtn.click();
    await mobilePage.waitForTimeout(300);

    const closeBtn = mobilePage.locator('button[aria-label="Close menu"]');
    assert(await closeBtn.isVisible(), 'Mobile drawer close icon (Phosphor X) is visible');

    const mobileScreenshot = path.join(ARTIFACTS_DIR, 'phosphor_mobile_drawer.png');
    await mobilePage.screenshot({ path: mobileScreenshot });
    console.log(`Saved screenshot: ${mobileScreenshot}`);

    // Check console errors
    console.log('\n--- TEST 9: CONSOLE ERRORS CHECK ---');
    assert(consoleErrors.length === 0, `0 console errors detected (found: ${consoleErrors.length})`);
    if (consoleErrors.length > 0) {
      console.error('Console errors:', consoleErrors);
    }

    await browser.close();
  } catch (err) {
    console.error('Test execution error:', err);
    failCount++;
    try { await browser.close(); } catch (_) {}
  }

  console.log(`\n=== PHOSPHOR MIGRATION VERIFICATION COMPLETE: ${passCount} PASSED, ${failCount} FAILED ===`);
  if (failCount > 0) {
    process.exit(1);
  }
}

runPhosphorVerification();
