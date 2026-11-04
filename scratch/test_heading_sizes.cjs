const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

async function testSizes() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();

  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900 },
    { name: 'desktop-1280', width: 1280, height: 800 },
    { name: 'laptop-1024', width: 1024, height: 768 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'mobile-390', width: 390, height: 844 },
  ];

  const testConfigs = [
    { label: '28px / 1.22', fontSize: '28px', lineHeight: '1.22' },
    { label: '29px / 1.22', fontSize: '29px', lineHeight: '1.22' },
    { label: '30px / 1.24', fontSize: '30px', lineHeight: '1.24' },
    { label: '32px / 1.25', fontSize: '32px', lineHeight: '1.25' },
  ];

  for (const vp of viewports) {
    await page.setViewportSize({ width: vp.width, height: vp.height });
    await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);

    console.log(`\n=================== VIEWPORT: ${vp.name} (${vp.width}x${vp.height}) ===================`);

    for (const cfg of testConfigs) {
      const result = await page.evaluate(({ fSize, lHeight }) => {
        const cards = Array.from(document.querySelectorAll('#pillars .group'));
        return cards.map(c => {
          const h3 = c.querySelector('h3');
          if (h3) {
            h3.style.fontFamily = "'General Sans', system-ui, sans-serif";
            h3.style.fontWeight = '600';
            h3.style.fontSize = fSize;
            h3.style.lineHeight = lHeight;
          }
          const text = h3 ? h3.innerText.replace(/\n/g, ' ') : '';
          const rect = h3 ? h3.getBoundingClientRect() : null;
          const range = document.createRange();
          range.selectNodeContents(h3);
          const rects = range.getClientRects();

          // Lines breakdown
          const lines = [];
          let currentY = null;
          let currentLine = '';
          const words = h3.innerText.split(/\s+/);
          // check lines via words
          return {
            text,
            numLineRects: rects.length,
            h3Height: rect ? rect.height : 0,
            h3Width: rect ? rect.width : 0,
            clientHeight: h3.clientHeight,
          };
        });
      }, { fSize: cfg.fontSize, lHeight: cfg.lineHeight });

      console.log(`Config: ${cfg.label}`);
      result.forEach(r => {
        console.log(`  - "${r.text}": height=${r.h3Height.toFixed(1)}px, width=${r.h3Width.toFixed(1)}px, lines=${r.numLineRects}`);
      });
    }
  }

  await browser.close();
}

testSizes().catch(console.error);
