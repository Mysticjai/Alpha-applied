/**
 * Alpha Applied Analytics Solutions: Centralized Content Model
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
  number?: string;
  title: string;
  description: string;
  href?: string;
  image?: {
    src: string;
    alt: string;
  };
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
  honors?: string | null;
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
      { label: "Contact", href: "/#contact" },
    ] as NavItem[],
    cta: {
      label: "Book a Call",
      href: "/#contact",
    },
  },

  hero: {
    eyebrow: "ENTERPRISE AI STRATEGY & SPECIALIZED ANALYTICS",
    headlineText: "AI-Powered Legal and Business Solutions",
    headlineWords: [
      { text: "AI-Powered", id: "ai-powered" },
      { text: "Legal", id: "legal" },
      { text: "and", id: "and" },
      { text: "Business", id: "business" },
      { text: "Solutions", id: "solutions" },
    ],
    // Backward compatibility for any legacy references
    headline: {
      line1: "AI-Powered",
      line2: "Legal and Business",
      line3: "Solutions",
      line4: "",
    },
    supportingParagraph1:
      "We deliver specialized forensic data analytics, litigation support, and tailored artificial intelligence solutions for law firms, corporations, and advisory practices.",
    supportingParagraph2:
      "From rapid bank record extraction and court-ready damage schedules to custom AI workflow automation, we combine deep financial acumen with defensible analytics.",
    supportingCopy:
      "We deliver specialized forensic data analytics, litigation support, and tailored artificial intelligence solutions for law firms, corporations, and advisory practices.",
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
      "Every tool in our platform is purpose-built for litigation workflows. Rather than repurposed accounting software, these are specialized analytical engines designed for legal evidence.",
    supportingCopy:
      "Built for litigation attorneys, forensic accountants, CDFAs, and dispute advisory teams to convert complex financial records into court-ready evidence.",
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
          "Automated transaction extraction across institutional and regional banking formats, including Chase, American Express, and Wells Fargo. Outputs structured, categorized, and fully reconciled Excel files with standard 17-column schemas.",
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
          "Our flagship three-layer engine combines deterministic rule matching, anomaly detection algorithms, and litigation-grade scoring to generate comprehensive multi-tab analytical reports.",
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
    title: "Who We Serve Across Modern Business",
    subtitle:
      "We deliver tailored analytics, forensic support, and practical artificial intelligence solutions for specialized sectors, simplifying complex operational workflows and extracting defensible clarity from high-volume data.",
    focusAreas: [
      "Professional Services",
      "Financial Services",
      "Technology & SaaS",
      "Healthcare & Life Sciences",
      "Operations & Manufacturing",
      "Legal & Dispute Resolution",
    ],
    audiences: [
      {
        id: "professional-services",
        number: "01",
        title: "Professional Services",
        description:
          "AI-assisted workflows, intelligent document processing, and operational automation designed to reduce manual friction and accelerate decision-making.",
        href: "/aiconsulting.html",
        image: {
          src: "/images/cards/alphalens-project-tracking.webp",
          alt: "Professional services workflow automation and operational intelligence",
        },
      },
      {
        id: "financial-services",
        number: "02",
        title: "Financial Services",
        description:
          "Structured transaction extraction, data reconciliation, and automated reporting workflows that strengthen analytical precision and audit readiness.",
        href: "/alphalens.html",
        image: {
          src: "/images/cards/who-we-serve-cdfa.webp",
          alt: "Financial data extraction and reporting automation",
        },
      },
      {
        id: "technology-enterprises",
        number: "03",
        title: "Technology & Growing Enterprises",
        description:
          "Tailored AI consulting, custom analytical tooling, and scalable workflow implementation built to support strategic growth and operational agility.",
        href: "/aiconsulting.html",
        image: {
          src: "/images/cards/alphalens-interactive-visualizations.webp",
          alt: "Scalable AI integration and custom analytical tools",
        },
      },
      {
        id: "legal-litigation",
        number: "04",
        title: "Legal & Litigation Practices",
        description:
          "Specialized litigation support, forensic financial analysis, and court-ready work product structured for dispute resolution, mediation, and trial preparation.",
        href: "/litigationservices.html",
        image: {
          src: "/images/cards/who-we-serve-attorneys.webp",
          alt: "Litigation support and specialized legal evidence analysis",
        },
      },
    ] as TargetAudience[],
  },

  founderAbout: {
    badge: "FOUNDER & PRINCIPAL",
    founderName: "Krishna Dornadula",
    founderRole: "Founder & Principal",
    headline: "Krishna Dornadula",
    subtitle: "Founder of Alpha Applied Analytics Solutions and lead behind AlphaLens AI.",
    bio: "Krishna Dornadula founded Alpha Applied Analytics Solutions to bring together forensic analytics, financial investigation, and practical AI. Before founding Alpha, he spent nearly a decade at Deloitte working on analytics projects involving investigations, financial audits, risk management, and compliance. He now leads the company's work across litigation support, financial analysis, and AI implementation.",
    linkedinUrl: "https://www.linkedin.com/in/krishna-dornadula-606b5113",
    detailedBio: [
      "Krishna Dornadula is the Founder and Principal of Alpha Applied Analytics Solutions and the founder behind AlphaLens AI, a forensic document analytics platform designed to help litigation teams handle complex financial and documentary information more efficiently.",
      "His professional background combines forensic analytics, financial investigations, enterprise technology, data analysis, and practical artificial intelligence implementation.",
      "Before establishing Alpha Applied Analytics Solutions in March 2021, Krishna spent nearly a decade with Deloitte's Forensic Analytics and Transactions & Business Analytics teams. During this period, he led cross-functional global analytics engagements involving investigations, regulatory responses, financial audits, risk management, compliance monitoring, and operational improvement.",
      "At Alpha, he leads AI and Agentic AI implementations across litigation, investigations, and mergers and acquisitions. His work combines automation with human review to support forensic financial analysis, document processing, defensible analytical findings, and expert-related litigation support.",
      "Krishna holds a Master of Science in Management Information Systems from the University of Illinois Chicago and a Computer Science degree from BITS Pilani. Earlier in his career, he worked at Northwestern University on data and statistical analysis for research initiatives, including the eMERGE project, and gained additional research experience in healthcare information technology.",
      "Beyond Alpha, he also serves as Managing Director of Triple One Infra, a real estate and construction firm with assets across South India.",
    ],
    experienceTimeline: [
      {
        company: "Alpha Applied Analytics Solutions",
        role: "Founder and Principal",
        period: "March 2021 – Present",
        bullets: [
          "Leads AI and Agentic AI implementations for litigation, investigations, and M&A.",
          "Founded a boutique analytics firm providing litigation analytics and forensic support.",
          "Supports defensible data analysis for complex disputes, expert witness reports, and rebuttal reports."
        ]
      },
      {
        company: "Triple One Infra Pvt. Ltd.",
        role: "Managing Director",
        period: "June 2022 – Present",
        bullets: [
          "Leads a real estate and construction business with assets across South India."
        ]
      },
      {
        company: "Deloitte",
        role: "Forensic Analytics, Transactions and Business Analytics",
        period: "June 2011 – January 2021",
        bullets: [
          "Led global analytics engagements and cross-functional teams.",
          "Worked on investigations, regulatory responses, financial audits, risk management, compliance, and supply chain analytics.",
          "Worked with technologies including SQL Server, R, .NET, Tableau, QlikView, Crystal Reports, and QlikSense.",
          "Trained and mentored onshore and offshore analytics consultants."
        ]
      },
      {
        company: "Northwestern University",
        role: "Data and Statistical Analyst",
        period: "May 2010 – July 2011",
        bullets: [
          "Supported eMERGE and other research projects.",
          "Extracted information from enterprise healthcare databases and performed statistical analysis using SPSS."
        ]
      },
      {
        company: "Chicago Health Information Technology Regional Extension Center",
        role: "Research Intern",
        period: "May 2010 – September 2010",
        bullets: [
          "Researched open-source electronic medical record systems and their suitability for smaller healthcare providers."
        ]
      },
      {
        company: "University of Illinois at Chicago",
        role: "Teaching Assistant",
        period: "January 2010 – May 2010",
        bullets: [
          "Assisted with Operations Management coursework and tutored students in advanced Microsoft Excel."
        ]
      }
    ],
    education: [
      {
        institution: "University of Illinois Chicago",
        degree: "Master of Science in Management Information Systems",
        period: "August 2009 – December 2010",
        honors: null
      },
      {
        institution: "Birla Institute of Technology and Science, Pilani",
        degree: "B.E. (Hons.) in Computer Science",
        period: "August 2005 – June 2009",
        honors: null
      }
    ],
    highlights: {
      publication: "Legal Billing and Predictive Coding",
      languages: ["English (Professional)", "Telugu (Native)"],
      honors: "Magna Cum Laude (University of Illinois Chicago)"
    },
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
  },

  contact: {
    badge: "LET'S DISCUSS YOUR CASE",
    title: "Let's Connect",
    subtitle:
      "Book a 15-minute call to discuss your business goals, explore practical AI and analytics solutions, and discover how Alpha Applied Analytics can help. No commitment required.",
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
