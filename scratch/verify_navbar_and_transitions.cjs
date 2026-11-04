const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log('1. Checking Homepage at scroll 0...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const topCheck = await page.evaluate(() => {
    const header = document.querySelector('header');
    const hero = document.getElementById('home');
    const heroImg = hero ? hero.querySelector('img') : null;
    const heroBox = hero ? hero.getBoundingClientRect() : null;
    const headerBox = header ? header.getBoundingClientRect() : null;
    const navLink = header ? header.querySelector('nav a') : null;
    const logoText = header ? header.querySelector('header a[aria-label*="Home"] span') : null;

    return {
      headerPos: header ? window.getComputedStyle(header).position : null,
      headerBg: header ? window.getComputedStyle(header).backgroundColor : null,
      headerTop: headerBox ? headerBox.top : null,
      headerHeight: headerBox ? headerBox.height : null,
      heroTop: heroBox ? heroBox.top : null,
      heroHeight: heroBox ? heroBox.height : null,
      navLinkColor: navLink ? window.getComputedStyle(navLink).color : null,
      logoColor: logoText ? window.getComputedStyle(logoText).color : null,
      hasHeroUnderHeader: heroBox ? heroBox.top <= 0 : false
    };
  });

  console.log('Top Check Details:', topCheck);

  // Take screenshot of Homepage top showing floating transparent navbar directly on hero image
  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/verify_navbar_top_transparent.png'
  });

  console.log('\n2. Scrolling down to 180px...');
  await page.evaluate(() => window.scrollTo(0, 180));
  await page.waitForTimeout(400);

  const scrollCheck = await page.evaluate(() => {
    const header = document.querySelector('header');
    const navLink = header ? header.querySelector('nav a') : null;
    const logoText = header ? header.querySelector('header a[aria-label*="Home"] span') : null;

    return {
      headerBg: header ? window.getComputedStyle(header).backgroundColor : null,
      headerBackdropBlur: header ? window.getComputedStyle(header).backdropFilter : null,
      navLinkColor: navLink ? window.getComputedStyle(navLink).color : null,
      logoColor: logoText ? window.getComputedStyle(logoText).color : null,
    };
  });

  console.log('Scrolled Check Details:', scrollCheck);

  // Take screenshot of scrolled translucent glass navbar
  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/verify_navbar_scrolled_glass.png'
  });

  console.log('\n3. Scrolling back to top...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const restoreCheck = await page.evaluate(() => {
    const header = document.querySelector('header');
    return {
      headerBg: header ? window.getComputedStyle(header).backgroundColor : null,
    };
  });
  console.log('Restored Check Details:', restoreCheck);

  console.log('\n4. Checking Internal Page (/aiconsulting.html)...');
  await page.goto('http://localhost:5173/aiconsulting.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const internalCheck = await page.evaluate(() => {
    const header = document.querySelector('header');
    const navLink = header ? header.querySelector('nav a') : null;
    const logoText = header ? header.querySelector('header a[aria-label*="Home"] span') : null;
    const pageMain = document.querySelector('main');
    const mainBox = pageMain ? pageMain.getBoundingClientRect() : null;

    return {
      headerBg: header ? window.getComputedStyle(header).backgroundColor : null,
      navLinkColor: navLink ? window.getComputedStyle(navLink).color : null,
      logoColor: logoText ? window.getComputedStyle(logoText).color : null,
      mainTop: mainBox ? mainBox.top : null,
    };
  });
  console.log('Internal Page Check:', internalCheck);

  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/verify_navbar_internal_page.png'
  });

  // Mobile checks
  console.log('\n5. Checking Mobile 375x812 View...');
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  await page.screenshot({
    path: 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17/verify_navbar_mobile_top.png'
  });

  await browser.close();
  console.log('\nNavbar checks complete.');
})();
