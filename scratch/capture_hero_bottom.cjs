const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Take screenshot centered on the hero bottom and marquee
  await page.evaluate(() => window.scrollTo(0, 450));
  await page.waitForTimeout(400);

  await page.screenshot({ path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/current_hero_bottom_edge.png' });
  await browser.close();
  console.log('Captured current_hero_bottom_edge.png');
})();
