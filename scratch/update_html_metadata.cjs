const fs = require('fs');
const path = require('path');

const BASE_PRODUCTION_DOMAIN = 'https://alphaanalyticssol.com';

const siteSEOData = {
  'index.html': {
    title: 'Alpha Applied Analytics Solutions | Litigation Analytics & AI Consulting',
    description:
      'Institutional-grade financial analysis, dispute discovery intelligence with Alpha Lens, and practical AI advisory for legal counsel and corporations.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/`,
    ogType: 'website',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/card-litigation-services.png`,
    schema: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${BASE_PRODUCTION_DOMAIN}/#website`,
          url: `${BASE_PRODUCTION_DOMAIN}/`,
          name: 'Alpha Applied Analytics Solutions',
          description:
            'Institutional-grade financial analysis, dispute discovery intelligence with Alpha Lens, and practical AI advisory for legal counsel and corporations.',
          publisher: {
            '@id': `${BASE_PRODUCTION_DOMAIN}/#organization`,
          },
        },
        {
          '@type': 'Organization',
          '@id': `${BASE_PRODUCTION_DOMAIN}/#organization`,
          name: 'Alpha Applied Analytics Solutions LLC',
          url: `${BASE_PRODUCTION_DOMAIN}/`,
          logo: `${BASE_PRODUCTION_DOMAIN}/alpha-logo.svg`,
          email: 'info@alphaanalyticssol.com',
        },
      ],
    },
  },

  'aiconsulting.html': {
    title: 'AI Consulting & Implementation | Alpha Applied Analytics Solutions',
    description:
      'Practical AI consulting, workflow automation, and enterprise data readiness advisory for legal counsel and corporate leadership.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/aiconsulting.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/card-ai-consulting.png`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${BASE_PRODUCTION_DOMAIN}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'AI Consulting & Implementation',
          item: `${BASE_PRODUCTION_DOMAIN}/aiconsulting.html`,
        },
      ],
    },
  },

  'litigationservices.html': {
    title: 'Litigation Services & Financial Analysis | Alpha Applied Analytics Solutions',
    description:
      'Specialized litigation financial analysis, damages modeling, and dispute discovery support across six core practice areas for trial attorneys.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/litigationservices.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/card-litigation-services.png`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${BASE_PRODUCTION_DOMAIN}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Litigation Services',
          item: `${BASE_PRODUCTION_DOMAIN}/litigationservices.html`,
        },
      ],
    },
  },

  'alphalens.html': {
    title: 'Alpha Lens AI | Litigation Analysis Platform',
    description:
      'Alpha Lens AI litigation platform for automated bank statement extraction, financial transaction analysis, and dispute document intelligence.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/alphalens.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/card-alpha-lens.png`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${BASE_PRODUCTION_DOMAIN}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Alpha Lens Platform',
          item: `${BASE_PRODUCTION_DOMAIN}/alphalens.html`,
        },
      ],
    },
  },

  'divorcefamilylaw.html': {
    title: 'Divorce & Family Law | Litigation Services | Alpha Applied Analytics Solutions',
    description:
      'Identify hidden income patterns, trace marital asset dissipation, and produce court-ready financial reports for high-net-worth divorce proceedings.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/divorcefamilylaw.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/litigation-divorce-family-law.png`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${BASE_PRODUCTION_DOMAIN}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Litigation Services',
          item: `${BASE_PRODUCTION_DOMAIN}/litigationservices.html`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Divorce & Family Law',
          item: `${BASE_PRODUCTION_DOMAIN}/divorcefamilylaw.html`,
        },
      ],
    },
  },

  'economicdamages.html': {
    title: 'Economic Damages & Valuation | Litigation Services | Alpha Applied Analytics Solutions',
    description:
      'Precise economic damage calculations, lost profits analysis, and business valuation backed by defensible financial methodology.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/economicdamages.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/litigation-economic-damages.png`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${BASE_PRODUCTION_DOMAIN}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Litigation Services',
          item: `${BASE_PRODUCTION_DOMAIN}/litigationservices.html`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Economic Damages',
          item: `${BASE_PRODUCTION_DOMAIN}/economicdamages.html`,
        },
      ],
    },
  },

  'documentanalysis.html': {
    title: 'Document Analysis & Structuring | Litigation Services | Alpha Applied Analytics Solutions',
    description:
      'Institutional financial document analysis, transaction extraction, and litigation-grade data structuring for complex disputes.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/documentanalysis.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/litigation-document-analysis.png`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${BASE_PRODUCTION_DOMAIN}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Litigation Services',
          item: `${BASE_PRODUCTION_DOMAIN}/litigationservices.html`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Document Analysis',
          item: `${BASE_PRODUCTION_DOMAIN}/documentanalysis.html`,
        },
      ],
    },
  },

  'bankruptcyrestructuring.html': {
    title: 'Bankruptcy & Restructuring | Litigation Services | Alpha Applied Analytics Solutions',
    description:
      'Comprehensive financial tracing, asset reconstruction, solvency analysis, and preference payment investigation for bankruptcy proceedings.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/bankruptcyrestructuring.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/litigation-bankruptcy-restructuring.png`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${BASE_PRODUCTION_DOMAIN}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Litigation Services',
          item: `${BASE_PRODUCTION_DOMAIN}/litigationservices.html`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Bankruptcy & Restructuring',
          item: `${BASE_PRODUCTION_DOMAIN}/bankruptcyrestructuring.html`,
        },
      ],
    },
  },

  'intellectualproperty.html': {
    title: 'Intellectual Property Disputes | Litigation Services | Alpha Applied Analytics Solutions',
    description:
      'IP valuation, lost profits, reasonable royalty modeling, and financial dispute analysis for patent, trademark, and trade secret litigation.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/intellectualproperty.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/litigation-intellectual-property.png`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${BASE_PRODUCTION_DOMAIN}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Litigation Services',
          item: `${BASE_PRODUCTION_DOMAIN}/litigationservices.html`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Intellectual Property',
          item: `${BASE_PRODUCTION_DOMAIN}/intellectualproperty.html`,
        },
      ],
    },
  },

  'litigationsupport.html': {
    title: 'Litigation Support & Investigation | Litigation Services | Alpha Applied Analytics Solutions',
    description:
      'Trial-ready analytics, expert witness support, financial investigation, and quantitative trial strategy for complex dispute resolution.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/litigationsupport.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/litigation-support.png`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${BASE_PRODUCTION_DOMAIN}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Litigation Services',
          item: `${BASE_PRODUCTION_DOMAIN}/litigationservices.html`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Litigation Support',
          item: `${BASE_PRODUCTION_DOMAIN}/litigationsupport.html`,
        },
      ],
    },
  },

  'terms-of-service.html': {
    title: 'Terms of Service | Alpha Applied Analytics Solutions',
    description:
      'Official Terms of Service for Alpha Applied Analytics Solutions LLC, governing dispute analysis platforms, advisory services, and website usage.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/terms-of-service`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/card-litigation-services.png`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${BASE_PRODUCTION_DOMAIN}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Terms of Service',
          item: `${BASE_PRODUCTION_DOMAIN}/terms-of-service`,
        },
      ],
    },
  },

  'privacy-policy.html': {
    title: 'Privacy Policy | Alpha Applied Analytics Solutions',
    description:
      'Official Privacy Policy for Alpha Applied Analytics Solutions LLC, detailing our client confidentiality, data handling, and privacy safeguards.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/privacy-policy`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/card-litigation-services.png`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: `${BASE_PRODUCTION_DOMAIN}/`,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Privacy Policy',
          item: `${BASE_PRODUCTION_DOMAIN}/privacy-policy`,
        },
      ],
    },
  },
};

