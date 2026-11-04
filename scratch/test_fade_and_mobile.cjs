const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');

const artifactDir = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function testFadeAndMobile() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();

  // Test mobile object-positions
  for (const pos of ['object-[68%_center]', 'object-[72%_center]', 'object-[76%_center]', 'object-[80%_center]']) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(2500);

    await page.evaluate(({ p }) => {
      const img = document.querySelector('#home img');
      img.className = `w-full h-full object-cover ${p} will-change-transform`;
      
      // Also adjust bottom fade to h-20 (80px)
      const fade = document.querySelector('#home > div > div:last-child');
      if (fade) {
        fade.className = 'absolute bottom-0 left-0 right-0 h-20 pointer-events-none';
        fade.style.background = 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.25) 65%, rgba(255,255,255,0.60) 82%, rgba(255,255,255,0.88) 93%, #FFFFFF 100%)';
      }
    }, { p: pos });

    const hero = await page.$('#home');
    const slug = pos.replace(/[^a-zA-Z0-9]/g, '_');
    await hero.screenshot({
      path: path.join(artifactDir, `test_mobile_${slug}.png`)
    });
    console.log(`Captured test_mobile_${slug}.png`);
  }

  // Also test desktop with junction to marquee
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2500);

  await page.evaluate(() => {
    const fade = document.querySelector('#home > div > div:last-child');
    if (fade) {
      fade.className = 'absolute bottom-0 left-0 right-0 h-32 lg:h-36 pointer-events-none';
      fade.style.background = 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.25) 65%, rgba(255,255,255,0.60) 82%, rgba(255,255,255,0.88) 93%, #FFFFFF 100%)';
    }
  });

  // Capture desktop hero + marquee junction
  await page.screenshot({
    path: path.join(artifactDir, 'test_desktop_hero_with_marquee.png'),
    clip: { x: 0, y: 550, width: 1440, height: 420 }
  });
  console.log('Captured test_desktop_hero_with_marquee.png');

  await browser.close();
}

testFadeAndMobile().catch(console.error);
