const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');

const artifactDir = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function testNavbar() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('Testing Desktop 1440 at scroll 0...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const topState = await page.evaluate(() => {
    const header = document.querySelector('header');
    const container = header ? header.querySelector('div.pointer-events-auto') : null;
    if (!container) return null;

    const cRect = container.getBoundingClientRect();
    const cs = window.getComputedStyle(container);

    const logo = container.querySelector('a[aria-label*="Home"]');
    const navLinks = Array.from(container.querySelectorAll('nav a')).map(a => ({
      text: a.innerText.trim(),
      color: window.getComputedStyle(a).color,
      fontSize: window.getComputedStyle(a).fontSize
    }));
    const cta = container.querySelector('a[href*="contact"]');
    const ctaCs = cta ? window.getComputedStyle(cta) : null;
    const ctaRect = cta ? cta.getBoundingClientRect() : null;

    // Check distance between CTA right edge and container right edge
    const ctaMarginFromRight = cRect.right - (ctaRect ? ctaRect.right : 0);

    return {
      containerLeft: cRect.left,
      containerRight: window.innerWidth - cRect.right,
      containerWidth: cRect.width,
      containerHeight: cRect.height,
      borderRadius: cs.borderRadius,
      backgroundColor: cs.backgroundColor,
      borderColor: cs.borderColor,
      boxShadow: cs.boxShadow,
      backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter,
      ctaMarginFromRight,
      navLinksCount: navLinks.length,
      firstLinkColor: navLinks[0] ? navLinks[0].color : null,
      ctaBg: ctaCs ? ctaCs.backgroundColor : null,
      ctaColor: ctaCs ? ctaCs.color : null
    };
  });

  console.log('Top State (Scroll 0):', JSON.stringify(topState, null, 2));

  // Screenshot at scroll 0 (desktop)
  const topShotPath = path.join(artifactDir, 'navbar_floating_top_desktop.png');
  await page.screenshot({ path: topShotPath, fullPage: false });
  console.log('Saved:', topShotPath);

  // Now test Scrolled State (> 28px, e.g. scroll to 150px)
  console.log('Testing Desktop 1440 scrolled (150px)...');
  await page.evaluate(() => window.scrollTo(0, 150));
  await page.waitForTimeout(400);

  const scrolledState = await page.evaluate(() => {
    const header = document.querySelector('header');
    const container = header ? header.querySelector('div.pointer-events-auto') : null;
    if (!container) return null;

    const cRect = container.getBoundingClientRect();
    const cs = window.getComputedStyle(container);
    const navLink = container.querySelector('nav a');
    const linkCs = navLink ? window.getComputedStyle(navLink) : null;
    const cta = container.querySelector('a[href*="contact"]');
    const ctaCs = cta ? window.getComputedStyle(cta) : null;

    return {
      containerLeft: cRect.left,
      containerRight: window.innerWidth - cRect.right,
      containerWidth: cRect.width,
      containerHeight: cRect.height,
      borderRadius: cs.borderRadius,
      backgroundColor: cs.backgroundColor,
      borderColor: cs.borderColor,
      boxShadow: cs.boxShadow,
      backdropFilter: cs.backdropFilter || cs.webkitBackdropFilter,
      navLinkColor: linkCs ? linkCs.color : null,
      ctaBg: ctaCs ? ctaCs.backgroundColor : null
    };
  });

  console.log('Scrolled State:', JSON.stringify(scrolledState, null, 2));

  // Screenshot scrolled (desktop)
  const scrolledShotPath = path.join(artifactDir, 'navbar_floating_scrolled_desktop.png');
  await page.screenshot({ path: scrolledShotPath, fullPage: false });
  console.log('Saved:', scrolledShotPath);

  // Test Mobile (390px)
  console.log('Testing Mobile 390px...');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);

  const mobileTopState = await page.evaluate(() => {
    const header = document.querySelector('header');
    const container = header ? header.querySelector('div.pointer-events-auto') : null;
    if (!container) return null;
    const cRect = container.getBoundingClientRect();
    const cs = window.getComputedStyle(container);
    return {
      containerLeft: cRect.left,
      containerRight: window.innerWidth - cRect.right,
      containerWidth: cRect.width,
      containerHeight: cRect.height,
      borderRadius: cs.borderRadius,
      backgroundColor: cs.backgroundColor
    };
  });
  console.log('Mobile Top State:', JSON.stringify(mobileTopState, null, 2));

  const mobileTopShotPath = path.join(artifactDir, 'navbar_floating_top_mobile.png');
  await page.screenshot({ path: mobileTopShotPath, fullPage: false });
  console.log('Saved:', mobileTopShotPath);

  // Test Mobile Scrolled
  await page.evaluate(() => window.scrollTo(0, 150));
  await page.waitForTimeout(400);
  const mobileScrolledShotPath = path.join(artifactDir, 'navbar_floating_scrolled_mobile.png');
  await page.screenshot({ path: mobileScrolledShotPath, fullPage: false });
  console.log('Saved:', mobileScrolledShotPath);

  // Test Subpage (e.g. litigationservices.html)
  console.log('Testing Subpage Desktop 1440px...');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/litigationservices.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const subpageState = await page.evaluate(() => {
    const header = document.querySelector('header');
    const container = header ? header.querySelector('div.pointer-events-auto') : null;
    const h1 = document.querySelector('h1');
    const h1Rect = h1 ? h1.getBoundingClientRect() : null;
    const cRect = container ? container.getBoundingClientRect() : null;

    return {
      containerHeight: cRect ? cRect.height : null,
      containerBottom: cRect ? cRect.bottom : null,
      h1Top: h1Rect ? h1Rect.top : null,
      clearanceAboveH1: (h1Rect && cRect) ? (h1Rect.top - cRect.bottom) : null
    };
  });
  console.log('Subpage State:', JSON.stringify(subpageState, null, 2));

  const subpageShotPath = path.join(artifactDir, 'navbar_floating_subpage.png');
  await page.screenshot({ path: subpageShotPath, fullPage: false });
  console.log('Saved:', subpageShotPath);

  await browser.close();
  console.log('All navbar tests completed successfully.');
}

testNavbar().catch(err => {
  console.error(err);
  process.exit(1);
});
