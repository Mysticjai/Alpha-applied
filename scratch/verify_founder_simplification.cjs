const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const ARTIFACTS_DIR = 'C:\\Users\\jaiav\\.gemini\\antigravity\\brain\\8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function runFounderSimplificationVerification() {
  console.log('=== STARTING FOUNDER / ABOUT SIMPLIFICATION VERIFICATION ===\n');
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

    // 1. Navigate to Homepage and scroll to #about
    console.log('--- TEST 1: ABOUT SECTION INITIALIZATION ---');
    await page.goto('http://127.0.0.1:4175/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    const aboutSection = page.locator('#about');
    assert(await aboutSection.isVisible(), 'Founder / About section (#about) exists and is visible');

    await aboutSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    // 2. Founder Introduction Area
    console.log('\n--- TEST 2: FOUNDER INTRODUCTION ---');
    const eyebrow = await aboutSection.locator('text=FOUNDER & PRINCIPAL').first().innerText();
    assert(eyebrow.includes('FOUNDER & PRINCIPAL'), 'Eyebrow "FOUNDER & PRINCIPAL" present');

    const founderName = await aboutSection.locator('h2').innerText();
    assert(founderName === 'Krishna Dornadula', `Founder name heading is "Krishna Dornadula" (Found: "${founderName}")`);

    const subtitle = await aboutSection.locator('text=lead behind AlphaLens AI').first().innerText();
    assert(subtitle.includes('Founder of Alpha Applied Analytics Solutions and lead behind AlphaLens AI.'), 'Approved subtitle present');

    const introText = await aboutSection.locator('text=Krishna works at the intersection').first().innerText();
    assert(introText.includes('forensic analytics, artificial intelligence, and litigation support'), 'Concise introductory paragraph present');

    // Right Column: Selected Experience
    const expHeading = await aboutSection.locator('text=/Selected Experience/i').first().innerText();
    assert(expHeading.toLowerCase().includes('selected experience'), 'Right column contains "Selected Experience" heading');

    const deloitteText = await aboutSection.locator('text=nearly a decade at Deloitte').first().innerText();
    assert(deloitteText.includes('United States, Switzerland, the Netherlands, France, and India'), 'Deloitte global background details present');

    const focusText = await aboutSection.locator('text=litigation analytics, forensic financial analysis').first().innerText();
    assert(focusText.includes('AI implementation across complex disputes'), 'Current focus on litigation analytics and AI implementation present');

    // 3. Confirm Removals
    console.log('\n--- TEST 3: REMOVAL OF DUPLICATED MESSAGING & CARDS ---');
    const bodyText = await aboutSection.innerText();
    assert(!bodyText.includes('Analytical Objectivity'), 'Old "Analytical Objectivity" card removed');
    assert(!bodyText.includes('Data Confidentiality'), 'Old "Data Confidentiality" card removed');
    assert(!bodyText.includes('Computational Rigor'), 'Old "Computational Rigor" card removed');
    assert(!bodyText.includes('5 Domains'), 'Old "5 Domains" badge removed');

    // 4. Areas of Expertise (5 items in clean editorial format)
    console.log('\n--- TEST 4: FIVE AREAS OF EXPERTISE ---');
    const expSectionHeading = await aboutSection.locator('h3:has-text("Areas of Expertise")').first().innerText();
    assert(expSectionHeading.includes('Areas of Expertise'), 'Section heading "Areas of Expertise" present');

    assert(bodyText.includes('Forensic Financial Analytics'), 'Area 1: Forensic Financial Analytics present');
    assert(bodyText.includes('Cryptocurrency & Audit Analytics'), 'Area 2: Cryptocurrency & Audit Analytics present');
    assert(bodyText.includes('Investigations & Compliance'), 'Area 3: Investigations & Compliance present');
    assert(bodyText.includes('M&A & Unstructured Data'), 'Area 4: M&A & Unstructured Data present');
    assert(bodyText.includes('Family Law Financial Analysis'), 'Area 5: Family Law Financial Analysis present');

    // 5. Education
    console.log('\n--- TEST 5: EDUCATION ---');
    const eduHeading = await aboutSection.locator('h3:has-text("Education")').first().innerText();
    assert(eduHeading.includes('Education'), 'Education heading present');

    assert(bodyText.includes('Master of Science — Management Information Systems'), 'Degree 1: Master of Science present');
    assert(bodyText.includes('University of Illinois Chicago · 2009–2010'), 'Institution 1: UIC present with years');
    assert(bodyText.includes('B.E. (Hons) — Computer Science'), 'Degree 2: B.E. (Hons) present');
    assert(bodyText.includes('Birla Institute of Technology and Science, Pilani · 2005–2009'), 'Institution 2: BITS Pilani present with years');
    assert(bodyText.includes('Magna Cum Laude'), 'Recognition: Magna Cum Laude present as separate line');

    // 6. Visual Style & Palette Check
    console.log('\n--- TEST 6: VISUAL STYLE & PALETTE CHECK ---');
    // Ensure sticky header is temporarily hidden for clean section screenshot
    await page.evaluate(() => {
      const h = document.querySelector('header');
      if (h) h.style.visibility = 'hidden';
    });

    await aboutSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const desktopScreenshot = path.join(ARTIFACTS_DIR, 'founder_profile_simplified_desktop.png');
    await aboutSection.screenshot({ path: desktopScreenshot });
    console.log(`Saved screenshot: ${desktopScreenshot}`);

    // Capture zoomed in screenshot of expertise and education
    const lowerArea = aboutSection.locator('div:has(h3:has-text("Areas of Expertise"))').first();
    const expEduScreenshot = path.join(ARTIFACTS_DIR, 'founder_profile_expertise_education.png');
    await lowerArea.screenshot({ path: expEduScreenshot });
    console.log(`Saved screenshot: ${expEduScreenshot}`);

    await page.evaluate(() => {
      const h = document.querySelector('header');
      if (h) h.style.visibility = 'visible';
    });

    // 7. Mobile Viewport Check (390x844)
    console.log('\n--- TEST 7: MOBILE RESPONSIVE VIEWPORT ---');
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto('http://127.0.0.1:4175/#about', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(400);

    const mobileAbout = mobilePage.locator('#about');
    await mobileAbout.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(300);

    await mobilePage.evaluate(() => {
      const h = document.querySelector('header');
      if (h) h.style.visibility = 'hidden';
    });

    const mobileScreenshot = path.join(ARTIFACTS_DIR, 'founder_profile_simplified_mobile.png');
    await mobileAbout.screenshot({ path: mobileScreenshot });
    console.log(`Saved screenshot: ${mobileScreenshot}`);

    await mobilePage.evaluate(() => {
      const h = document.querySelector('header');
      if (h) h.style.visibility = 'visible';
    });

    // 8. Console Errors Audit
    console.log('\n--- TEST 8: CONSOLE ERROR AUDIT ---');
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

  console.log(`\n=== FOUNDER SIMPLIFICATION VERIFICATION COMPLETE: ${passCount} PASSED, ${failCount} FAILED ===`);
  if (failCount > 0) {
    process.exit(1);
  }
}

runFounderSimplificationVerification();
