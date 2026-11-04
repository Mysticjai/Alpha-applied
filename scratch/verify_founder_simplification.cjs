const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function verify() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  // 1. Desktop 1440x900
  console.log('Testing Desktop 1440x900...');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/#founder', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const founderSection = await page.$('#founder');
  await founderSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  await founderSection.screenshot({
    path: path.join(ARTIFACTS_DIR, 'founder_simplified_desktop.png')
  });
  console.log('Saved founder_simplified_desktop.png');

  // Test expanding the profile
  const readMoreBtn = await page.$('button[aria-controls="founder-expanded-profile"]');
  if (readMoreBtn) {
    await readMoreBtn.click();
    await page.waitForTimeout(800);
    await founderSection.screenshot({
      path: path.join(ARTIFACTS_DIR, 'founder_simplified_desktop_expanded.png')
    });
    console.log('Saved founder_simplified_desktop_expanded.png');
  }

  await page.close();

  // 2. Tablet 768x1024
  console.log('Testing Tablet 768x1024...');
  const tabletPage = await browser.newPage({ viewport: { width: 768, height: 1024 } });
  await tabletPage.goto('http://localhost:5174/#founder', { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(1000);

  const tabletFounder = await tabletPage.$('#founder');
  await tabletFounder.scrollIntoViewIfNeeded();
  await tabletPage.waitForTimeout(500);

  await tabletFounder.screenshot({
    path: path.join(ARTIFACTS_DIR, 'founder_simplified_tablet.png')
  });
  console.log('Saved founder_simplified_tablet.png');
  await tabletPage.close();

  // 3. Mobile 390x844
  console.log('Testing Mobile 390x844...');
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:5174/#founder', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(1000);

  const mobileFounder = await mobilePage.$('#founder');
  await mobileFounder.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(500);

  await mobileFounder.screenshot({
    path: path.join(ARTIFACTS_DIR, 'founder_simplified_mobile.png')
  });
  console.log('Saved founder_simplified_mobile.png');

  // Test expand on mobile
  const mobileReadMore = await mobilePage.$('button[aria-controls="founder-expanded-profile"]');
  if (mobileReadMore) {
    await mobileReadMore.click();
    await mobilePage.waitForTimeout(800);
    await mobileFounder.screenshot({
      path: path.join(ARTIFACTS_DIR, 'founder_simplified_mobile_expanded.png')
    });
    console.log('Saved founder_simplified_mobile_expanded.png');
  }

  await mobilePage.close();
  await browser.close();
  console.log('All verification screenshots captured successfully!');
}

verify().catch((err) => {
  console.error('Error during verification:', err);
  process.exit(1);
});
