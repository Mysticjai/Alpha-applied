const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const fs = require('fs');
const path = require('path');

const artifactDir = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function verify() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:5173/ ...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });

  // Wait for document.fonts.ready
  await page.evaluate(() => document.fonts.ready);

  // Check loaded fonts in browser
  const fontStatus = await page.evaluate(() => {
    const fonts = [];
    document.fonts.forEach(f => {
      fonts.push({
        family: f.family,
        weight: f.weight,
        status: f.status
      });
    });
    return {
      hasGeneralSans: document.fonts.check('16px "General Sans"'),
      hasSatoshi: document.fonts.check('16px "Satoshi"'),
      hasGeneralSans600: document.fonts.check('600 16px "General Sans"'),
      hasSatoshi400: document.fonts.check('400 16px "Satoshi"'),
      hasSatoshi500: document.fonts.check('500 16px "Satoshi"'),
      hasSatoshi600: document.fonts.check('600 16px "Satoshi"'),
      loadedList: fonts
    };
  });

  console.log('Font Status:', JSON.stringify(fontStatus, null, 2));

  // Check computed font styles of critical elements
  const computedChecks = await page.evaluate(() => {
    function getDetails(selector) {
      const el = document.querySelector(selector);
      if (!el) return null;
      const cs = window.getComputedStyle(el);
      return {
        fontFamily: cs.fontFamily,
        fontWeight: cs.fontWeight,
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
        text: el.innerText.trim().slice(0, 40)
      };
    }

    return {
      heroH1: getDetails('#home h1'),
      heroBody: getDetails('#home .disintegrate-p1 p'),
      heroCtaBtn: getDetails('#home .disintegrate-cta a'),
      navLink: getDetails('header nav a'),
      headerCtaBtn: getDetails('header a[href*="contact"]'),
      tickerItem: getDetails('[role="region"] .font-sans'),
      pillarsH2: getDetails('#pillars h2'),
      whoWeServeH2: getDetails('#who-we-serve h2'),
      whoWeServeH3: getDetails('#who-we-serve h3'),
      aiConsultingH3: getDetails('#ai-consulting h3'),
      litigationH3: getDetails('#litigation h3'),
      founderH2: getDetails('#founder h2'),
      founderFeatureH3: getDetails('#founder h3'),
      contactInput: getDetails('#contact input[type="text"]')
    };
  });

  console.log('Computed Element Typography:', JSON.stringify(computedChecks, null, 2));

  // Take full desktop homepage screenshot
  const desktopShotPath = path.join(artifactDir, 'verify_general_sans_satoshi_desktop.png');
  await page.screenshot({ path: desktopShotPath, fullPage: false });
  console.log('Saved:', desktopShotPath);

  // Take scrolled screenshot to inspect pillars and typography
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(400);
  const scrolledShotPath = path.join(artifactDir, 'verify_general_sans_satoshi_scrolled.png');
  await page.screenshot({ path: scrolledShotPath, fullPage: false });
  console.log('Saved:', scrolledShotPath);

  // Take mobile screenshot
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  const mobileShotPath = path.join(artifactDir, 'verify_general_sans_satoshi_mobile.png');
  await page.screenshot({ path: mobileShotPath, fullPage: false });
  console.log('Saved:', mobileShotPath);

  // Check subpage (e.g. /litigationservices.html)
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/litigationservices.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const subpageChecks = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const cs = h1 ? window.getComputedStyle(h1) : null;
    return {
      h1Family: cs ? cs.fontFamily : null,
      h1Weight: cs ? cs.fontWeight : null,
      h1Text: h1 ? h1.innerText.trim() : null
    };
  });
  console.log('Subpage Typography:', JSON.stringify(subpageChecks, null, 2));

  const subpageShotPath = path.join(artifactDir, 'verify_general_sans_satoshi_subpage.png');
  await page.screenshot({ path: subpageShotPath, fullPage: false });
  console.log('Saved:', subpageShotPath);

  await browser.close();
  console.log('Verification finished successfully.');
}

verify().catch(err => {
  console.error(err);
  process.exit(1);
});
