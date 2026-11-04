const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

async function testTabletWrapping() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  for (const fSize of ['20px', '21px', '22px', '23px', '24px']) {
    const res = await page.evaluate(({ size }) => {
      const card = document.querySelector('#pillars .group');
      const h3 = card.querySelector('h3');
      h3.style.fontSize = size;
      h3.style.fontFamily = "'General Sans', sans-serif";
      h3.style.fontWeight = '600';
      const range = document.createRange();
      range.selectNodeContents(h3);
      const rects = range.getClientRects();
      return {
        size,
        lineCount: rects.length,
        lines: Array.from(rects).map(r => ({ width: r.width, height: r.height }))
      };
    }, { size: fSize });
    console.log(`Size ${fSize}: lineCount=${res.lineCount}`);
  }

  await browser.close();
}

testTabletWrapping().catch(console.error);
