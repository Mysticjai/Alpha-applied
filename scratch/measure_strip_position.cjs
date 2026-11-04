const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

async function measureServiceStripPosition() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();
  for (const w of [1440, 768, 390]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(2500);

    const pos = await page.evaluate(() => {
      const hero = document.querySelector('#home');
      const strip = document.querySelector('.disintegrate-strip');
      const heroRect = hero.getBoundingClientRect();
      const stripRect = strip.getBoundingClientRect();

      return {
        heroHeight: heroRect.height,
        stripBottomFromHeroBottom: Math.round(heroRect.bottom - stripRect.bottom),
        stripTopFromHeroBottom: Math.round(heroRect.bottom - stripRect.top),
        stripHeight: Math.round(stripRect.height),
      };
    });

    console.log(`Width ${w}:`, pos);
  }

  await browser.close();
}

measureServiceStripPosition().catch(console.error);
