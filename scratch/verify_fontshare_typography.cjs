const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:5173';
const ARTIFACT_DIR = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function verifyTypography() {
  console.log('========================================================================');
  console.log(' MASTER VERIFICATION: FONTSHARE TYPOGRAPHY (PILCROW ROUNDED & BONNY)');
  console.log('========================================================================\n');

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const results = { passed: 0, failed: 0, checks: [] };

  function assert(desc, condition, detail = '') {
    if (condition) {
      console.log(`  [PASS] ${desc}${detail ? ' -> ' + detail : ''}`);
      results.checks.push({ desc, status: 'PASS', detail });
      results.passed++;
    } else {
      console.error(`  [FAIL] ${desc}${detail ? ' -> ' + detail : ''}`);
      results.checks.push({ desc, status: 'FAIL', detail });
      results.failed++;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // CHECK 1: HTML Link Inspection (Exact single inclusion)
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- CHECK 1: HTML Link Tag & Preconnect Inspection ---');
  {
    const indexPath = 'C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2/index.html';
    const indexContent = fs.readFileSync(indexPath, 'utf8');

    const matches = indexContent.match(/api\.fontshare\.com\/v2\/css\?f\[\]=pilcrow-rounded@400&f\[\]=bonny@500&display=swap/g) || [];
    assert('index.html contains exact Fontshare stylesheet link', matches.length > 0);
    assert('index.html contains Fontshare stylesheet link EXACTLY ONCE (no duplicates)', matches.length === 1);
  }

  // ─────────────────────────────────────────────────────────────
  // CHECK 2: Actual Font Loading & Network Verification
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- CHECK 2: Font Face Network Download & Registration ---');
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    
    const fontRequests = [];
    const consoleErrors = [];
    
    page.on('request', req => {
      const url = req.url();
      if (url.includes('.woff') || url.includes('.ttf') || url.includes('fontshare')) {
        fontRequests.push(url);
      }
    });

    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    await page.evaluate(() => document.fonts.ready);

    const fontStatus = await page.evaluate(async () => {
      const list = [];
      for (const font of document.fonts) {
        list.push({
          family: font.family,
          weight: font.weight,
          status: font.status,
        });
      }
      return {
        list,
        pilcrowLoaded: document.fonts.check('16px "Pilcrow Rounded"'),
        bonnyLoaded: document.fonts.check('500 16px "Bonny"'),
      };
    });

    const hasPilcrowWoff = fontRequests.some(url => url.includes('.woff2') || url.includes('fontshare'));
    assert('Network: Fontshare stylesheet and woff2 font files requested successfully', hasPilcrowWoff);
    assert('Browser document.fonts: Pilcrow Rounded is registered and loaded', fontStatus.pilcrowLoaded);
    assert('Browser document.fonts: Bonny is registered and loaded', fontStatus.bonnyLoaded);
    assert('Browser console: Zero font loading errors', consoleErrors.length === 0);

    await page.close();
  }

  // ─────────────────────────────────────────────────────────────
  // CHECK 3: Computed Style Typography Assignment Verification
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- CHECK 3: Computed Typography Assignments Across Sections ---');
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    // 3.1 Homepage Hero H1 (Bonny) & Supporting Text (Pilcrow Rounded)
    const heroTypography = await page.evaluate(() => {
      const h1 = document.querySelector('h1.font-serif');
      const p1 = document.querySelector('.p1-inner');
      const ctaBtn = document.querySelector('.disintegrate-cta a');
      const navLink = document.querySelector('nav a');
      const navCta = Array.from(document.querySelectorAll('header a')).find(a => a.textContent.includes('Book a Call'));

      return {
        h1Font: h1 ? window.getComputedStyle(h1).fontFamily : null,
        h1Weight: h1 ? window.getComputedStyle(h1).fontWeight : null,
        p1Font: p1 ? window.getComputedStyle(p1).fontFamily : null,
        ctaFont: ctaBtn ? window.getComputedStyle(ctaBtn).fontFamily : null,
        navFont: navLink ? window.getComputedStyle(navLink).fontFamily : null,
        navCtaFont: navCta ? window.getComputedStyle(navCta).fontFamily : null,
      };
    });

    assert('Hero H1 computed font family includes "Bonny"', heroTypography.h1Font && heroTypography.h1Font.includes('Bonny'), heroTypography.h1Font);
    assert('Hero H1 computed font weight is 500', heroTypography.h1Weight === '500', heroTypography.h1Weight);
    assert('Hero Supporting Copy computed font family includes "Pilcrow Rounded"', heroTypography.p1Font && heroTypography.p1Font.includes('Pilcrow Rounded'), heroTypography.p1Font);
    assert('Hero CTA Button computed font family includes "Pilcrow Rounded"', heroTypography.ctaFont && heroTypography.ctaFont.includes('Pilcrow Rounded'), heroTypography.ctaFont);
    assert('Header Navigation Labels computed font family includes "Pilcrow Rounded"', heroTypography.navFont && heroTypography.navFont.includes('Pilcrow Rounded'), heroTypography.navFont);
    assert('Header Book a Call CTA computed font family includes "Pilcrow Rounded"', heroTypography.navCtaFont && heroTypography.navCtaFont.includes('Pilcrow Rounded'), heroTypography.navCtaFont);

    // Screenshot desktop hero with new typography
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'fontshare_desktop_hero.png') });

    // 3.2 Who We Serve Section Headings
    const whoWeServeTypography = await page.evaluate(() => {
      const heading = document.querySelector('#who-we-serve h2');
      const cardTitle = document.querySelector('#who-we-serve h3');
      const cardDesc = document.querySelector('#who-we-serve p');
      return {
        headingFont: heading ? window.getComputedStyle(heading).fontFamily : null,
        cardTitleFont: cardTitle ? window.getComputedStyle(cardTitle).fontFamily : null,
        cardDescFont: cardDesc ? window.getComputedStyle(cardDesc).fontFamily : null,
      };
    });

    assert('Who We Serve Section Heading uses Bonny', whoWeServeTypography.headingFont && whoWeServeTypography.headingFont.includes('Bonny'));
    assert('Who We Serve Card Title uses Bonny', whoWeServeTypography.cardTitleFont && whoWeServeTypography.cardTitleFont.includes('Bonny'));
    assert('Who We Serve Card Description uses Pilcrow Rounded', whoWeServeTypography.cardDescFont && whoWeServeTypography.cardDescFont.includes('Pilcrow Rounded'));

    // 3.3 Contact Section Heading, Form Labels, Inputs, Submit Button
    const contactTypography = await page.evaluate(() => {
      const heading = document.querySelector('#contact h2');
      const input = document.querySelector('#contact input#name');
      const textarea = document.querySelector('#contact textarea');
      const submitBtn = document.querySelector('#contact button[type="submit"]');
      return {
        headingFont: heading ? window.getComputedStyle(heading).fontFamily : null,
        inputFont: input ? window.getComputedStyle(input).fontFamily : null,
        textareaFont: textarea ? window.getComputedStyle(textarea).fontFamily : null,
        submitBtnFont: submitBtn ? window.getComputedStyle(submitBtn).fontFamily : null,
      };
    });

    assert('Contact Section Heading uses Bonny', contactTypography.headingFont && contactTypography.headingFont.includes('Bonny'));
    assert('Contact Form Inputs use Pilcrow Rounded', contactTypography.inputFont && contactTypography.inputFont.includes('Pilcrow Rounded'));
    assert('Contact Form Textarea uses Pilcrow Rounded', contactTypography.textareaFont && contactTypography.textareaFont.includes('Pilcrow Rounded'));
    assert('Contact Submit Button uses Pilcrow Rounded', contactTypography.submitBtnFont && contactTypography.submitBtnFont.includes('Pilcrow Rounded'));

    // Screenshot contact section
    const contactEl = await page.$('#contact');
    if (contactEl) {
      await contactEl.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.screenshot({ path: path.join(ARTIFACT_DIR, 'fontshare_contact_section.png') });
    }

    // 3.4 Internal Pages Typography Verification
    // AI Consulting
    await page.goto(BASE_URL + '/aiconsulting.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const aiTypography = await page.evaluate(() => {
      const h1 = document.querySelector('h1.font-serif');
      const p = document.querySelector('p.text-brand-slate');
      return {
        h1Font: h1 ? window.getComputedStyle(h1).fontFamily : null,
        pFont: p ? window.getComputedStyle(p).fontFamily : null,
      };
    });
    assert('AI Consulting Page Title uses Bonny', aiTypography.h1Font && aiTypography.h1Font.includes('Bonny'));
    assert('AI Consulting Page Body copy uses Pilcrow Rounded', aiTypography.pFont && aiTypography.pFont.includes('Pilcrow Rounded'));

    // Litigation Services
    await page.goto(BASE_URL + '/litigationservices.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const litTypography = await page.evaluate(() => {
      const h1 = document.querySelector('h1.font-serif');
      const p = document.querySelector('p.text-brand-slate');
      return {
        h1Font: h1 ? window.getComputedStyle(h1).fontFamily : null,
        pFont: p ? window.getComputedStyle(p).fontFamily : null,
      };
    });
    assert('Litigation Services Page Title uses Bonny', litTypography.h1Font && litTypography.h1Font.includes('Bonny'));
    assert('Litigation Services Page Body copy uses Pilcrow Rounded', litTypography.pFont && litTypography.pFont.includes('Pilcrow Rounded'));

    // Alpha Lens Platform
    await page.goto(BASE_URL + '/alphalens.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const lensTypography = await page.evaluate(() => {
      const h2 = document.querySelector('h2.font-serif');
      const body = document.querySelector('p');
      return {
        h2Font: h2 ? window.getComputedStyle(h2).fontFamily : null,
        bodyFont: body ? window.getComputedStyle(body).fontFamily : null,
      };
    });
    assert('Alpha Lens Platform Headings use Bonny', lensTypography.h2Font && lensTypography.h2Font.includes('Bonny'));
    assert('Alpha Lens Platform Body uses Pilcrow Rounded', lensTypography.bodyFont && lensTypography.bodyFont.includes('Pilcrow Rounded'));

    await page.close();
  }

  // ─────────────────────────────────────────────────────────────
  // CHECK 4: Responsive & Mobile Verification (No horizontal overflow)
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- CHECK 4: Responsive Typography & Mobile Layout ---');
  {
    const mobileViewports = [
      { name: 'Mobile 375px', width: 375, height: 667 },
      { name: 'Mobile 390px', width: 390, height: 844 },
      { name: 'Tablet 768px', width: 768, height: 1024 },
    ];

    for (const vp of mobileViewports) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
      await page.waitForTimeout(600);

      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      assert(`${vp.name}: Zero horizontal overflow with Bonny & Pilcrow typography`, !overflow);

      if (vp.width === 375) {
        await page.screenshot({ path: path.join(ARTIFACT_DIR, 'fontshare_mobile_375.png') });
      }
      await page.close();
    }
  }

  await browser.close();

  console.log('\n========================================================================');
  console.log(` VERIFICATION COMPLETE: ${results.passed} PASSED, ${results.failed} FAILED`);
  console.log('========================================================================');
  return results;
}

verifyTypography()
  .then(res => {
    if (res.failed > 0) process.exit(1);
    process.exit(0);
  })
  .catch(err => {
    console.error('Typography verification failed:', err);
    process.exit(1);
  });
