const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const ARTIFACTS_DIR = 'C:\\Users\\jaiav\\.gemini\\antigravity\\brain\\8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function runAIConsultingVisualizationsVerification() {
  console.log('=== STARTING AI CONSULTING ANIMATED SERVICE VISUALIZATIONS VERIFICATION ===\n');
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

    // 1. Navigate to AI Consulting Page
    console.log('--- TEST 1: HERO & CONSULTING PATHWAY ---');
    await page.goto('http://127.0.0.1:4175/aiconsulting.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    const title = await page.title();
    assert(title.includes('AI Consulting & Implementation'), `Title contains AI Consulting & Implementation (Found: "${title}")`);

    const heroPathway = page.locator('div:has-text("Four-Stage Advisory Pathway")').first();
    assert(await heroPathway.isVisible(), 'Hero Four-Stage Advisory Pathway is visible');

    // Check the 4 stages
    const pathwayNodes = heroPathway.locator('a[href^="#ai-"]');
    assert((await pathwayNodes.count()) === 4, 'Found 4 connected pathway stages');

    const node1 = await pathwayNodes.nth(0).innerText();
    const node2 = await pathwayNodes.nth(1).innerText();
    const node3 = await pathwayNodes.nth(2).innerText();
    const node4 = await pathwayNodes.nth(3).innerText();

    assert(node1.includes('Assessment'), 'Pathway Stage 1: Assessment present');
    assert(node2.includes('Implementation'), 'Pathway Stage 2: Implementation present');
    assert(node3.includes('Integrations'), 'Pathway Stage 3: Integrations present');
    assert(node4.includes('Training'), 'Pathway Stage 4: Training present');

    const heroScreenshot = path.join(ARTIFACTS_DIR, 'ai_consulting_hero_pathway.png');
    await heroPathway.screenshot({ path: heroScreenshot });
    console.log(`Saved screenshot: ${heroScreenshot}`);

    // 2. Service 01: AI Assessment & Strategy (Vertical Assessment Pathway)
    console.log('\n--- TEST 2: SERVICE 01 - VERTICAL ASSESSMENT PATHWAY ---');
    const s1Section = page.locator('#ai-assessment-strategy');
    await s1Section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const s1Title = await s1Section.locator('h2').innerText();
    assert(s1Title === 'AI Assessment & Strategy', `Service 01 title matches approved copy (Found: "${s1Title}")`);

    // Verify 5-step vertical pathway
    const s1Steps = s1Section.locator('.space-y-6 > div.relative.flex');
    const s1StepCount = await s1Steps.count();
    assert(s1StepCount === 5, `Found exactly 5 vertical pathway steps (Found: ${s1StepCount})`);

    const s1Step1 = await s1Steps.nth(0).innerText();
    const s1Step5 = await s1Steps.nth(4).innerText();
    assert(s1Step1.includes('Assessment of existing business processes'), 'Step 1 approved bullet verified');
    assert(s1Step5.includes('Development of a practical AI adoption roadmap'), 'Step 5 approved bullet verified');

    const s1Outcome = await s1Section.locator('text=A clear, actionable roadmap for adopting AI').innerText();
    assert(s1Outcome.length > 0, 'Service 01 outcome statement verified');

    const s1Screenshot = path.join(ARTIFACTS_DIR, 'ai_consulting_service1_vertical_pathway.png');
    await s1Section.screenshot({ path: s1Screenshot });
    console.log(`Saved screenshot: ${s1Screenshot}`);

    // 3. Service 02: AI Implementation & Integration (Connected Workflow)
    console.log('\n--- TEST 3: SERVICE 02 - CONNECTED IMPLEMENTATION WORKFLOW ---');
    const s2Section = page.locator('#ai-implementation-integration');
    await s2Section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const s2Title = await s2Section.locator('h2').innerText();
    assert(s2Title === 'AI Implementation & Integration', `Service 02 title matches approved copy (Found: "${s2Title}")`);

    const s2Phases = s2Section.locator('div.grid > div:has-text("Phase")');
    const s2PhaseCount = await s2Phases.count();
    assert(s2PhaseCount === 6, `Found all 6 approved implementation activities as sequential phases (Found: ${s2PhaseCount})`);

    const s2Phase1 = await s2Phases.nth(0).innerText();
    const s2Phase6 = await s2Phases.nth(5).innerText();
    assert(s2Phase1.includes('Implementation of AI-powered business solutions'), 'Phase 1 approved bullet verified');
    assert(s2Phase6.includes('Guidance on responsible AI adoption'), 'Phase 6 approved bullet verified');

    const s2Outcome = await s2Section.locator('text=Practical AI solutions designed to support your teams').innerText();
    assert(s2Outcome.length > 0, 'Service 02 outcome statement verified');

    const s2Screenshot = path.join(ARTIFACTS_DIR, 'ai_consulting_service2_connected_workflow.png');
    await s2Section.screenshot({ path: s2Screenshot });
    console.log(`Saved screenshot: ${s2Screenshot}`);

    // 4. Service 03: AI Integrations & Plugin Implementation (Network Diagram)
    console.log('\n--- TEST 4: SERVICE 03 - AI INTEGRATION NETWORK DIAGRAM ---');
    const s3Section = page.locator('#ai-integrations-plugin-implementation');
    await s3Section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const s3Title = await s3Section.locator('h2').innerText();
    assert(s3Title === 'AI Integrations & Plugin Implementation', `Service 03 title matches approved copy (Found: "${s3Title}")`);

    // Verify Central Hub
    const centralHub = s3Section.locator('div:has-text("AI Assistant")').first();
    assert(await centralHub.isVisible(), 'Central AI Assistant hub node visible');

    // Verify Outward Branching Connectors
    const networkSvg = s3Section.locator('svg.max-w-md');
    assert(await networkSvg.isVisible(), 'Branching SVG connectors visible');

    // Verify 4 Connected Groups
    const s3Body = await s3Section.innerText();
    assert(s3Body.includes('Tools and systems'), 'Group 1: Tools and systems verified');
    assert(s3Body.includes('Knowledge sources'), 'Group 2: Knowledge sources verified');
    assert(s3Body.includes('AI-powered workflows'), 'Group 3: AI-powered workflows verified');
    assert(s3Body.includes('Research & Documentation'), 'Group 4: Research & Documentation verified');

    // Verify Compatibility Note
    assert(s3Body.includes('subject to platform support and compatibility'), 'Platform support & compatibility scope note verified');

    const s3Screenshot = path.join(ARTIFACTS_DIR, 'ai_consulting_service3_network_diagram.png');
    await s3Section.screenshot({ path: s3Screenshot });
    console.log(`Saved screenshot: ${s3Screenshot}`);

    // 5. Service 04: AI Training & Professional Courses (Editorial Learning Pathway)
    console.log('\n--- TEST 5: SERVICE 04 - EDITORIAL LEARNING PATHWAY ---');
    const s4Section = page.locator('#ai-training-professional-courses');
    await s4Section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);

    const s4Title = await s4Section.locator('h2').innerText();
    assert(s4Title === 'AI Training & Professional Courses', `Service 04 title matches approved copy (Found: "${s4Title}")`);

    // Verify 7 Modular Course Milestones
    const s4Modules = s4Section.locator('.space-y-4 > div');
    const s4ModuleCount = await s4Modules.count();
    assert(s4ModuleCount === 7, `Found exactly 7 modular course milestones (Found: ${s4ModuleCount})`);

    const s4Body = await s4Section.innerText();
    assert(s4Body.includes('AI tools and platforms and their capabilities'), 'Topic 1 approved bullet verified');
    assert(s4Body.includes('Effective prompting techniques and context management'), 'Topic 2 approved bullet verified');
    assert(s4Body.includes('research, analysis, writing, and documentation'), 'Topic 3 approved bullet verified');
    assert(s4Body.includes('Working with files and structured information'), 'Topic 4 approved bullet verified');
    assert(s4Body.includes('repeatable AI-assisted workflows'), 'Topic 5 approved bullet verified');
    assert(s4Body.includes('advanced AI capabilities, tools, and integrations'), 'Topic 6 approved bullet verified');
    assert(s4Body.includes('AI limitations, verification, and responsible use'), 'Topic 7 approved bullet verified');

    // Tailoring note
    assert(s4Body.includes('Training can be tailored to different experience levels'), 'Tailoring note verified');

    const s4Screenshot = path.join(ARTIFACTS_DIR, 'ai_consulting_service4_learning_pathway.png');
    await s4Section.screenshot({ path: s4Screenshot });
    console.log(`Saved screenshot: ${s4Screenshot}`);

    // 6. Mobile Viewport Check (390x844)
    console.log('\n--- TEST 6: MOBILE RESPONSIVE CHECK (390x844) ---');
    const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await mobilePage.goto('http://127.0.0.1:4175/aiconsulting.html', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(500);

    const hasHorizontalOverflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    assert(!hasHorizontalOverflow, 'Zero horizontal overflow on mobile');

    const mobileScreenshot = path.join(ARTIFACTS_DIR, 'ai_consulting_mobile_overview.png');
    await mobilePage.screenshot({ path: mobileScreenshot });
    console.log(`Saved screenshot: ${mobileScreenshot}`);

    // 7. Console Error Audit
    console.log('\n--- TEST 7: CONSOLE ERROR AUDIT ---');
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

  console.log(`\n=== AI CONSULTING VISUALIZATIONS VERIFICATION COMPLETE: ${passCount} PASSED, ${failCount} FAILED ===`);
  if (failCount > 0) {
    process.exit(1);
  }
}

runAIConsultingVisualizationsVerification();
