const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');

const artifactDir = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function testTreatments() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  const variations = [
    {
      id: 'var1',
      name: 'Controlled Left Gradient (w-62%) + Confined Exponential Bottom Fade',
      objPos: 'right center',
      leftGrad: 'linear-gradient(to right, rgba(1,22,25,0.94) 0%, rgba(1,22,25,0.86) 24%, rgba(1,22,25,0.62) 42%, rgba(1,22,25,0.22) 54%, rgba(1,22,25,0) 64%)',
      leftWidth: '64%',
      fadeHeight: '96px', // 6rem / h-24
      fadeGrad: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.01) 30%, rgba(255,255,255,0.08) 55%, rgba(255,255,255,0.28) 75%, rgba(255,255,255,0.72) 90%, #FFFFFF 100%)',
    },
    {
      id: 'var2',
      name: 'Controlled Left Gradient (w-66%) + Ultra-Smooth Bottom Fade',
      objPos: 'right 48%',
      leftGrad: 'linear-gradient(to right, rgba(1,22,25,0.96) 0%, rgba(1,22,25,0.88) 28%, rgba(1,22,25,0.68) 46%, rgba(1,22,25,0.30) 58%, rgba(1,22,25,0) 68%)',
      leftWidth: '68%',
      fadeHeight: '80px', // 5rem / h-20
      fadeGrad: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.02) 35%, rgba(255,255,255,0.12) 60%, rgba(255,255,255,0.40) 80%, rgba(255,255,255,0.82) 93%, #FFFFFF 100%)',
    },
    {
      id: 'var3',
      name: 'Warm-Tinted Deep Teal Left Gradient + Pure Bottom Blend',
      objPos: 'right center',
      leftGrad: 'linear-gradient(to right, #011619 0%, rgba(1,22,25,0.92) 22%, rgba(1,22,25,0.74) 40%, rgba(1,22,25,0.36) 55%, rgba(1,22,25,0) 65%)',
      leftWidth: '65%',
      fadeHeight: '72px', // 4.5rem
      fadeGrad: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0.20) 70%, rgba(255,255,255,0.65) 88%, #FFFFFF 100%)',
    },
  ];

  for (const v of variations) {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(2500);

    await page.evaluate((config) => {
      const hero = document.querySelector('#home');
      const img = hero.querySelector('img');
      img.style.objectPosition = config.objPos;

      // Update horizontal gradient
      const gradDiv = hero.querySelector('.hidden.lg\\:block.absolute.inset-0');
      if (gradDiv) {
        gradDiv.style.background = config.leftGrad;
        gradDiv.style.width = config.leftWidth;
      }

      // Update bottom fade
      const fadeDiv = hero.querySelector('div.absolute.bottom-0');
      if (fadeDiv) {
        fadeDiv.style.height = config.fadeHeight;
        fadeDiv.style.background = config.fadeGrad;
      }
    }, v);

    const heroSection = await page.$('#home');
    await heroSection.screenshot({
      path: path.join(artifactDir, `treatment_${v.id}_desktop_1440.png`)
    });

    // Also junction screenshot
    await page.screenshot({
      path: path.join(artifactDir, `treatment_${v.id}_junction.png`),
      clip: { x: 0, y: 640, width: 1440, height: 350 }
    });

    console.log(`Captured ${v.id}`);
  }

  // Also test mobile view for var2 and var3
  await page.setViewportSize({ width: 390, height: 844 });
  for (const mPos of ['74% center', '76% center', '78% center']) {
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(2500);

    await page.evaluate(({ pos }) => {
      const hero = document.querySelector('#home');
      const img = hero.querySelector('img');
      img.style.objectPosition = pos;

      // Mobile vertical gradient
      const mGrad = hero.querySelector('.lg\\:hidden.absolute.inset-0');
      if (mGrad) {
        mGrad.style.background = 'linear-gradient(to bottom, rgba(1,22,25,0.96) 0%, rgba(1,22,25,0.82) 32%, rgba(1,22,25,0.55) 55%, rgba(1,22,25,0.18) 75%, rgba(1,22,25,0.05) 100%)';
      }

      // Bottom fade
      const fadeDiv = hero.querySelector('div.absolute.bottom-0');
      if (fadeDiv) {
        fadeDiv.style.height = '64px';
        fadeDiv.style.background = 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.04) 35%, rgba(255,255,255,0.22) 68%, rgba(255,255,255,0.70) 88%, #FFFFFF 100%)';
      }
    }, { pos: mPos });

    const hero = await page.$('#home');
    const slug = mPos.replace(/[^a-zA-Z0-9]/g, '_');
    await hero.screenshot({
      path: path.join(artifactDir, `treatment_mobile_${slug}.png`)
    });
    console.log(`Captured treatment_mobile_${slug}.png`);
  }

  await browser.close();
}

testTreatments().catch(console.error);
