/**
 * Authentic Litigation Services Data for Alpha Applied Analytics Solutions
 * Source of truth: Original deployed client application (https://alpha-website-dun.vercel.app/)
 * Contains verbatim titles, category eyebrows, introductory copy, overview narratives,
 * numbered deliverables, and consultation CTAs for all six forensic practice areas.
 */

export interface ForensicServiceItem {
  number: string;
  title: string;
  description: string;
}

export interface ForensicServiceData {
  id: string;
  route: string;
  eyebrow: string;
  title: string;
  intro: string;
  overviewHeading: string;
  overviewParagraphs: string[];
  items: ForensicServiceItem[];
  cta: {
    heading: string;
    description: string;
    buttonText: string;
    buttonHref: string;
  };
}

export const forensicServicesData: Record<string, ForensicServiceData> = {
  'divorce-family-law': {
    id: 'divorce-family-law',
    route: '/divorcefamilylaw.html',
    eyebrow: 'Litigation Analysis Financial Services',
    title: 'Divorce & Family Law Analytics',
    intro:
      'Data-driven financial clarity for complex family law matters. We specialize in financial analysis tailored for divorce and family law cases, uncovering and interpreting complex financial information.',
    overviewHeading: 'Comprehensive Financial Analysis for Family Law',
    overviewParagraphs: [
      'We provide expert litigation analysis financial services tailored for divorce and family law cases. Our services include income analysis and reconstruction to identify irregular earnings and present a complete financial picture. We trace and verify assets across accounts, businesses, and investments to ensure comprehensive disclosure.',
      'Our team evaluates lifestyle spending patterns to determine actual financial capacity and standard of living. We organize and analyze large volumes of bank statements, credit card data, and financial records with precision, delivering clear, litigation-ready insights that support fair outcomes in complex family law matters.',
    ],
    items: [
      {
        number: '01',
        title: 'Income Analysis',
        description: 'Comprehensive analysis of income streams including hidden or irregular earnings.',
      },
      {
        number: '02',
        title: 'Asset Tracing',
        description: 'Track and identify assets across accounts, businesses, and investments.',
      },
      {
        number: '03',
        title: 'Lifestyle Analysis',
        description: 'Evaluate spending patterns to determine financial capacity and standard of living.',
      },
      {
        number: '04',
        title: 'Document Review',
        description: 'Organize and analyze large volumes of bank statements and financial records.',
      },
      {
        number: '05',
        title: 'Financial Transparency',
        description: 'Ensure full disclosure with comprehensive financial analysis and reporting.',
      },
      {
        number: '06',
        title: 'Expert Support',
        description: 'Personal QC review and consultation support for your case strategy.',
      },
    ],
    cta: {
      heading: 'Ready to Uncover the Truth?',
      description:
        'Schedule a free 15-minute consultation to discuss your case and see how our litigation analysis can support your divorce litigation strategy.',
      buttonText: 'Book a Call',
      buttonHref: '/#contact',
    },
  },

  'economic-damages': {
    id: 'economic-damages',
    route: '/economicdamages.html',
    eyebrow: 'Damage Quantification',
    title: 'Economic Damages Analytics',
    intro:
      'Accurate financial loss assessment for high-stakes disputes. We provide expert economic damage analysis for businesses and law firms involved in complex litigation.',
    overviewHeading: 'Expert Economic Damage Quantification',
    overviewParagraphs: [
      'We provide comprehensive economic damage analysis for business litigation, combining litigation analysis accounting with advanced financial modeling. Our services include lost profits analysis using historical data, industry benchmarks, and predictive models to quantify damages in contract breaches, intellectual property disputes, and commercial conflicts. We investigate financial discrepancies, assess damages from fraud or misconduct, and deliver defensible evaluations backed by rigorous methodology.',
      'Our approach accounts for all direct and indirect costs, including incidental and consequential damages, while integrating market conditions and external economic factors. We deliver clear, litigation-ready reports that support high-stakes cases with accurate, fair, and defensible damage assessments.',
    ],
    items: [
      {
        number: '01',
        title: 'Lost Profits Analysis',
        description: 'Quantify lost profits using historical data, benchmarks, and predictive modeling.',
      },
      {
        number: '02',
        title: 'Incidental & Consequential Damages',
        description: 'Account for all direct and indirect costs associated with disputes.',
      },
      {
        number: '03',
        title: 'Litigation Analysis Accounting',
        description: 'Investigate financial discrepancies and quantify damages from fraud or misconduct.',
      },
      {
        number: '04',
        title: 'Market & Industry Analysis',
        description: 'Integrate external economic factors for accurate and fair evaluations.',
      },
      {
        number: '05',
        title: 'Expert Reports',
        description: 'Litigation-ready expert reports suitable for admissibility standards.',
      },
      {
        number: '06',
        title: 'Strategic Support',
        description: 'Comprehensive analytical support throughout your litigation process.',
      },
    ],
    cta: {
      heading: 'Need Damages Quantified?',
      description:
        "Let's discuss your case and how our economic damages analysis can strengthen your litigation or settlement strategy.",
      buttonText: 'Book a Call',
      buttonHref: '/#contact',
    },
  },

  'document-analysis': {
    id: 'document-analysis',
    route: '/documentanalysis.html',
    eyebrow: 'AI Document Processing',
    title: 'Document Analysis',
    intro:
      'Converting complex financial records into court-ready schedules. We combine machine extraction with forensic accountant review to deliver defensible work product.',
    overviewHeading: 'AI-Powered Financial Document Analysis',
    overviewParagraphs: [
      'We organize unstructured financial documents into structured, courtroom-ready schedules. Our platform processes bank statements, credit card records, and transaction data at scale, categorizing transactions, identifying patterns, and flagging anomalies with precision. We trace fund flows across multiple accounts and entities, delivering clear schedules that save legal teams time and reduce manual review effort.',
      'Our analysis highlights suspicious or unusual financial behavior, ensuring nothing critical is overlooked. We deliver comprehensive summaries and red-flag reports organized for case preparation, giving legal teams clear visibility into financial activities and actionable insights for litigation strategy.',
    ],
    items: [
      {
        number: '01',
        title: 'Statement Analysis',
        description: 'Categorize and analyze bank and credit card transactions with precision.',
      },
      {
        number: '02',
        title: 'Data Structuring',
        description: 'Convert unstructured data into organized, easy-to-understand formats.',
      },
      {
        number: '03',
        title: 'Transaction Tracking',
        description: 'Trace fund flows across multiple accounts and entities.',
      },
      {
        number: '04',
        title: 'Red Flag Identification',
        description: 'Highlight suspicious or unusual financial behavior for investigation.',
      },
      {
        number: '05',
        title: 'Pattern Recognition',
        description: 'Identify financial patterns and anomalies using AI-driven analysis.',
      },
      {
        number: '06',
        title: 'Expert Analysis',
        description: 'Human expertise combined with AI tools for maximum accuracy.',
      },
    ],
    cta: {
      heading: 'High-Volume Financial Production?',
      description:
        'We convert complex financial document productions into structured, production-ready work product with rapid turnaround.',
      buttonText: 'Book a Call',
      buttonHref: '/#contact',
    },
  },

  'bankruptcy-restructuring': {
    id: 'bankruptcy-restructuring',
    route: '/bankruptcyrestructuring.html',
    eyebrow: 'Financial Reconstruction',
    title: 'Bankruptcy & Restructuring',
    intro:
      'Strategic financial analysis for distressed situations. We provide analytical support for bankruptcy and restructuring cases with data-backed strategies.',
    overviewHeading: 'Bankruptcy & Restructuring Financial Analysis',
    overviewParagraphs: [
      'We provide comprehensive financial analysis for bankruptcy and restructuring matters, assessing assets, liabilities, and cash flow to determine financial stability and viability. Our services include detailed creditor and liability review, analyzing outstanding obligations, prioritizing claims, and helping legal and financial professionals understand complex financial positions during insolvency proceedings.',
      'We evaluate liquidity, forecast future financial scenarios, and deliver data-driven cash flow modeling that supports restructuring plans and creditor negotiations. Our analysis provides stakeholders with the insights needed to make informed decisions in high-pressure financial scenarios, backed by rigorous financial modeling and clear reporting.',
    ],
    items: [
      {
        number: '01',
        title: 'Financial Position Analysis',
        description: 'Assess assets, liabilities, and cash flow to determine financial stability.',
      },
      {
        number: '02',
        title: 'Creditor & Liability Review',
        description: 'Analyze outstanding obligations and prioritize claims systematically.',
      },
      {
        number: '03',
        title: 'Cash Flow Modeling',
        description: 'Evaluate liquidity and forecast future financial scenarios.',
      },
      {
        number: '04',
        title: 'Restructuring Support',
        description: 'Provide data-driven insights to support restructuring plans and negotiations.',
      },
      {
        number: '05',
        title: 'Strategic Analysis',
        description: 'Support high-pressure financial scenarios with comprehensive analysis.',
      },
      {
        number: '06',
        title: 'Expert Consultation',
        description: 'Assist legal and financial professionals throughout the process.',
      },
    ],
    cta: {
      heading: 'Complex Bankruptcy Matter?',
      description:
        'Let us help you reconstruct the financial picture and identify recoverable assets for your creditor clients or trustee investigations.',
      buttonText: 'Book a Call',
      buttonHref: '/#contact',
    },
  },

  'intellectual-property': {
    id: 'intellectual-property',
    route: '/intellectualproperty.html',
    eyebrow: 'IP Valuation & Damages',
    title: 'Intellectual Property Analytics',
    intro:
      'Valuing innovation with precision and insight. We assist in quantifying damages and valuation related to intellectual property disputes with financial expertise and industry analysis.',
    overviewHeading: 'Intellectual Property Damage Analysis',
    overviewParagraphs: [
      'We provide expert financial analysis for intellectual property disputes, including IP valuation, royalty analysis, and infringement damage assessment. Our services evaluate the financial value of patents, trademarks, copyrights, and trade secrets, determining appropriate royalty rates and licensing structures to support litigation and negotiation. We quantify losses resulting from unauthorized IP use, combining financial expertise with industry understanding to capture the true economic impact.',
      'Our comprehensive approach analyzes how infringement affects market position, revenue, and competitive advantage. We deliver defensible valuations and damage assessments backed by rigorous methodology, market analysis, and financial modeling, providing legal teams with the quantitative support needed in complex IP litigation.',
    ],
    items: [
      {
        number: '01',
        title: 'IP Valuation',
        description: 'Assess the financial value of intellectual property assets.',
      },
      {
        number: '02',
        title: 'Royalty Analysis',
        description: 'Evaluate appropriate royalty rates and licensing structures.',
      },
      {
        number: '03',
        title: 'Infringement Damage Assessment',
        description: 'Quantify losses from unauthorized use of intellectual property.',
      },
      {
        number: '04',
        title: 'Market Impact Analysis',
        description: 'Analyze how infringement affects market position and revenue.',
      },
      {
        number: '05',
        title: 'Financial Expertise',
        description: 'Combine financial analysis with industry understanding.',
      },
      {
        number: '06',
        title: 'Strategic Support',
        description: 'Support litigation and negotiation processes with expert analysis.',
      },
    ],
    cta: {
      heading: 'IP Damages Case?',
      description:
        'Schedule a consultation to discuss your patent, trademark, or trade secret matter and how we can support your damages or valuation analysis.',
      buttonText: 'Book a Call',
      buttonHref: '/#contact',
    },
  },

  'litigation-support': {
    id: 'litigation-support',
    route: '/litigationsupport.html',
    eyebrow: 'Strategic Partnership',
    title: 'Litigation Support',
    intro:
      'Financial clarity that strengthens your legal strategy. We provide comprehensive litigation support through financial analysis and data interpretation to simplify complex financial matters.',
    overviewHeading: 'Comprehensive Litigation Support Services',
    overviewParagraphs: [
      'We provide comprehensive litigation support, analyzing complex financial datasets to extract meaningful insights for legal proceedings. Our services include structured case documentation, evidence organization, and expert assistance that helps legal teams understand and present financial findings effectively. We prepare detailed reports and supporting materials tailored for litigation, working closely with attorneys to enhance case preparation and strengthen legal strategy.',
      'Our team organizes financial data into formats suitable for courtroom presentation, ensuring clarity and precision. We deliver reliable, defensible analysis that supports stronger arguments and clearer outcomes across discovery, depositions, mediation, and trial. We serve as a trusted analytical partner to navigate the financial complexities of litigation.',
    ],
    items: [
      {
        number: '01',
        title: 'Financial Data Analysis',
        description: 'Analyze complex datasets to extract meaningful insights.',
      },
      {
        number: '02',
        title: 'Case Support & Documentation',
        description: 'Prepare structured reports and supporting materials for litigation.',
      },
      {
        number: '03',
        title: 'Expert Assistance',
        description: 'Assist legal teams in understanding and presenting financial findings.',
      },
      {
        number: '04',
        title: 'Evidence Structuring',
        description: 'Organize financial data into formats suitable for legal proceedings.',
      },
      {
        number: '05',
        title: 'Strategic Insights',
        description: 'Provide clear, reliable insights for stronger legal arguments.',
      },
      {
        number: '06',
        title: 'Comprehensive Support',
        description: 'Work closely with legal teams throughout case preparation.',
      },
    ],
    cta: {
      heading: 'Preparing for Trial?',
      description:
        "Let's discuss how our litigation support services can strengthen your case strategy and expert testimony.",
      buttonText: 'Book a Call',
      buttonHref: '/#contact',
    },
  },
};
