/**
 * Central Image Asset Configuration
 * 
 * High-resolution, royalty-free editorial imagery curated for
 * Alpha Applied Analytics Solutions' practice areas, audience categories,
 * and platform capabilities.
 * 
 * Replaceable by the client with local assets anytime.
 */

export interface CardImageMeta {
  src: string;
  alt: string;
  category?: string;
}

export const cardImages = {
  pillars: {
    aiConsulting: {
      src: '/images/cards/card-ai-consulting.webp',
      alt: 'AI Consulting and Strategic Workflow Architecture',
      category: 'PRIMARY PRACTICE',
    },
    litigationServices: {
      src: '/images/cards/card-litigation-services.webp',
      alt: 'Litigation Services and Forensic Legal Evidence Analysis',
      category: 'FORENSIC SERVICES',
    },
    alphaLensPlatform: {
      src: '/images/cards/card-alpha-lens.webp',
      alt: 'Alpha Lens Platform Document Intelligence and Analytics',
      category: 'AI PLATFORM',
    },
  },
  litigation: {
    divorceFamilyLaw: {
      src: '/images/cards/litigation-divorce-family-law.webp',
      alt: 'Marital Asset Tracing and Financial Records Analysis',
    },
    economicDamages: {
      src: '/images/cards/litigation-economic-damages.webp',
      alt: 'Economic Damages, Lost Profit Analysis, and Business Valuation',
    },
    documentAnalysis: {
      src: '/images/cards/litigation-document-analysis.webp',
      alt: 'Forensic Document Intelligence and Structured Discovery Review',
    },
    bankruptcyRestructuring: {
      src: '/images/cards/litigation-bankruptcy-restructuring.webp',
      alt: 'Bankruptcy Asset Reconstruction and Corporate Solvency Analytics',
    },
    intellectualProperty: {
      src: '/images/cards/litigation-intellectual-property.webp',
      alt: 'Intellectual Property Valuation and Patent Analysis',
    },
    litigationSupport: {
      src: '/images/cards/litigation-support.webp',
      alt: 'Litigation Support, Evidence Preparation, and Trial-Ready Reporting',
    },
  },
  whoWeServe: {
    lawFirms: {
      src: '/images/cards/who-we-serve-attorneys.webp',
      alt: 'Attorneys and Law Firms Litigation Analysis Work',
    },
    corporateCounsel: {
      src: '/images/cards/who-we-serve-cdfa.webp',
      alt: 'CDFA Practitioners and Forensic Financial Analysis',
    },
    financialInstitutions: {
      src: '/images/cards/who-we-serve-litigation-advisory.webp',
      alt: 'Litigation and Advisory Teams Multi-Entity Dispute Analytics',
    },
  },
  alphalens: {
    moduleIngestion: {
      src: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&w=800&q=80',
      alt: 'Document Ingestion and Parsing Module',
    },
    moduleChronology: {
      src: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=800&q=80',
      alt: 'Chronology and Entity Tracing Module',
    },
    moduleFinancial: {
      src: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      alt: 'Forensic Transaction and Ledger Analytics',
    },
    moduleCrossExam: {
      src: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?auto=format&fit=crop&w=800&q=80',
      alt: 'Cross-Examination Prep and Work Product Output',
    },
    capabilityContinuous: {
      src: '/images/cards/alphalens-multi-tab-reports.webp',
      alt: 'Multi-Tab Reports and Comprehensive Excel Workbooks',
    },
    capabilityTraceability: {
      src: '/images/cards/alphalens-interactive-visualizations.webp',
      alt: 'Interactive Visualizations, Diagrams, and Financial Demonstratives',
    },
    capabilityReconciliation: {
      src: '/images/cards/alphalens-anomaly-detection.webp',
      alt: 'Anomaly Detection, Pattern Recognition, and Irregularity Flagging',
    },
    capabilityMultiFormat: {
      src: '/images/cards/alphalens-project-tracking.webp',
      alt: 'Project Tracking Dashboard, Production Visibility, and Audit Logs',
    },
  },
};
