const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

const pages = [
  '/aiconsulting.html',
  '/alphalens.html',
  '/litigationservices.html',
  '/divorcefamilylaw.html',
  '/economicdamages.html',
  '/documentanalysis.html',
  '/bankruptcyrestructuring.html',
  '/intellectualproperty.html',
  '/litigationsupport.html',
  '/terms-of-service.html',
  '/privacy-policy.html'
];

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  page.on('console', msg => {
    if (msg.type() === 'error') console.log('BROWSER ERROR:', msg.text());
  });

  for (const p of pages) {
    console.log(`\nTesting page: ${p}`);
    await page.goto(`http://localhost:5173${p}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(400);

    // 1. Check if breadcrumb Home link exists and works
    const breadcrumbHome = await page.$('nav[aria-label="Breadcrumb"] a[href*="home"]');
    if (breadcrumbHome) {
      let sweep = false;
      const poll = setInterval(async () => {
        const vis = await page.evaluate(() => {
          const o = document.querySelector('div[aria-hidden="true"].fixed.inset-0');
          return o ? o.style.visibility : null;
        });
        if (vis === 'visible') sweep = true;
      }, 20);

      await breadcrumbHome.click();
      await page.waitForTimeout(1000);
      clearInterval(poll);
      console.log(`  Breadcrumb Home click -> URL: ${page.url()}, sweep: ${sweep}`);

      // Go back to the internal page
      await page.goto(`http://localhost:5173${p}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(400);
    }

    // 2. Check Logo click
    let logoSweep = false;
    const poll2 = setInterval(async () => {
      const vis = await page.evaluate(() => {
        const o = document.querySelector('div[aria-hidden="true"].fixed.inset-0');
        return o ? o.style.visibility : null;
      });
      if (vis === 'visible') logoSweep = true;
    }, 20);

    const logo = await page.$('header a[aria-label*="Home"]');
    if (logo) {
      await logo.click();
      await page.waitForTimeout(1000);
      clearInterval(poll2);
      console.log(`  Header Logo click -> URL: ${page.url()}, sweep: ${logoSweep}`);
    }
  }

  await browser.close();
  console.log('\nAll pages tested.');
})();
