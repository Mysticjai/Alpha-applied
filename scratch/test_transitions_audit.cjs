const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage();
  
  // Track overlay visibility and transitions
  await page.exposeFunction('logEvent', (text) => console.log('EVENT:', text));

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  console.log('1. Loading Home...');
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  console.log('Current URL:', page.url());

  // Helper to observe overlay
  const observeTransition = async (actionDesc, action) => {
    console.log(`\n--- Starting: ${actionDesc} ---`);
    let covered = false;
    let overlayVisible = false;

    // Polling overlay state during transition
    const interval = setInterval(async () => {
      try {
        const state = await page.evaluate(() => {
          const overlay = document.querySelector('div[aria-hidden="true"].fixed.inset-0');
          const panel = overlay ? overlay.firstElementChild : null;
          if (!overlay || !panel) return null;
          return {
            visibility: overlay.style.visibility,
            opacity: window.getComputedStyle(overlay).opacity,
            transform: window.getComputedStyle(panel).transform,
          };
        });
        if (state && state.visibility === 'visible') {
          overlayVisible = true;
        }
      } catch (e) {}
    }, 30);

    await action();
    await page.waitForTimeout(2000);
    clearInterval(interval);

    console.log(`Result for ${actionDesc}: Overlay visible during transition? ${overlayVisible}. URL: ${page.url()}`);
  };

  // Step 2: Click AI Consulting in nav
  await observeTransition('Click Nav AI Consulting', async () => {
    await page.click('nav a[href*="aiconsulting"]');
  });

  // Step 3: Click Home in nav
  await observeTransition('Click Nav Home from AI Consulting', async () => {
    await page.click('nav a[href*="#home"]');
  });

  // Step 4: Click AI Consulting again
  await observeTransition('Click Nav AI Consulting again', async () => {
    await page.click('nav a[href*="aiconsulting"]');
  });

  // Step 5: Click Logo from AI Consulting
  await observeTransition('Click Logo from AI Consulting', async () => {
    await page.click('header a[aria-label*="Home"]');
  });

  // Step 6: Click Logo while on Home
  await observeTransition('Click Logo while on Home', async () => {
    await page.click('header a[aria-label*="Home"]');
  });

  // Step 7: Click Contact in nav
  await observeTransition('Click Nav Contact from Home', async () => {
    await page.click('nav a[href*="#contact"]');
  });

  // Step 8: Click Book a Call CTA
  await observeTransition('Click Book a Call CTA', async () => {
    await page.click('header a:has-text("Book a Call")');
  });

  // Step 9: Click Litigation Services, then browser back
  await observeTransition('Click Nav Litigation Services', async () => {
    await page.click('nav a[href*="litigationservices"]');
  });

  await observeTransition('Browser Back to Home', async () => {
    await page.goBack();
  });

  await browser.close();
  console.log('\nAudit complete.');
})();
