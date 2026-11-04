const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');
const path = require('path');

const artifactDir = 'C:/Users/jaiav/.gemini/antigravity/brain/8fdb93fd-651c-4939-8951-6fe47b1aef17';

async function testTypographyOptions() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();

  const options = [
    {
      id: 'opt_28px',
      name: '28px Desktop (leading 1.25)',
      desktopSize: '28px',
      desktopLeading: '35px',
      tabletSize: '24px',
      tabletLeading: '30px',
      mobileSize: '22px',
      mobileLeading: '28px',
    },
    {
      id: 'opt_29px',
      name: '29px Desktop (leading 1.22)',
      desktopSize: '29px',
      desktopLeading: '35.5px',
      tabletSize: '24px',
      tabletLeading: '30px',
      mobileSize: '23px',
      mobileLeading: '29px',
    },
    {
      id: 'opt_30px',
      name: '30px Desktop (leading 1.24)',
      desktopSize: '30px',
      desktopLeading: '37px',
      tabletSize: '24px',
      tabletLeading: '30px',
      mobileSize: '24px',
      mobileLeading: '30px',
    },
  ];

  const viewports = [
    { name: 'desktop-1440', width: 1440, height: 900, type: 'desktop' },
    { name: 'desktop-1280', width: 1280, height: 800, type: 'desktop' },
    { name: 'laptop-1024', width: 1024, height: 768, type: 'desktop' },
    { name: 'tablet-768', width: 768, height: 1024, type: 'tablet' },
    { name: 'mobile-390', width: 390, height: 844, type: 'mobile' },
  ];

  for (const opt of options) {
    console.log(`\n=================== TESTING ${opt.name} ===================`);
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);

      // Apply styling
      const size = vp.type === 'desktop' ? opt.desktopSize : (vp.type === 'tablet' ? opt.tabletSize : opt.mobileSize);
      const leading = vp.type === 'desktop' ? opt.desktopLeading : (vp.type === 'tablet' ? opt.tabletLeading : opt.mobileLeading);

      const metrics = await page.evaluate(({ fSize, lHeight }) => {
        const cards = Array.from(document.querySelectorAll('#pillars .group'));
        return cards.map(c => {
          const h3 = c.querySelector('h3');
          if (h3) {
            h3.style.fontFamily = "'General Sans', system-ui, sans-serif";
            h3.style.fontWeight = '600';
            h3.style.fontSize = fSize;
            h3.style.lineHeight = lHeight;
            h3.style.color = '#004643';
          }
          // Get lines of text
          const lines = [];
          // Measure individual words positions to find wrap lines
          const words = h3.innerText.trim().split(/\s+/);
          // Let's get line break info
          const fullText = h3.innerText.trim();
          const rect = h3.getBoundingClientRect();

          return {
            title: fullText,
            height: Math.round(rect.height),
            width: Math.round(rect.width),
            cardHeight: Math.round(c.getBoundingClientRect().height),
          };
        });
      }, { fSize: size, lHeight: leading });

      console.log(`Viewport ${vp.name} (${size}/${leading}):`);
      metrics.forEach(m => console.log(`   "${m.title}": h3Height=${m.height}px, cardHeight=${m.cardHeight}px`));

      if (vp.name === 'desktop-1440' || vp.name === 'mobile-390') {
        const section = await page.$('#pillars');
        if (section) {
          await section.screenshot({
            path: path.join(artifactDir, `test_pillars_${opt.id}_${vp.name}.png`)
          });
        }
      }
    }
  }

  await browser.close();
}

testTypographyOptions().catch(console.error);
