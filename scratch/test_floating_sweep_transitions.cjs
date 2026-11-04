const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

async function testTransitions() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // 1. Click AI Consulting in nav
  console.log('Clicking AI Consulting in floating navbar...');
  await page.click('header nav a[href*="aiconsulting"]');
  await page.waitForTimeout(600);

  let url = page.url();
  console.log('Current URL after click:', url);
  if (!url.includes('aiconsulting')) throw new Error('Route transition failed to AI Consulting');

  // 2. Click Logo to navigate back to Home
  console.log('Clicking Logo to return home...');
  await page.click('header a[aria-label*="Home"]');
  await page.waitForTimeout(600);

  url = page.url();
  console.log('Current URL after returning home:', url);
  if (!url.includes('#home') && !url.endsWith('/')) throw new Error('Return to home failed');

  // 3. Click Book a Call CTA button
  console.log('Clicking Book a Call CTA button in floating navbar...');
  await page.click('header a[href*="contact"]:has-text("Book a Call")');
  await page.waitForTimeout(600);

  url = page.url();
  console.log('Current URL after clicking Book a Call:', url);

  await browser.close();
  console.log('All sweep transitions verified successfully.');
}

testTransitions().catch(err => {
  console.error(err);
  process.exit(1);
});
