const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const ARTIFACTS_DIR = 'C:\\Users\\jaiav\\.gemini\\antigravity\\brain\\8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function runPrincipleArrowsVerification() {
  console.log('=== STARTING PRINCIPLE BAND CONNECTOR ARROWS VERIFICATION ===\n');
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  let passCount = 0;
  let failCount = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passCount++;
    } else {
      console.error(`[FAIL] ${message}`);
      failCount++;
    }
  }

  try {
    // ----------------------------------------------------
    // TEST 1: DESKTOP (1440x900)
    // ----------------------------------------------------
    console.log('--- TEST 1: DESKTOP VIEWPORT (1440x900) ---');
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('http://127.0.0.1:4175/alphalens.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    const principleSection = page.locator('section:has-text("CORE OPERATING PRINCIPLE")');
    await principleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);

    // Get the 3 process cards
    const cards = principleSection.locator('div.flex-1');
    const cardCount = await cards.count();
    assert(cardCount === 3, `Found exactly 3 process cards (Found: ${cardCount})`);

    // Get the desktop horizontal connector containers
    const desktopConnectors = principleSection.locator('div.hidden.md\\:flex');
    const connectorCount = await desktopConnectors.count();
    assert(connectorCount === 2, `Found exactly 2 desktop connector containers (Found: ${connectorCount})`);

    // Measure bounding boxes
    const card1Box = await cards.nth(0).boundingBox();
    const conn1Box = await desktopConnectors.nth(0).boundingBox();
    const card2Box = await cards.nth(1).boundingBox();
    const conn2Box = await desktopConnectors.nth(1).boundingBox();
    const card3Box = await cards.nth(2).boundingBox();

    console.log(`Card 1 X: ${card1Box.x.toFixed(1)} to ${(card1Box.x + card1Box.width).toFixed(1)}, width: ${card1Box.width.toFixed(1)}`);
    console.log(`Conn 1 X: ${conn1Box.x.toFixed(1)} to ${(conn1Box.x + conn1Box.width).toFixed(1)}, width: ${conn1Box.width.toFixed(1)}`);
    console.log(`Card 2 X: ${card2Box.x.toFixed(1)} to ${(card2Box.x + card2Box.width).toFixed(1)}, width: ${card2Box.width.toFixed(1)}`);
    console.log(`Conn 2 X: ${conn2Box.x.toFixed(1)} to ${(conn2Box.x + conn2Box.width).toFixed(1)}, width: ${conn2Box.width.toFixed(1)}`);
    console.log(`Card 3 X: ${card3Box.x.toFixed(1)} to ${(card3Box.x + card3Box.width).toFixed(1)}, width: ${card3Box.width.toFixed(1)}`);

    // Verification: Card 1 right <= Conn 1 left
    assert(
      card1Box.x + card1Box.width <= conn1Box.x + 0.5,
      `Connector 1 is to the right of Card 1 (No overlap on Card 1: Card 1 right=${(card1Box.x + card1Box.width).toFixed(1)}, Conn 1 left=${conn1Box.x.toFixed(1)})`
    );

    // Verification: Conn 1 right <= Card 2 left
    assert(
      conn1Box.x + conn1Box.width <= card2Box.x + 0.5,
      `Connector 1 is to the left of Card 2 (No overlap on Card 2: Conn 1 right=${(conn1Box.x + conn1Box.width).toFixed(1)}, Card 2 left=${card2Box.x.toFixed(1)})`
    );

    // Verification: Card 2 right <= Conn 2 left
    assert(
      card2Box.x + card2Box.width <= conn2Box.x + 0.5,
      `Connector 2 is to the right of Card 2 (No overlap on Card 2: Card 2 right=${(card2Box.x + card2Box.width).toFixed(1)}, Conn 2 left=${conn2Box.x.toFixed(1)})`
    );

    // Verification: Conn 2 right <= Card 3 left
    assert(
      conn2Box.x + conn2Box.width <= card3Box.x + 0.5,
      `Connector 2 is to the left of Card 3 (No overlap on Card 3: Conn 2 right=${(conn2Box.x + conn2Box.width).toFixed(1)}, Card 3 left=${card3Box.x.toFixed(1)})`
    );

    // Verification: Card widths equal
    const widthDiff12 = Math.abs(card1Box.width - card2Box.width);
    const widthDiff23 = Math.abs(card2Box.width - card3Box.width);
    assert(widthDiff12 < 1.0 && widthDiff23 < 1.0, `All three cards have identical widths (~${card1Box.width.toFixed(1)}px)`);

    // Verification: Vertical alignment of both connectors
    const conn1CenterY = conn1Box.y + conn1Box.height / 2;
    const conn2CenterY = conn2Box.y + conn2Box.height / 2;
    console.log(`Conn 1 Center Y: ${conn1CenterY.toFixed(1)}, Conn 2 Center Y: ${conn2CenterY.toFixed(1)}`);
    assert(
      Math.abs(conn1CenterY - conn2CenterY) < 1.0,
      `Both connectors are vertically aligned with identical Y-center (diff: ${Math.abs(conn1CenterY - conn2CenterY).toFixed(2)}px)`
    );

    // Screenshot at 1440
    const screenshot1440 = path.join(ARTIFACTS_DIR, 'alphalens_principle_arrows_desktop_1440.png');
    await principleSection.screenshot({ path: screenshot1440 });
    console.log(`Saved screenshot: ${screenshot1440}`);

    // ----------------------------------------------------
    // TEST 2: LAPTOP / TABLET LANDSCAPE (1024x768)
    // ----------------------------------------------------
    console.log('\n--- TEST 2: LAPTOP VIEWPORT (1024x768) ---');
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(400);

    const c1Box1024 = await cards.nth(0).boundingBox();
    const cn1Box1024 = await desktopConnectors.nth(0).boundingBox();
    const c2Box1024 = await cards.nth(1).boundingBox();
    const cn2Box1024 = await desktopConnectors.nth(1).boundingBox();
    const c3Box1024 = await cards.nth(2).boundingBox();

    assert(
      c1Box1024.x + c1Box1024.width <= cn1Box1024.x + 0.5 &&
      cn1Box1024.x + cn1Box1024.width <= c2Box1024.x + 0.5,
      'At 1024px: Connector 1 stays completely within gap between Card 1 and Card 2'
    );
    assert(
      c2Box1024.x + c2Box1024.width <= cn2Box1024.x + 0.5 &&
      cn2Box1024.x + cn2Box1024.width <= c3Box1024.x + 0.5,
      'At 1024px: Connector 2 stays completely within gap between Card 2 and Card 3'
    );

    const screenshot1024 = path.join(ARTIFACTS_DIR, 'alphalens_principle_arrows_desktop_1024.png');
    await principleSection.screenshot({ path: screenshot1024 });
    console.log(`Saved screenshot: ${screenshot1024}`);

    // ----------------------------------------------------
    // TEST 3: MOBILE VIEWPORT (390x844)
    // ----------------------------------------------------
    console.log('\n--- TEST 3: MOBILE VIEWPORT (390x844) ---');
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(400);

    // Desktop horizontal connectors must be hidden
    const isDesktopConn1Visible = await desktopConnectors.nth(0).isVisible();
    assert(!isDesktopConn1Visible, 'Desktop horizontal connectors are hidden on mobile');

    // Mobile downward connectors must be visible
    const mobileConnectors = principleSection.locator('div.flex.md\\:hidden');
    assert((await mobileConnectors.count()) === 2, 'Found 2 mobile downward connectors');
    assert(await mobileConnectors.nth(0).isVisible(), 'Mobile downward connector 1 is visible');
    assert(await mobileConnectors.nth(1).isVisible(), 'Mobile downward connector 2 is visible');

    // Check no horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    assert(!hasHorizontalOverflow, 'Zero horizontal overflow on mobile');

    const screenshot390 = path.join(ARTIFACTS_DIR, 'alphalens_principle_arrows_mobile_390.png');
    await principleSection.screenshot({ path: screenshot390 });
    console.log(`Saved screenshot: ${screenshot390}`);

    // ----------------------------------------------------
    // TEST 4: CONSOLE ERRORS
    // ----------------------------------------------------
    console.log('\n--- TEST 4: CONSOLE ERRORS ---');
    assert(consoleErrors.length === 0, `0 console errors detected (Found: ${consoleErrors.length})`);
    if (consoleErrors.length > 0) {
      console.error('Console errors:', consoleErrors);
    }

    await browser.close();
  } catch (err) {
    console.error('Test execution error:', err);
    failCount++;
    try { await browser.close(); } catch (_) {}
  }

  console.log(`\n=== PRINCIPLE BAND CONNECTOR ARROWS VERIFICATION COMPLETE: ${passCount} PASSED, ${failCount} FAILED ===`);
  if (failCount > 0) {
    process.exit(1);
  }
}

runPrincipleArrowsVerification();
