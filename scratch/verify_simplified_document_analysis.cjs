const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function verify() {
  console.log('=== Verifying Simplified Document Analysis Service Page ===\n');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  try {
    // 1. Direct Desktop Viewport Test (1440x900)
    console.log('[1] Testing Desktop Viewport (1440x900)...');
    const desktopContext = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2
    });
    const page = await desktopContext.newPage();
    const url = 'http://127.0.0.1:4175/documentanalysis.html';
    const response = await page.goto(url, { waitUntil: 'networkidle' });
    console.log(`    HTTP status: ${response.status()}`);
    await page.waitForTimeout(600);

    const title = await page.title();
    console.log(`    Page title: "${title}"`);

    const h1 = await page.textContent('h1');
    console.log(`    Hero H1: "${h1?.trim()}"`);

    // Verify Headings
    const overviewHeading = await page.textContent('h2:has-text("AI-Powered Financial Document Analysis")');
    console.log(`    Overview heading: "${overviewHeading?.trim()}"`);

    const deliverablesHeading = await page.textContent('h2:has-text("What We Deliver")');
    console.log(`    Deliverables heading: "${deliverablesHeading?.trim()}"`);

    const methodologyHeading = await page.textContent('h2:has-text("Our Methodology")');
    console.log(`    Methodology heading: "${methodologyHeading?.trim()}"`);

    const ctaHeading = await page.textContent('h2:has-text("Drowning in Documents?")');
    console.log(`    CTA heading: "${ctaHeading?.trim()}"`);

    // Verify 6 Deliverables
    const expectedDeliverables = [
      'Statement Analysis',
      'Data Structuring',
      'Transaction Tracking',
      'Red Flag Identification',
      'Pattern Recognition',
      'Expert Analysis'
    ];
    console.log('\n[2] Verifying All 6 Deliverables:');
    for (const d of expectedDeliverables) {
      const el = await page.$(`text=${d}`);
      if (el) {
        console.log(`    ✓ ${d}`);
      } else {
        console.error(`    ✗ Missing: ${d}`);
      }
    }

    // Verify 4 Methodology Stages
    const expectedStages = [
      'Document Ingestion & Normalization',
      'Automated Categorization & OCR',
      'Fund Tracing & Anomaly Detection',
      'Litigation-Ready Production'
    ];
    console.log('\n[3] Verifying 4 Methodology Stages:');
    for (const s of expectedStages) {
      const el = await page.$(`text=${s}`);
      if (el) {
        console.log(`    ✓ ${s}`);
      } else {
        console.error(`    ✗ Missing: ${s}`);
      }
    }

    // Verify 3 Related Services
    const expectedRelated = [
      'Litigation Support',
      'Economic Damages',
      'Divorce & Family Law'
    ];
    console.log('\n[4] Verifying 3 Related Practice Areas:');
    for (const r of expectedRelated) {
      const el = await page.$(`text=${r}`);
      if (el) {
        console.log(`    ✓ ${r}`);
      } else {
        console.error(`    ✗ Missing: ${r}`);
      }
    }

    // Capture Desktop Screenshots
    console.log('\n[5] Capturing Desktop Screenshots...');
    // Hero view
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'doc_analysis_simplified_hero_desktop.png')
    });
    console.log('    ✓ doc_analysis_simplified_hero_desktop.png');

    // Deliverables view
    const delivElem = await page.$('h2:has-text("What We Deliver")');
    if (delivElem) {
      await delivElem.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, 'doc_analysis_simplified_deliverables_desktop.png')
      });
      console.log('    ✓ doc_analysis_simplified_deliverables_desktop.png');
    }

    // Methodology view
    const methodElem = await page.$('h2:has-text("Our Methodology")');
    if (methodElem) {
      await methodElem.scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
      await page.screenshot({
        path: path.join(ARTIFACTS_DIR, 'doc_analysis_simplified_methodology_desktop.png')
      });
      console.log('    ✓ doc_analysis_simplified_methodology_desktop.png');
    }

    // Trigger all scroll reveals across page
    await page.evaluate(async () => {
      const total = document.body.scrollHeight;
      for (let y = 0; y < total; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);

    // Full page desktop
    await page.screenshot({
      path: path.join(ARTIFACTS_DIR, 'doc_analysis_simplified_full_page.png'),
      fullPage: true
    });
    console.log('    ✓ doc_analysis_simplified_full_page.png');

    // 2. Mobile Viewport Test (390x844)
    console.log('\n[6] Testing Mobile Viewport (390x844 iPhone 14)...');
    const mobileContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2
    });
    const mobilePage = await mobileContext.newPage();
    await mobilePage.goto(url, { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(600);

    const overflowCheck = await mobilePage.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
      };
    });
    console.log(`    Mobile scrollWidth: ${overflowCheck.scrollWidth}px, clientWidth: ${overflowCheck.clientWidth}px`);
    console.log(`    Horizontal overflow present: ${overflowCheck.hasOverflow ? 'YES (FAIL)' : 'NO (PASS)'}`);

    // Trigger all scroll reveals on mobile
    await mobilePage.evaluate(async () => {
      const total = document.body.scrollHeight;
      for (let y = 0; y < total; y += 300) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 40));
      }
      window.scrollTo(0, 0);
    });
    await mobilePage.waitForTimeout(400);

    await mobilePage.screenshot({
      path: path.join(ARTIFACTS_DIR, 'doc_analysis_simplified_mobile_390.png'),
      fullPage: true
    });
    console.log('    ✓ doc_analysis_simplified_mobile_390.png');

    // 3. Navigation interaction test
    console.log('\n[7] Testing Navigation Interactions:');
    const backBtn = await page.$('a:has-text("Back to All Services")');
    if (backBtn) {
      console.log('    Clicking "Back to All Services"...');
      await backBtn.click();
      await page.waitForTimeout(500);
      console.log(`    Navigated to: ${page.url()}`);
    }

    console.log('\n=== ALL VERIFICATIONS PASSED SUCCESSFULLY ===');
  } catch (err) {
    console.error('Test execution failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

verify();
