const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');

const ARTIFACTS_DIR = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function verify() {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  console.log('--- 1. Testing Desktop (1440x900) ---');
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:5174/#founder', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  const founderSection = await page.$('#founder');
  await founderSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  // Click Read More to expand
  const readMoreBtn = await page.$('button[aria-controls="founder-expanded-profile"]');
  if (readMoreBtn) {
    await readMoreBtn.click();
    await page.waitForTimeout(800);
  }

  // Check text content inside expanded profile
  const expandedText = await page.$eval('#founder-expanded-profile', el => el.innerText);
  console.log('Includes Master of Science:', expandedText.includes('Master of Science in Management Information Systems'));
  console.log('Includes BITS Pilani:', expandedText.includes('BITS Pilani'));
  console.log('Includes eMERGE project:', expandedText.includes('eMERGE'));
  console.log('Includes Languages section:', /LANGUAGE PROFICIENCY/i.test(expandedText));
  console.log('Includes Research Publication section:', /RESEARCH PUBLICATION/i.test(expandedText));
  console.log('Includes Educational Qualifications header:', /Educational Qualifications/i.test(expandedText));

  // Screenshot desktop expanded profile
  await founderSection.screenshot({
    path: path.join(ARTIFACTS_DIR, 'founder_simplified_narrative_desktop.png'),
  });
  console.log('Saved founder_simplified_narrative_desktop.png');

  // Test collapsing from bottom button
  const bottomCollapseBtn = await page.$('#founder-expanded-profile button[aria-label="Collapse detailed profile"]');
  if (bottomCollapseBtn) {
    await bottomCollapseBtn.click();
    await page.waitForTimeout(600);
    console.log('Tested bottom collapse button');
  }

  await page.close();

  console.log('--- 2. Testing Tablet (768x1024) ---');
  const tabletPage = await browser.newPage({ viewport: { width: 768, height: 1024 } });
  await tabletPage.goto('http://localhost:5174/#founder', { waitUntil: 'networkidle' });
  await tabletPage.waitForTimeout(800);

  const tabletFounder = await tabletPage.$('#founder');
  await tabletFounder.scrollIntoViewIfNeeded();
  await tabletPage.waitForTimeout(300);

  const tabletReadMore = await tabletPage.$('button[aria-controls="founder-expanded-profile"]');
  if (tabletReadMore) {
    await tabletReadMore.click();
    await tabletPage.waitForTimeout(800);
  }

  await tabletFounder.screenshot({
    path: path.join(ARTIFACTS_DIR, 'founder_simplified_narrative_tablet.png'),
  });
  console.log('Saved founder_simplified_narrative_tablet.png');
  await tabletPage.close();

  console.log('--- 3. Testing Mobile (390x844) ---');
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:5174/#founder', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(800);

  const mobileFounder = await mobilePage.$('#founder');
  await mobileFounder.scrollIntoViewIfNeeded();
  await mobilePage.waitForTimeout(300);

  const mobileReadMore = await mobilePage.$('button[aria-controls="founder-expanded-profile"]');
  if (mobileReadMore) {
    await mobileReadMore.click();
    await mobilePage.waitForTimeout(800);
  }

  await mobileFounder.screenshot({
    path: path.join(ARTIFACTS_DIR, 'founder_simplified_narrative_mobile.png'),
  });
  console.log('Saved founder_simplified_narrative_mobile.png');
  await mobilePage.close();

  await browser.close();
  console.log('Verification completed successfully!');
}

verify().catch(err => {
  console.error('Error during verification:', err);
  process.exit(1);
});
