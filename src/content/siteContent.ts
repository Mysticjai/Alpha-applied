/**
 * Alpha Applied Analytics Solutions — Centralized Content Model
 * 
 * Sourced directly from Alpha_Applied_Analytics_Content_Spec.md (c:\Users\jaiav\Downloads\text\text.md)
 * and the client reference website (https://alpha-website-dun.vercel.app/).
 * 
 * All copy strictly adheres to the client specification without generic AI replacement text.
 */

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface PlatformFeature {
  id: string;
  title: string;
  categoryLabel: string;
  subheading?: string;
  description: string;
  tags: string[];
}

export interface TrustItem {
  label: string;
}

export interface CapabilityMetric {
  value: string;
  label: string;
  confirmationRequired?: boolean;
}

export interface AIConsultingService {
  id: string;
  number: string;
  title: string;
  headline: string;
  description: string;
  listIntro: string;
  items: string[];
  additionalNote?: string;
  outcome: string;
}

export interface AIConsultingBlock {
  id: string;
  step: string;
  title: string;
  description: string;
}

export interface TargetAudience {
  id: string;
  title: string;
  description: string;
}

export interface ExpertiseArea {
  id: string;
  title: string;
  description: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

export const siteContent = {
  meta: {
    companyName: "Alpha Applied Analytics Solutions",
    shortName: "Alpha",
    tagline: "AI-Powered Litigation Analysis Financial Services",
    year: 2026,
  },

  navigation: {
    links: [
      { label: "Home", href: "/#home" },
      { label: "AI Consulting & Implementation", href: "/aiconsulting.html" },
      { label: "Litigation Services", href: "/litigationservices.html" },
      { label: "Alpha Lens Platform", href: "/alphalens.html" },
      { label: "Who We Serve", href: "/#who-we-serve" },
      { label: "About", href: "/#founder" },
    ] as NavItem[],
    cta: {
      label: "Book a Call",
      href: "/#contact",
    },
  },

  hero: {
    eyebrow: "ENTERPRISE AI STRATEGY & SPECIALIZED ANALYTICS",
    headlineText: "Advancing Business Through Artificial Intelligence.",
    headlineWords: [
      { text: "Advancing", id: "advancing" },
      { text: "Business", id: "business" },
      { text: "Through", id: "through" },
      { text: "Artificial", id: "artificial" },
      { text: "Intelligence.", id: "intelligence" },
    ],
    // Backward compatibility for any legacy references
    headline: {
      line1: "Advancing Business",
      line2: "Through Artificial",
      line3: "Intelligence.",
      line4: "",
    },
    supportingParagraph1:
      "We partner with organizations to strategize, implement, and scale AI-driven solutions that enhance operational efficiency, strengthen decision-making, and create lasting business value.",
    supportingParagraph2:
      "From AI consulting and enterprise integration to intelligent automation and specialized analytics, we bridge the gap between technological innovation and business execution.",
    supportingCopy:
      "We partner with organizations to strategize, implement, and scale AI-driven solutions that enhance operational efficiency, strengthen decision-making, and create lasting business value.",
    primaryCta: {
      label: "Schedule AI Consultation",
      href: "/#contact",
    },
    secondaryCta: {
      label: "Explore Capabilities",
      href: "/alphalens.html",
    },
    services: [
      { label: "AI Consulting", sublabel: "& Implementation", href: "/aiconsulting.html" },
      { label: "Alpha Lens", sublabel: "Platform", href: "/alphalens.html" },
      { label: "Litigation", sublabel: "Services", href: "/litigationservices.html" },
    ],
  },

  trustStrip: [
    { label: "NDA-Protected Analysis" },
    { label: "Serving Attorneys Worldwide" },
    { label: "Dedicated Point of Contact" },
    { label: "Personal QC on Every Deliverable" },
  ] as TrustItem[],

  // Homepage compact company-wide metrics (product-specific Multi-Tab & 3-Layer moved to AlphaLens)
  metrics: [
    {
      value: "3×",
      label: "Faster Than Manual Effort",
      confirmationRequired: true,
    },
    {
      value: "18+",
      label: "Years of Analytics Experience",
      confirmationRequired: true,
    },
  ] as CapabilityMetric[],

  serviceSummaryStrip: {
    badge: "Core Practice Pillars",
    title: "Choose an Area to Explore",
    subtitle: "Navigate directly to our specialized practice areas, product platform, or AI advisory.",
    items: [
      {
        id: "ai-consulting",
        title: "AI Consulting & Implementation",
        description: "Practical advisory and implementation guidance for evaluating analytical workflows, data readiness, and technology fit.",
        href: "/aiconsulting.html",
        ctaLabel: "Learn About AI Advisory",
      },
      {
        id: "litigation-services",
        title: "Litigation Services",
        description: "Specialized financial analysis and litigation support for case preparation across six core practice areas.",
        href: "/litigationservices.html",
        ctaLabel: "Explore Litigation Services",
      },
      {
        id: "alpha-lens-platform",
        title: "Alpha Lens Platform",
        description: "Forensic document intelligence for litigation. Built to turn complex financial documents into court-ready evidence across 16 specialized analytical tools.",
        href: "/alphalens.html",
        ctaLabel: "Discover AlphaLens Platform",
      },
    ],
  },

  litigationServices: {
    badge: "Our Services",
    title: "Specialized Analytic Methodology for Legal Matters",
    subtitle:
      "Deep expertise across multiple practice areas, powered by AI and reviewed by human analysts.",
    cta: {
      label: "Discuss Case Requirements",
      href: "/#contact",
    },
    services: [
      {
        id: "divorce-family-law",
        title: "Divorce & Family Law",
        description:
          "Identify hidden income patterns, trace marital asset dissipation, and produce litigation analysis reports for property division.",
        ctaLabel: "Learn More",
        ctaHref: "/divorcefamilylaw.html",
      },
      {
        id: "economic-damages",
        title: "Economic Damages",
        description:
          "Precise damage calculations, lost profits analysis, and business valuation backed by AI-verified computations.",
        ctaLabel: "Learn More",
        ctaHref: "/economicdamages.html",
      },
      {
        id: "document-analysis",
        title: "Document Analysis",
        description:
          "AI-powered extraction and structuring of financial records into organized, searchable formats ready for production.",
        ctaLabel: "Learn More",
        ctaHref: "/documentanalysis.html",
      },
      {
        id: "bankruptcy-restructuring",
        title: "Bankruptcy & Restructuring",
        description:
          "Comprehensive financial tracing, asset reconstruction, and preference analysis for bankruptcy proceedings.",
        ctaLabel: "Learn More",
        ctaHref: "/bankruptcyrestructuring.html",
      },
      {
        id: "intellectual-property",
        title: "Intellectual Property",
        description:
          "IP valuation, infringement analysis, and damage assessment for patent and trade secret disputes.",
        ctaLabel: "Learn More",
        ctaHref: "/intellectualproperty.html",
      },
      {
        id: "litigation-support",
        title: "Litigation Support",
        description:
          "Strategic consulting, expert testimony preparation, financial investigation, and trial-ready analytics.",
        ctaLabel: "Learn More",
        ctaHref: "/litigationsupport.html",
      },
    ] as ServiceItem[],
  },

  alphaLens: {
    badge: "ALPHALENS AI",
    tagline: "LEGAL INTELLIGENCE. AMPLIFIED.",
    productBrand: "AlphaLens AI",
    headline: "Forensic document intelligence for litigation-grade financial analysis.",
    title: "AI Powered Tool Built for Litigation Support",
    subtitle:
      "Every tool in our platform is purpose-built for litigation workflows. Not repurposed accounting software — real analytic engines.",
    supportingCopy:
      "Built for litigation, IP litigation, family law, CDFAs, and litigation support teams—turning financial documents into evidence.",
    workflowTagline: "AI does the volume. Experts close the gap.",
    workflowOverview:
      "Four modules. Sixteen tools. One integrated pipeline.",
    cta: {
      label: "Request Platform Demo",
      href: "/#contact",
    },
    demoDisclaimer:
      "Illustrative product preview. Work product is prepared under strict attorney-client confidentiality.",

    features: [
      {
        id: "bank-extraction",
        title: "Bank Statement Extraction",
        categoryLabel: "Multi-Bank Support",
        description:
          "Automated transaction extraction from any bank format — Chase, AmEx, Wells Fargo, regional banks. Outputs structured Excel with 17-column schema, categorized and reconciled.",
        tags: [
          "Any Bank Format",
          "Balance Reconciliation",
          "Auto-Categorization",
          "17-Column Schema",
        ],
      },
      {
        id: "doc-processing",
        title: "PDF Processing & Coverage Tracker",
        categoryLabel: "AI Document Processing",
        description:
          "Intelligent document enhancement, classification, splitting, and Bates stamping. Plus: visualize document coverage across time periods and instantly identify gaps in production.",
        tags: [
          "AI Classification",
          "Bates Stamping",
          "Gap Detection",
          "Highlight Suppression",
        ],
      },
      {
        id: "data-quality",
        title: "Quality Control AI",
        categoryLabel: "Litigation-Grade QC",
        description:
          "Two-layer validation combining 9 rule-based checks with AI review. Verifies opening/closing balances, debit/credit totals, and per-category breakdowns.",
        tags: [
          "9-Point Validation",
          "Balance Matching",
          "Category Breakdowns",
          "Numeric Scoring",
        ],
      },
      {
        id: "analytical-reporting",
        title: "AI Powered Analytics Engine",
        categoryLabel: "Litigation-Ready Reports",
        subheading: "For Divorce, Intellectual Property and Bankruptcy",
        description:
          "Our flagship 3-layer engine: deterministic rule matching, AI-powered anomaly detection, and litigation-grade scoring — producing a comprehensive multi-tab Excel report.",
        tags: [
          "Hidden Income Detection",
          "Anomaly Scoring",
          "Interbank Transfer Matching",
          "Spend & Earn Analysis",
        ],
      },
    ] as PlatformFeature[],

    // Core Principle Statement
    principle: {
      headline: "AI does the volume. Experts close the gap.",
      stages: [
        {
          id: "ai-processing",
          title: "AI Processing",
          description: "High-volume document ingestion, optical extraction, and analytical processing.",
        },
        {
          id: "expert-review",
          title: "Expert Review",
          description: "Senior human forensic verification before output delivery.",
        },
        {
          id: "delivered",
          title: "Delivered",
          description: "Courtroom-ready, defensible evidentiary work product.",
        },
      ],
    },

    // Four Product Modules & 16 Tools (Exact Infographic Specifications)
    modules: [
      {
        id: "module-01",
        number: "01",
        title: "Document Processing",
        subtitle: "Preparation & Normalization",
        accent: "blue",
        description: "Ingest, standardize, and clean messy incoming document batches before analysis.",
        tools: [
          { name: "PDF Splitter", description: "Split combined multi-year exhibit packages and statements into individual account files." },
          { name: "Doc Cleaner", description: "Remove scan noise, correct skew, and optimize readability on degraded historical scans." },
          { name: "Categorisation", description: "Classify incoming files into bank records, tax forms, brokerage statements, and contracts." },
          { name: "Bates Stamping", description: "Apply automated evidentiary numbering with custom prefixes and document indices." },
        ],
      },
      {
        id: "module-02",
        number: "02",
        title: "Extraction",
        subtitle: "High-Fidelity Parsing",
        accent: "teal",
        description: "Convert raw document images into structured tabular data with mathematical verification.",
        tools: [
          { name: "Bank Statement Extraction", description: "Extract transactions across institutional layouts with automated balance reconciliation." },
          { name: "Invoice Extraction", description: "Capture line items, vendor details, sales tax, and payment terms from unstructured invoices." },
          { name: "Check Extraction", description: "Automated front and back check image parsing, payee verification, and memo line extraction." },
          { name: "Statement Tracker", description: "Visual timeline matrix mapping account coverage and instantly flagging missing months." },
        ],
      },
      {
        id: "module-03",
        number: "03",
        title: "Analysis & Intelligence",
        subtitle: "Forensic Discovery Engines",
        accent: "purple",
        description: "Deep analytical algorithms built specifically for family law, damages, and business litigation.",
        tools: [
          { name: "Description Categoriser", description: "Standardize raw transaction narratives against litigation charts of accounts." },
          { name: "Transaction Analysis (+ Regression Analysis)", description: "Statistical variance detection, lifestyle spend tracking, and spending trend regression." },
          { name: "GL Mapping to Bank Transactions", description: "Reconcile internal accounting ledgers against third-party cleared bank statements." },
          { name: "Audit Log Analysis", description: "Inspect transaction timestamps, user access trails, and modification chronologies." },
          { name: "Divorce Settlement Analysis", description: "Marital asset dissipation tracing, lifestyle analysis, and separate property schedules." },
        ],
      },
      {
        id: "module-04",
        number: "04",
        title: "Quality Control",
        subtitle: "Litigation-Grade Verification",
        accent: "amber",
        description: "Multi-point automated verification ensuring zero transcription or calculation discrepancies.",
        tools: [
          { name: "Duplicate Report", description: "Flag duplicate payments, redundant wire entries, and cross-account double counting." },
          { name: "QC Bank Extraction", description: "Rule-based audit matching: Opening Balance + Inflows - Outflows = Closing Balance." },
          { name: "Highlight Transactions", description: "Automated tagging of undisclosed counterparties, high-value wires, and unusual patterns." },
        ],
      },
    ],

    // Product Feature Row (Supporting Capabilities)
    supportingFeatures: [
      {
        title: "Multi-Tab Reports",
        description: "Comprehensive Excel workbooks and schedules formatted for immediate counsel and expert witness use.",
      },
      {
        title: "Interactive Visualizations",
        description: "Fund flow diagrams, timeline charts, and financial demonstratives structured for settlement or trial.",
      },
      {
        title: "Anomaly Detection",
        description: "Algorithmic pattern recognition flagging irregular amounts, round sums, and anomalous transaction intervals.",
      },
      {
        title: "Project Tracking Dashboard",
        description: "Real-time production visibility, account coverage matrices, and audit logs across multi-party matters.",
      },
    ],

    // Crypto Integration (Infographic Specification)
    cryptoCapabilities: {
      title: "Cross-Asset & Cryptocurrency Tracing",
      coreMessage: "Crypto is a data type, not a separate workflow.",
      description: "Cryptocurrency is treated as an integrated data type across the entire analysis pipeline, bridging decentralized ledgers with traditional bank accounts.",
      sources: [
        { name: "Exchanges", details: "Exchange statements, transaction histories, and CSV trade logs from major digital asset platforms." },
        { name: "On-chain Wallets", details: "Public addresses, multi-signature vaults, and verifiable ledger transfers across blockchain networks." },
        { name: "Crypto ATMs & P2P", details: "Peer-to-peer transaction records, OTC trade logs, and fiat-to-crypto kiosk deposits." },
        { name: "Tax Reporting Forms", details: "Form 8949, 1099-DA, and third-party digital asset reconciliation exports." },
      ],
      reconciliationNote: "Cross-source reconciliation. Findings surfaced in the cover summary.",
    },
  },

  aiConsulting: {
    badge: "AI CONSULTING & IMPLEMENTATION",
    title: "AI Consulting & Implementation",
    subtitle:
      "Practical advisory and implementation guidance for evaluating analytical workflows, data readiness, and intelligent automation fit.",
    cta: {
      label: "Schedule Advisory Discussion",
      href: "/#contact",
    },
    services: [
      {
        id: "ai-assessment-strategy",
        number: "01",
        title: "AI Assessment & Strategy",
        headline: "Identify the right AI opportunities for your business.",
        description:
          "Successful AI adoption starts with understanding your business needs, existing processes, and technology landscape. Our AI assessment services help organizations evaluate their readiness for AI and identify opportunities where intelligent automation and AI-powered workflows can deliver meaningful value.",
        listIntro: "Our services include:",
        items: [
          "Assessment of existing business processes and workflows.",
          "Identification of AI adoption and automation opportunities.",
          "Evaluation of suitable AI tools, platforms, and technologies.",
          "Analysis of implementation requirements, potential risks, and constraints.",
          "Development of a practical AI adoption roadmap aligned with business objectives.",
        ],
        outcome:
          "A clear, actionable roadmap for adopting AI with purpose and confidence.",
      },
      {
        id: "ai-implementation-integration",
        number: "02",
        title: "AI Implementation & Integration",
        headline: "Move from AI strategy to real-world execution.",
        description:
          "We help organizations translate AI opportunities into working solutions that fit their operational needs. From selecting appropriate AI technologies to integrating them into business workflows, our implementation services focus on practical applications that support productivity, consistency, and efficiency.",
        listIntro: "Our services include:",
        items: [
          "Implementation of AI-powered business solutions.",
          "Integration of AI tools into existing workflows and processes.",
          "Workflow automation and AI-assisted task execution.",
          "Development of tailored AI solutions for specific business requirements.",
          "Testing, refinement, and optimization of AI-powered workflows.",
          "Guidance on responsible AI adoption, data handling, and human oversight.",
        ],
        outcome:
          "Practical AI solutions designed to support your teams and business operations.",
      },
      {
        id: "ai-integrations-plugin-implementation",
        number: "03",
        title: "AI Integrations & Plugin Implementation",
        headline: "Connect AI capabilities to your business workflows.",
        description:
          "We help organizations leverage AI assistant, to support knowledge-intensive work, streamline processes, and improve how teams interact with business information. Our services focus on configuring, integrating, and implementing AI-based capabilities to address specific organizational requirements.",
        listIntro: "Our services include:",
        items: [
          "AI platform adoption and use-case assessment.",
          "AI plugin, connector, and integration implementation, where supported.",
          "Configuration of AI-powered workflows to meet business needs.",
          "Integration with relevant tools, systems, and knowledge sources, where supported.",
          "Development of structured AI-assisted processes for research, analysis, and documentation.",
          "Workflow testing, refinement, and user guidance.",
        ],
        outcome:
          "A more effective way for your teams to incorporate AI into everyday work.",
      },
      {
        id: "ai-training-professional-courses",
        number: "04",
        title: "AI Training & Professional Courses",
        headline: "Equip your team with the skills to work confidently with AI.",
        description:
          "AI delivers greater value when people understand how to use it effectively. Our Claude training programs help individuals and teams develop practical skills for applying AI to everyday tasks, professional workflows, and business challenges.",
        listIntro: "Our courses can cover:",
        items: [
          "Introduction to AI tools and platforms and their capabilities.",
          "Effective prompting techniques and context management.",
          "Using AI tools for research, analysis, writing, and documentation.",
          "Working with files and structured information.",
          "Designing repeatable AI-assisted workflows.",
          "Exploring advanced AI capabilities, tools, and integrations.",
          "Understanding AI limitations, verification, and responsible use.",
        ],
        additionalNote:
          "Training can be tailored to different experience levels, professional roles, and organizational objectives.",
        outcome:
          "Teams that are better equipped to use AI productively, critically, and responsibly.",
      },
    ] as AIConsultingService[],
    blocks: [
      {
        id: "identify-opportunity",
        step: "01",
        title: "Identify the Opportunity",
        description:
          "Clarify the workflow, problem, or business requirement that needs to be addressed.",
      },
      {
        id: "evaluate-approach",
        step: "02",
        title: "Evaluate the Approach",
        description:
          "Assess suitable approaches and their practical fit with the available data, tools, and requirements.",
      },
      {
        id: "plan-implementation",
        step: "03",
        title: "Plan Implementation",
        description:
          "Define a clear implementation path based on the agreed scope, resources, and objectives.",
      },
    ] as AIConsultingBlock[],
  },

  whoWeServe: {
    badge: "WHO WE SERVE",
    title: "Built for Legal & Financial Professionals",
    subtitle:
      "Analytical support for professionals working with complex financial information and case-related questions.",
    audiences: [
      {
        id: "attorneys-law-firms",
        title: "Attorneys & Law Firms",
        description:
          "Litigation analysis reports that uncover hidden income and asset dissipation — structured for depositions, mediations, and trial exhibits across multiple practice areas.",
      },
      {
        id: "cdfa-practitioners",
        title: "CDFA Practitioners",
        description:
          "Comprehensive financial analysis that supports your settlement recommendations with litigation-ready documentation and data-backed insights.",
      },
      {
        id: "litigation-advisory-teams",
        title: "Litigation & Advisory Teams",
        description:
          "Scalable document processing, bank statement extraction, and litigation analysis for firms handling complex multi-entity financial disputes.",
      },
    ] as TargetAudience[],
  },

  founderAbout: {
    badge: "FOUNDER & PRINCIPAL",
    founderName: "Krishna Dornadula",
    founderRole: "Founder & Principal",
    headline: "A Background in Analytics. A Focus on Defensible Outcomes.",
    subtitle: "Founder of Alpha Applied Analytics Solutions and lead behind AlphaLens AI.",
    bio: "Krishna Dornadula founded Alpha Applied Analytics Solutions to bring forensic analytics, financial investigation, and practical AI together to help clients make sense of complex evidence.",
    linkedinUrl: "https://www.linkedin.com/in/krishna-dornadula-606b5113",
    approachStatement: {
      label: "OUR APPROACH",
      copy: "Analytical rigor should lead to practical implementation—helping clients turn complex evidence into clearer, more confident decisions.",
    },
    principles: [
      {
        id: "analytical-thinking",
        title: "Analytical Thinking",
        description: "Turning complex information into clear, structured insights.",
      },
      {
        id: "real-world-focus",
        title: "Real-World Focus",
        description: "Practical AI and analytics built around real client needs.",
      },
      {
        id: "client-collaboration",
        title: "Client Collaboration",
        description: "Working closely with teams to understand complex questions.",
      },
      {
        id: "continuous-learning",
        title: "Continuous Learning",
        description: "Staying curious as analytical tools and methods evolve.",
      },
    ],
    introduction:
      "Krishna works at the intersection of forensic analytics, artificial intelligence, and litigation support. He leads AI and agentic AI implementations for litigation, investigations, and M&A, delivering human-in-the-loop analytics to support forensic analysis and expert testimony.",
    experienceHeading: "Selected Experience",
    experience:
      "Before founding Alpha Applied Analytics Solutions, Krishna spent nearly a decade at Deloitte leading analytics engagements for global pharmaceutical and technology clients. His work included investigations, regulatory responses, and operational reviews across the United States, Switzerland, the Netherlands, France, and India.",
    currentFocus:
      "At Alpha Applied Analytics Solutions, he focuses on litigation analytics, forensic financial analysis, and AI implementation across complex disputes.",
    expertiseHeading: "Areas of Expertise",
    expertiseAreas: [
      {
        id: "forensic-financial-analytics",
        title: "Forensic Financial Analytics",
        description:
          "AI-assisted analysis of bank statements, invoices, receipts, and other financial records.",
      },
      {
        id: "cryptocurrency-audit-analytics",
        title: "Cryptocurrency & Audit Analytics",
        description:
          "Cryptocurrency asset tracking and audit analytics.",
      },
      {
        id: "investigations-compliance",
        title: "Investigations & Compliance",
        description:
          "Vendor fraud analytics, compliance analytics, and financial investigations.",
      },
      {
        id: "ma-unstructured-data",
        title: "M&A & Unstructured Data",
        description:
          "M&A due diligence and analytics involving unstructured data.",
      },
      {
        id: "family-law-financial-analysis",
        title: "Family Law Financial Analysis",
        description:
          "Analysis supporting divorce matters, probate, and asset tracing.",
      },
    ] as ExpertiseArea[],
    educationHeading: "Education",
    education: [
      {
        degree: "Master of Science — Management Information Systems",
        institution: "University of Illinois Chicago",
        period: "2009–2010",
      },
      {
        degree: "B.E. (Hons) — Computer Science",
        institution: "Birla Institute of Technology and Science, Pilani",
        period: "2005–2009",
      },
    ] as EducationItem[],
    honour: "Magna Cum Laude",
  },

  contact: {
    badge: "LET'S DISCUSS YOUR CASE",
    title: "Let's Review Your Next Case Together",
    subtitle:
      "Book a 15-minute call. We'll walk through how our litigation analysis AI engine can support your practice — no commitment, no pitch deck.",
    primaryCta: {
      label: "Book a Free Strategy Call",
      href: "#contact-form",
    },
    secondaryCta: {
      label: "Request Sample Report",
      href: "mailto:info@alphaanalyticssol.com?subject=Sample%20Report%20Request",
    },
    details: {
      email: "info@alphaanalyticssol.com",
      phone: "+91 93915 69629",
      whatsapp: "https://wa.me/919391569629",
      linkedin: "https://www.linkedin.com/company/alpha-applied-analytics-solutions",
    },
    confidentialityNotice:
      "All initial discussions are conducted under strict confidentiality. Formal conflict checks are executed prior to engagement.",
  },

  footer: {
    copyright: "© 2026 Alpha Applied Analytics Solutions. All rights reserved.",
    description:
      "AI-powered litigation analysis financial services for attorneys, CDFAs, and litigation teams worldwide.",
    servicesLinks: [
      { label: "AI Consulting & Implementation", href: "/aiconsulting.html" },
      { label: "Litigation Services", href: "/litigationservices.html" },
      { label: "Alpha Lens Platform", href: "/alphalens.html" },
    ],
    companyLinks: [
      { label: "About", href: "/#founder" },
      { label: "Contact", href: "/#contact" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" },
    ],
    legalNotice:
      "Information provided on this site is for general advisory and informational purposes. Formal engagements are subject to executed engagement agreements and conflict clearance.",
  },
};
