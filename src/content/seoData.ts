export interface RouteSEOData {
  title: string;
  description: string;
  canonical: string;
  ogType: 'website' | 'article';
  ogImage: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
  schema?: Record<string, unknown>;
}

export const BASE_PRODUCTION_DOMAIN = 'https://alphaanalyticssol.com';

export const siteSEOData: Record<string, RouteSEOData> = {
  home: {
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

  'ai-consulting': {
    title: 'AI Consulting & Implementation | Alpha Applied Analytics Solutions',
    description:
      'Practical AI consulting, workflow automation, and enterprise data readiness advisory for legal counsel and corporate leadership.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/aiconsulting.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/card-ai-consulting.png`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_PRODUCTION_DOMAIN}/` },
      { name: 'AI Consulting & Implementation', url: `${BASE_PRODUCTION_DOMAIN}/aiconsulting.html` },
    ],
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

  'litigation-services': {
    title: 'Litigation Services & Financial Analysis | Alpha Applied Analytics Solutions',
    description:
      'Specialized litigation financial analysis, damages modeling, and dispute discovery support across six core practice areas for trial attorneys.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/litigationservices.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/card-litigation-services.png`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_PRODUCTION_DOMAIN}/` },
      { name: 'Litigation Services', url: `${BASE_PRODUCTION_DOMAIN}/litigationservices.html` },
    ],
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

  'alpha-lens': {
    title: 'Alpha Lens AI | Litigation Analysis Platform',
    description:
      'Alpha Lens AI litigation platform for automated bank statement extraction, financial transaction analysis, and dispute document intelligence.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/alphalens.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/card-alpha-lens.png`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_PRODUCTION_DOMAIN}/` },
      { name: 'Alpha Lens Platform', url: `${BASE_PRODUCTION_DOMAIN}/alphalens.html` },
    ],
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

  'divorce-family-law': {
    title: 'Divorce & Family Law | Litigation Services | Alpha Applied Analytics Solutions',
    description:
      'Identify hidden income patterns, trace marital asset dissipation, and produce court-ready financial reports for high-net-worth divorce proceedings.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/divorcefamilylaw.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/litigation-divorce-family-law.png`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_PRODUCTION_DOMAIN}/` },
      { name: 'Litigation Services', url: `${BASE_PRODUCTION_DOMAIN}/litigationservices.html` },
      { name: 'Divorce & Family Law', url: `${BASE_PRODUCTION_DOMAIN}/divorcefamilylaw.html` },
    ],
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

  'economic-damages': {
    title: 'Economic Damages & Valuation | Litigation Services | Alpha Applied Analytics Solutions',
    description:
      'Precise economic damage calculations, lost profits analysis, and business valuation backed by defensible financial methodology.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/economicdamages.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/litigation-economic-damages.png`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_PRODUCTION_DOMAIN}/` },
      { name: 'Litigation Services', url: `${BASE_PRODUCTION_DOMAIN}/litigationservices.html` },
      { name: 'Economic Damages', url: `${BASE_PRODUCTION_DOMAIN}/economicdamages.html` },
    ],
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

  'document-analysis': {
    title: 'Document Analysis & Structuring | Litigation Services | Alpha Applied Analytics Solutions',
    description:
      'Institutional financial document analysis, transaction extraction, and litigation-grade data structuring for complex disputes.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/documentanalysis.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/litigation-document-analysis.png`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_PRODUCTION_DOMAIN}/` },
      { name: 'Litigation Services', url: `${BASE_PRODUCTION_DOMAIN}/litigationservices.html` },
      { name: 'Document Analysis', url: `${BASE_PRODUCTION_DOMAIN}/documentanalysis.html` },
    ],
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

  'bankruptcy-restructuring': {
    title: 'Bankruptcy & Restructuring | Litigation Services | Alpha Applied Analytics Solutions',
    description:
      'Comprehensive financial tracing, asset reconstruction, solvency analysis, and preference payment investigation for bankruptcy proceedings.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/bankruptcyrestructuring.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/litigation-bankruptcy-restructuring.png`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_PRODUCTION_DOMAIN}/` },
      { name: 'Litigation Services', url: `${BASE_PRODUCTION_DOMAIN}/litigationservices.html` },
      { name: 'Bankruptcy & Restructuring', url: `${BASE_PRODUCTION_DOMAIN}/bankruptcyrestructuring.html` },
    ],
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

  'intellectual-property': {
    title: 'Intellectual Property Disputes | Litigation Services | Alpha Applied Analytics Solutions',
    description:
      'IP valuation, lost profits, reasonable royalty modeling, and financial dispute analysis for patent, trademark, and trade secret litigation.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/intellectualproperty.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/litigation-intellectual-property.png`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_PRODUCTION_DOMAIN}/` },
      { name: 'Litigation Services', url: `${BASE_PRODUCTION_DOMAIN}/litigationservices.html` },
      { name: 'Intellectual Property', url: `${BASE_PRODUCTION_DOMAIN}/intellectualproperty.html` },
    ],
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

  'litigation-support': {
    title: 'Litigation Support & Investigation | Alpha Applied Analytics Solutions',
    description:
      'Trial-ready analytics, expert witness support, financial investigation, and quantitative trial strategy for complex dispute resolution.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/litigationsupport.html`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/litigation-support.png`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_PRODUCTION_DOMAIN}/` },
      { name: 'Litigation Services', url: `${BASE_PRODUCTION_DOMAIN}/litigationservices.html` },
      { name: 'Litigation Support', url: `${BASE_PRODUCTION_DOMAIN}/litigationsupport.html` },
    ],
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

  'terms-of-service': {
    title: 'Terms of Service | Alpha Applied Analytics Solutions',
    description:
      'Official Terms of Service for Alpha Applied Analytics Solutions LLC, governing dispute analysis platforms, advisory services, and website usage.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/terms-of-service`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/card-litigation-services.png`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_PRODUCTION_DOMAIN}/` },
      { name: 'Terms of Service', url: `${BASE_PRODUCTION_DOMAIN}/terms-of-service` },
    ],
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

  'privacy-policy': {
    title: 'Privacy Policy | Alpha Applied Analytics Solutions',
    description:
      'Official Privacy Policy for Alpha Applied Analytics Solutions LLC, detailing our client confidentiality, data handling, and privacy safeguards.',
    canonical: `${BASE_PRODUCTION_DOMAIN}/privacy-policy`,
    ogType: 'article',
    ogImage: `${BASE_PRODUCTION_DOMAIN}/images/cards/card-litigation-services.png`,
    breadcrumbs: [
      { name: 'Home', url: `${BASE_PRODUCTION_DOMAIN}/` },
      { name: 'Privacy Policy', url: `${BASE_PRODUCTION_DOMAIN}/privacy-policy` },
    ],
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
