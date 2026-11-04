const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

async function measureHero() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();

  const viewports = [
    { name: 'desktop_1920', width: 1920, height: 1080 },
    { name: 'desktop_1440', width: 1440, height: 900 },
    { name: 'laptop_1280', width: 1280, height: 800 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'mobile_390', width: 390, height: 844 },
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(2500);

    const data = await page.evaluate(() => {
      const hero = document.querySelector('#home');
      const img = hero.querySelector('img');
      const headline = hero.querySelector('.anim-hero-headline');
      const body = hero.querySelector('.disintegrate-p1');
      const cta = hero.querySelector('.disintegrate-cta');
      const strip = hero.querySelector('.disintegrate-strip');

      const hRect = hero.getBoundingClientRect();
      const iRect = img.getBoundingClientRect();
      const hlRect = headline ? headline.getBoundingClientRect() : null;
      const bRect = body ? body.getBoundingClientRect() : null;
      const ctaRect = cta ? cta.getBoundingClientRect() : null;
      const sRect = strip ? strip.getBoundingClientRect() : null;

      // In the image (1024x576):
      // Gavel sound block center is at ~ (630, 410)
      // Monitor center is at ~ (820, 310)
      // Let's compute where (630, 410) and (820, 310) project in the scaled img:
      const cs = window.getComputedStyle(img);
      return {
        hero: { w: Math.round(hRect.width), h: Math.round(hRect.height) },
        img: {
          w: Math.round(iRect.width),
          h: Math.round(iRect.height),
          top: Math.round(iRect.top),
          left: Math.round(iRect.left),
          objectPosition: cs.objectPosition,
          objectFit: cs.objectFit,
        },
        headline: hlRect ? { left: Math.round(hlRect.left), right: Math.round(hlRect.right), top: Math.round(hlRect.top), bottom: Math.round(hlRect.bottom) } : null,
        cta: ctaRect ? { left: Math.round(ctaRect.left), right: Math.round(ctaRect.right), top: Math.round(ctaRect.top), bottom: Math.round(ctaRect.bottom) } : null,
        strip: sRect ? { left: Math.round(sRect.left), right: Math.round(sRect.right), top: Math.round(sRect.top), bottom: Math.round(sRect.bottom) } : null,
      };
    });

    console.log(`\n=== Viewport: ${vp.name} (${vp.width}x${vp.height}) ===`);
    console.log(JSON.stringify(data, null, 2));
  }

  await browser.close();
}

measureHero().catch(console.error);
