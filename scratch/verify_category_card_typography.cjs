const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');

const artifactDir = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function verify() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();

  console.log('--- 1. Desktop 1440 Viewport Verification ---');
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  // Scroll #pillars into view and wait for animations
  await page.evaluate(() => {
    const el = document.querySelector('#pillars');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(800);

  const desktopStats = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#pillars .group'));
    return cards.map((c, i) => {
      const h3 = c.querySelector('h3');
      const desc = c.querySelector('.card-description-wrap p');
      const cta = c.querySelector('.service-card-cta-row');
      const h3Cs = h3 ? window.getComputedStyle(h3) : null;
      const descCs = desc ? window.getComputedStyle(desc) : null;
      const cRect = c.getBoundingClientRect();
      const h3Rect = h3 ? h3.getBoundingClientRect() : null;

      // Determine text lines
      const range = document.createRange();
      range.selectNodeContents(h3);
      const rects = Array.from(range.getClientRects());

      return {
        index: i + 1,
        title: h3 ? h3.innerText.replace(/\n/g, ' ') : '',
        cardWidth: Math.round(cRect.width),
        cardHeight: Math.round(cRect.height),
        h3Width: Math.round(h3Rect ? h3Rect.width : 0),
        h3Height: Math.round(h3Rect ? h3Rect.height : 0),
        lineCount: rects.length,
        h3Styles: h3Cs ? {
          fontFamily: h3Cs.fontFamily,
          fontWeight: h3Cs.fontWeight,
          fontSize: h3Cs.fontSize,
          lineHeight: h3Cs.lineHeight,
          color: h3Cs.color,
          letterSpacing: h3Cs.letterSpacing,
        } : null,
        descStyles: descCs ? {
          fontFamily: descCs.fontFamily,
          fontWeight: descCs.fontWeight,
          fontSize: descCs.fontSize,
          color: descCs.color,
        } : null,
      };
    });
  });

  console.log('Desktop 1440 Stats:', JSON.stringify(desktopStats, null, 2));

  // Screenshot Resting State
  const pillarsSection = await page.$('#pillars');
  await pillarsSection.screenshot({
    path: path.join(artifactDir, 'category_cards_desktop_1440.png')
  });
  console.log('Captured category_cards_desktop_1440.png');

  // Test Hover State on Card 1
  console.log('--- 2. Testing Hover State on Card 1 ---');
  const firstCard = page.locator('#pillars .group').first();
  await firstCard.hover();
  await page.waitForTimeout(600);

  const hoverStats = await page.evaluate(() => {
    const card = document.querySelector('#pillars .group');
    const desc = card.querySelector('.service-card-desc-block');
    const img = card.querySelector('.service-card-image-sheet');
    const cta = card.querySelector('.service-card-cta-row');
    const ctaArrow = card.querySelector('.service-card-cta-arrow');
    const cardCs = window.getComputedStyle(card);
    const descCs = desc ? window.getComputedStyle(desc) : null;
    const imgCs = img ? window.getComputedStyle(img) : null;
    const ctaCs = cta ? window.getComputedStyle(cta) : null;

    return {
      cardBg: cardCs.backgroundColor,
      descOpacity: descCs ? descCs.opacity : null,
      descTransform: descCs ? descCs.transform : null,
      imgTransform: imgCs ? imgCs.transform : null,
      imgClipPath: imgCs ? imgCs.clipPath : null,
      ctaColor: ctaCs ? ctaCs.color : null,
    };
  });
  console.log('Hover Stats Card 1:', JSON.stringify(hoverStats, null, 2));

  await pillarsSection.screenshot({
    path: path.join(artifactDir, 'category_cards_desktop_hover.png')
  });
  console.log('Captured category_cards_desktop_hover.png');

  // Test Tablet 768
  console.log('--- 3. Testing Tablet 768 ---');
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.evaluate(() => {
    const el = document.querySelector('#pillars');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(600);

  const tabletStats = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#pillars .group'));
    return cards.map(c => {
      const h3 = c.querySelector('h3');
      const cs = h3 ? window.getComputedStyle(h3) : null;
      return {
        title: h3 ? h3.innerText.replace(/\n/g, ' ') : '',
        fontSize: cs ? cs.fontSize : null,
        fontWeight: cs ? cs.fontWeight : null,
        cardHeight: Math.round(c.getBoundingClientRect().height),
      };
    });
  });
  console.log('Tablet 768 Stats:', JSON.stringify(tabletStats, null, 2));

  await pillarsSection.screenshot({
    path: path.join(artifactDir, 'category_cards_tablet_768.png')
  });
  console.log('Captured category_cards_tablet_768.png');

  // Test Mobile 390
  console.log('--- 4. Testing Mobile 390 ---');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => {
    const el = document.querySelector('#pillars');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await page.waitForTimeout(600);

  const mobileStats = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('#pillars .group'));
    return cards.map(c => {
      const h3 = c.querySelector('h3');
      const cs = h3 ? window.getComputedStyle(h3) : null;
      return {
        title: h3 ? h3.innerText.replace(/\n/g, ' ') : '',
        fontSize: cs ? cs.fontSize : null,
        fontWeight: cs ? cs.fontWeight : null,
        cardHeight: Math.round(c.getBoundingClientRect().height),
      };
    });
  });
  console.log('Mobile 390 Stats:', JSON.stringify(mobileStats, null, 2));

  await pillarsSection.screenshot({
    path: path.join(artifactDir, 'category_cards_mobile_390.png')
  });
  console.log('Captured category_cards_mobile_390.png');

  await browser.close();
  console.log('--- Verification Complete! ---');
}

verify().catch(console.error);
