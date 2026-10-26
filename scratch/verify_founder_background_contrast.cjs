const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const ARTIFACTS_DIR = 'C:\\Users\\jaiav\\.gemini\\antigravity\\brain\\8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function runBackgroundContrastVerification() {
  console.log('=== STARTING FOUNDER PROFILE BACKGROUND CONTRAST VERIFICATION ===\n');
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
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    // Track console errors
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // 1. Navigate to Homepage and locate sections
    console.log('--- TEST 1: SECTION INITIALIZATION & SEQUENCE ---');
    await page.goto('http://127.0.0.1:4175/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const whoWeServe = page.locator('#who-we-serve');
    const founderIntro = page.locator('#about');
    const expertiseSection = page.locator('section:has(h3:has-text("Areas of Expertise"))');
    const educationSection = page.locator('section:has(h3:has-text("Education"))');
    const contactSection = page.locator('#contact');

    assert(await whoWeServe.isVisible(), 'Who We Serve section exists');
    assert(await founderIntro.isVisible(), 'Founder Introduction (#about) exists');
    assert(await expertiseSection.isVisible(), 'Areas of Expertise section exists');
    assert(await educationSection.isVisible(), 'Education section exists');
    assert(await contactSection.isVisible(), 'Contact section exists');

    // 2. Background Color Verification
    console.log('\n--- TEST 2: BACKGROUND COLORS & CONTRAST ---');

    // Founder Intro Background (Should be deep Cyprus green #004643 -> rgb(0, 70, 67))
    const founderIntroBg = await founderIntro.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    console.log('Founder Intro background:', founderIntroBg);
    assert(
      founderIntroBg === 'rgb(0, 70, 67)' || founderIntroBg.includes('0, 70, 67'),
      `Founder Intro has Cyprus green background (#004643). Found: "${founderIntroBg}"`
    );

    // Founder Intro Text Colors (White / Warm Ivory)
    const founderNameColor = await founderIntro.locator('h2').evaluate((el) => window.getComputedStyle(el).color);
    console.log('Founder Name color:', founderNameColor);
    assert(
      founderNameColor === 'rgb(255, 255, 255)',
      `Founder Name text color is pure white. Found: "${founderNameColor}"`
    );

    // Selected Experience Panel (Differentiated dark teal surface, not white)
    const expCard = founderIntro.locator('div.rounded-xl').first();
    const expCardBg = await expCard.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    console.log('Selected Experience panel background:', expCardBg);
    assert(
      expCardBg !== 'rgb(255, 255, 255)',
      `Selected Experience panel is NOT a white rectangle. Found: "${expCardBg}"`
    );
    assert(
      expCardBg === 'rgb(0, 54, 51)' || expCardBg.includes('0, 54, 51'),
      `Selected Experience panel is styled as dark teal (#003633). Found: "${expCardBg}"`
    );

    // Areas of Expertise Background (Should be clean white #FFFFFF -> rgb(255, 255, 255))
    const expertiseBg = await expertiseSection.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    console.log('Areas of Expertise background:', expertiseBg);
    assert(
      expertiseBg === 'rgb(255, 255, 255)',
      `Areas of Expertise has clean white background (#FFFFFF). Found: "${expertiseBg}"`
    );

    // Education Background (Should be warm ivory #F0EDE5 -> rgb(240, 237, 229))
    const educationBg = await educationSection.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    console.log('Education background:', educationBg);
    assert(
      educationBg === 'rgb(240, 237, 229)',
      `Education has warm ivory background (#F0EDE5). Found: "${educationBg}"`
    );

    // Contact Section Background (Should be deep teal rgb(0, 54, 52))
    const contactBg = await contactSection.evaluate((el) => window.getComputedStyle(el).backgroundColor);
    console.log('Contact section background:', contactBg);
    assert(
      contactBg.includes('0, 54, 52') || contactBg.includes('0, 52, 50'),
      `Contact section background is deep teal. Found: "${contactBg}"`
    );

    // 3. Navigation Anchor Check
    console.log('\n--- TEST 3: GLOBAL HEADER "ABOUT" ANCHOR NAVIGATION ---');
    const aboutNavLink = page.locator('header nav a:has-text("About")');
    assert(await aboutNavLink.isVisible(), 'Header contains About link');
    await aboutNavLink.click();
    await page.waitForTimeout(600);

    // Confirm view scrolled to #about
    const founderInViewport = await founderIntro.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top >= -100 && rect.top <= 200;
    });
    assert(founderInViewport, 'Clicking "About" in header navigates and scrolls directly to Founder Introduction');

    // 4. Capture Visual Artifacts (Desktop)
    console.log('\n--- TEST 4: CAPTURE HIGH-RES DESKTOP SCREENSHOTS ---');
    // Hide header for clean screenshots
    await page.evaluate(() => {
      const h = document.querySelector('header');
      if (h) h.style.visibility = 'hidden';
    });

    // A. Founder Intro screenshot
    await founderIntro.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const introScreenshot = path.join(ARTIFACTS_DIR, 'founder_contrast_intro_dark_teal.png');
    await founderIntro.screenshot({ path: introScreenshot });
    console.log(`Saved screenshot: ${introScreenshot}`);

    // B. Expertise Section screenshot
    await expertiseSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const expScreenshot = path.join(ARTIFACTS_DIR, 'founder_contrast_expertise_white.png');
    await expertiseSection.screenshot({ path: expScreenshot });
    console.log(`Saved screenshot: ${expScreenshot}`);

    // C. Education Section screenshot
    await educationSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const eduScreenshot = path.join(ARTIFACTS_DIR, 'founder_contrast_education_warm_ivory.png');
    await educationSection.screenshot({ path: eduScreenshot });
    console.log(`Saved screenshot: ${eduScreenshot}`);

    // Restore header
    await page.evaluate(() => {
      const h = document.querySelector('header');
      if (h) h.style.visibility = 'visible';
    });

    // 5. Mobile Viewport Check (390x844)
    console.log('\n--- TEST 5: MOBILE RESPONSIVE VIEWPORT (390x844) ---');
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto('http://127.0.0.1:4175/#about', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(500);

    const mobileFounder = mobilePage.locator('#about');
    assert(await mobileFounder.isVisible(), 'Mobile founder section visible');

    await mobilePage.evaluate(() => {
      const h = document.querySelector('header');
      if (h) h.style.visibility = 'hidden';
    });

    const mobileScreenshot = path.join(ARTIFACTS_DIR, 'founder_contrast_mobile.png');
    await mobileFounder.screenshot({ path: mobileScreenshot });
    console.log(`Saved screenshot: ${mobileScreenshot}`);

    await mobilePage.evaluate(() => {
      const h = document.querySelector('header');
      if (h) h.style.visibility = 'visible';
    });

    // 6. Console Error Audit
    console.log('\n--- TEST 6: CONSOLE ERROR AUDIT ---');
    assert(consoleErrors.length === 0, `0 console errors detected (Found: ${consoleErrors.length})`);
    if (consoleErrors.length > 0) {
      console.error('Console errors:', consoleErrors);
    }

    await browser.close();
  } catch (err) {
    console.error('Test execution error:', err);
    failCount++;
    try { await browser.close(); } catch (_) {}
  }

  console.log(`\n=== FOUNDER BACKGROUND CONTRAST VERIFICATION COMPLETE: ${passCount} PASSED, ${failCount} FAILED ===`);
  if (failCount > 0) {
    process.exit(1);
  }
}

runBackgroundContrastVerification();
