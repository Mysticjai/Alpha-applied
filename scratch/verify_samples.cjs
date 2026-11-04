const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const samples = await page.evaluate(async () => {
    // Check computed styles and inspect the hero bottom element
    const hero = document.getElementById('home');
    const heroBox = hero.getBoundingClientRect();
    const marquee = document.querySelector('[role="region"][aria-label="Trust statements marquee"]');
    const marqueeBox = marquee.getBoundingClientRect();
    
    return {
      heroBottom: heroBox.bottom,
      marqueeTop: marqueeBox.top,
      heroHeight: heroBox.height,
    };
  });

  console.log('Samples:', samples);
  await browser.close();
})();
