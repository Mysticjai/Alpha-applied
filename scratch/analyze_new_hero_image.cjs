const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

async function analyzeNewHero() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();
  await page.goto('file:///C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2/public/images/alpha-legal-tech-hero.jpg');

  const analysis = await page.evaluate(() => {
    const img = document.querySelector('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    function getPixel(x, y) {
      const p = ctx.getImageData(x, y, 1, 1).data;
      return {
        r: p[0], g: p[1], b: p[2], a: p[3],
        hex: '#' + [p[0], p[1], p[2]].map(c => c.toString(16).padStart(2, '0')).join('')
      };
    }

    function getAverage(x0, y0, w, h) {
      const data = ctx.getImageData(x0, y0, w, h).data;
      let r = 0, g = 0, b = 0;
      const count = data.length / 4;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }
      const ar = Math.round(r / count);
      const ag = Math.round(g / count);
      const ab = Math.round(b / count);
      return {
        r: ar, g: ag, b: ab,
        hex: '#' + [ar, ag, ab].map(c => c.toString(16).padStart(2, '0')).join('')
      };
    }

    return {
      dimensions: { w: img.naturalWidth, h: img.naturalHeight },
      topLeftNavbarArea: getAverage(50, 20, 300, 60),
      topRightNavbarArea: getAverage(600, 20, 350, 60),
      headlineArea: getAverage(50, 150, 300, 200),
      leftWallPure: getAverage(20, 200, 100, 200),
      bottomLeft: getAverage(0, 500, 200, 75),
      bottomCenter: getAverage(400, 500, 224, 75),
      bottomRight: getAverage(800, 500, 224, 75),
      veryBottomStrip: getAverage(0, 565, 1024, 10),
    };
  });

  console.log('New Hero Image Color & Region Analysis:', JSON.stringify(analysis, null, 2));

  await browser.close();
}

analyzeNewHero().catch(console.error);
