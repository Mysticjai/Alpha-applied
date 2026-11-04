const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  page.on('request', req => {
    if (req.url().includes('fontshare') || req.url().includes('.woff') || req.url().includes('.ttf')) {
      console.log('REQUEST:', req.url());
    }
  });

  page.on('response', async res => {
    if (res.url().includes('fontshare.com/v2/css')) {
      const text = await res.text();
      console.log('CSS CONTENT:\n', text);
    }
  });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=pilcrow-rounded@400&f[]=bonny@500&display=swap" rel="stylesheet" />
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

  console.log('Check result:', check);
  await browser.close();
})();
