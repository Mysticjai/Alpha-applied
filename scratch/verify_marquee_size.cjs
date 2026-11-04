const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');

const artifactDir = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function testMarquee() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();

  const viewports = [
    { name: 'desktop_1440', width: 1440, height: 900 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'mobile_390', width: 390, height: 844 },
    { name: 'mobile_375', width: 375, height: 667 }
  ];

  const results = {};

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const check = await page.evaluate(() => {
      const marquee = document.querySelector('[role="region"][aria-label*="Trust"]');
      const pillars = document.getElementById('pillars');
      const hero = document.getElementById('home');

      const mRect = marquee.getBoundingClientRect();
      const pRect = pillars ? pillars.getBoundingClientRect() : null;
      const hRect = hero ? hero.getBoundingClientRect() : null;

      const hasHorizontalOverflow = document.documentElement.scrollWidth > document.documentElement.clientWidth;

      const span = marquee.querySelector('span.font-sans');
      const csSpan = span ? window.getComputedStyle(span) : null;
      const star = marquee.querySelector('span.font-serif');
      const csStar = star ? window.getComputedStyle(star) : null;
      const csMarquee = window.getComputedStyle(marquee);

      // Check overlap between marquee and pillars
      // At scroll 0: marquee bottom should match pillars top
      const gap = pRect ? (pRect.top - mRect.bottom) : null;

      return {
        marqueeHeight: mRect.height,
        paddingTop: csMarquee.paddingTop,
        paddingBottom: csMarquee.paddingBottom,
        fontSize: csSpan ? csSpan.fontSize : null,
        starSize: csStar ? csStar.fontSize : null,
        hasHorizontalOverflow,
        gapBetweenMarqueeAndPillars: gap,
        pillarsTitleVisible: !!pillars && !!pillars.querySelector('h2'),
        heroBottomMatchesMarqueeTop: hRect ? (mRect.top - hRect.bottom) : null
      };
    });

    results[vp.name] = check;

    // Scroll so the hero bottom, marquee, and top of "Choose an Area to Explore" are centered
    await page.evaluate(() => {
      const marquee = document.querySelector('[role="region"][aria-label*="Trust"]');
      if (marquee) {
        marquee.scrollIntoView({ block: 'center' });
      }
    });
    await page.waitForTimeout(300);

    const shotPath = path.join(artifactDir, `marquee_${vp.name}_junction.png`);
    await page.screenshot({ path: shotPath, fullPage: false });
    console.log(`Saved screenshot for ${vp.name} to: ${shotPath}`);
  }

  console.log('Verification Results:', JSON.stringify(results, null, 2));

  // Also take a tighter crop around the marquee on desktop
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => {
    const marquee = document.querySelector('[role="region"][aria-label*="Trust"]');
    if (marquee) {
      window.scrollTo(0, marquee.getBoundingClientRect().top + window.scrollY - 150);
    }
  });
  await page.waitForTimeout(300);
  const marqueeDetailShot = path.join(artifactDir, 'marquee_desktop_detail.png');
  await page.screenshot({ path: marqueeDetailShot, fullPage: false });
  console.log(`Saved marquee detail to: ${marqueeDetailShot}`);

  await browser.close();
}

testMarquee().catch(err => {
  console.error(err);
  process.exit(1);
});
