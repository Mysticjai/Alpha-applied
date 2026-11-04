const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Scroll so junction (y=900) is at viewport y=450
  await page.evaluate(() => window.scrollTo(0, 450));
  await page.waitForTimeout(300);

  // In this scrolled state, hero bottom (y=900 in doc) is at viewport y=450
  // Let's capture clip from viewport y = 300 to y = 600 (height 300)
  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/junction_tight_crop_desktop.png',
    clip: { x: 0, y: 300, width: 1440, height: 300 }
  });

  // Tablet
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.evaluate(() => {
    const hero = document.getElementById('home');
    const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo(0, heroBottom - 450);
  });
  await page.waitForTimeout(300);
  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/junction_tight_crop_tablet.png',
    clip: { x: 0, y: 300, width: 768, height: 300 }
  });

  // Mobile
  await page.setViewportSize({ width: 375, height: 812 });
  await page.evaluate(() => {
    const hero = document.getElementById('home');
    const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo(0, heroBottom - 350);
  });
  await page.waitForTimeout(300);
  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/junction_tight_crop_mobile.png',
    clip: { x: 0, y: 200, width: 375, height: 300 }
  });

  await browser.close();
  console.log('Tight crops saved with scrolling.');
})();
