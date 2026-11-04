const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

async function testWithPadding() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const res = await page.evaluate(() => {
    const textContainer = document.querySelector('#pillars .group .relative.z-20');
    if (textContainer) {
      textContainer.style.padding = '24px';
    }
    const card = document.querySelector('#pillars .group');
    const h3 = card.querySelector('h3');
    h3.style.fontSize = '23px';
    h3.style.fontFamily = "'General Sans', sans-serif";
    h3.style.fontWeight = '600';
    const range = document.createRange();
    range.selectNodeContents(h3);
    const rects = range.getClientRects();
    return {
      lineCount: rects.length,
      lines: Array.from(rects).map(r => ({ width: r.width, height: r.height }))
    };
  });
  console.log('With 24px padding and 23px font size:', res);

  await browser.close();
}

testWithPadding().catch(console.error);
