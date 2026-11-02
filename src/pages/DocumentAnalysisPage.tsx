import React, { useEffect } from 'react';
import { SiteHeader } from '../components/layout/SiteHeader';
import { SiteFooter } from '../components/layout/SiteFooter';
import { ServiceDetailHero } from '../components/services/ServiceDetailHero';
import { DocumentAnalysisVisual } from '../components/services/visuals/DocumentAnalysisVisual';
import { ServiceOverview } from '../components/services/ServiceOverview';
import { ServiceDeliverables } from '../components/services/ServiceDeliverables';
import { ServiceWorkflow } from '../components/services/ServiceWorkflow';
import { RelatedServices } from '../components/services/RelatedServices';
import { ServiceClosingCta } from '../components/services/ServiceClosingCta';

export const DocumentAnalysisPage: React.FC = () => {
  useEffect(() => {
    // Scroll to top on page mount
    window.scrollTo(0, 0);
    document.title = 'Document Analysis | Alpha Applied Analytics Solutions';
  }, []);

  const breadcrumb = [
    { label: 'Home', href: '/#home' },
    { label: 'Litigation Services', href: '/litigationservices.html' },
    { label: 'Document Analysis' },
  ];

  const overviewCapabilities = [
    {
      title: 'Multi-Source Ingestion',
      description:
        'Processing bank statements, credit card records, and raw financial PDFs at scale across varied institutional formats.',
    },
    {
      title: 'Cross-Entity Fund Tracing',
      description:
        'Reconstructing complete fund flows between related business entities, personal accounts, and undisclosed intermediaries.',
    },
    {
      title: 'Production-Ready Evidence',
      description:
        'Delivering standardized 17-column Excel workbooks and red-flag exception summaries formatted for counsel and expert witnesses.',
    },
  ];

  const deliverables = [
    {
      id: 'statement-analysis',
      title: 'Statement Analysis',
      description:
        'Categorize and analyze bank and credit card transactions with precision.',
    },
    {
      id: 'data-structuring',
      title: 'Data Structuring',
      description:
        'Convert unstructured data into organized, easy-to-understand formats.',
    },
    {
      id: 'transaction-tracking',
      title: 'Transaction Tracking',
      description:
        'Trace fund flows across multiple accounts and entities.',
    },
    {
      id: 'red-flag-identification',
      title: 'Red Flag Identification',
      description:
        'Highlight suspicious or unusual financial behavior for investigation.',
    },
    {
      id: 'pattern-recognition',
      title: 'Pattern Recognition',
      description:
        'Identify financial patterns and anomalies using AI-driven analysis.',
    },
    {
      id: 'expert-analysis',
      title: 'Expert Analysis',
      description:
        'Human expertise combined with AI tools for maximum accuracy.',
    },
  ];

  const workflowStages = [
    {
      step: '01',
      title: 'Document Ingestion & Normalization',
      description:
        'Bank statements, credit card records, and raw financial PDFs are ingested, verified, and standardized.',
    },
    {
      step: '02',
      title: 'Automated Categorization & OCR',
      description:
        'Transactions are systematically tagged across standard charts-of-accounts and customized litigation parameters.',
    },
    {
      step: '03',
      title: 'Fund Tracing & Anomaly Detection',
      description:
        'Multi-account tracing flags unusual transfers, dissipation patterns, or undisclosed counterparty activities.',
    },
    {
      step: '04',
      title: 'Litigation-Ready Production',
      description:
        'Comprehensive audit summaries and structured workbooks are formatted for immediate trial or settlement use.',
    },
  ];

  const relatedServices = [
    {
      title: 'Litigation Support',
      description:
        'Strategic consulting, expert testimony preparation, financial investigation, and trial-ready analytics.',
      href: '/litigationsupport.html',
    },
    {
      title: 'Economic Damages',
      description:
        'Precise damage calculations, lost profits analysis, and business valuation backed by AI-verified computations.',
      href: '/economicdamages.html',
    },
    {
      title: 'Divorce & Family Law',
      description:
        'Identify hidden income patterns, trace marital asset dissipation, and produce litigation analysis reports for property division.',
      href: '/divorcefamilylaw.html',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface-warm text-brand-dark antialiased">
      <SiteHeader />

      <main className="flex-grow">
        {/* Section 1 & 2: Compact Editorial Hero with Restrained Work Product Preview */}
        <ServiceDetailHero
          breadcrumb={breadcrumb}
          title="Document Analysis"
          description="Converting complex financial records into court-ready schedules. We combine machine extraction with forensic accountant review to deliver defensible work product."
          primaryCta={{
            label: 'Book a Call',
            href: '/#contact',
          }}
          secondaryLink={{
            label: 'Back to All Services',
            href: '/#litigation',
          }}
          visual={<DocumentAnalysisVisual />}
        />

        {/* Section 3: Editorial Overview & 3-Column Capabilities (No Boxed Cards) */}
        <ServiceOverview
          heading="AI-Powered Financial Document Analysis"
          paragraphs={[
            'We organize unstructured financial documents into structured, courtroom-ready schedules. Our platform processes bank statements, credit card records, and transaction data at scale, categorizing transactions, identifying patterns, and flagging anomalies with precision. We trace fund flows across multiple accounts and entities, delivering clear schedules that save legal teams time and reduce manual review effort.',
            'Our analysis highlights suspicious or unusual financial behavior, ensuring nothing critical is overlooked. We deliver comprehensive summaries and red-flag reports organized for case preparation, giving legal teams clear visibility into financial activities and actionable insights for litigation strategy.',
          ]}
          capabilities={overviewCapabilities}
        />

        {/* Section 4: What We Deliver (Restrained 2-Column Editorial Grid) */}
        <ServiceDeliverables
          title="What We Deliver"
          subtitle="Categorized, structured, and verified financial evidence prepared for trial and discovery."
          deliverables={deliverables}
        />

        {/* Section 5: Methodology (Simple Numbered Sequence with Thin Dividers) */}
        <ServiceWorkflow
          title="Our Methodology"
          subtitle="How unstructured case documentation is systematically converted into structured evidence."
          stages={workflowStages}
        />

        {/* Section 6: Related Litigation Services (Minimal Service Rows) */}
        <RelatedServices
          currentServiceId="document-analysis"
          services={relatedServices}
        />

        {/* Section 7: Closing CTA (Clear & Prominent, No Excessive Decoration) */}
        <ServiceClosingCta
          heading="High-Volume Financial Production?"
          subtitle="We convert complex financial document productions into structured, production-ready work product with rapid turnaround."
          primaryCtaLabel="Book a Call"
          primaryCtaHref="/#contact"
          emailSubject="Document Analysis Inquiry"
        />
      </main>

      <SiteFooter />
    </div>
  );
};
