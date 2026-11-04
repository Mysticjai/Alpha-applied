const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // Test 1: Logo while on Home (scrolled down)
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  // Scroll down to 600px
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(300);
  console.log('ScrollY before logo click on Home:', await page.evaluate(() => window.scrollY));

  // Click logo
  await page.click('header a[aria-label*="Home"]');
  await page.waitForTimeout(800);
  const scrollYAfter = await page.evaluate(() => window.scrollY);
  console.log('ScrollY after logo click on Home:', scrollYAfter);
  console.log('URL after logo click on Home:', page.url());

  // Test 2: Mobile Drawer
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);

  // Open drawer
  const menuBtn = await page.$('button[aria-label*="menu"]');
  await menuBtn.click();
  await page.waitForTimeout(300);

  const drawerVisible = await page.evaluate(() => {
    const dialog = document.querySelector('[role="dialog"]');
    return dialog ? window.getComputedStyle(dialog).display !== 'none' : false;
  });
  console.log('Mobile drawer visible after hamburger click?', drawerVisible);

  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/verify_mobile_drawer_open.png'
  });

  // Click AI Consulting inside drawer
  let drawerTransition = false;
  const poll = setInterval(async () => {
    const vis = await page.evaluate(() => {
      const o = document.querySelector('div[aria-hidden="true"].fixed.inset-0');
      return o ? o.style.visibility : null;
    });
    if (vis === 'visible') drawerTransition = true;
  }, 20);

  await page.click('[role="dialog"] a[href*="aiconsulting"]');
  await page.waitForTimeout(1400);
  clearInterval(poll);

  console.log('Mobile link click -> URL:', page.url(), 'sweep triggered?', drawerTransition);

  // Test 3: Returning from mobile drawer to Home
  const mobileMenuBtn2 = await page.$('button[aria-label*="menu"]');
  await mobileMenuBtn2.click();
  await page.waitForTimeout(300);

  let returnSweep = false;
  const poll2 = setInterval(async () => {
    const vis = await page.evaluate(() => {
      const o = document.querySelector('div[aria-hidden="true"].fixed.inset-0');
      return o ? o.style.visibility : null;
    });
    if (vis === 'visible') returnSweep = true;
  }, 20);

  await page.click('[role="dialog"] a[href*="#home"]');
  await page.waitForTimeout(1400);
  clearInterval(poll2);

  console.log('Mobile Home click -> URL:', page.url(), 'sweep triggered?', returnSweep);

  await browser.close();
  console.log('All mobile & logo tests complete.');
})();
