const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');

const artifactDir = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function verify() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  console.log('--- 1. Desktop 1440 Viewport Verification ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2500);

  const heroSection = await page.$('#home');
  await heroSection.screenshot({
    path: path.join(artifactDir, 'refined_hero_desktop_1440.png')
  });
  console.log('Captured refined_hero_desktop_1440.png');

  // Closeup of junction into LinearTrustMarquee
  await page.screenshot({
    path: path.join(artifactDir, 'refined_hero_junction_desktop.png'),
    clip: { x: 0, y: 640, width: 1440, height: 350 }
  });
  console.log('Captured refined_hero_junction_desktop.png');

  // Verify overflow
  const desktopOverflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
    hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  }));
  console.log('Desktop 1440 Overflow:', desktopOverflow);

  console.log('--- 2. Desktop 1920 Viewport Verification ---');
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2500);

  const hero1920 = await page.$('#home');
  await hero1920.screenshot({
    path: path.join(artifactDir, 'refined_hero_desktop_1920.png')
  });
  console.log('Captured refined_hero_desktop_1920.png');

  console.log('--- 3. Tablet 768 Viewport Verification ---');
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2500);

  const hero768 = await page.$('#home');
  await hero768.screenshot({
    path: path.join(artifactDir, 'refined_hero_tablet_768.png')
  });
  console.log('Captured refined_hero_tablet_768.png');

  console.log('--- 4. Mobile 390 Viewport Verification ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(2500);

  const hero390 = await page.$('#home');
  await hero390.screenshot({
    path: path.join(artifactDir, 'refined_hero_mobile_390.png')
  });
  console.log('Captured refined_hero_mobile_390.png');

  console.log('--- 5. Navigation & Sweep Transitions Test ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1000);

  const litLink = page.locator('nav a[href*="litigationservices"]').first();
  await litLink.click();
  await page.waitForTimeout(1200);

  console.log('Navigated to URL:', page.url());
  const isLitPage = page.url().includes('litigationservices');
  console.log('Subpage load successful:', isLitPage);

  // Return home
  const homeLink = page.locator('a[aria-label*="Home"]').first();
  await homeLink.click();
  await page.waitForTimeout(1200);

  console.log('Returned to URL:', page.url());
  const isHome = page.url().endsWith('/') || page.url().includes('#home');
  console.log('Return to home successful:', isHome);

  console.log('Console Errors:', consoleErrors);

  await browser.close();
  console.log('--- Verification Finished! ---');
}

verify().catch(console.error);
