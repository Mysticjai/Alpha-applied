const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE_URL = 'http://localhost:5173';

async function runTests() {
  console.log('--- STARTING CARD TOUCH & SCROLL RESTORATION VERIFICATION ---');
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const results = {
    touchTapReveal: false,
    touchDismissOutside: false,
    touchSecondTapNavigation: false,
    scrollPositionRestored: false,
    freshHomeNavigationToZero: false,
    desktopHoverAndClick: false,
  };

  try {
    // =========================================================================
    // TEST 1 & 2: TOUCH DEVICE EMULATION (iPhone 14 Pro: 393 x 852, touch)
    // =========================================================================
    console.log('\n[Test 1] Testing Mobile Touch Interactions...');
    const mobileContext = await browser.newContext({
      viewport: { width: 393, height: 852 },
      isMobile: true,
      hasTouch: true,
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1',
    });

    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1000);

    // Scroll down to #pillars
    await mobilePage.evaluate(() => {
      const el = document.getElementById('pillars');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await mobilePage.waitForTimeout(600);

    const initialPillarsScrollY = await mobilePage.evaluate(() => window.scrollY);
    console.log(`Mobile scroll position at #pillars: ${initialPillarsScrollY}px`);

    // Locate the first card in ExpertiseStrip (AI Consulting) or second (Litigation Services)
    const cards = mobilePage.locator('.service-interactive-card');
    const firstCard = cards.nth(0);
    const litigationCard = cards.nth(1);

    // Verify initial card is NOT revealed
    let isRevealedInitial = await litigationCard.evaluate(el => el.classList.contains('is-revealed'));
    console.log(`Litigation card initial is-revealed: ${isRevealedInitial}`);

    // Tap 1 on litigation card surface (first interaction: reveal only)
    console.log('Tapping litigation card (1st tap)...');
    await litigationCard.tap();
    await mobilePage.waitForTimeout(600);

    let isRevealedAfterTap1 = await litigationCard.evaluate(el => el.classList.contains('is-revealed'));
    let urlAfterTap1 = mobilePage.url();
    console.log(`Litigation card is-revealed after tap 1: ${isRevealedAfterTap1}`);
    console.log(`URL after tap 1: ${urlAfterTap1}`);

    if (isRevealedAfterTap1 && urlAfterTap1.endsWith('/')) {
      results.touchTapReveal = true;
      console.log('✓ PASS: First tap cleanly revealed card without navigating.');
    } else {
      console.error('✗ FAIL: First tap did not reveal or incorrectly navigated!');
    }

    // Capture screenshot of revealed card on mobile
    const screenshotTap1 = path.join(ARTIFACT_DIR, 'test_card_mobile_revealed.png');
    await litigationCard.screenshot({ path: screenshotTap1 });
    console.log(`Saved screenshot: ${screenshotTap1}`);

    // Test dismiss outside
    console.log('Tapping outside the card to test collapse...');
    await mobilePage.mouse.click(20, 20); // tap top margin / outside
    await mobilePage.waitForTimeout(400);

    let isRevealedAfterOutsideTap = await litigationCard.evaluate(el => el.classList.contains('is-revealed'));
    console.log(`Litigation card is-revealed after outside tap: ${isRevealedAfterOutsideTap}`);
    if (!isRevealedAfterOutsideTap) {
      results.touchDismissOutside = true;
      console.log('✓ PASS: Tapping outside collapsed the revealed card.');
    }

    // Reveal it again
    await litigationCard.tap();
    await mobilePage.waitForTimeout(400);

    const scrollBeforeLeaving = await mobilePage.evaluate(() => window.scrollY);
    const savedInSessionStorage = await mobilePage.evaluate(() => sessionStorage.getItem('alpha_home_scroll_y'));
    console.log(`Mobile scroll position immediately before leaving: ${scrollBeforeLeaving}px`);
    console.log(`sessionStorage alpha_home_scroll_y: ${savedInSessionStorage}`);

    // Now test Tap 2 on revealed card surface (e.g. tap on the heading or card body)
    console.log('Tapping on revealed card surface (2nd tap) to enter destination...');
    // Tap on the card title or body text
    const cardTitle = litigationCard.locator('h3');
    await cardTitle.tap();

    // Wait for sweep transition and route change
    await mobilePage.waitForURL(url => url.pathname.includes('litigationservices') || url.pathname.includes('litigation-services'), { timeout: 4000 });
    await mobilePage.waitForTimeout(1000);

    const savedScrollInStorage = await mobilePage.evaluate(() => sessionStorage.getItem('alpha_home_scroll_y'));
    console.log(`Verified saved scroll position in sessionStorage: ${savedScrollInStorage}px`);

    const urlAfterTap2 = mobilePage.url();
    console.log(`URL after tap 2: ${urlAfterTap2}`);
    if (urlAfterTap2.includes('litigationservices')) {
      results.touchSecondTapNavigation = true;
      console.log('✓ PASS: Second tap on card surface successfully navigated to destination route via sweep transition.');
    }

    // Capture screenshot of Litigation Services Page
    const screenshotLitigation = path.join(ARTIFACT_DIR, 'test_litigation_page_mobile.png');
    await mobilePage.screenshot({ path: screenshotLitigation });

    // =========================================================================
    // TEST 3: RESTORE HOMEPAGE SCROLL POSITION ON "BACK TO HOMEPAGE"
    // =========================================================================
    console.log('\n[Test 2] Testing Scroll Position Restoration on "Back to Homepage"...');

    // Click "Back to Homepage" link
    const backBtn = mobilePage.locator('a:has-text("Back to Homepage")').first();
    console.log('Clicking "Back to Homepage" button...');
    await backBtn.click();

    // Wait for route change to homepage and transition overlay to sweep away
    await mobilePage.waitForURL(url => url.pathname === '/' || url.pathname.includes('index.html'), { timeout: 4000 });
    await mobilePage.waitForTimeout(1200);

    const restoredScrollY = await mobilePage.evaluate(() => window.scrollY);
    const expectedScrollY = Number(savedScrollInStorage);
    console.log(`Expected homepage scrollY from storage: ${expectedScrollY}px`);
    console.log(`Restored homepage scrollY: ${restoredScrollY}px`);

    const scrollDelta = Math.abs(restoredScrollY - expectedScrollY);
    console.log(`Difference between expected and restored scroll: ${scrollDelta}px`);

    // Verify it didn't reset to 0 and accurately matched scroll position before leaving!
    if (restoredScrollY > 400 && scrollDelta < 20) {
      results.scrollPositionRestored = true;
      console.log(`✓ PASS: Homepage scroll position accurately restored! (${restoredScrollY}px vs expected ${expectedScrollY}px, delta ${scrollDelta}px)`);
    } else {
      console.error(`✗ FAIL: Homepage scroll position was not restored (current Y: ${restoredScrollY}, expected ~${expectedScrollY})`);
    }

    const screenshotRestored = path.join(ARTIFACT_DIR, 'test_homepage_restored_scroll.png');
    await mobilePage.screenshot({ path: screenshotRestored });

    // =========================================================================
    // TEST 4: FRESH HOMEPAGE NAVIGATION TO ZERO
    // =========================================================================
    console.log('\n[Test 3] Testing Fresh Navigation to Home resets to top (0)...');
    // Navigate again to litigation services
    const litigationCard2 = mobilePage.locator('.service-interactive-card').nth(1);
    await litigationCard2.tap();
    await mobilePage.waitForTimeout(400);
    await litigationCard2.locator('h3').tap();
    await mobilePage.waitForURL(url => url.pathname.includes('litigationservices'), { timeout: 4000 });
    await mobilePage.waitForTimeout(600);

    // Now click the Logo (fresh navigation to Home)
    const logoLink = mobilePage.locator('a[aria-label*="Home"]').first();
    console.log('Clicking site logo (fresh navigation)...');
    await logoLink.click();
    await mobilePage.waitForURL(url => url.pathname === '/' || url.pathname.includes('index.html'), { timeout: 4000 });
    await mobilePage.waitForTimeout(1200);

    const freshScrollY = await mobilePage.evaluate(() => window.scrollY);
    console.log(`Fresh navigation scrollY: ${freshScrollY}px`);
    if (freshScrollY <= 15) {
      results.freshHomeNavigationToZero = true;
      console.log('✓ PASS: Fresh navigation via Logo properly started at top of homepage (0px).');
    } else {
      console.error(`✗ FAIL: Fresh navigation did not reset to 0 (current Y: ${freshScrollY})`);
    }

    await mobileContext.close();

    // =========================================================================
    // TEST 5: DESKTOP HOVER & SURFACE CLICK INTERACTION (1440 x 900)
    // =========================================================================
    console.log('\n[Test 4] Testing Desktop Hover & Surface Click Navigation...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      hasTouch: false,
    });

    const desktopPage = await desktopContext.newPage();
    await desktopPage.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(800);

    // Scroll to #pillars
    await desktopPage.evaluate(() => {
      const el = document.getElementById('pillars');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await desktopPage.waitForTimeout(600);

    const desktopCard = desktopPage.locator('.service-interactive-card').nth(0); // AI Consulting card
    // Hover over card
    console.log('Hovering over AI Consulting card on desktop...');
    await desktopCard.hover();
    await desktopPage.waitForTimeout(500);

    const screenshotDesktopHover = path.join(ARTIFACT_DIR, 'test_card_desktop_hover.png');
    await desktopCard.screenshot({ path: screenshotDesktopHover });

    // Click anywhere on the card surface (e.g. description area)
    console.log('Clicking card description on desktop...');
    const descBlock = desktopCard.locator('.card-description-wrap');
    await descBlock.click();

    // Wait for transition to AI Consulting page
    await desktopPage.waitForURL(url => url.pathname.includes('aiconsulting') || url.pathname.includes('ai-consulting'), { timeout: 4000 });
    await desktopPage.waitForTimeout(800);

    console.log(`Desktop URL after click: ${desktopPage.url()}`);
    if (desktopPage.url().includes('aiconsulting')) {
      results.desktopHoverAndClick = true;
      console.log('✓ PASS: Desktop surface click navigated cleanly with directional sweep transition.');
    }

    // Click "Back to Homepage" on desktop
    const desktopBackBtn = desktopPage.locator('a:has-text("Back to Homepage")').first();
    await desktopBackBtn.click();
    await desktopPage.waitForURL(url => url.pathname === '/' || url.pathname.includes('index.html'), { timeout: 4000 });
    await desktopPage.waitForTimeout(1000);

    const desktopRestoredY = await desktopPage.evaluate(() => window.scrollY);
    console.log(`Desktop restored scrollY: ${desktopRestoredY}px`);

    await desktopContext.close();

  } catch (err) {
    console.error('Error during test execution:', err);
  } finally {
    await browser.close();
  }

  console.log('\n========================================');
  console.log('TEST SUMMARY RESULTS:');
  console.log(JSON.stringify(results, null, 2));
  console.log('========================================');

  const allPassed = Object.values(results).every(Boolean);
  if (allPassed) {
    console.log('🎉 ALL TESTS PASSED SUCCESSFULLY!');
  } else {
    console.log('⚠️ Some tests failed. Please inspect logs above.');
  }
}

runTests();
