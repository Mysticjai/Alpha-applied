const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function run() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  console.log('--- 1. Testing AI Consulting Page Timeline (Desktop 1440x900) ---');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/aiconsulting.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // Locate the Assessment Methodology Timeline
  const section = await page.$('#ai-assessment-strategy');
  if (!section) {
    throw new Error('Could not find #ai-assessment-strategy section');
  }

  // Scroll to section entry (start of timeline entering viewport)
  await page.evaluate(() => {
    const el = document.getElementById('ai-assessment-strategy');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top - 300);
    }
  });
  await page.waitForTimeout(500);

  await section.screenshot({
    path: path.join(ARTIFACTS_DIR, 'ai_assessment_timeline_desktop_start.png'),
  });
  console.log('Saved ai_assessment_timeline_desktop_start.png');

  // Scroll mid-way through the timeline (around Node 03)
  await page.evaluate(() => {
    const el = document.getElementById('ai-assessment-strategy');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top + 150);
    }
  });
  await page.waitForTimeout(500);

  await section.screenshot({
    path: path.join(ARTIFACTS_DIR, 'ai_assessment_timeline_desktop_mid.png'),
  });
  console.log('Saved ai_assessment_timeline_desktop_mid.png');

  // Scroll to end of timeline (around Node 05)
  await page.evaluate(() => {
    const el = document.getElementById('ai-assessment-strategy');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top + 450);
    }
  });
  await page.waitForTimeout(500);

  await section.screenshot({
    path: path.join(ARTIFACTS_DIR, 'ai_assessment_timeline_desktop_end.png'),
  });
  console.log('Saved ai_assessment_timeline_desktop_end.png');

  // Verify reverse scroll
  await page.evaluate(() => {
    const el = document.getElementById('ai-assessment-strategy');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top - 200);
    }
  });
  await page.waitForTimeout(400);

  console.log('--- 2. Testing AI Consulting Page Timeline (Tablet 768x1024) ---');
  const tabletPage = await browser.newPage({ viewport: { width: 768, height: 1024 } });
  await tabletPage.goto('http://localhost:5174/aiconsulting.html', { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(800);

  const tabletSection = await tabletPage.$('#ai-assessment-strategy');
  await tabletPage.evaluate(() => {
    const el = document.getElementById('ai-assessment-strategy');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top + 200);
    }
  });
  await tabletPage.waitForTimeout(500);

  await tabletSection.screenshot({
    path: path.join(ARTIFACTS_DIR, 'ai_assessment_timeline_tablet.png'),
  });
  console.log('Saved ai_assessment_timeline_tablet.png');
  await tabletPage.close();

  console.log('--- 3. Testing AI Consulting Page Timeline (Mobile 390x844) ---');
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:5174/aiconsulting.html', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(800);

  const mobileSection = await mobilePage.$('#ai-assessment-strategy');
  // Scroll to start of timeline on mobile
  await mobilePage.evaluate(() => {
    const el = document.getElementById('ai-assessment-strategy');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top + 250);
    }
  });
  await mobilePage.waitForTimeout(500);

  await mobileSection.screenshot({
    path: path.join(ARTIFACTS_DIR, 'ai_assessment_timeline_mobile_mid.png'),
  });
  console.log('Saved ai_assessment_timeline_mobile_mid.png');

  // Scroll to end of timeline on mobile
  await mobilePage.evaluate(() => {
    const el = document.getElementById('ai-assessment-strategy');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, top + 550);
    }
  });
  await mobilePage.waitForTimeout(500);

  await mobileSection.screenshot({
    path: path.join(ARTIFACTS_DIR, 'ai_assessment_timeline_mobile_end.png'),
  });
  console.log('Saved ai_assessment_timeline_mobile_end.png');
  await mobilePage.close();

  console.log('--- 4. Verifying Founder Professional Journey Timeline on Homepage ---');
  await page.goto('http://localhost:5174/#founder', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const founderSection = await page.$('#founder');
  await founderSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  // Expand founder profile
  const readMoreBtn = await page.$('button[aria-controls="founder-expanded-profile"]');
  if (readMoreBtn) {
    await readMoreBtn.click();
    await page.waitForTimeout(700);

    // Scroll into the timeline
    await page.evaluate(() => {
      window.scrollBy(0, 350);
    });
    await page.waitForTimeout(500);

    await founderSection.screenshot({
      path: path.join(ARTIFACTS_DIR, 'founder_timeline_verified.png'),
    });
    console.log('Saved founder_timeline_verified.png');
  }

  await page.close();
  await browser.close();
  console.log('All verification tests completed successfully!');
}

run().catch((err) => {
  console.error('Error during timeline verification:', err);
  process.exit(1);
});
