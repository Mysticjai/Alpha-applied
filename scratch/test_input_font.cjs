const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  
  const font = await page.evaluate(() => {
    const input = document.querySelector('#contact input#name');
    return input ? window.getComputedStyle(input).fontFamily : 'not found';
  });

  console.log('Input#name font:', font);
  await browser.close();
})();
