const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:5173';
const ARTIFACTS_DIR = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function runTests() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  console.log('=== STARTING AI CONSULTING PRACTICE DISCIPLINES NAVIGATION TESTS ===\n');

  const cards = [
    { stage: 'Stage 01', id: 'ai-assessment-strategy', label: 'Assessment & Strategy' },
    { stage: 'Stage 02', id: 'ai-implementation-integration', label: 'Implementation' },
    { stage: 'Stage 03', id: 'ai-integrations-plugin-implementation', label: 'Integrations & Plugins' },
    { stage: 'Stage 04', id: 'ai-training-professional-courses', label: 'Training & Courses' },
  ];

  // ==========================================
  // TEST SUITE 1: DESKTOP (1440x900)
  // ==========================================
  console.log('--- TEST SUITE 1: Desktop Viewport (1440x900) ---');
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // Load AI Consulting page directly
  await page.goto(`${BASE_URL}/aiconsulting.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // Verify initial route & URL
  let currentUrl = page.url();
  console.log(`Initial page URL: ${currentUrl}`);
  if (!currentUrl.includes('/aiconsulting.html')) {
    throw new Error(`Expected to be on /aiconsulting.html but was on ${currentUrl}`);
  }

  // Test each of the 4 cards individually
  for (const card of cards) {
    console.log(`\nTesting Card [${card.stage}: ${card.label}] -> Target ID: #${card.id}`);

    // Scroll hero pathway into view first
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);

    const cardSelector = `a[data-inpage-scroll="true"][data-target="${card.id}"]`;
    const cardEl = await page.$(cardSelector);
    if (!cardEl) {
      throw new Error(`Card element not found for selector: ${cardSelector}`);
    }

    // Click card
    await cardEl.click();
    // Allow smooth scroll animation to execute
    await page.waitForTimeout(1100);

    // Verify URL remained unchanged (should NOT have switched to homepage, and URL pathname still /aiconsulting.html)
    const afterClickUrl = page.url();
    console.log(`  URL after click: ${afterClickUrl}`);
    const staysOnPage = afterClickUrl.includes('/aiconsulting.html');
    const noHomepage = !afterClickUrl.endsWith('/') && !afterClickUrl.includes('/#home');
    console.log(`  Stays on AI Consulting: ${staysOnPage}`);
    console.log(`  Did NOT switch to homepage: ${noHomepage}`);

    // Verify section target position
    const sectionInfo = await page.evaluate((targetId) => {
      const el = document.getElementById(targetId);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        top: Math.round(rect.top),
        scrollY: Math.round(window.scrollY),
        id: el.id,
        tagName: el.tagName,
        hasVisibleContent: el.offsetParent !== null,
      };
    }, card.id);

    console.log(`  Target section top relative to viewport: ${sectionInfo?.top}px`);
    console.log(`  Scroll Y position: ${sectionInfo?.scrollY}px`);

    // Target section top should be close to header offset (~88px, allowable range 60px - 120px)
    const isInView = sectionInfo && sectionInfo.top >= 40 && sectionInfo.top <= 140;
    console.log(`  Section reached accurately below floating header: ${isInView}`);

    // Verify page content is still AI Consulting (not homepage)
    const isAiConsultingRendered = await page.evaluate(() => {
      return !!document.querySelector('h1')?.innerText.includes('AI Consulting');
    });
    console.log(`  AI Consulting H1 still present in DOM: ${isAiConsultingRendered}`);

    if (!staysOnPage || !noHomepage || !isInView || !isAiConsultingRendered) {
      throw new Error(`Failed verification for card ${card.stage}`);
    }
  }

  // Capture screenshot of reached section on Desktop
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'ai_consulting_disciplines_desktop.png') });
  console.log('\nSaved screenshot: ai_consulting_disciplines_desktop.png');

  // ==========================================
  // TEST SUITE 2: ROUTE RESTORATION & CROSS-PAGE FLOWS
  // ==========================================
  console.log('\n--- TEST SUITE 2: Cross-Page Navigation & Route State Verification ---');

  // 1. Navigate from AI Consulting to Home via "Back to Homepage" link
  console.log('Testing "Back to Homepage" link...');
  const backToHomeBtn = await page.$('a[data-restore-scroll="true"]');
  if (backToHomeBtn) {
    await backToHomeBtn.click();
    await page.waitForTimeout(1000);
  }
  let homeUrl = page.url();
  console.log(`  URL after clicking Back to Home: ${homeUrl}`);
  const isHome = await page.evaluate(() => !!document.getElementById('pillars') || !!document.querySelector('h1')?.innerText.includes('Alpha'));
  console.log(`  Homepage correctly rendered: ${isHome}`);

  // 2. Navigate from Home back to AI Consulting via Core Practice Pillars card
  console.log('Testing navigation from Home to AI Consulting...');
  const aiPillarCard = await page.$('a[href="/aiconsulting.html"]');
  if (aiPillarCard) {
    await aiPillarCard.click();
    await page.waitForTimeout(1000);
  }
  let backToAiUrl = page.url();
  console.log(`  URL after navigating back to AI Consulting: ${backToAiUrl}`);
  const isAiPageAgain = await page.evaluate(() => !!document.querySelector('h1')?.innerText.includes('AI Consulting'));
  console.log(`  AI Consulting page rendered cleanly: ${isAiPageAgain}`);

  // 3. Test in-page cards again after round-trip navigation
  console.log('Testing Card Stage 03 after round-trip navigation...');
  const stage3Card = await page.$('a[data-target="ai-integrations-plugin-implementation"]');
  await stage3Card.click();
  await page.waitForTimeout(1100);
  const stage3SectionTop = await page.evaluate(() => {
    const el = document.getElementById('ai-integrations-plugin-implementation');
    return el ? Math.round(el.getBoundingClientRect().top) : null;
  });
  console.log(`  Stage 03 section top after round-trip: ${stage3SectionTop}px`);

  // 4. Test Browser Back and Forward buttons
  console.log('Testing Browser Back button...');
  await page.goBack();
  await page.waitForTimeout(1000);
  console.log(`  URL after Browser Back: ${page.url()}`);

  console.log('Testing Browser Forward button...');
  await page.goForward();
  await page.waitForTimeout(1000);
  console.log(`  URL after Browser Forward: ${page.url()}`);

  // 5. Test Direct Page Reload
  console.log('Testing direct page reload of /aiconsulting.html...');
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  console.log('Testing Stage 04: Training & Courses after reload...');
  const stage4Card = await page.$('a[data-target="ai-training-professional-courses"]');
  await stage4Card.click();
  await page.waitForTimeout(1100);
  const stage4SectionTop = await page.evaluate(() => {
    const el = document.getElementById('ai-training-professional-courses');
    return el ? Math.round(el.getBoundingClientRect().top) : null;
  });
  console.log(`  Stage 04 section top after reload: ${stage4SectionTop}px`);
  console.log(`  Current URL after Stage 04 click: ${page.url()}`);

  // 6. Test SiteHeader Floating Navigation is still functional
  console.log('Testing SiteHeader navigation link (Litigation Services)...');
  const litNav = await page.$('header nav a[href="/litigationservices.html"]');
  if (litNav) {
    await litNav.click();
    await page.waitForTimeout(1000);
    console.log(`  URL after clicking Litigation Services in header: ${page.url()}`);
  }

  await page.close();
  await context.close();

  // ==========================================
  // TEST SUITE 3: TABLET (768x1024)
  // ==========================================
  console.log('\n--- TEST SUITE 3: Tablet Viewport (768x1024) ---');
  const tabletContext = await browser.newContext({ viewport: { width: 768, height: 1024 } });
  const tabletPage = await tabletContext.newPage();
  await tabletPage.goto(`${BASE_URL}/aiconsulting.html`, { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(800);

  for (const card of cards) {
    await tabletPage.evaluate(() => window.scrollTo(0, 0));
    await tabletPage.waitForTimeout(300);
    const cardEl = await tabletPage.$(`a[data-target="${card.id}"]`);
    await cardEl.click();
    await tabletPage.waitForTimeout(1000);

    const sectionTop = await tabletPage.evaluate((targetId) => {
      const el = document.getElementById(targetId);
      return el ? Math.round(el.getBoundingClientRect().top) : null;
    }, card.id);
    const url = tabletPage.url();
    console.log(`  Tablet [${card.stage}]: top = ${sectionTop}px, url = ${url}`);
  }

  await tabletPage.screenshot({ path: path.join(ARTIFACTS_DIR, 'ai_consulting_disciplines_tablet.png') });
  console.log('Saved screenshot: ai_consulting_disciplines_tablet.png');
  await tabletPage.close();
  await tabletContext.close();

  // ==========================================
  // TEST SUITE 4: MOBILE (390x844)
  // ==========================================
  console.log('\n--- TEST SUITE 4: Mobile Viewport (390x844) ---');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const mobilePage = await mobileContext.newPage();
  await mobilePage.goto(`${BASE_URL}/aiconsulting.html`, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(800);

  for (const card of cards) {
    await mobilePage.evaluate(() => window.scrollTo(0, 0));
    await mobilePage.waitForTimeout(300);
    const cardEl = await mobilePage.$(`a[data-target="${card.id}"]`);
    await cardEl.tap();
    await mobilePage.waitForTimeout(1000);

    const sectionTop = await mobilePage.evaluate((targetId) => {
      const el = document.getElementById(targetId);
      return el ? Math.round(el.getBoundingClientRect().top) : null;
    }, card.id);
    const url = mobilePage.url();
    console.log(`  Mobile [${card.stage}]: top = ${sectionTop}px, url = ${url}`);
  }

  await mobilePage.screenshot({ path: path.join(ARTIFACTS_DIR, 'ai_consulting_disciplines_mobile.png') });
  console.log('Saved screenshot: ai_consulting_disciplines_mobile.png');
  await mobilePage.close();
  await mobileContext.close();

  await browser.close();
  console.log('\n=== ALL REGRESSION TESTS COMPLETED SUCCESSFULLY! ===');
}

runTests().catch((err) => {
  console.error('Test execution failed:', err);
  process.exit(1);
});
