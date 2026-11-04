const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');

const artifactDir = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function testHeroRender() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();

  const viewports = [
    { name: 'desktop_1440', width: 1440, height: 900 },
    { name: 'desktop_1920', width: 1920, height: 1080 },
    { name: 'laptop_1280', width: 1280, height: 800 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'mobile_390', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    // Wait for the full GSAP entrance timeline to finish (> 2s)
    await page.waitForTimeout(2500);

    const heroSection = await page.$('#home');
    if (heroSection) {
      await heroSection.screenshot({
        path: path.join(artifactDir, `new_hero_${vp.name}.png`)
      });
      console.log(`Captured fully settled new_hero_${vp.name}.png`);
    }
  }

  await browser.close();
}

testHeroRender().catch(console.error);
