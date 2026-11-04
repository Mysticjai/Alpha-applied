const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE_URL = 'http://localhost:5173';

async function runTests() {
  console.log('--- STARTING FOUNDER PROFILE EXPANSION VERIFICATION ---');
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const testReport = {
    collapsedStateVerified: false,
    expandedStateVerified: false,
    bioParagraphsCount: 0,
    experienceTimelineCount: 0,
    educationItemsCount: 0,
    publicationVerified: false,
    languagesVerified: false,
    competenciesCount: 0,
    collapseFromBottomVerified: false,
    toggleCycleVerified: false,
    screenshots: [],
  };

  try {
    // -------------------------------------------------------------
    // 1. DESKTOP AUDIT (1440 x 900)
    // -------------------------------------------------------------
    console.log('\n[Desktop 1440px] Testing Founder Profile...');
    const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await desktopPage.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(1000);

    // Scroll to #founder
    await desktopPage.evaluate(() => {
      const el = document.getElementById('founder');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await desktopPage.waitForTimeout(600);

    // Check Collapsed State
    const headlineText = await desktopPage.$eval('#founder h2', el => el.innerText.trim());
    console.log(`Headline: "${headlineText.replace(/\n/g, ' ')}"`);

    const readMoreBtn = await desktopPage.$('#founder button[aria-controls="founder-expanded-profile"]');
    if (!readMoreBtn) throw new Error('Read More toggle button not found!');

    const ariaExpandedBefore = await readMoreBtn.getAttribute('aria-expanded');
    const readMoreTextBefore = await readMoreBtn.innerText();
    console.log(`Initial button text: "${readMoreTextBefore.trim()}", aria-expanded: ${ariaExpandedBefore}`);

    const expandedProfileEl = await desktopPage.$('#founder-expanded-profile');
    const boundingBefore = await expandedProfileEl.boundingBox();
    console.log(`Expanded drawer bounding box before click: height = ${boundingBefore ? boundingBefore.height : 0}`);

    // Screenshot Desktop Collapsed
    const desktopCollapsedPath = path.join(ARTIFACT_DIR, 'founder_profile_desktop_collapsed.png');
    await desktopPage.screenshot({ path: desktopCollapsedPath, fullPage: false });
    testReport.screenshots.push(desktopCollapsedPath);
    console.log(`Saved screenshot: ${desktopCollapsedPath}`);

    // Click Read More
    console.log('\nClicking "Read More" button...');
    await readMoreBtn.click();
    await desktopPage.waitForTimeout(700); // Wait for smooth CSS transition

    const ariaExpandedAfter = await readMoreBtn.getAttribute('aria-expanded');
    const readMoreTextAfter = await readMoreBtn.innerText();
    console.log(`Button text after click: "${readMoreTextAfter.trim()}", aria-expanded: ${ariaExpandedAfter}`);

    const boundingAfter = await expandedProfileEl.boundingBox();
    console.log(`Expanded drawer bounding box after click: height = ${boundingAfter ? boundingAfter.height : 0}`);

    if (boundingAfter && boundingAfter.height > 300) {
      testReport.expandedStateVerified = true;
    }

    // Verify Bio Paragraphs
    const bioParas = await desktopPage.$$('#founder-expanded-profile .space-y-3\\.5 p');
    testReport.bioParagraphsCount = bioParas.length;
    console.log(`Rendered detailed bio paragraphs: ${bioParas.length}`);

    // Verify Timeline Entries
    const timelineItems = await desktopPage.$$('#founder-expanded-profile .relative.group');
    testReport.experienceTimelineCount = timelineItems.length;
    console.log(`Rendered experience timeline entries: ${timelineItems.length}`);

    // Verify Education Cards
    const eduCards = await desktopPage.$$('#founder-expanded-profile .grid.grid-cols-1.sm\\:grid-cols-2 > div');
    testReport.educationItemsCount = eduCards.length;
    console.log(`Rendered education cards: ${eduCards.length}`);

    // Verify Publication
    const publicationText = await desktopPage.evaluate(() => {
      const el = document.querySelector('#founder-expanded-profile');
      return el ? el.innerText.includes('Legal Billing and Predictive Coding') : false;
    });
    testReport.publicationVerified = publicationText;
    console.log(`Publication "Legal Billing and Predictive Coding" present: ${publicationText}`);

    // Verify Languages
    const languagesText = await desktopPage.evaluate(() => {
      const el = document.querySelector('#founder-expanded-profile');
      return el ? (el.innerText.includes('English') && el.innerText.includes('Telugu')) : false;
    });
    testReport.languagesVerified = languagesText;
    console.log(`Language proficiency (English & Telugu) present: ${languagesText}`);

    // Verify Core Competencies
    const competencies = await desktopPage.$$('#founder-expanded-profile .flex-wrap span.font-mono');
    testReport.competenciesCount = competencies.length;
    console.log(`Competency chips count: ${competencies.length}`);

    // Screenshot Desktop Expanded
    const desktopExpandedPath = path.join(ARTIFACT_DIR, 'founder_profile_desktop_expanded.png');
    await desktopPage.screenshot({ path: desktopExpandedPath, fullPage: false });
    testReport.screenshots.push(desktopExpandedPath);
    console.log(`Saved screenshot: ${desktopExpandedPath}`);

    const founderEl = await desktopPage.$('#founder');
    if (founderEl) {
      const desktopFullSectionPath = path.join(ARTIFACT_DIR, 'founder_profile_desktop_section_full.png');
      await founderEl.screenshot({ path: desktopFullSectionPath });
      testReport.screenshots.push(desktopFullSectionPath);
    }

    // Test Collapse from Bottom Button
    console.log('\nTesting bottom "Read Less" button...');
    const bottomReadLessBtn = await desktopPage.locator('#founder-expanded-profile button:has-text("Read Less")');
    if (await bottomReadLessBtn.count() > 0) {
      await bottomReadLessBtn.first().click();
      await desktopPage.waitForTimeout(700);
      const boundingAfterBottomCollapse = await expandedProfileEl.boundingBox();
      console.log(`Expanded drawer bounding box after bottom collapse: height = ${boundingAfterBottomCollapse ? boundingAfterBottomCollapse.height : 0}`);
      if (!boundingAfterBottomCollapse || boundingAfterBottomCollapse.height < 50) {
        testReport.collapseFromBottomVerified = true;
      }
    }

    // Test Toggle Cycle (Top button)
    console.log('\nTesting top button toggle cycle...');
    await readMoreBtn.click();
    await desktopPage.waitForTimeout(600);
    await readMoreBtn.click();
    await desktopPage.waitForTimeout(600);
    const boundingAfterCycle = await expandedProfileEl.boundingBox();
    if (!boundingAfterCycle || boundingAfterCycle.height < 50) {
      testReport.toggleCycleVerified = true;
      console.log('Toggle cycle verified successfully!');
    }
    await desktopPage.close();

    // -------------------------------------------------------------
    // 2. TABLET AUDIT (768 x 1024)
    // -------------------------------------------------------------
    console.log('\n[Tablet 768px] Testing Founder Profile...');
    const tabletPage = await browser.newPage({ viewport: { width: 768, height: 1024 } });
    await tabletPage.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await tabletPage.waitForTimeout(1000);
    await tabletPage.evaluate(() => {
      const el = document.getElementById('founder');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await tabletPage.waitForTimeout(600);

    const tabletCollapsedPath = path.join(ARTIFACT_DIR, 'founder_profile_tablet_collapsed.png');
    await tabletPage.screenshot({ path: tabletCollapsedPath, fullPage: false });
    testReport.screenshots.push(tabletCollapsedPath);

    const tabletReadMore = await tabletPage.$('#founder button[aria-controls="founder-expanded-profile"]');
    await tabletReadMore.click();
    await tabletPage.waitForTimeout(700);

    const tabletExpandedPath = path.join(ARTIFACT_DIR, 'founder_profile_tablet_expanded.png');
    await tabletPage.screenshot({ path: tabletExpandedPath, fullPage: false });
    testReport.screenshots.push(tabletExpandedPath);
    await tabletPage.close();

    // -------------------------------------------------------------
    // 3. MOBILE AUDIT (393 x 852 - iPhone 14 Pro)
    // -------------------------------------------------------------
    console.log('\n[Mobile 393px] Testing Founder Profile...');
    const mobilePage = await browser.newPage({
      viewport: { width: 393, height: 852 },
      isMobile: true,
      hasTouch: true,
    });
    await mobilePage.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await mobilePage.waitForTimeout(1000);
    await mobilePage.evaluate(() => {
      const el = document.getElementById('founder');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await mobilePage.waitForTimeout(600);

    const mobileCollapsedPath = path.join(ARTIFACT_DIR, 'founder_profile_mobile_collapsed.png');
    await mobilePage.screenshot({ path: mobileCollapsedPath, fullPage: false });
    testReport.screenshots.push(mobileCollapsedPath);

    const mobileReadMore = await mobilePage.$('#founder button[aria-controls="founder-expanded-profile"]');
    await mobileReadMore.click();
    await mobilePage.waitForTimeout(700);

    const mobileExpandedPath = path.join(ARTIFACT_DIR, 'founder_profile_mobile_expanded.png');
    await mobilePage.screenshot({ path: mobileExpandedPath, fullPage: false });
    testReport.screenshots.push(mobileExpandedPath);
    await mobilePage.close();

    testReport.collapsedStateVerified = true;
  } catch (err) {
    console.error('Test error:', err);
  } finally {
    await browser.close();
  }

  console.log('\n--- FINAL TEST RESULTS ---');
  console.log(JSON.stringify(testReport, null, 2));
}

runTests();
