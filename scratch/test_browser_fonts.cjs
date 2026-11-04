const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=pilcrow-rounded@400&f[]=bonny@500&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=bonny@500" rel="stylesheet" />
      </head>
      <body>
        <p style="font-family: 'Pilcrow Rounded', sans-serif">Pilcrow 400</p>
        <h1 style="font-family: 'Bonny', serif; font-weight: 500">Bonny 500</h1>
      </body>
    </html>
  `);
  
  await page.waitForTimeout(2000);
  await page.evaluate(() => document.fonts.ready);

  const check = await page.evaluate(() => ({
    pilcrow: document.fonts.check('16px "Pilcrow Rounded"'),
    bonny: document.fonts.check('500 16px "Bonny"')
  }));

  console.log('Fonts loaded:', check);
  await browser.close();
})();
