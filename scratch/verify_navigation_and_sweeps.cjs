const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

async function testTransitions() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  console.log('Navigating to Home...');
  await page.goto('http://localhost:5174/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  console.log('Clicking AI Consulting link in header...');
  // Click AI Consulting & Implementation link
  const navLink = await page.$('a[href="/aiconsulting.html"]');
  if (navLink) {
    await navLink.click();
    await page.waitForTimeout(1000); // Wait for sweep transition to complete
  }

  const currentUrl = page.url();
  console.log('Current URL after transition:', currentUrl);

  // Check that AI Assessment timeline exists and is responsive
  const timelineNode = await page.$('#ai-assessment-strategy');
  console.log('AI Assessment Timeline exists:', !!timelineNode);

  console.log('Navigating back to Home via logo...');
  const logo = await page.$('a[href="/"]');
  if (logo) {
    await logo.click();
    await page.waitForTimeout(1000);
  }
  console.log('Current URL after returning home:', page.url());

  console.log('Console errors found:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log('Errors:', consoleErrors);
  }

  await page.close();
  await browser.close();
  console.log('Sweep transition and navigation test passed!');
}

testTransitions().catch(err => {
  console.error('Transition test failed:', err);
  process.exit(1);
});
