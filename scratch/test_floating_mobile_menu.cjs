const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');

const artifactDir = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function testMobileMenu() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Click hamburger
  await page.click('header button[aria-label="Open mobile navigation menu"]');
  await page.waitForTimeout(300);

  const isDrawerOpen = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"][aria-label="Mobile Navigation"]');
    return !!dialog;
  });
  console.log('Mobile Drawer Open?', isDrawerOpen);

  const drawerShotPath = path.join(artifactDir, 'navbar_floating_mobile_drawer.png');
  await page.screenshot({ path: drawerShotPath, fullPage: false });
  console.log('Saved:', drawerShotPath);

  // Close drawer
  await page.click('button[aria-label="Close menu"]');
  await page.waitForTimeout(300);

  const isDrawerClosed = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"][aria-label="Mobile Navigation"]');
    return !dialog;
  });
  console.log('Mobile Drawer Closed?', isDrawerClosed);

  await browser.close();
}

testMobileMenu().catch(err => {
  console.error(err);
  process.exit(1);
});
