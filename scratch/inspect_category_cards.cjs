const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

async function inspectCards() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();
  for (const w of [1440, 1024, 768, 390]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    const data = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('#pillars .group'));
      return cards.map(c => {
        const h3 = c.querySelector('h3');
        const cRect = c.getBoundingClientRect();
        const h3Rect = h3 ? h3.getBoundingClientRect() : null;
        return {
          title: h3 ? h3.innerText : '',
          cardW: Math.round(cRect.width),
          h3W: Math.round(h3Rect ? h3Rect.width : 0),
          h3H: Math.round(h3Rect ? h3Rect.height : 0),
          fontSize: h3 ? window.getComputedStyle(h3).fontSize : '',
          lineHeight: h3 ? window.getComputedStyle(h3).lineHeight : '',
        };
      });
    });

    console.log(`\nWidth ${w}:`, data);
  }

  await browser.close();
}

inspectCards().catch(console.error);
