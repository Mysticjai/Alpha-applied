const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  await page.goto('https://alpha-website-dun.vercel.app/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const heroMarqueeInfo = await page.evaluate(() => {
    const hero = document.querySelector('section#home') || document.querySelector('section');
    const marquee = document.querySelector('[role="region"]') || document.querySelector('.marquee') || document.querySelector('div[class*="marquee"]');
    const nextSection = marquee ? marquee.nextElementSibling : null;

    return {
      heroBg: hero ? window.getComputedStyle(hero).backgroundColor : null,
      heroBorder: hero ? window.getComputedStyle(hero).borderBottom : null,
      marqueeBg: marquee ? window.getComputedStyle(marquee).backgroundColor : null,
      marqueeClass: marquee ? marquee.className : null,
      nextBg: nextSection ? window.getComputedStyle(nextSection).backgroundColor : null,
    };
  });

  console.log('Reference site info:', heroMarqueeInfo);

  // Take screenshot of hero and marquee on reference site
  await page.screenshot({ path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/reference_site_hero_blend.png' });

  await browser.close();
})();
