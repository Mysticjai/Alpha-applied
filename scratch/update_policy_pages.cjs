const fs = require('fs');

function updatePolicy(p) {
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/<h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal/g, '<h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold');
  c = c.replace(/<h2 className="font-serif text-2xl sm:text-\[1\.65rem\] text-primary font-normal/g, '<h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold');
  c = c.replace(/<h3 className="font-serif text-lg(?: sm:text-xl)? text-primary font-normal/g, (match) => match.replace('font-normal', 'font-medium'));
  fs.writeFileSync(p, c, 'utf8');
  console.log('Updated:', p);
}

updatePolicy('C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2/src/pages/PrivacyPolicyPage.tsx');
updatePolicy('C:/Users/jaiav/OneDrive/Desktop/alpha-applied-analytics-v2/alpha-applied-analytics-v2/src/pages/TermsOfServicePage.tsx');
