const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const checks = await page.evaluate(() => {
    const hero = document.getElementById('home');
    const h1 = hero.querySelector('h1');
    const p1 = hero.querySelector('.disintegrate-p1');
    const cta = hero.querySelector('.disintegrate-cta a');
    const strip = hero.querySelector('.disintegrate-strip');
    const marquee = document.querySelector('[role="region"][aria-label="Trust statements marquee"]');
    const pillars = document.getElementById('pillars');

    const heroStyle = window.getComputedStyle(hero);
    const marqueeStyle = window.getComputedStyle(marquee);

    return {
      h1Text: h1 ? h1.innerText.replace(/\s+/g, ' ').trim() : null,
      h1Visible: h1 ? h1.getBoundingClientRect().height > 0 : false,
      p1Text: p1 ? p1.innerText.trim() : null,
      p1Visible: p1 ? p1.getBoundingClientRect().height > 0 : false,
      ctaLabel: cta ? cta.innerText.trim() : null,
      ctaHref: cta ? cta.getAttribute('href') : null,
      stripVisible: strip ? strip.getBoundingClientRect().height > 0 : false,
      marqueeVisible: marquee ? marquee.getBoundingClientRect().height > 0 : false,
      marqueeItemsCount: marquee ? marquee.querySelectorAll('span').length : 0,
      pillarsTitle: pillars ? pillars.querySelector('h2').innerText.trim() : null,
      heroBorderBottom: heroStyle.borderBottom,
      marqueeBorderTop: marqueeStyle.borderTop,
      heroBottom: hero.getBoundingClientRect().bottom,
      marqueeTop: marquee.getBoundingClientRect().top
    };
  });

  console.log('Automated Integrity Checks:');
  console.log(JSON.stringify(checks, null, 2));

  // Verify mobile as well
  await page.setViewportSize({ width: 375, height: 812 });
  await page.waitForTimeout(300);

  const mobileChecks = await page.evaluate(() => {
    const hero = document.getElementById('home');
    const marquee = document.querySelector('[role="region"][aria-label="Trust statements marquee"]');
    const heroBox = hero.getBoundingClientRect();
    const marqueeBox = marquee.getBoundingClientRect();

    return {
      heroBottom: heroBox.bottom,
      marqueeTop: marqueeBox.top,
      gap: marqueeBox.top - heroBox.bottom
    };
  });

  console.log('\nMobile Alignment Checks:');
  console.log(JSON.stringify(mobileChecks, null, 2));

  await browser.close();
})();
