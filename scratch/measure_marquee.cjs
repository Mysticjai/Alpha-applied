const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  const desktop = await page.evaluate(() => {
    const el = document.querySelector('[role="region"][aria-label*="Trust"]');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const cs = window.getComputedStyle(el);
    const span = el.querySelector('span.font-sans');
    const spanCs = span ? window.getComputedStyle(span) : null;
    const star = el.querySelector('span.font-serif');
    const starCs = star ? window.getComputedStyle(star) : null;
    return {
      boxHeight: rect.height,
      paddingTop: cs.paddingTop,
      paddingBottom: cs.paddingBottom,
      fontSize: spanCs ? spanCs.fontSize : null,
      lineHeight: spanCs ? spanCs.lineHeight : null,
      starFontSize: starCs ? starCs.fontSize : null,
      text: span ? span.innerText : null
    };
  });
  console.log('Desktop 1440:', desktop);

  await page.setViewportSize({ width: 390, height: 844 });
  const mobile = await page.evaluate(() => {
    const el = document.querySelector('[role="region"][aria-label*="Trust"]');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const cs = window.getComputedStyle(el);
    const span = el.querySelector('span.font-sans');
    const spanCs = span ? window.getComputedStyle(span) : null;
    return {
      boxHeight: rect.height,
      paddingTop: cs.paddingTop,
      paddingBottom: cs.paddingBottom,
      fontSize: spanCs ? spanCs.fontSize : null,
      lineHeight: spanCs ? spanCs.lineHeight : null
    };
  });
  console.log('Mobile 390:', mobile);

  await browser.close();
})();
