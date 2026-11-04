const { chromium } = require('C:/Users/jaiav/OneDrive/Desktop/Final_Portfolio/node_modules/playwright-core');

async function testMotion() {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
  });

  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  // Inject the animation style
  await page.evaluate(() => {
    const style = document.createElement('style');
    style.id = 'test-hero-drift';
    style.innerHTML = `
      @keyframes heroSubtleDrift {
        0% { transform: scale(1.0) translate3d(0, 0, 0); }
        100% { transform: scale(1.03) translate3d(-4px, -3px, 0); }
      }
      .hero-subtle-drift {
        animation: heroSubtleDrift 28s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite alternate !important;
        will-change: transform;
        transform-origin: 75% 45%;
      }
    `;
    document.head.appendChild(style);

    const img = document.querySelector('#home img');
    if (img) img.classList.add('hero-subtle-drift');
  });

  await page.waitForTimeout(1000);

  // Check overflow
  const overflow = await page.evaluate(() => {
    return {
      docWidth: document.documentElement.scrollWidth,
      winWidth: window.innerWidth,
      hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  });

  console.log('Overflow check:', overflow);

  await browser.close();
}

testMotion().catch(console.error);
