const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');

const BASE_URL = 'http://localhost:5173';
const ARTIFACTS_DIR = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function verifyCleanup() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  console.log('=== VERIFYING AI CONSULTING FULL-PAGE MICROCOPY CLEANUP ===\n');

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE_URL}/aiconsulting.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const fullText = await page.evaluate(() => document.body.innerText);

  // 1. Text to be REMOVED assertions
  console.log('--- 1. Asserting REMOVAL of marked labels ---');
  const removedChecks = [
    { label: 'PRACTICE DISCIPLINES', pattern: /PRACTICE DISCIPLINES/i },
    { label: 'SELECT A DISCIPLINE TO EXPLORE METHODOLOGY', pattern: /SELECT A DISCIPLINE TO EXPLORE METHODOLOGY/i },
    { label: 'ASSESSMENT METHODOLOGY TIMELINE', pattern: /ASSESSMENT METHODOLOGY TIMELINE/i },
    { label: '5 STRUCTURED MILESTONES', pattern: /5 STRUCTURED MILESTONES/i },
    { label: 'KEY STRATEGIC DELIVERABLE', pattern: /KEY STRATEGIC DELIVERABLE/i },
    { label: 'FOUNDATION ARCHITECTURE', pattern: /FOUNDATION ARCHITECTURE/i },
    { label: 'WORKFLOW ORCHESTRATION', pattern: /WORKFLOW ORCHESTRATION/i },
    { label: 'OVERSIGHT & VERIFICATION', pattern: /OVERSIGHT & VERIFICATION/i },
    { label: 'TECHNICAL ARCHITECTURE SHOWCASE', pattern: /TECHNICAL ARCHITECTURE SHOWCASE/i },
    { label: 'API Connectors', pattern: /API Connectors/i },
    { label: 'Data Repositories', pattern: /Data Repositories/i },
    { label: 'Task Logic', pattern: /Task Logic/i },
    { label: 'Work Product', pattern: /Work Product/i },
    { label: 'Integration Outcome label', pattern: /Integration Outcome/i },
    { label: 'Tailored Delivery Note label', pattern: /Tailored Delivery Note/i },
    { label: 'Educational Outcome label', pattern: /Educational Outcome/i },
    { label: 'EXECUTIVE CURRICULUM SYLLABUS', pattern: /EXECUTIVE CURRICULUM SYLLABUS/i },
    { label: '7 PROFESSIONAL MODULES', pattern: /7 PROFESSIONAL MODULES/i },
    { label: 'Phase 01 · prefix', pattern: /Phase 01 ·/i },
    { label: 'Phase 02 · prefix', pattern: /Phase 02 ·/i },
    { label: 'Phase 03 · prefix', pattern: /Phase 03 ·/i },
    { label: 'Phase 04 · prefix', pattern: /Phase 04 ·/i },
    { label: 'Phase 05 · prefix', pattern: /Phase 05 ·/i },
    { label: 'Module 01 · prefix', pattern: /Module 01 ·/i },
    { label: 'Module 02 · prefix', pattern: /Module 02 ·/i },
    { label: 'Module 03 · prefix', pattern: /Module 03 ·/i },
    { label: 'Module 04 · prefix', pattern: /Module 04 ·/i },
    { label: 'Module 05 · prefix', pattern: /Module 05 ·/i },
    { label: 'Module 06 · prefix', pattern: /Module 06 ·/i },
    { label: 'Module 07 · prefix', pattern: /Module 07 ·/i },
  ];

  for (const check of removedChecks) {
    const present = check.pattern.test(fullText);
    console.log(`  [REMOVE] ${check.label}: ${present ? 'FAILED (Still Present)' : 'PASSED (Removed)'}`);
    if (present) {
      throw new Error(`Expected "${check.label}" to be removed from the page.`);
    }
  }

  // 2. Content to be PRESERVED assertions
  console.log('\n--- 2. Asserting PRESERVATION of required content & headings ---');
  const preservedChecks = [
    { label: 'Practice Discipline card: Assessment & Strategy', text: 'Assessment & Strategy' },
    { label: 'Practice Discipline card: Implementation', text: 'Implementation' },
    { label: 'Practice Discipline card: Integrations & Plugins', text: 'Integrations & Plugins' },
    { label: 'Practice Discipline card: Training & Courses', text: 'Training & Courses' },
    { label: 'Section 1 heading: AI Assessment & Strategy', text: 'AI Assessment & Strategy' },
    { label: 'Timeline title 01: Process & Workflow Audit', text: 'Process & Workflow Audit' },
    { label: 'Timeline title 02: Opportunity & Value Mapping', text: 'Opportunity & Value Mapping' },
    { label: 'Timeline title 03: Technology & Tool Evaluation', text: 'Technology & Tool Evaluation' },
    { label: 'Timeline title 04: Risk & Feasibility Analysis', text: 'Risk & Feasibility Analysis' },
    { label: 'Timeline title 05: Adoption Roadmap Delivery', text: 'Adoption Roadmap Delivery' },
    { label: 'Section 1 deliverable message', text: 'A clear, actionable roadmap for adopting AI with purpose and confidence.' },
    { label: 'Section 2 heading: AI Implementation & Integration', text: 'AI Implementation & Integration' },
    { label: 'Lifecycle title: Three-Stage Implementation Lifecycle', text: 'Three-Stage Implementation Lifecycle' },
    { label: 'Implementation card 1 title: Deployment & Ingestion', text: 'Deployment & Ingestion' },
    { label: 'Implementation card 2 title: Automation & Tailoring', text: 'Automation & Tailoring' },
    { label: 'Implementation card 3 title: Optimization & Governance', text: 'Optimization & Governance' },
    { label: 'Section 3 heading: AI Integrations & Plugin Implementation', text: 'AI Integrations & Plugin Implementation' },
    { label: 'Central hub: AI Assistant', text: 'AI Assistant' },
    { label: 'Domain card 1: Tools and systems', text: 'Tools and systems' },
    { label: 'Domain card 2: Knowledge sources', text: 'Knowledge sources' },
    { label: 'Domain card 3: AI-powered workflows', text: 'AI-powered workflows' },
    { label: 'Domain card 4: Research & Documentation', text: 'Research & Documentation' },
    { label: 'Section 4 heading: AI Training & Professional Courses', text: 'AI Training & Professional Courses' },
    { label: 'Module 01 title: AI Tools & Platform Capabilities', text: 'AI Tools & Platform Capabilities' },
    { label: 'Module 02 title: Prompting & Context Management', text: 'Prompting & Context Management' },
    { label: 'Module 03 title: Research, Analysis & Documentation', text: 'Research, Analysis & Documentation' },
    { label: 'Educational outcome message', text: 'Teams that are better equipped to use AI productively, critically, and responsibly.' },
  ];

  for (const check of preservedChecks) {
    const present = fullText.toLowerCase().includes(check.text.toLowerCase());
    console.log(`  [PRESERVE] ${check.label}: ${present ? 'PASSED (Present)' : 'FAILED (Missing)'}`);
    if (!present) {
      throw new Error(`Expected "${check.label}" to be preserved on the page.`);
    }
  }

  // 3. Regression test: in-page navigation still works perfectly
  console.log('\n--- 3. Regression Test: In-Page Practice Discipline Navigation ---');
  const cards = [
    { id: 'ai-assessment-strategy', label: 'Stage 01' },
    { id: 'ai-implementation-integration', label: 'Stage 02' },
    { id: 'ai-integrations-plugin-implementation', label: 'Stage 03' },
    { id: 'ai-training-professional-courses', label: 'Stage 04' },
  ];

  for (const c of cards) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const cardEl = await page.$(`a[data-target="${c.id}"]`);
    await cardEl.click();
    await page.waitForTimeout(1000);

    const currentUrl = page.url();
    const sectionTop = await page.evaluate((targetId) => {
      const el = document.getElementById(targetId);
      return el ? Math.round(el.getBoundingClientRect().top) : null;
    }, c.id);

    console.log(`  [NAV] ${c.label} -> Top: ${sectionTop}px, URL: ${currentUrl}`);
    if (!currentUrl.includes('/aiconsulting.html') || sectionTop !== 88) {
      throw new Error(`Navigation failed for ${c.label}: top = ${sectionTop}, url = ${currentUrl}`);
    }
  }

  // Capture full page screenshot on Desktop
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(400);
  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'ai_consulting_cleaned_desktop_full.png'),
    fullPage: true,
  });
  console.log('\nSaved fullPage screenshot: ai_consulting_cleaned_desktop_full.png');

  // Tablet Viewport test
  console.log('\n--- 4. Tablet Viewport (768x1024) Capture ---');
  const tabletPage = await browser.newPage({ viewport: { width: 768, height: 1024 } });
  await tabletPage.goto(`${BASE_URL}/aiconsulting.html`, { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(600);
  await tabletPage.screenshot({
    path: path.join(ARTIFACTS_DIR, 'ai_consulting_cleaned_tablet_full.png'),
    fullPage: true,
  });
  console.log('Saved fullPage screenshot: ai_consulting_cleaned_tablet_full.png');
  await tabletPage.close();

  // Mobile Viewport test
  console.log('\n--- 5. Mobile Viewport (390x844) Capture ---');
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await mobilePage.goto(`${BASE_URL}/aiconsulting.html`, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);
  await mobilePage.screenshot({
    path: path.join(ARTIFACTS_DIR, 'ai_consulting_cleaned_mobile_full.png'),
    fullPage: true,
  });
  console.log('Saved fullPage screenshot: ai_consulting_cleaned_mobile_full.png');
  await mobilePage.close();

  await page.close();
  await browser.close();
  console.log('\n=== ALL VERIFICATION CHECKS & REGRESSION TESTS PASSED! ===');
}

verifyCleanup().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
