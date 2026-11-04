const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // 1. Desktop 1440x900 - full hero and marquee
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  
  // Capture view at scroll 0 (top)
  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/blend_desktop_1440_top.png'
  });

  // Capture view scrolled to highlight the blend junction and marquee
  await page.evaluate(() => window.scrollTo(0, 360));
  await page.waitForTimeout(300);
  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/blend_desktop_1440_junction.png'
  });

  // 2. Tablet 768x1024
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/blend_tablet_768_top.png'
  });

  await page.evaluate(() => window.scrollTo(0, 260));
  await page.waitForTimeout(300);
  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/blend_tablet_768_junction.png'
  });

  // 3. Mobile 375x812 (iPhone SE / standard compact)
  await page.setViewportSize({ width: 375, height: 812 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/blend_mobile_375_top.png'
  });

  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(300);
  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/blend_mobile_375_junction.png'
  });

  // 4. Mobile 390x844 (iPhone 14 / modern flagship)
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(300);
  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/blend_mobile_390_junction.png'
  });

  await browser.close();
  console.log('All verification screenshots captured.');
})();
