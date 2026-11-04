const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');

const artifactDir = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function updateMobileScreenshot() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  // Scroll #pillars to start with navbar clearance
  await page.evaluate(() => {
    const el = document.querySelector('#pillars');
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo(0, top);
    }
  });
  await page.waitForTimeout(600);

  const pillarsSection = await page.$('#pillars');
  await pillarsSection.screenshot({
    path: path.join(artifactDir, 'category_cards_mobile_390.png')
  });

  await browser.close();
  console.log('Mobile screenshot updated cleanly!');
}

updateMobileScreenshot().catch(console.error);
