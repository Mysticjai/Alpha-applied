const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  
  const heroRect = await page.evaluate(() => {
    const hero = document.getElementById('home');
    const marquee = document.querySelector('[role="region"][aria-label="Trust statements marquee"]');
    const pillars = document.getElementById('pillars');
    const heroBox = hero.getBoundingClientRect();
    const marqueeBox = marquee ? marquee.getBoundingClientRect() : null;
    const pillarsBox = pillars ? pillars.getBoundingClientRect() : null;
    return {
      hero: { top: heroBox.top, bottom: heroBox.bottom, height: heroBox.height, borderBottom: window.getComputedStyle(hero).borderBottom },
      marquee: marqueeBox ? { top: marqueeBox.top, bottom: marqueeBox.bottom, height: marqueeBox.height, bg: window.getComputedStyle(marquee).backgroundColor, borderBottom: window.getComputedStyle(marquee).borderBottom } : null,
      pillars: pillarsBox ? { top: pillarsBox.top, bottom: pillarsBox.bottom, height: pillarsBox.height, bg: window.getComputedStyle(pillars).backgroundColor } : null,
      bodyBg: window.getComputedStyle(document.body).backgroundColor,
      containerBg: window.getComputedStyle(document.querySelector('.min-h-screen')).backgroundColor
    };
  });
  console.log(JSON.stringify(heroRect, null, 2));
  await browser.close();
})();
