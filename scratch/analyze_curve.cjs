const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  const imgData = fs.readFileSync('C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/junction_tight_crop_desktop.png').toString('base64');
  
  await page.setContent(`
    <img id="crop" src="data:image/png;base64,${imgData}" />
    <canvas id="can"></canvas>
  `);
  
  const curve = await page.evaluate(() => {
    const img = document.getElementById('crop');
    const can = document.getElementById('can');
    can.width = img.width;
    can.height = img.height;
    const ctx = can.getContext('2d');
    ctx.drawImage(img, 0, 0);

    // Let's sample along x = 1100 (where the luminous artwork desk is) every 10 pixels from y = 0 to 150
    const points = [];
    for (let y = 0; y <= 150; y += 10) {
      const p = ctx.getImageData(1100, y, 1, 1).data;
      points.push({ y, distFromJunction: 150 - y, rgb: `rgb(${p[0]}, ${p[1]}, ${p[2]})` });
    }
    return points;
  });

  console.log('Vertical curve at x=1100 (desk artwork):');
  curve.forEach(pt => console.log(`-${pt.distFromJunction}px (y=${pt.y}): ${pt.rgb}`));
  await browser.close();
})();
