const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Measure junction details
  const details = await page.evaluate(() => {
    const hero = document.getElementById('home');
    const marquee = document.querySelector('[role="region"][aria-label="Trust statements marquee"]');
    const heroBox = hero.getBoundingClientRect();
    const marqueeBox = marquee.getBoundingClientRect();

    return {
      heroBottom: heroBox.bottom,
      marqueeTop: marqueeBox.top,
      gap: marqueeBox.top - heroBox.bottom,
      heroBorderBottom: window.getComputedStyle(hero).borderBottom,
      marqueeBorderTop: window.getComputedStyle(marquee).borderTop,
      marqueeBg: window.getComputedStyle(marquee).backgroundColor,
    };
  });

  console.log('Junction details:', details);
  await browser.close();
})();
