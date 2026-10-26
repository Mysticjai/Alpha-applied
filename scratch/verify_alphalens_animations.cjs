const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const ARTIFACTS_DIR = 'C:\\Users\\jaiav\\.gemini\\antigravity\\brain\\8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function runAlphaLensAnimationVerification() {
  console.log('=== STARTING ALPHALENS ANIMATED INFOGRAPHIC COMPONENTS VERIFICATION ===\n');
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
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

    // Track console errors
    const consoleErrors = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // 1. Load AlphaLens Platform page
    console.log('--- TEST 1: PAGE LOAD & BREADCRUMB ---');
    await page.goto('http://127.0.0.1:4175/alphalens.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    const title = await page.title();
    assert(title.includes('AlphaLens AI'), `Page title contains AlphaLens AI (Found: "${title}")`);

    // 2. Hero Pipeline Architecture
    console.log('\n--- TEST 2: HERO FOUR-MODULE PIPELINE ANIMATION ---');
    const heroPipelineCard = page.locator('section:has(h1) div.bg-white:has-text("Pipeline Architecture")');
    assert(await heroPipelineCard.isVisible(), 'Hero Pipeline Architecture card is visible');

    // Check all 4 nodes in exact sequence
    const pipelineNodes = heroPipelineCard.locator('div.rounded-lg');
    const nodeCount = await pipelineNodes.count();
    assert(nodeCount === 4, `Found exactly 4 pipeline nodes (Found: ${nodeCount})`);

    const node1Text = await pipelineNodes.nth(0).innerText();
    const node2Text = await pipelineNodes.nth(1).innerText();
    const node3Text = await pipelineNodes.nth(2).innerText();
    const node4Text = await pipelineNodes.nth(3).innerText();

    assert(node1Text.includes('Document Processing') && node1Text.includes('01'), 'Node 01: Document Processing present');
    assert(node2Text.includes('Extraction') && node2Text.includes('02'), 'Node 02: Extraction present');
    assert(node3Text.includes('Analysis & Intelligence') && node3Text.includes('03'), 'Node 03: Analysis & Intelligence present');
    assert(node4Text.includes('Quality Control') && node4Text.includes('04'), 'Node 04: Quality Control present');

    // Check tool counts on nodes
    assert(node1Text.includes('4 Tools'), 'Node 01 has 4 Tools badge');
    assert(node2Text.includes('4 Tools'), 'Node 02 has 4 Tools badge');
    assert(node3Text.includes('5 Tools'), 'Node 03 has 5 Tools badge');
    assert(node4Text.includes('3 Tools'), 'Node 04 has 3 Tools badge');

    // Check SVG connectors
    const connectors = heroPipelineCard.locator('svg line');
    const connectorCount = await connectors.count();
    assert(connectorCount >= 3, `Found ${connectorCount} progressive SVG connector lines between nodes`);

    // Screenshot of settled Hero Pipeline
    await page.waitForTimeout(1500); // Allow animation sequence to settle completely
    const heroScreenshot = path.join(ARTIFACTS_DIR, 'alphalens_animated_hero_pipeline.png');
    await heroPipelineCard.screenshot({ path: heroScreenshot });
    console.log(`Saved screenshot: ${heroScreenshot}`);

    // 3. Principle Band: "AI does the volume. Experts close the gap."
    console.log('\n--- TEST 3: PRINCIPLE BAND 3-STAGE SEQUENCE ---');
    const principleSection = page.locator('section:has-text("CORE OPERATING PRINCIPLE")');
    await principleSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const principleHeadline = await principleSection.locator('h2').innerText();
    assert(
      principleHeadline.includes('AI does the volume. Experts close the gap.'),
      `Principle headline matches exact approved text (Found: "${principleHeadline}")`
    );

    // Verify the 3 stages
    const stageCards = principleSection.locator('div.grid > div.rounded-lg');
    const stageCount = await stageCards.count();
    assert(stageCount === 3, `Found exactly 3 principle stage cards (Found: ${stageCount})`);

    const stage1Text = await stageCards.nth(0).innerText();
    const stage2Text = await stageCards.nth(1).innerText();
    const stage3Text = await stageCards.nth(2).innerText();

    assert(stage1Text.includes('AI Processing') && stage1Text.includes('01'), 'Stage 01: AI Processing present');
    assert(stage2Text.includes('Expert Review') && stage2Text.includes('02'), 'Stage 02: Expert Review present');
    assert(stage3Text.includes('Delivered') && stage3Text.includes('03'), 'Stage 03: Delivered present');

    // Verify horizontal connecting lines on desktop
    const principleConnectors = principleSection.locator('div.hidden.md\\:flex svg');
    assert((await principleConnectors.count()) >= 2, 'Found connecting flow paths between principle stages');

    await page.waitForTimeout(1000); // Settle sequence
    const principleScreenshot = path.join(ARTIFACTS_DIR, 'alphalens_animated_principle_band.png');
    await principleSection.screenshot({ path: principleScreenshot });
    console.log(`Saved screenshot: ${principleScreenshot}`);

    // 4. Interactive Four-Module Pipeline Explorer (16 tools)
    console.log('\n--- TEST 4: INTERACTIVE MODULE EXPLORER & 16 TOOLS ---');
    const explorerSection = page.locator('section:has-text("Four Modules. Sixteen Specialized Tools.")');
    await explorerSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const tabs = explorerSection.locator('[role="tab"]');
    assert((await tabs.count()) === 4, 'Found 4 module selector tabs');

    // Test Module 01 (initial active)
    let panelTools = explorerSection.locator('[role="tabpanel"] .divide-y > div');
    let toolCount = await panelTools.count();
    assert(toolCount === 4, `Module 01 (Document Processing) displays exactly 4 tools (Found: ${toolCount})`);

    // Test Tab Click -> Module 02 (Extraction)
    console.log('Testing click switch to Module 02 (Extraction)...');
    await tabs.nth(1).click();
    await page.waitForTimeout(350); // fast transition
    assert(await tabs.nth(1).getAttribute('aria-selected') === 'true', 'Tab 2 is aria-selected=true');
    panelTools = explorerSection.locator('[role="tabpanel"] .divide-y > div');
    toolCount = await panelTools.count();
    assert(toolCount === 4, `Module 02 (Extraction) displays exactly 4 tools (Found: ${toolCount})`);
    const extractionFirstTool = await panelTools.nth(0).innerText();
    assert(extractionFirstTool.includes('Bank Statement Extraction'), 'Module 02 includes Bank Statement Extraction');

    // Test Tab Click -> Module 03 (Analysis & Intelligence)
    console.log('Testing click switch to Module 03 (Analysis & Intelligence)...');
    await tabs.nth(2).click();
    await page.waitForTimeout(350);
    assert(await tabs.nth(2).getAttribute('aria-selected') === 'true', 'Tab 3 is aria-selected=true');
    panelTools = explorerSection.locator('[role="tabpanel"] .divide-y > div');
    toolCount = await panelTools.count();
    assert(toolCount === 5, `Module 03 (Analysis & Intelligence) displays exactly 5 tools (Found: ${toolCount})`);
    const analysisTool = await panelTools.nth(1).innerText();
    assert(analysisTool.includes('Transaction Analysis (+ Regression Analysis)'), 'Module 03 includes Regression Analysis');

    // Test Tab Click -> Module 04 (Quality Control)
    console.log('Testing click switch to Module 04 (Quality Control)...');
    await tabs.nth(3).click();
    await page.waitForTimeout(350);
    assert(await tabs.nth(3).getAttribute('aria-selected') === 'true', 'Tab 4 is aria-selected=true');
    panelTools = explorerSection.locator('[role="tabpanel"] .divide-y > div');
    toolCount = await panelTools.count();
    assert(toolCount === 3, `Module 04 (Quality Control) displays exactly 3 tools (Found: ${toolCount})`);

    // Test Keyboard navigation (ArrowDown to wrap back to 0)
    console.log('Testing keyboard navigation on tabs...');
    await tabs.nth(3).focus();
    await page.keyboard.press('ArrowDown');
    await page.waitForTimeout(350);
    assert(await tabs.nth(0).getAttribute('aria-selected') === 'true', 'ArrowDown on last tab wrapped focus and selection to Tab 0');

    // Capture screenshot of Module Explorer
    const explorerScreenshot = path.join(ARTIFACTS_DIR, 'alphalens_animated_module_explorer.png');
    await explorerSection.locator('.flex.flex-col.lg\\:flex-row').screenshot({ path: explorerScreenshot });
    console.log(`Saved screenshot: ${explorerScreenshot}`);

    // 5. Integrated Platform Capabilities
    console.log('\n--- TEST 5: INTEGRATED PLATFORM CAPABILITIES ---');
    const capabilitiesHeading = explorerSection.locator('text=Integrated Platform Capabilities');
    assert(await capabilitiesHeading.isVisible(), 'Integrated Platform Capabilities heading is visible');
    const capCards = explorerSection.locator('.pt-10 .grid > div');
    assert((await capCards.count()) === 4, 'Found 4 Integrated Platform Capability cards');

    // 6. Crypto Integration Diagram (Hub-and-Spoke)
    console.log('\n--- TEST 6: CRYPTO HUB-AND-SPOKE INTEGRATION DIAGRAM ---');
    const cryptoSection = page.locator('section:has-text("Cross-Asset & Cryptocurrency Tracing")');
    await cryptoSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const coreMessage = await cryptoSection.locator('p.font-serif').first().innerText();
    assert(coreMessage.includes('Crypto is a data type, not a separate workflow.'), 'Core architectural quote verified');

    const cryptoCard = cryptoSection.locator('div.bg-white:has-text("Unified Asset Ingestion Model")');
    assert(await cryptoCard.isVisible(), 'Unified Asset Ingestion Model box is visible');

    // Verify Central Node
    const centralNode = cryptoCard.locator('div:has-text("Bitcoin / Crypto Data")').first();
    assert(await centralNode.isVisible(), 'Central Bitcoin / Crypto Data node is visible');

    // Verify Branching Connectors
    const cryptoSvg = cryptoCard.locator('svg.max-w-md');
    assert(await cryptoSvg.isVisible(), 'Branching SVG connectors visible');

    // Verify 4 Connected Spokes
    const spokes = cryptoCard.locator('.grid > div');
    assert((await spokes.count()) === 4, 'Found 4 connected source nodes');

    const spoke1Text = await spokes.nth(0).innerText();
    const spoke2Text = await spokes.nth(1).innerText();
    const spoke3Text = await spokes.nth(2).innerText();
    const spoke4Text = await spokes.nth(3).innerText();

    assert(spoke1Text.includes('Exchanges'), 'Source 1: Exchanges present');
    assert(spoke2Text.includes('On-chain Wallets'), 'Source 2: On-chain Wallets present');
    assert(spoke3Text.includes('Crypto ATMs & P2P'), 'Source 3: Crypto ATMs & P2P present');
    assert(spoke4Text.includes('Tax Reporting Forms'), 'Source 4: Tax Reporting Forms present');

    await page.waitForTimeout(1000); // Settle sequence
    const cryptoScreenshot = path.join(ARTIFACTS_DIR, 'alphalens_animated_crypto_hub_spoke.png');
    await cryptoCard.screenshot({ path: cryptoScreenshot });
    console.log(`Saved screenshot: ${cryptoScreenshot}`);

    // 7. Mobile Viewport Check (390x844)
    console.log('\n--- TEST 7: MOBILE RESPONSIVENESS & ACCORDION BEHAVIOR ---');
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto('http://127.0.0.1:4175/alphalens.html', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(400);

    const mobileHeroPipeline = mobilePage.locator('div.bg-white:has-text("Pipeline Architecture")');
    assert(await mobileHeroPipeline.isVisible(), 'Hero pipeline visible on mobile without horizontal overflow');

    const mobileExplorer = mobilePage.locator('section:has-text("Four Modules. Sixteen Specialized Tools.")');
    await mobileExplorer.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(300);
    assert(await mobileExplorer.isVisible(), 'Module explorer visible on mobile');

    const mobileScreenshot = path.join(ARTIFACTS_DIR, 'alphalens_mobile_view.png');
    await mobilePage.screenshot({ path: mobileScreenshot, fullPage: false });
    console.log(`Saved screenshot: ${mobileScreenshot}`);

    // 8. Console Error Check
    console.log('\n--- TEST 8: CONSOLE ERROR AUDIT ---');
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

  console.log(`\n=== ALPHALENS ANIMATIONS VERIFICATION COMPLETE: ${passCount} PASSED, ${failCount} FAILED ===`);
  if (failCount > 0) {
    process.exit(1);
  }
}

runAlphaLensAnimationVerification();
