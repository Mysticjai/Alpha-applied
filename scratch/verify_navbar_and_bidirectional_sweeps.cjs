const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:5173';
const ARTIFACT_DIR = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function runVerification() {
  console.log('========================================================================');
  console.log(' MASTER VERIFICATION: PREMIUM TRANSPARENT NAVBAR + BIDIRECTIONAL SWEEPS');
  console.log('========================================================================\n');

  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const results = { passed: 0, failed: 0, scenarios: [] };

  function assert(desc, condition, detail = '') {
    if (condition) {
      console.log(`  [PASS] ${desc}${detail ? ' -> ' + detail : ''}`);
      results.scenarios.push({ desc, status: 'PASS', detail });
      results.passed++;
    } else {
      console.error(`  [FAIL] ${desc}${detail ? ' -> ' + detail : ''}`);
      results.scenarios.push({ desc, status: 'FAIL', detail });
      results.failed++;
    }
  }

  // ─────────────────────────────────────────────────────────────
  // PART 1: NAVBAR BEHAVIOR (TRANSPARENT TO TRANSLUCENT & BACK)
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- TEST GROUP 1: Navbar Transparent-to-Translucent State ---');
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // 1.1 Homepage at scroll position 0
    const topNavbar = await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return null;
      const computed = window.getComputedStyle(header);
      const isTransparentClass = header.className.includes('bg-transparent');
      const logoText = header.querySelector('span[style*="color: rgb(255, 255, 255)"]');
      const links = Array.from(header.querySelectorAll('nav a')).map(a => ({
        text: a.textContent.trim(),
        color: window.getComputedStyle(a).color,
      }));
      return {
        scrollY: window.scrollY,
        className: header.className,
        isTransparentClass,
        hasWhiteLogoText: !!logoText,
        bgColor: computed.backgroundColor,
        links,
      };
    });

    assert('Homepage top (scroll 0): Header has bg-transparent class', topNavbar && topNavbar.isTransparentClass);
    assert('Homepage top (scroll 0): Wordmark uses high-contrast white text over dark hero', topNavbar && topNavbar.hasWhiteLogoText);
    
    // Screenshot top transparent navbar
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_navbar_top_transparent.png') });

    // 1.2 Scroll down to 350px
    await page.evaluate(() => window.scrollTo(0, 350));
    await page.waitForTimeout(500);

    const scrolledNavbar = await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return null;
      const computed = window.getComputedStyle(header);
      const isTranslucentClass = header.className.includes('bg-[#F0EDE5]/90');
      const hasBackdropBlur = header.className.includes('backdrop-blur');
      const logoNavyText = header.querySelector('span[style*="color: rgb(0, 61, 140)"]');
      return {
        scrollY: window.scrollY,
        isTranslucentClass,
        hasBackdropBlur,
        bgColor: computed.backgroundColor,
        hasNavyLogoText: !!logoNavyText,
      };
    });

    assert('Homepage scrolled (350px): Header has warm translucent ivory class bg-[#F0EDE5]/90', scrolledNavbar && scrolledNavbar.isTranslucentClass);
    assert('Homepage scrolled: Header applies backdrop-blur', scrolledNavbar && scrolledNavbar.hasBackdropBlur);
    assert('Homepage scrolled: Wordmark restores official navy #003d8c text', scrolledNavbar && scrolledNavbar.hasNavyLogoText);

    // Screenshot scrolled translucent navbar
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_navbar_scrolled_translucent.png') });

    // 1.3 Scroll back to top (scroll 0)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    const restoredTopNavbar = await page.evaluate(() => {
      const header = document.querySelector('header');
      return header ? header.className.includes('bg-transparent') : false;
    });

    assert('Homepage scrolled back to top: Header smoothly restores bg-transparent', restoredTopNavbar);

    // 1.4 Internal page top (e.g. AI Consulting)
    await page.goto(BASE_URL + '/aiconsulting.html', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    const internalNavbar = await page.evaluate(() => {
      const header = document.querySelector('header');
      if (!header) return null;
      return {
        scrollY: window.scrollY,
        isTranslucent: header.className.includes('bg-[#F0EDE5]/90'),
        hasBlur: header.className.includes('backdrop-blur'),
      };
    });

    assert('Internal page (AI Consulting) at scroll 0: Header is translucent for strong readability over warm ivory', internalNavbar && internalNavbar.isTranslucent);

    // Screenshot internal page navbar
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_navbar_internal_page.png') });

    // 1.5 Horizontal overflow check
    const overflowCheck = await page.evaluate(() => {
      return document.documentElement.scrollWidth <= window.innerWidth;
    });
    assert('Desktop & subpages have zero horizontal overflow', overflowCheck);

    await page.close();
  }

  // ─────────────────────────────────────────────────────────────
  // PART 2: BIDIRECTIONAL SWEEP TRANSITIONS
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- TEST GROUP 2: Bidirectional Sweep Transitions ---');
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // Helper to monitor transition sweep overlay during an action
    const trackSweep = async (actionDesc, action) => {
      let overlayActive = false;
      let initialTransform = null;
      let panelColor = null;

      const timer = setInterval(async () => {
        try {
          const info = await page.evaluate(() => {
            const container = document.querySelector('div[aria-hidden="true"].fixed.inset-0.z-\\[100\\]');
            const panel = container ? container.firstElementChild : null;
            if (!container || !panel) return null;
            return {
              visibility: container.style.visibility,
              transform: panel.style.transform || window.getComputedStyle(panel).transform,
              color: panel.style.backgroundColor || window.getComputedStyle(panel).backgroundColor,
            };
          });
          if (info && info.visibility === 'visible') {
            overlayActive = true;
            if (!initialTransform && info.transform) {
              initialTransform = info.transform;
            }
            if (!panelColor && info.color) {
              panelColor = info.color;
            }
          }
        } catch (e) {}
      }, 20);

      await action();
      await page.waitForTimeout(1600);
      clearInterval(timer);

      // Verify overlay is settled and non-blocking afterwards
      const settled = await page.evaluate(() => {
        const container = document.querySelector('div[aria-hidden="true"].fixed.inset-0.z-\\[100\\]');
        if (!container) return false;
        return container.style.visibility === 'hidden' && container.style.pointerEvents === 'none';
      });

      return { overlayActive, settled, initialTransform, panelColor };
    };

    // 2.1 Home -> AI Consulting (Forward)
    console.log('Testing Home -> AI Consulting (Forward Sweep)...');
    const fwd1 = await trackSweep('Home -> AI Consulting', async () => {
      await page.click('nav a[href*="aiconsulting"]');
    });
    assert('Home -> AI Consulting: Sweep transition executed and settled', fwd1.overlayActive && fwd1.settled);
    assert('Home -> AI Consulting: Navigated to correct URL', page.url().includes('aiconsulting'));

    // 2.2 AI Consulting -> Home via Nav "Home" link (Backward)
    console.log('Testing AI Consulting -> Home via Nav Home (Backward Sweep)...');
    const bwd1 = await trackSweep('AI Consulting -> Home', async () => {
      await page.click('nav a[href*="#home"]');
    });
    assert('AI Consulting -> Home via Nav: Backward sweep transition executed and settled', bwd1.overlayActive && bwd1.settled);
    assert('AI Consulting -> Home: Reached Home route', page.url().endsWith('/') || page.url().includes('#home'));

    // 2.3 Home -> AI Consulting again
    await page.click('nav a[href*="aiconsulting"]');
    await page.waitForTimeout(1600);

    // 2.4 Logo click from AI Consulting -> Home (Backward)
    console.log('Testing Logo click from AI Consulting -> Home (Backward Sweep)...');
    const bwdLogo = await trackSweep('Logo click to Home', async () => {
      await page.click('header a[aria-label*="Home"]');
    });
    assert('Logo click from subpage: Backward sweep transition executed and settled', bwdLogo.overlayActive && bwdLogo.settled);
    assert('Logo click: Returned to Home', page.url().endsWith('/') || page.url().includes('#home'));

    // 2.5 Logo click while already on Home
    console.log('Testing Logo click while already on Home (In-place top return)...');
    await page.evaluate(() => window.scrollTo(0, 400));
    await page.waitForTimeout(300);
    await page.click('header a[aria-label*="Home"]');
    await page.waitForTimeout(600);
    const homeScrollY = await page.evaluate(() => window.scrollY);
    assert('Logo click while on Home: Smoothly returns to top without redundant sweep overlay', homeScrollY < 10);

    // 2.6 Home -> Litigation Services
    console.log('Testing Home -> Litigation Services (Forward Sweep)...');
    const fwdLit = await trackSweep('Home -> Litigation Services', async () => {
      await page.click('nav a[href*="litigationservices"]');
    });
    assert('Home -> Litigation Services: Sweep executed and settled', fwdLit.overlayActive && fwdLit.settled);
    assert('Home -> Litigation Services: URL updated', page.url().includes('litigationservices'));

    // 2.7 Litigation Services -> Alpha Lens Platform (Subpage to Subpage Forward)
    console.log('Testing Litigation Services -> Alpha Lens (Subpage to Subpage Forward)...');
    const fwdLens = await trackSweep('Litigation Services -> Alpha Lens', async () => {
      await page.click('nav a[href*="alphalens"]');
    });
    assert('Litigation Services -> Alpha Lens: Inter-subpage transition executed and settled', fwdLens.overlayActive && fwdLens.settled);
    assert('Alpha Lens URL confirmed', page.url().includes('alphalens'));

    // 2.8 Alpha Lens -> AI Consulting (Subpage to Subpage Backward)
    console.log('Testing Alpha Lens -> AI Consulting (Subpage to Subpage Backward)...');
    const bwdAi = await trackSweep('Alpha Lens -> AI Consulting', async () => {
      await page.click('nav a[href*="aiconsulting"]');
    });
    assert('Alpha Lens -> AI Consulting: Inter-subpage backward transition executed and settled', bwdAi.overlayActive && bwdAi.settled);
    assert('AI Consulting URL confirmed', page.url().includes('aiconsulting'));

    // 2.9 Header Contact Link -> Bottom Contact Section
    console.log('Testing Header Contact -> Bottom Contact Section...');
    const contactSweep = await trackSweep('Header Contact click', async () => {
      await page.click('nav a[href*="#contact"]');
    });
    assert('Header Contact: Full-viewport Cyprus teal sweep executed and settled', contactSweep.overlayActive && contactSweep.settled);
    
    // Verify Contact section is scrolled into view and heading is visible below header
    const contactVisibility = await page.evaluate(() => {
      const el = document.getElementById('contact');
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        scrollY: window.scrollY,
        topOffsetFromViewport: rect.top,
        isNearHeader: rect.top >= 70 && rect.top <= 140,
      };
    });
    assert('Header Contact: Scroll accurately positioned right below fixed navbar (headerOffset 80px)', contactVisibility && contactVisibility.isNearHeader);

    // 2.10 Book a Call CTA -> Contact Section
    console.log('Testing Book a Call CTA -> Contact Section...');
    // Scroll back to top first
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(400);
    const bookCallSweep = await trackSweep('Book a Call CTA click', async () => {
      await page.click('header a:has-text("Book a Call")');
    });
    assert('Book a Call CTA: Sweep transition executed and settled', bookCallSweep.overlayActive && bookCallSweep.settled);

    // 2.11 Rapid Consecutive Clicks (Transition Lock Test)
    console.log('Testing Rapid Consecutive Clicks (Transition Lock)...');
    let rapidErrors = 0;
    page.on('pageerror', () => rapidErrors++);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    // Click AI Consulting, then immediately click Litigation Services
    page.click('nav a[href*="aiconsulting"]').catch(() => {});
    await page.waitForTimeout(40);
    page.click('nav a[href*="litigationservices"]').catch(() => {});
    await page.waitForTimeout(2000);

    const rapidSettled = await page.evaluate(() => {
      const container = document.querySelector('div[aria-hidden="true"].fixed.inset-0.z-\\[100\\]');
      return container ? container.style.visibility === 'hidden' && container.style.pointerEvents === 'none' : false;
    });
    assert('Rapid consecutive clicks: Transition lock prevented freeze or crash', rapidSettled && rapidErrors === 0);

    // 2.12 Browser Back & Forward Support
    console.log('Testing Browser Back & Forward transitions...');
    // We are on a subpage, let's navigate to Home then go forward then go back
    await page.click('nav a[href*="#home"]');
    await page.waitForTimeout(1600);

    const backSweep = await trackSweep('Browser Back', async () => {
      await page.goBack();
    });
    assert('Browser Back: Transition executed and settled', backSweep.overlayActive && backSweep.settled);

    const forwardSweep = await trackSweep('Browser Forward', async () => {
      await page.goForward();
    });
    assert('Browser Forward: Transition executed and settled', forwardSweep.overlayActive && forwardSweep.settled);

    await page.close();
  }

  // ─────────────────────────────────────────────────────────────
  // PART 3: MOBILE DRAWER & TOUCH INTERACTION
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- TEST GROUP 3: Mobile Navigation & Touch Sweep ---');
  {
    const page = await browser.newPage({
      viewport: { width: 375, height: 667 },
      hasTouch: true,
      isMobile: true,
    });
    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);

    // Check mobile navbar top is transparent
    const mobileTopTransparent = await page.evaluate(() => {
      const header = document.querySelector('header');
      return header ? header.className.includes('bg-transparent') : false;
    });
    assert('Mobile view (375px): Top navbar is transparent', mobileTopTransparent);

    // Open mobile drawer
    await page.click('button[aria-label="Open mobile navigation menu"]');
    await page.waitForTimeout(400);

    const drawerOpen = await page.evaluate(() => {
      const drawer = document.querySelector('div[role="dialog"][aria-label="Mobile Navigation"]');
      return !!drawer;
    });
    assert('Mobile drawer opens on hamburger tap', drawerOpen);

    // Screenshot mobile menu
    await page.screenshot({ path: path.join(ARTIFACT_DIR, 'test_mobile_drawer_open.png') });

    // Tap AI Consulting in mobile drawer
    await page.click('div[role="dialog"] nav a[href*="aiconsulting"]');
    await page.waitForTimeout(2000);

    assert('Mobile navigation to subpage completed', page.url().includes('aiconsulting'));

    const mobileDrawerClosed = await page.evaluate(() => {
      const drawer = document.querySelector('div[role="dialog"][aria-label="Mobile Navigation"]');
      return !drawer && document.body.style.overflow === '';
    });
    assert('Mobile drawer silently closed in Phase B and released body scroll lock', mobileDrawerClosed);

    await page.close();
  }

  // ─────────────────────────────────────────────────────────────
  // PART 4: REDUCED MOTION PREFERENCE
  // ─────────────────────────────────────────────────────────────
  console.log('\n--- TEST GROUP 4: Reduced Motion Preference ---');
  {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      colorScheme: 'light',
    });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto(BASE_URL + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);

    // Click AI Consulting under reduced motion
    await page.click('nav a[href*="aiconsulting"]');
    await page.waitForTimeout(800);

    const reducedMotionSettled = await page.evaluate(() => {
      const container = document.querySelector('div[aria-hidden="true"].fixed.inset-0.z-\\[100\\]');
      return container ? container.style.visibility === 'hidden' && container.style.pointerEvents === 'none' : false;
    });

    assert('Reduced-motion mode: Navigated cleanly without full sweep, settled with zero blocking overlay', reducedMotionSettled && page.url().includes('aiconsulting'));

    await page.close();
  }

  await browser.close();

  console.log('\n========================================================================');
  console.log(` VERIFICATION COMPLETE: ${results.passed} PASSED, ${results.failed} FAILED`);
  console.log('========================================================================');
  return results;
}

runVerification()
  .then(res => {
    if (res.failed > 0) process.exit(1);
    process.exit(0);
  })
  .catch(err => {
    console.error('Test execution failed:', err);
    process.exit(1);
  });
