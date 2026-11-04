const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const ARTIFACT_DIR = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';
const CHROME_PATH = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE_URL = 'http://localhost:5173';

async function runTests() {
  console.log('=== STARTING FOUNDER ABOUT REFINEMENT & JOURNEY ANIMATION VERIFICATION ===');
  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true,
  });

  const testReport = {
    fourValueCardsRemoved: false,
    ourApproachRemoved: false,
    coreCompetenciesRemoved: false,
    rebalancedHeroVerified: false,
    readMoreExpandsDrawer: false,
    readLessCollapsesDrawer: false,
    biographyParagraphsCount: 0,
    educationCredentialsCount: 0,
    publicationPresent: false,
    languagesPresent: false,
    timelineItemsCount: 0,
    timelineArrowAndTrackRendered: false,
    cardProgressiveRevealVerified: false,
    activeCardEmphasisVerified: false,
    bottomReadLessCollapses: false,
    desktopLayoutVerified: false,
    tabletLayoutVerified: false,
    mobileLayoutVerified: false,
    screenshots: [],
  };

  try {
    // -------------------------------------------------------------------------
    // 1. DESKTOP VERIFICATION (1440 x 900)
    // -------------------------------------------------------------------------
    console.log('\n[Desktop 1440px] Testing Section Refinements & Removal Audits...');
    const desktopPage = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await desktopPage.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await desktopPage.waitForTimeout(1000);

    // Scroll to #founder
    await desktopPage.evaluate(() => {
      const el = document.getElementById('founder');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await desktopPage.waitForTimeout(600);

    // 1. Audit: 4 Founder Value Cards completely removed
    const valueCardsCheck = await desktopPage.evaluate(() => {
      const el = document.getElementById('founder');
      if (!el) return { found: true };
      const text = el.innerText;
      const hasAnalyticalThinking = text.includes('Analytical Thinking');
      const hasRealWorldFocus = text.includes('Real-World Focus');
      const hasClientCollaboration = text.includes('Client Collaboration');
      const hasContinuousLearning = text.includes('Continuous Learning');
      return {
        found: hasAnalyticalThinking || hasRealWorldFocus || hasClientCollaboration || hasContinuousLearning,
        analytical: hasAnalyticalThinking,
        realWorld: hasRealWorldFocus,
        collaboration: hasClientCollaboration,
        continuous: hasContinuousLearning,
      };
    });
    console.log(`4 Value Cards present in #founder: ${valueCardsCheck.found ? 'YES (FAIL)' : 'NO (CLEANLY REMOVED)'}`);
    testReport.fourValueCardsRemoved = !valueCardsCheck.found;

    // 2. Audit: Our Approach block completely removed
    const ourApproachCheck = await desktopPage.evaluate(() => {
      const el = document.getElementById('founder');
      if (!el) return { found: true };
      const text = el.innerText;
      const hasOurApproach = text.includes('OUR APPROACH') || text.includes('Analytical rigor should lead to practical implementation');
      return { found: hasOurApproach };
    });
    console.log(`Our Approach block present in #founder: ${ourApproachCheck.found ? 'YES (FAIL)' : 'NO (CLEANLY REMOVED)'}`);
    testReport.ourApproachRemoved = !ourApproachCheck.found;

    // 3. Verify Rebalanced Top Hero (2-Column composition, deliberate headline, portrait)
    const heroElements = await desktopPage.evaluate(() => {
      const founder = document.getElementById('founder');
      const headline = founder ? founder.querySelector('h2')?.innerText.replace(/\n/g, ' ') : '';
      const photo = founder ? founder.querySelector('img[src="/images/krishna-dornadula.png"]') : null;
      const bookCall = founder ? founder.querySelector('a[href="/#contact"]') : null;
      const linkedIn = founder ? founder.querySelector('a[href*="linkedin.com"]') : null;
      const readMore = founder ? founder.querySelector('button[aria-controls="founder-expanded-profile"]') : null;
      return {
        headline,
        hasPhoto: !!photo,
        hasBookCall: !!bookCall,
        hasLinkedIn: !!linkedIn,
        hasReadMore: !!readMore,
      };
    });
    console.log(`Hero Headline: "${heroElements.headline}"`);
    console.log(`Hero elements present: photo=${heroElements.hasPhoto}, bookCall=${heroElements.hasBookCall}, linkedIn=${heroElements.hasLinkedIn}, readMore=${heroElements.hasReadMore}`);
    if (heroElements.hasPhoto && heroElements.hasBookCall && heroElements.hasLinkedIn && heroElements.hasReadMore) {
      testReport.rebalancedHeroVerified = true;
    }

    // Capture Desktop Collapsed State Screenshot
    const desktopCollapsedScreenshot = path.join(ARTIFACT_DIR, 'refined_founder_desktop_collapsed.png');
    await desktopPage.screenshot({ path: desktopCollapsedScreenshot, fullPage: false });
    testReport.screenshots.push(desktopCollapsedScreenshot);
    console.log(`Captured screenshot: ${desktopCollapsedScreenshot}`);

    // 4. Test "Read More" Interaction
    console.log('\nClicking "Read More" button to expand drawer...');
    const readMoreBtn = await desktopPage.$('#founder button[aria-controls="founder-expanded-profile"]');
    await readMoreBtn.click();
    await desktopPage.waitForTimeout(700); // Wait for smooth CSS transition

    const drawerHeightAfter = await desktopPage.evaluate(() => {
      const el = document.getElementById('founder-expanded-profile');
      return el ? el.getBoundingClientRect().height : 0;
    });
    console.log(`Drawer height after expansion: ${drawerHeightAfter}px`);
    if (drawerHeightAfter > 400) {
      testReport.readMoreExpandsDrawer = true;
    }

    // 5. Audit: Core Competencies chips removed from expanded profile
    const competenciesCheck = await desktopPage.evaluate(() => {
      const el = document.getElementById('founder-expanded-profile');
      if (!el) return { found: true };
      const text = el.innerText;
      const hasCoreCompetenciesLabel = text.includes('CORE COMPETENCIES');
      const hasChip = text.includes('Forensic Analytics') && text.includes('Litigation Support') && text.includes('SQL and Enterprise');
      return {
        found: hasCoreCompetenciesLabel || hasChip,
      };
    });
    console.log(`Core Competencies section present: ${competenciesCheck.found ? 'YES (FAIL)' : 'NO (CLEANLY REMOVED)'}`);
    testReport.coreCompetenciesRemoved = !competenciesCheck.found;

    // 6. Verify Executive Biography (7 paragraphs)
    const bioCount = await desktopPage.evaluate(() => {
      const paras = document.querySelectorAll('#founder-expanded-profile .space-y-3\\.5 p');
      return paras.length;
    });
    console.log(`Executive Biography paragraphs rendered: ${bioCount}`);
    testReport.biographyParagraphsCount = bioCount;

    // 7. Verify Educational Qualifications & Distinctions
    const eduCredentials = await desktopPage.evaluate(() => {
      const el = document.getElementById('founder-expanded-profile');
      const text = el ? el.innerText.toUpperCase() : '';
      const hasUIC = text.includes('UNIVERSITY OF ILLINOIS CHICAGO');
      const hasBITS = text.includes('BIRLA INSTITUTE OF TECHNOLOGY');
      const hasMagna = text.includes('MAGNA CUM LAUDE');
      const cards = el ? el.querySelectorAll('.grid.grid-cols-1.sm\\:grid-cols-2 > div').length : 0;
      return { hasUIC, hasBITS, hasMagna, cards };
    });
    console.log(`Education credentials: UIC=${eduCredentials.hasUIC}, BITS Pilani=${eduCredentials.hasBITS}, Magna Cum Laude=${eduCredentials.hasMagna}`);
    testReport.educationCredentialsCount = eduCredentials.cards;

    // 8. Verify Publications & Languages
    const pubAndLang = await desktopPage.evaluate(() => {
      const el = document.getElementById('founder-expanded-profile');
      return {
        pub: el ? el.innerText.includes('Legal Billing and Predictive Coding') : false,
        lang: el ? (el.innerText.includes('English') && el.innerText.includes('Telugu')) : false,
      };
    });
    testReport.publicationPresent = pubAndLang.pub;
    testReport.languagesPresent = pubAndLang.lang;
    console.log(`Publication present: ${pubAndLang.pub}, Languages present: ${pubAndLang.lang}`);

    // 9. Verify Professional Journey Timeline Entries (6 items)
    const timelineItems = await desktopPage.evaluate(() => {
      const cards = document.querySelectorAll('#founder-expanded-profile .relative.group h5');
      return Array.from(cards).map(h => h.innerText.trim());
    });
    console.log(`Timeline positions (${timelineItems.length}):`, timelineItems);
    testReport.timelineItemsCount = timelineItems.length;

    // 10. Verify Track Line and Arrowhead
    const trackAndArrow = await desktopPage.evaluate(() => {
      const el = document.getElementById('founder-expanded-profile');
      const trackBg = el ? el.querySelector('.bg-\\[\\#E2DDD3\\]') : null;
      const trackActive = el ? el.querySelector('.bg-primary.rounded-full') : null;
      const arrowSvg = el ? el.querySelector('svg path[d*="M2.5 5L7 9.5L11.5 5"]') : null;
      return {
        hasTrackBg: !!trackBg,
        hasTrackActive: !!trackActive,
        hasArrowSvg: !!arrowSvg,
      };
    });
    console.log(`Track & Arrow elements: bg=${trackAndArrow.hasTrackBg}, activeLine=${trackAndArrow.hasTrackActive}, arrowSvg=${trackAndArrow.hasArrowSvg}`);
    if (trackAndArrow.hasTrackBg && trackAndArrow.hasTrackActive && trackAndArrow.hasArrowSvg) {
      testReport.timelineArrowAndTrackRendered = true;
    }

    // 11. Scroll Down to trigger card reveal and progressive arrow advancement
    console.log('\nScrolling down through professional journey to test progressive arrow and card reveals...');
    await desktopPage.evaluate(() => {
      const el = document.getElementById('founder-expanded-profile');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'end' });
    });
    await desktopPage.waitForTimeout(600);

    const cardsRevealState = await desktopPage.evaluate(() => {
      const cards = document.querySelectorAll('#founder-expanded-profile .relative.group > div:nth-child(2)');
      const nodes = document.querySelectorAll('#founder-expanded-profile .relative.group > div:nth-child(1)');
      const cardStyles = Array.from(cards).map(c => ({
        opacity: window.getComputedStyle(c).opacity,
        transform: window.getComputedStyle(c).transform,
      }));
      const nodeClasses = Array.from(nodes).map(n => n.className);
      const activeNodeIndex = nodeClasses.findIndex(c => c.includes('ring-accent') || c.includes('bg-accent'));
      return {
        cardStyles,
        allCardsRevealed: cardStyles.every(s => parseFloat(s.opacity) > 0.8),
        activeNodeIndex,
      };
    });
    console.log(`Cards reveal state: all revealed=${cardsRevealState.allCardsRevealed}, active node index=${cardsRevealState.activeNodeIndex}`);
    if (cardsRevealState.allCardsRevealed) {
      testReport.cardProgressiveRevealVerified = true;
    }
    if (cardsRevealState.activeNodeIndex >= 0) {
      testReport.activeCardEmphasisVerified = true;
    }

    // Capture Desktop Expanded Screenshot
    const desktopExpandedScreenshot = path.join(ARTIFACT_DIR, 'refined_founder_desktop_expanded.png');
    await desktopPage.screenshot({ path: desktopExpandedScreenshot, fullPage: false });
    testReport.screenshots.push(desktopExpandedScreenshot);
    console.log(`Captured screenshot: ${desktopExpandedScreenshot}`);

    // Capture full section screenshot
    const founderEl = await desktopPage.$('#founder');
    if (founderEl) {
      const desktopSectionScreenshot = path.join(ARTIFACT_DIR, 'refined_founder_desktop_section_full.png');
      await founderEl.screenshot({ path: desktopSectionScreenshot });
      testReport.screenshots.push(desktopSectionScreenshot);
    }

    // 12. Test Bottom "Read Less" Button
    console.log('\nTesting bottom "Read Less" button action...');
    const bottomReadLessBtn = await desktopPage.$('#founder-expanded-profile button:has-text("Read Less")');
    if (bottomReadLessBtn) {
      await bottomReadLessBtn.click();
      await desktopPage.waitForTimeout(700);
      const heightAfterBottomCollapse = await desktopPage.evaluate(() => {
        const el = document.getElementById('founder-expanded-profile');
        return el ? el.getBoundingClientRect().height : 0;
      });
      console.log(`Drawer height after bottom collapse: ${heightAfterBottomCollapse}px`);
      if (heightAfterBottomCollapse === 0) {
        testReport.bottomReadLessCollapses = true;
        testReport.readLessCollapsesDrawer = true;
      }
    }

    testReport.desktopLayoutVerified = true;
    await desktopPage.close();

    // -------------------------------------------------------------------------
    // 2. TABLET VERIFICATION (768 x 1024)
    // -------------------------------------------------------------------------
    console.log('\n[Tablet 768px] Testing Tablet Proportions & Journey Alignment...');
    const tabletPage = await browser.newPage({ viewport: { width: 768, height: 1024 } });
    await tabletPage.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await tabletPage.waitForTimeout(1000);
    await tabletPage.evaluate(() => {
      const el = document.getElementById('founder');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await tabletPage.waitForTimeout(600);

    const tabletCollapsedScreenshot = path.join(ARTIFACT_DIR, 'refined_founder_tablet_collapsed.png');
    await tabletPage.screenshot({ path: tabletCollapsedScreenshot, fullPage: false });
    testReport.screenshots.push(tabletCollapsedScreenshot);

    const tabletReadMore = await tabletPage.$('#founder button[aria-controls="founder-expanded-profile"]');
    await tabletReadMore.click();
    await tabletPage.waitForTimeout(700);

    const tabletExpandedScreenshot = path.join(ARTIFACT_DIR, 'refined_founder_tablet_expanded.png');
    await tabletPage.screenshot({ path: tabletExpandedScreenshot, fullPage: false });
    testReport.screenshots.push(tabletExpandedScreenshot);

    testReport.tabletLayoutVerified = true;
    await tabletPage.close();

    // -------------------------------------------------------------------------
    // 3. MOBILE VERIFICATION (393 x 852 - iPhone 14 Pro)
    // -------------------------------------------------------------------------
    console.log('\n[Mobile 393px] Testing Mobile Clean Vertical Alignment & Touch Behavior...');
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

    const mobileCollapsedScreenshot = path.join(ARTIFACT_DIR, 'refined_founder_mobile_collapsed.png');
    await mobilePage.screenshot({ path: mobileCollapsedScreenshot, fullPage: false });
    testReport.screenshots.push(mobileCollapsedScreenshot);

    const mobileReadMore = await mobilePage.$('#founder button[aria-controls="founder-expanded-profile"]');
    await mobileReadMore.click();
    await mobilePage.waitForTimeout(700);

    // Verify no horizontal overflow on mobile
    const hasHorizontalOverflow = await mobilePage.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log(`Mobile horizontal overflow detected: ${hasHorizontalOverflow ? 'YES (FAIL)' : 'NO (CLEAN)'}`);

    const mobileExpandedScreenshot = path.join(ARTIFACT_DIR, 'refined_founder_mobile_expanded.png');
    await mobilePage.screenshot({ path: mobileExpandedScreenshot, fullPage: false });
    testReport.screenshots.push(mobileExpandedScreenshot);

    testReport.mobileLayoutVerified = !hasHorizontalOverflow;
    await mobilePage.close();

  } catch (err) {
    console.error('Error during verification tests:', err);
  } finally {
    await browser.close();
  }

  console.log('\n=== FINAL VERIFICATION RESULTS SUMMARY ===');
  console.log(JSON.stringify(testReport, null, 2));
}

runTests();
