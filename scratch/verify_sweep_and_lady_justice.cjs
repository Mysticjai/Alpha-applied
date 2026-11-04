const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

const BASE_URL = 'http://localhost:5173';

async function verifyAll() {
  console.log('================================================================');
  console.log(' COMPREHENSIVE VERIFICATION: MOBILE SWEEP & LADY JUSTICE ASSET ');
  console.log('================================================================\n');

  const browser = await chromium.launch({ channel: 'msedge', headless: true });

  const viewports = [
    { name: 'Mobile 320px', width: 320, height: 568, isMobile: true },
    { name: 'Mobile 375px', width: 375, height: 667, isMobile: true },
    { name: 'Mobile 430px', width: 430, height: 932, isMobile: true },
    { name: 'Desktop 1440px', width: 1440, height: 900, isMobile: false },
  ];

  const results = {
    checks: [],
    passed: 0,
    failed: 0,
  };

  function assert(desc, condition, detail = '') {
    if (condition) {
      console.log(`  [PASS] ${desc}${detail ? ' -> ' + detail : ''}`);
      results.checks.push({ desc, status: 'PASS', detail });
      results.passed++;
    } else {
      console.error(`  [FAIL] ${desc}${detail ? ' -> ' + detail : ''}`);
      results.checks.push({ desc, status: 'FAIL', detail });
      results.failed++;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // PART 1: Lady Justice Artwork Forensic Verification
  // ─────────────────────────────────────────────────────────────
  console.log('--- PART 1: Lady Justice Hero Artwork Inspection ---');
  {
    const context = await browser.newContext({ viewport: { width: 375, height: 667 } });
    const page = await context.newPage();
    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const statueData = await page.evaluate(async () => {
      const img = document.querySelector('.mobile-hero-artwork img[src*="lady-justice"]');
      const video = document.querySelector('video');
      const canvas = document.querySelector('canvas');
      if (!img) return null;
      if (img.decode) {
        try { await img.decode(); } catch (e) {}
      }
      const rect = img.getBoundingClientRect();
      const naturalW = img.naturalWidth;
      const naturalH = img.naturalHeight;
      const complete = img.complete || naturalW > 0;
      const computedStyle = window.getComputedStyle(img);
      return {
        hasVideoTag: !!video,
        hasCanvasTag: !!canvas,
        imgComplete: complete,
        naturalWidth: naturalW,
        naturalHeight: naturalH,
        displayWidth: Math.round(rect.width),
        displayHeight: Math.round(rect.height),
        objectFit: computedStyle.objectFit,
        transform: computedStyle.transform,
      };
    });

    assert('No broken <video> tags in homepage hero', statueData && !statueData.hasVideoTag);
    assert('No uninitialized <canvas> or 3D contexts in hero', statueData && !statueData.hasCanvasTag);
    assert('Lady Justice image is loaded and complete', statueData && statueData.imgComplete);
    assert(
      'Lady Justice asset natural dimensions match 819x1024',
      statueData && statueData.naturalWidth === 819 && statueData.naturalHeight === 1024,
      `Dimensions: ${statueData?.naturalWidth}x${statueData?.naturalHeight}`
    );
    assert(
      'Lady Justice rendered with scaleX(-1) horizontal flip for mobile balance',
      statueData && statueData.transform.includes('-1'),
      `Computed transform: ${statueData?.transform}`
    );

    await context.close();
  }

  // ─────────────────────────────────────────────────────────────
  // PART 2: Sweep Transitions Across Mobile Viewports (320, 375, 430)
  // ─────────────────────────────────────────────────────────────
  for (const vp of viewports) {
    console.log(`\n--- PART 2: Testing Viewport: ${vp.name} (${vp.width}x${vp.height}) ---`);
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      isMobile: vp.isMobile,
      hasTouch: vp.isMobile,
    });
    const page = await context.newPage();

    const pageErrors = [];
    page.on('pageerror', err => pageErrors.push(err.message));
    page.on('console', msg => {
      if (msg.type() === 'error') pageErrors.push(msg.text());
    });

    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    if (vp.isMobile) {
      // 1. Mobile Drawer Navigation: Cross-page link (Litigation Services)
      const hamburger = await page.$('button[aria-label="Open mobile navigation menu"]');
      assert(`Hamburger button found on ${vp.name}`, !!hamburger);
      if (hamburger) {
        await hamburger.click();
        await page.waitForTimeout(300);

        const drawerLink = await page.$('div[role="dialog"] a[href*="litigationservices"]');
        assert(`Litigation Services link in drawer on ${vp.name}`, !!drawerLink);

        if (drawerLink) {
          let sweepObserved = false;
          let coveredStateSeen = false;
          const interval = setInterval(async () => {
            try {
              const state = await page.evaluate(() => {
                const overlay = document.querySelector('[aria-hidden="true"].fixed.inset-0.z-\\[100\\]');
                if (!overlay) return null;
                const panel = overlay.firstElementChild;
                const vis = window.getComputedStyle(overlay).visibility;
                const transform = panel ? window.getComputedStyle(panel).transform : '';
                return { vis, transform };
              });
              if (state && state.vis === 'visible') {
                sweepObserved = true;
                if (state.transform.includes('(1, 0, 0, 1, 0, 0)')) {
                  coveredStateSeen = true;
                }
              }
            } catch (e) {}
          }, 30);

          await drawerLink.tap();
          await page.waitForTimeout(1200);
          clearInterval(interval);

          assert(`Sweep transition ran during mobile drawer navigation on ${vp.name}`, sweepObserved);
          assert(`Destination reached on ${vp.name}`, page.url().includes('litigationservices.html'), `URL: ${page.url()}`);

          // Verify drawer closed and overlay settled
          const overlaySettled = await page.evaluate(() => {
            const overlay = document.querySelector('[aria-hidden="true"].fixed.inset-0.z-\\[100\\]');
            const drawer = document.querySelector('div[role="dialog"][aria-label="Mobile Navigation"]');
            if (!overlay) return false;
            return {
              overlayHidden: window.getComputedStyle(overlay).visibility === 'hidden',
              pointerEventsNone: overlay.style.pointerEvents === 'none',
              drawerClosed: !drawer,
              bodyScrollUnlocked: document.body.style.overflow !== 'hidden',
            };
          });

          assert(`Overlay settled to hidden and pointer-events: none on ${vp.name}`, overlaySettled.overlayHidden && overlaySettled.pointerEventsNone);
          assert(`Mobile drawer closed cleanly under sweep on ${vp.name}`, overlaySettled.drawerClosed);
          assert(`Body scroll unlocked after transition on ${vp.name}`, overlaySettled.bodyScrollUnlocked);
        }
      }

      // 2. Return Home via Logo tap
      const logo = await page.$('a[href="/"], a[href="/#home"], header a:has(svg)');
      if (logo) {
        let sweepObserved = false;
        const interval = setInterval(async () => {
          try {
            const vis = await page.evaluate(() => {
              const el = document.querySelector('[aria-hidden="true"].fixed.inset-0.z-\\[100\\]');
              return el ? window.getComputedStyle(el).visibility : null;
            });
            if (vis === 'visible') sweepObserved = true;
          } catch (e) {}
        }, 30);

        await logo.tap();
        await page.waitForTimeout(1200);
        clearInterval(interval);

        assert(`Return to Home sweep transition triggered on ${vp.name}`, sweepObserved);
        assert(`Home page reached on ${vp.name}`, page.url().endsWith('/') || page.url().includes('#home'));
      }

      // 3. Mobile Drawer Book a Call CTA -> #contact
      const hamburger2 = await page.$('button[aria-label="Open mobile navigation menu"]');
      if (hamburger2) {
        await hamburger2.click();
        await page.waitForTimeout(300);

        const bookCallCta = await page.$('div[role="dialog"] a[href*="contact"]');
        assert(`Book a Call CTA present in mobile drawer on ${vp.name}`, !!bookCallCta);

        if (bookCallCta) {
          let sweepObserved = false;
          const interval = setInterval(async () => {
            try {
              const vis = await page.evaluate(() => {
                const el = document.querySelector('[aria-hidden="true"].fixed.inset-0.z-\\[100\\]');
                return el ? window.getComputedStyle(el).visibility : null;
              });
              if (vis === 'visible') sweepObserved = true;
            } catch (e) {}
          }, 30);

          await bookCallCta.tap();
          await page.waitForTimeout(1200);
          clearInterval(interval);

          assert(`Book a Call CTA triggers sweep transition on ${vp.name}`, sweepObserved);
          assert(`URL updated to #contact on ${vp.name}`, page.url().includes('#contact'));

          const contactScrolled = await page.evaluate(() => {
            const el = document.getElementById('contact');
            if (!el) return false;
            const rect = el.getBoundingClientRect();
            // Should be near top of viewport (offset by header ~80px)
            return rect.top >= -20 && rect.top <= 140;
          });
          assert(`Pre-positioned directly at #contact without header overlap on ${vp.name}`, contactScrolled);
        }
      }

      // 4. In-page same-route anchor from mobile drawer (Who We Serve)
      const hamburger3 = await page.$('button[aria-label="Open mobile navigation menu"]');
      if (hamburger3) {
        await hamburger3.click();
        await page.waitForTimeout(300);

        const whoWeServeLink = await page.$('div[role="dialog"] a[href*="who-we-serve"]');
        if (whoWeServeLink) {
          await whoWeServeLink.tap();
          await page.waitForTimeout(800);

          const whoWeServePos = await page.evaluate(() => {
            const el = document.getElementById('who-we-serve');
            const drawer = document.querySelector('div[role="dialog"][aria-label="Mobile Navigation"]');
            return {
              drawerClosed: !drawer,
              bodyScrollUnlocked: document.body.style.overflow !== 'hidden',
              inView: el ? el.getBoundingClientRect().top < window.innerHeight : false,
            };
          });

          assert(`Same-page anchor closes drawer on ${vp.name}`, whoWeServePos.drawerClosed);
          assert(`Body scroll unlocked for anchor navigation on ${vp.name}`, whoWeServePos.bodyScrollUnlocked);
          assert(`Target anchor scrolled into view on ${vp.name}`, whoWeServePos.inView);
        }
      }

      // 5. In-page Hero Primary CTA (Schedule AI Consultation)
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(300);

      const heroCta = await page.$('.cta-inner a[href*="contact"]');
      if (heroCta) {
        let sweepObserved = false;
        const interval = setInterval(async () => {
          try {
            const vis = await page.evaluate(() => {
              const el = document.querySelector('[aria-hidden="true"].fixed.inset-0.z-\\[100\\]');
              return el ? window.getComputedStyle(el).visibility : null;
            });
            if (vis === 'visible') sweepObserved = true;
          } catch (e) {}
        }, 30);

        await heroCta.tap();
        await page.waitForTimeout(1200);
        clearInterval(interval);

        assert(`Hero Consultation CTA triggers sweep on ${vp.name}`, sweepObserved);
      }

      // Check horizontal overflow
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth <= window.innerWidth + 1;
      });
      assert(`Zero horizontal overflow on ${vp.name}`, overflow);

    } else {
      // Desktop tests
      const litLink = await page.$('header nav a[href*="litigationservices"]');
      if (litLink) {
        let sweepObserved = false;
        const interval = setInterval(async () => {
          try {
            const vis = await page.evaluate(() => {
              const el = document.querySelector('[aria-hidden="true"].fixed.inset-0.z-\\[100\\]');
              return el ? window.getComputedStyle(el).visibility : null;
            });
            if (vis === 'visible') sweepObserved = true;
          } catch (e) {}
        }, 30);

        await litLink.click();
        await page.waitForTimeout(1200);
        clearInterval(interval);

        assert(`Desktop navigation triggers sweep transition`, sweepObserved);
        assert(`Desktop reaches destination`, page.url().includes('litigationservices.html'));
      }
    }

    assert(`Zero console or page errors on ${vp.name}`, pageErrors.length === 0, pageErrors.join('; '));
    await context.close();
  }

  // ─────────────────────────────────────────────────────────────
  // PART 3: Reduced Motion Compliance Verification
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- PART 3: Prefers Reduced Motion Accessibility Verification ---');
  {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
      reducedMotion: 'reduce',
    });
    const page = await context.newPage();
    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    const hamburger = await page.$('button[aria-label="Open mobile navigation menu"]');
    if (hamburger) {
      await hamburger.click();
      await page.waitForTimeout(300);

      const link = await page.$('div[role="dialog"] a[href*="aiconsulting"]');
      if (link) {
        await link.tap();
        await page.waitForTimeout(800);

        assert('Reduced motion navigates cleanly to destination', page.url().includes('aiconsulting.html'));
        const overlayClean = await page.evaluate(() => {
          const overlay = document.querySelector('[aria-hidden="true"].fixed.inset-0.z-\\[100\\]');
          return overlay && window.getComputedStyle(overlay).visibility === 'hidden' && overlay.style.pointerEvents === 'none';
        });
        assert('Reduced motion overlay settles cleanly without freeze', overlayClean);
      }
    }
    await context.close();
  }

  await browser.close();

  console.log('\n================================================================');
  console.log(` SUMMARY: ${results.passed} PASSED, ${results.failed} FAILED `);
  console.log('================================================================');

  if (results.failed > 0) {
    process.exit(1);
  }
}

verifyAll().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
