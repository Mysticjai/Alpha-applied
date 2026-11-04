const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('console', msg => console.log('LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  const testNav = async (fromUrl, clickSelector, expectedTargetUrl, desc) => {
    console.log(`\n========================================`);
    console.log(`TEST: ${desc}`);
    console.log(`From: ${fromUrl} -> Click: ${clickSelector}`);

    await page.goto(fromUrl, { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    let sweepStarted = false;
    let sweepCovered = false;

    // Check overlay state during transition
    const interval = setInterval(async () => {
      try {
        const state = await page.evaluate(() => {
          const overlay = document.querySelector('div[aria-hidden="true"].fixed.inset-0');
          const panel = overlay ? overlay.firstElementChild : null;
          if (!overlay || !panel) return null;
          const tr = window.getComputedStyle(panel).transform;
          return {
            visibility: overlay.style.visibility,
            transform: tr,
          };
        });
        if (state && state.visibility === 'visible') {
          sweepStarted = true;
          if (state.transform.includes('matrix') || state.transform === 'none') {
            sweepCovered = true;
          }
        }
      } catch (e) {}
    }, 25);

    try {
      const el = await page.$(clickSelector);
      if (!el) {
        console.log(`ERROR: Selector not found: ${clickSelector}`);
        clearInterval(interval);
        return;
      }
      await el.click();
      await page.waitForTimeout(1600);
      clearInterval(interval);

      const finalUrl = page.url();
      console.log(`Result: sweepStarted=${sweepStarted}, sweepCovered=${sweepCovered}, finalUrl=${finalUrl}`);
      if (!sweepStarted) {
        console.log(`>>> FAILED TO TRIGGER SWEEP TRANSITION! <<<`);
      }
    } catch (err) {
      clearInterval(interval);
      console.log(`Error during click:`, err.message);
    }
  };

  // Test 1: Home -> AI Consulting
  await testNav('http://localhost:5173/', 'nav a[href*="aiconsulting"]', 'http://localhost:5173/aiconsulting.html', 'Home -> AI Consulting');

  // Test 2: AI Consulting -> Home via Nav Home
  await testNav('http://localhost:5173/aiconsulting.html', 'nav a[href*="#home"]', 'http://localhost:5173/', 'AI Consulting -> Nav Home');

  // Test 3: AI Consulting -> Home via Logo
  await testNav('http://localhost:5173/aiconsulting.html', 'header a[aria-label*="Home"]', 'http://localhost:5173/', 'AI Consulting -> Logo');

  // Test 4: Litigation Services -> Alpha Lens
  await testNav('http://localhost:5173/litigationservices.html', 'nav a[href*="alphalens"]', 'http://localhost:5173/alphalens.html', 'Litigation Services -> Alpha Lens');

  // Test 5: Alpha Lens -> Litigation Services
  await testNav('http://localhost:5173/alphalens.html', 'nav a[href*="litigationservices"]', 'http://localhost:5173/litigationservices.html', 'Alpha Lens -> Litigation Services');

  // Test 6: Home -> Contact nav
  await testNav('http://localhost:5173/', 'nav a[href*="#contact"]', 'http://localhost:5173/#contact', 'Home -> Contact nav');

  // Test 7: AI Consulting -> Book a Call
  await testNav('http://localhost:5173/aiconsulting.html', 'header a:has-text("Book a Call")', 'http://localhost:5173/#contact', 'AI Consulting -> Book a Call');

  // Test 8: Hero Schedule AI Consultation CTA
  await testNav('http://localhost:5173/', 'a:has-text("Schedule AI Consultation")', 'http://localhost:5173/#contact', 'Hero Schedule AI Consultation CTA');

  await browser.close();
  console.log('\nAll transition tests finished.');
})();
