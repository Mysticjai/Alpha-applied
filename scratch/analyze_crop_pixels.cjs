const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  // Read junction_tight_crop_desktop.png as base64
  const imgData = fs.readFileSync('C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/junction_tight_crop_desktop.png').toString('base64');
  
  await page.setContent(`
    <img id="crop" src="data:image/png;base64,${imgData}" />
    <canvas id="can"></canvas>
  `);
  
  const analysis = await page.evaluate(() => {
    const img = document.getElementById('crop');
    const can = document.getElementById('can');
    can.width = img.width;
    can.height = img.height;
    const ctx = can.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Let's sample along 5 columns: x = 200 (left text area), x = 500, x = 720 (center), x = 1000, x = 1300 (right gavel/laptop area)
    const columns = [200, 500, 720, 1000, 1300];
    const results = {};

    columns.forEach(x => {
      results[x] = [];
      // Junction is at y = 150 (750 to 900)
      for (let y = 135; y <= 165; y += 3) {
        const pixel = ctx.getImageData(x, y, 1, 1).data;
        results[x].push({ y, r: pixel[0], g: pixel[1], b: pixel[2], a: pixel[3] });
      }
    });

    return { dimensions: { w: img.width, h: img.height }, results };
  });

  console.log('Image dimensions:', analysis.dimensions);
  console.log('Pixel progression across junction (y=135 to 165, junction is y=150):');
  for (const [col, rows] of Object.entries(analysis.results)) {
    console.log(`\n--- Column x=${col} ---`);
    rows.forEach(r => {
      console.log(`y=${r.y}: rgb(${r.r}, ${r.g}, ${r.b})`);
    });
  }

  await browser.close();
})();
