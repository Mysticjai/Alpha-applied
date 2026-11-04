const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Scroll so the hero bottom is in the middle of the viewport
  await page.evaluate(() => {
    const hero = document.getElementById('home');
    const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo(0, heroBottom - 450);
  });
  await page.waitForTimeout(300);

  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/hero_marquee_junction_desktop.png'
  });

  // Tablet (768px)
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.evaluate(() => {
    const hero = document.getElementById('home');
    const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo(0, heroBottom - 450);
  });
  await page.waitForTimeout(300);
  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/hero_marquee_junction_tablet.png'
  });

  // Mobile (375px)
  await page.setViewportSize({ width: 375, height: 812 });
  await page.evaluate(() => {
    const hero = document.getElementById('home');
    const heroBottom = hero.getBoundingClientRect().bottom + window.scrollY;
    window.scrollTo(0, heroBottom - 350);
  });
  await page.waitForTimeout(300);
  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/hero_marquee_junction_mobile.png'
  });

  await browser.close();
  console.log('Saved screenshots for desktop, tablet, and mobile.');
})();