const projectDir = 'C:\\Users\\jaiav\\OneDrive\\Desktop\\alpha-applied-analytics-v2\\alpha-applied-analytics-v2';

Object.entries(siteSEOData).forEach(([filename, seo]) => {
  const filePath = path.join(projectDir, filename);
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Document Title & Primary Meta -->
    <title>${seo.title}</title>
    <meta name="description" content="${seo.description}" />
    <link rel="canonical" href="${seo.canonical}" />

    <!-- Open Graph / Facebook / LinkedIn -->
    <meta property="og:title" content="${seo.title}" />
    <meta property="og:description" content="${seo.description}" />
    <meta property="og:url" content="${seo.canonical}" />
    <meta property="og:type" content="${seo.ogType}" />
    <meta property="og:site_name" content="Alpha Applied Analytics Solutions" />
    <meta property="og:image" content="${seo.ogImage}" />

    <!-- Twitter / X -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${seo.title}" />
    <meta name="twitter:description" content="${seo.description}" />
    <meta name="twitter:image" content="${seo.ogImage}" />

    <!-- Preconnect to Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">

    <!-- Schema.org Structured Data (JSON-LD) -->
    <script type="application/ld+json">
${JSON.stringify(seo.schema, null, 2)}
    </script>
  </head>
  <body class="bg-surface-warm text-brand-dark font-sans antialiased selection:bg-primary/20 selection:text-primary">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

  fs.writeFileSync(filePath, html, 'utf8');
  console.log('Updated:', filename);
});
