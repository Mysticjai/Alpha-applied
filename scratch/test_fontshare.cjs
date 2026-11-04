const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=pilcrow-rounded@400&f[]=bonny@500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <p style="font-family: 'Pilcrow Rounded'">Pilcrow Test</p>
        <h1 style="font-family: 'Bonny'">Bonny Test</h1>
      </body>
    </html>
  `);
  
  await page.waitForTimeout(1500);

  const cssText = await page.evaluate(async () => {
    const link = document.querySelector('link');
    const res = await fetch(link.href);
    return await res.text();
  });

  console.log('Browser fetched CSS text length:', cssText.length);
  console.log('Includes Pilcrow:', cssText.includes('Pilcrow Rounded'));
  console.log('Includes Bonny:', cssText.includes('Bonny'));

  const fontCheck = await page.evaluate(async () => {
    await document.fonts.ready;
    return {
      pilcrow: document.fonts.check('16px "Pilcrow Rounded"'),
      bonny: document.fonts.check('16px "Bonny"')
    };
  });
  console.log('Font loaded check in browser:', fontCheck);

  await browser.close();
})();
