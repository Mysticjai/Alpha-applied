import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, EnvelopeSimple, Phone, FileText } from '@phosphor-icons/react';
import { AnimatedContent } from '../components/ui/AnimatedContent';

export const TermsOfServicePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'acceptance', number: '1', title: 'Acceptance of Terms' },
    { id: 'services', number: '2', title: 'Description of Services' },
    { id: 'engagement', number: '3', title: 'Client Relationship and Engagement' },
    { id: 'standards', number: '4', title: 'Professional Standards and Limitations' },
    { id: 'confidentiality', number: '5', title: 'Confidentiality and Data Protection' },
    { id: 'payment', number: '6', title: 'Payment Terms' },
    { id: 'ip', number: '7', title: 'Intellectual Property' },
    { id: 'liability', number: '8', title: 'Limitation of Liability' },
    { id: 'indemnification', number: '9', title: 'Indemnification' },
    { id: 'website-use', number: '10', title: 'Website Use and Restrictions' },
    { id: 'third-party', number: '11', title: 'Third-Party Links and Services' },
    { id: 'termination', number: '12', title: 'Termination' },
    { id: 'modifications', number: '13', title: 'Modifications to Terms' },
    { id: 'governing-law', number: '14', title: 'Governing Law and Dispute Resolution' },
    { id: 'severability', number: '15', title: 'Severability' },
    { id: 'entire-agreement', number: '16', title: 'Entire Agreement' },
    { id: 'contact', number: '17', title: 'Contact Information' },
  ];

  return (
    <main className="flex-grow bg-surface-warm text-brand-dark antialiased">
      {/* ── Editorial Header Banner ── */}
      <section className="pt-28 pb-12 sm:pt-32 sm:pb-16 bg-[#003634] text-white border-b border-[#002927] relative overflow-hidden">
        {/* Subtle radial ambient glow */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary-light/10 rounded-full blur-3xl pointer-events-none" />

        <div className="site-container relative z-10">
          <AnimatedContent distance={20} duration={0.65}>
            {/* Top Navigation & Breadcrumbs */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-surface-warm/70">
                <a href="/#home" data-direction="backward" data-restore-scroll="true" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Home</span>
                </a>
                <span>/</span>
                <span className="text-white">Legal Documentation</span>
                <span>/</span>
                <span className="text-accent-light font-semibold">Terms of Service</span>
              </nav>

              {/* Cross-Policy Navigation Tabs */}
              <div className="inline-flex items-center p-1 rounded-lg bg-white/10 border border-white/15 text-xs font-medium">
                <span className="px-3 py-1.5 rounded-md bg-white text-primary font-semibold shadow-xs">
                  Terms of Service
                </span>
                <a
                  href="/privacy-policy"
                  className="px-3 py-1.5 rounded-md text-surface-warm/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
            </div>

            {/* Document Header */}
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono uppercase tracking-wider text-surface-warm/90 mb-4">
                <FileText className="w-3.5 h-3.5 text-accent-light" />
                <span>Client &amp; Service Agreement</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
                Terms of Service
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-wider text-surface-warm/70">
                <span>Last Updated: April 1, 2026</span>
                <span>•</span>
                <span>Alpha Applied Analytics Solutions</span>
              </div>

              <p className="mt-5 text-base sm:text-lg text-surface-warm/85 leading-relaxed font-normal">
                Welcome to Alpha Applied Analytics Solutions. These Terms of Service (&ldquo;Terms&rdquo;) govern your use of our website and services. By accessing our website or engaging our services, you agree to be bound by these Terms. Please read them carefully.
              </p>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* ── Main Legal Reading Surface ── */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="site-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">

            {/* Left Column: Compact Sticky Table of Contents (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-24">
              <div className="p-6 rounded-xl bg-white border border-brand-border/80 shadow-xs">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-taupe block mb-4 pb-2 border-b border-brand-border/60">
                  Document Contents
                </span>
                <nav aria-label="Table of Contents" className="space-y-1 max-h-[calc(100vh-220px)] overflow-y-auto pr-1 text-xs">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="group flex items-baseline gap-2 py-1.5 px-2 rounded hover:bg-surface-warm transition-colors text-brand-slate hover:text-primary"
                    >
                      <span className="font-mono text-[11px] text-brand-taupe group-hover:text-primary font-medium w-4 shrink-0">
                        {sec.number}.
                      </span>
                      <span className="truncate leading-normal">
                        {sec.title}
                      </span>
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-5 border-t border-brand-border/60 flex flex-col gap-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-brand-taupe block">
                    Related Legal Agreement
                  </span>
                  <a
                    href="/privacy-policy"
                    className="inline-flex items-center justify-between text-xs font-medium text-primary hover:text-accent transition-colors"
                  >
                    <span>Read Privacy Policy</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-brand-taupe" />
                  </a>
                </div>
              </div>
            </aside>

            {/* Right Column: Complete Legal Policy Content (8 cols) */}
            <article className="lg:col-span-8 max-w-3xl bg-white p-7 sm:p-10 lg:p-12 rounded-xl border border-brand-border/80 shadow-xs">

              {/* 1. Acceptance of Terms */}
              <section id="acceptance" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">1.</span>
                  <span>Acceptance of Terms</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                  By accessing or using our website (<span className="text-primary font-medium">alphaanalyticssol.com</span>) or engaging our litigation analysis financial services and litigation support services, you acknowledge that you have read, understood, and agree to be bound by these Terms and our <a href="/privacy-policy" className="text-primary font-semibold underline hover:text-accent transition-colors">Privacy Policy</a>. If you do not agree to these Terms, you must not use our website or services.
                </p>
              </section>

              {/* 2. Description of Services */}
              <section id="services" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">2.</span>
                  <span>Description of Services</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal mb-4">
                  Alpha Applied Analytics Solutions provides AI-powered litigation analysis financial services, litigation support, document processing, and related professional services to attorneys, law firms, financial professionals, and other qualified clients. Our services include but are not limited to:
                </p>
                <ul className="space-y-2.5 pl-2 text-[15px] sm:text-base text-brand-slate leading-relaxed">
                  {[
                    'Litigation analysis financial services and anomaly detection',
                    'Bank statement extraction and transaction analysis',
                    'Document processing, classification, and Bates stamping',
                    'Hidden asset identification and income tracing',
                    'Litigation support and expert consultation',
                    'Quality control and validation of financial data',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 3. Client Relationship and Engagement */}
              <section id="engagement" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">3.</span>
                  <span>Client Relationship and Engagement</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal mb-4">
                  Our services are provided on a project-by-project basis or under ongoing service agreements as mutually agreed upon with our clients. Each engagement is subject to:
                </p>
                <ul className="space-y-2.5 pl-2 text-[15px] sm:text-base text-brand-slate leading-relaxed mb-4">
                  {[
                    'Execution of a formal engagement letter or service agreement',
                    'Non-disclosure agreements (NDAs) to protect confidential client information',
                    'Scope of work documentation detailing deliverables, timelines, and pricing',
                    'Payment terms as specified in the engagement agreement',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                  We reserve the right to decline any engagement or terminate services at our discretion, with appropriate notice to the client.
                </p>
              </section>

              {/* 4. Professional Standards and Limitations */}
              <section id="standards" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold tracking-tight mb-4 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">4.</span>
                  <span>Professional Standards and Limitations</span>
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-primary font-medium tracking-tight mb-2">
                      4.1 Not Legal or Financial Advice
                    </h3>
                    <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                      While we provide litigation analysis and litigation support services, we are not attorneys, certified public accountants, or licensed financial advisors. Our services do not constitute legal advice, accounting services, or investment advice. Clients should consult with appropriate licensed professionals for legal, tax, or financial planning guidance.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-primary font-medium tracking-tight mb-2">
                      4.2 Expert Testimony
                    </h3>
                    <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                      If expert testimony or court appearances are required as part of an engagement, such services will be separately negotiated and documented in a supplemental agreement with appropriate compensation terms.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-primary font-medium tracking-tight mb-2">
                      4.3 Quality and Accuracy
                    </h3>
                    <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                      We strive to provide accurate, thorough, and high-quality analysis. However, the accuracy of our deliverables depends in part on the completeness and accuracy of the information provided to us. We are not responsible for errors or omissions resulting from incomplete, inaccurate, or withheld source documents.
                    </p>
                  </div>
                </div>
              </section>

              {/* 5. Confidentiality and Data Protection */}
              <section id="confidentiality" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">5.</span>
                  <span>Confidentiality and Data Protection</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal mb-4">
                  We understand that our clients entrust us with highly sensitive financial and legal information. We are committed to maintaining the confidentiality of all client data in accordance with:
                </p>
                <ul className="space-y-2.5 pl-2 text-[15px] sm:text-base text-brand-slate leading-relaxed mb-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>Attorney-client privilege and work product protections where applicable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>Non-disclosure agreements executed with each client</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>Industry-standard data security protocols and encryption</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span>
                      Our Privacy Policy (available at{' '}
                      <a href="/privacy-policy" className="text-primary font-semibold underline hover:text-accent transition-colors">
                        alphaanalyticssol.com/privacy-policy
                      </a>)
                    </span>
                  </li>
                </ul>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                  Clients retain all ownership rights to their data and documents. We will not use client data for any purpose other than providing the agreed-upon services without explicit client authorization.
                </p>
              </section>

              {/* 6. Payment Terms */}
              <section id="payment" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold tracking-tight mb-4 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">6.</span>
                  <span>Payment Terms</span>
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-primary font-medium tracking-tight mb-2">
                      6.1 Fees and Invoicing
                    </h3>
                    <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal mb-3">
                      Service fees are determined based on the scope and complexity of each engagement and will be specified in the engagement agreement. Payment terms typically include:
                    </p>
                    <ul className="space-y-2 pl-2 text-[15px] sm:text-base text-brand-slate leading-relaxed">
                      {[
                        'Project-based fixed fees or hourly billing arrangements',
                        'Invoicing upon completion of milestones or deliverables',
                        'Payment due within 30 days of invoice date unless otherwise agreed',
                        'Late payment fees may apply for invoices not paid within terms',
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-primary font-medium tracking-tight mb-2">
                      6.2 Refund Policy
                    </h3>
                    <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                      Due to the professional nature of our services and the time invested in each engagement, refunds are not typically provided for completed work. If a client is dissatisfied with deliverables, we will work in good faith to address concerns and revise work product as appropriate.
                    </p>
                  </div>
                </div>
              </section>

              {/* 7. Intellectual Property */}
              <section id="ip" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold tracking-tight mb-4 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">7.</span>
                  <span>Intellectual Property</span>
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-primary font-medium tracking-tight mb-2">
                      7.1 Client Data
                    </h3>
                    <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                      All client documents, data, and information remain the property of the client. We claim no ownership rights to client materials.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-primary font-medium tracking-tight mb-2">
                      7.2 Work Product
                    </h3>
                    <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                      Upon full payment, clients receive ownership of the final deliverables (reports, spreadsheets, summaries, etc.) prepared specifically for their engagement. We retain the right to use de-identified methodologies, processes, and general analytical techniques developed in the course of providing our services.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg sm:text-xl text-primary font-medium tracking-tight mb-2">
                      7.3 Website and Platform
                    </h3>
                    <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                      All content on our website, including text, graphics, logos, and software, is the property of Alpha Applied Analytics Solutions or its licensors and is protected by copyright and trademark laws.
                    </p>
                  </div>
                </div>
              </section>

              {/* 8. Limitation of Liability */}
              <section id="liability" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">8.</span>
                  <span>Limitation of Liability</span>
                </h2>
                <div className="p-4 sm:p-5 rounded-lg bg-surface-warm/60 border border-brand-border/80 mb-4">
                  <p className="text-[14.5px] sm:text-[15px] text-brand-dark leading-relaxed font-normal">
                    To the fullest extent permitted by law, Alpha Applied Analytics Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or relating to the use of our services, even if advised of the possibility of such damages.
                  </p>
                </div>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                  Our total liability for any claims arising from our services shall not exceed the total fees paid by the client for the specific engagement giving rise to the claim.
                </p>
              </section>

              {/* 9. Indemnification */}
              <section id="indemnification" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">9.</span>
                  <span>Indemnification</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal mb-3">
                  Clients agree to indemnify and hold harmless Alpha Applied Analytics Solutions, its employees, and contractors from any claims, damages, or expenses arising from:
                </p>
                <ul className="space-y-2.5 pl-2 text-[15px] sm:text-base text-brand-slate leading-relaxed">
                  {[
                    'Inaccurate or incomplete information provided by the client',
                    'Unauthorized use or disclosure of our work product by the client',
                    "Client's violation of these Terms or applicable laws",
                    "Client's use of our deliverables in a manner not authorized by the engagement agreement",
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 10. Website Use and Restrictions */}
              <section id="website-use" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">10.</span>
                  <span>Website Use and Restrictions</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal mb-3">
                  You may use our website for lawful purposes only. You agree not to:
                </p>
                <ul className="space-y-2.5 pl-2 text-[15px] sm:text-base text-brand-slate leading-relaxed">
                  {[
                    'Use the website in any way that violates applicable laws or regulations',
                    'Attempt to gain unauthorized access to our systems or networks',
                    'Upload malicious code, viruses, or harmful content',
                    'Scrape, harvest, or collect information from the website using automated means',
                    'Impersonate any person or entity or misrepresent your affiliation',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 11. Third-Party Links and Services */}
              <section id="third-party" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">11.</span>
                  <span>Third-Party Links and Services</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                  Our website may contain links to third-party websites or services. We are not responsible for the content, privacy practices, or terms of service of any third-party sites. Your use of third-party services is at your own risk.
                </p>
              </section>

              {/* 12. Termination */}
              <section id="termination" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">12.</span>
                  <span>Termination</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal mb-3">
                  Either party may terminate an engagement in accordance with the terms specified in the engagement agreement. Upon termination:
                </p>
                <ul className="space-y-2.5 pl-2 text-[15px] sm:text-base text-brand-slate leading-relaxed">
                  {[
                    'Client shall pay for all services rendered up to the termination date',
                    'We will return or destroy client data as directed by the client',
                    'Confidentiality obligations continue beyond termination',
                    'We may retain copies of work product as required by professional standards or law',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 13. Modifications to Terms */}
              <section id="modifications" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">13.</span>
                  <span>Modifications to Terms</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                  We reserve the right to modify these Terms at any time. Changes will be posted on our website with an updated &ldquo;Last Updated&rdquo; date. Continued use of our website or services after changes are posted constitutes acceptance of the modified Terms. Material changes to existing client engagements will be communicated directly to affected clients.
                </p>
              </section>

              {/* 14. Governing Law and Dispute Resolution */}
              <section id="governing-law" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">14.</span>
                  <span>Governing Law and Dispute Resolution</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal mb-3">
                  These Terms shall be governed by and construed in accordance with the laws of the State of Illinois, United States, without regard to its conflict of law provisions. Any disputes arising from these Terms or our services shall be resolved through:
                </p>
                <ul className="space-y-2.5 pl-2 text-[15px] sm:text-base text-brand-slate leading-relaxed">
                  {[
                    'Good faith negotiation between the parties',
                    'Mediation if negotiation is unsuccessful',
                    'Binding arbitration or litigation in Illinois courts if mediation fails',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* 15. Severability */}
              <section id="severability" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">15.</span>
                  <span>Severability</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                  If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.
                </p>
              </section>

              {/* 16. Entire Agreement */}
              <section id="entire-agreement" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">16.</span>
                  <span>Entire Agreement</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                  These Terms, together with any engagement agreement and our <a href="/privacy-policy" className="text-primary font-semibold underline hover:text-accent transition-colors">Privacy Policy</a>, constitute the entire agreement between you and Alpha Applied Analytics Solutions regarding the use of our website and services, superseding any prior agreements or understandings.
                </p>
              </section>

              {/* 17. Contact Information */}
              <section id="contact" className="scroll-mt-28">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-semibold tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">17.</span>
                  <span>Contact Information</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal mb-5">
                  If you have questions about these Terms or our services, please contact us at:
                </p>

                <div className="p-6 rounded-xl bg-surface-warm/80 border border-brand-border/80 space-y-3.5 mb-6">
                  <div className="font-serif text-lg text-primary font-normal">
                    Alpha Applied Analytics Solutions
                  </div>

                  <div className="flex items-center gap-3 text-sm text-brand-slate">
                    <EnvelopeSimple className="w-4 h-4 text-accent shrink-0" />
                    <span className="font-medium text-brand-dark">Email:</span>
                    <a
                      href="mailto:info@alphaanalyticssol.com"
                      className="text-primary font-semibold hover:text-accent underline transition-colors"
                    >
                      info@alphaanalyticssol.com
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-brand-slate">
                    <Phone className="w-4 h-4 text-accent shrink-0" />
                    <span className="font-medium text-brand-dark">Phone:</span>
                    <a
                      href="tel:+12242179863"
                      className="text-primary font-semibold hover:text-accent transition-colors"
                    >
                      +1 (224) 217-9863
                    </a>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-brand-slate">
                    <ArrowUpRight className="w-4 h-4 text-accent shrink-0" />
                    <span className="font-medium text-brand-dark">LinkedIn:</span>
                    <a
                      href="https://www.linkedin.com/company/alpha-applied-analytics-solutions"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-semibold hover:text-accent underline transition-colors"
                    >
                      Alpha Applied Analytics Solutions
                    </a>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-primary/5 border border-primary/15 text-xs text-brand-slate leading-relaxed">
                  By using our website or services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </div>
              </section>

            </article>

          </div>
        </div>
      </section>
    </main>
  );
};

export default TermsOfServicePage;
