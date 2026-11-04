const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  const loadedWoffs = [];
  page.on('request', req => {
    if (req.url().includes('.woff2') || req.url().includes('.woff')) {
      loadedWoffs.push(req.url());
      console.log('WOFF2 REQUESTED:', req.url());
    }
  });

  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=pilcrow-rounded@400&f[]=bonny@500&display=swap" rel="stylesheet" />
        <link href="https://api.fontshare.com/v2/css?f[]=bonny@500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <p style="font-family: 'Pilcrow Rounded', sans-serif">Pilcrow Rounded Body Text</p>
        <h1 style="font-family: 'Bonny', serif; font-weight: 500">Bonny 500 Editorial Heading</h1>
      </body>
    </html>
  `);
  
  await page.waitForTimeout(2000);
  await page.evaluate(() => document.fonts.ready);

  console.log('Total woff2 fonts downloaded:', loadedWoffs.length);
  console.log('Downloaded fonts:', loadedWoffs);

  // Check actual font face set in document.fonts
  const fontFaces = await page.evaluate(async () => {
    const list = [];
    for (const font of document.fonts) {
      list.push({
        family: font.family,
        weight: font.weight,
        status: font.status
      });
    }
    return list;
  });

  console.log('Registered FontFaces in document.fonts:', fontFaces);
  await browser.close();
})();
