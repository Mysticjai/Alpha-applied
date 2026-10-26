import React, { useEffect } from 'react';
import { ArrowLeft, ArrowUpRight, EnvelopeSimple, Phone, LockKey } from '@phosphor-icons/react';
import { AnimatedContent } from '../components/ui/AnimatedContent';

export const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'information-collected', number: '1', title: 'Information We Collect' },
    { id: 'use-of-information', number: '2', title: 'How We Use Your Information' },
    { id: 'data-sharing', number: '3', title: 'Data Sharing and Disclosure' },
    { id: 'data-security', number: '4', title: 'Data Security' },
    { id: 'data-retention', number: '5', title: 'Data Retention' },
    { id: 'rights-choices', number: '6', title: 'Your Rights and Choices' },
    { id: 'cookies-tracking', number: '7', title: 'Cookies and Tracking Technologies' },
    { id: 'third-party', number: '8', title: 'Third-Party Links' },
    { id: 'children-privacy', number: '9', title: "Children's Privacy" },
    { id: 'international-transfers', number: '10', title: 'International Data Transfers' },
    { id: 'changes', number: '11', title: 'Changes to This Privacy Policy' },
    { id: 'contact', number: '12', title: 'Contact Us' },
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
                <a href="/#home" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Home</span>
                </a>
                <span>/</span>
                <span className="text-white">Legal Documentation</span>
                <span>/</span>
                <span className="text-accent-light font-semibold">Privacy Policy</span>
              </nav>

              {/* Cross-Policy Navigation Tabs */}
              <div className="inline-flex items-center p-1 rounded-lg bg-white/10 border border-white/15 text-xs font-medium">
                <a
                  href="/terms-of-service"
                  className="px-3 py-1.5 rounded-md text-surface-warm/80 hover:text-white hover:bg-white/10 transition-colors"
                >
                  Terms of Service
                </a>
                <span className="px-3 py-1.5 rounded-md bg-white text-primary font-semibold shadow-xs">
                  Privacy Policy
                </span>
              </div>
            </div>

            {/* Document Header */}
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono uppercase tracking-wider text-surface-warm/90 mb-4">
                <LockKey className="w-3.5 h-3.5 text-accent-light" />
                <span>Information Governance &amp; Confidentiality</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-white leading-tight">
                Privacy Policy
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-wider text-surface-warm/70">
                <span>Last Updated: April 1, 2026</span>
                <span>•</span>
                <span>Alpha Applied Analytics Solutions</span>
              </div>

              <p className="mt-5 text-base sm:text-lg text-surface-warm/85 leading-relaxed font-normal">
                At Alpha Applied Analytics Solutions (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), your privacy is of utmost importance. We are committed to protecting the personal and confidential information entrusted to us by our clients, partners, and website visitors. This Privacy Policy explains how we collect, use, store, and safeguard your information.
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
                    href="/terms-of-service"
                    className="inline-flex items-center justify-between text-xs font-medium text-primary hover:text-accent transition-colors"
                  >
                    <span>Read Terms of Service</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-brand-taupe" />
                  </a>
                </div>
              </div>
            </aside>

            {/* Right Column: Complete Legal Policy Content (8 cols) */}
            <article className="lg:col-span-8 max-w-3xl bg-white p-7 sm:p-10 lg:p-12 rounded-xl border border-brand-border/80 shadow-xs">

              {/* 1. Information We Collect */}
              <section id="information-collected" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-normal tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">1.</span>
                  <span>Information We Collect</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal mb-5">
                  We may collect the following types of information when you interact with our website or engage our services:
                </p>

                <div className="space-y-5">
                  <div className="p-4 rounded-lg bg-surface-warm/50 border border-brand-border/70">
                    <h3 className="font-serif text-lg text-primary font-normal tracking-tight mb-1.5">
                      Personal Information
                    </h3>
                    <p className="text-[14.5px] sm:text-[15px] text-brand-slate leading-relaxed font-normal">
                      Name, email address, phone number, company name, and job title — provided voluntarily when you contact us, schedule a consultation, or submit an inquiry through our website.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-surface-warm/50 border border-brand-border/70">
                    <h3 className="font-serif text-lg text-primary font-normal tracking-tight mb-1.5">
                      Client Data
                    </h3>
                    <p className="text-[14.5px] sm:text-[15px] text-brand-slate leading-relaxed font-normal">
                      Financial documents, bank statements, and other legal records provided to us in the course of performing litigation analysis and litigation support services. This data is treated with the highest level of confidentiality and is subject to attorney-client privilege and work product protections where applicable.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-surface-warm/50 border border-brand-border/70">
                    <h3 className="font-serif text-lg text-primary font-normal tracking-tight mb-1.5">
                      Usage Data
                    </h3>
                    <p className="text-[14.5px] sm:text-[15px] text-brand-slate leading-relaxed font-normal">
                      Non-personally identifiable information such as browser type, IP address, pages visited, and time spent on our website, collected automatically through standard web technologies and analytics tools.
                    </p>
                  </div>
                </div>
              </section>

              {/* 2. How We Use Your Information */}
              <section id="use-of-information" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-normal tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">2.</span>
                  <span>How We Use Your Information</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal mb-4">
                  Before or at the time of collecting personal information, we identify the purposes for which such information is being collected. We collect and use personal information solely for the purpose of fulfilling those purposes specified by us and for other compatible purposes, unless we obtain the consent of the individual concerned or as required by law.
                </p>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal mb-3">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="space-y-3 pl-2 text-[15px] sm:text-base text-brand-slate leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <strong className="text-brand-dark font-semibold">Service Delivery:</strong> To provide litigation analysis financial services, litigation support, and related professional services as requested by our clients
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <strong className="text-brand-dark font-semibold">Communication:</strong> To respond to inquiries, schedule consultations, and maintain ongoing client relationships
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <strong className="text-brand-dark font-semibold">Website Improvement:</strong> To analyze usage patterns and improve the functionality and user experience of our website
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <strong className="text-brand-dark font-semibold">Legal Compliance:</strong> To comply with applicable laws, regulations, and legal processes
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <strong className="text-brand-dark font-semibold">Security:</strong> To protect the security and integrity of our systems and client data
                    </div>
                  </li>
                </ul>
              </section>

              {/* 3. Data Sharing and Disclosure */}
              <section id="data-sharing" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-normal tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">3.</span>
                  <span>Data Sharing and Disclosure</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal mb-4">
                  We do not sell, trade, or rent personal information to third parties. We may share your information only in the following limited circumstances:
                </p>
                <ul className="space-y-3 pl-2 text-[15px] sm:text-base text-brand-slate leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <strong className="text-brand-dark font-semibold">With Client Authorization:</strong> When explicitly authorized by you or as necessary to provide our services to you
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <strong className="text-brand-dark font-semibold">Legal Requirements:</strong> When required by law, court order, or other legal processes
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <strong className="text-brand-dark font-semibold">Service Providers:</strong> With trusted third-party service providers who assist us in operating our business (e.g., hosting services, analytics tools), under strict confidentiality agreements
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <strong className="text-brand-dark font-semibold">Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction
                    </div>
                  </li>
                </ul>
              </section>

              {/* 4. Data Security */}
              <section id="data-security" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-normal tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">4.</span>
                  <span>Data Security</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal mb-4">
                  We take the security of your information seriously. We protect personal information and client data by implementing reasonable security safeguards against loss, theft, unauthorized access, disclosure, copying, use, or modification. These safeguards include:
                </p>
                <ul className="space-y-2.5 pl-2 text-[15px] sm:text-base text-brand-slate leading-relaxed mb-5">
                  {[
                    'Encrypted data transmission using industry-standard SSL/TLS protocols',
                    'Access controls and authentication measures to limit access to authorized personnel only',
                    'Secure storage environments with regular security assessments and updates',
                    'Execution of Non-Disclosure Agreements (NDAs) with all clients and team members',
                    'Regular staff training on data protection and privacy best practices',
                    'Secure file transfer protocols for sharing sensitive documents',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-4 rounded-lg bg-surface-warm/60 border border-brand-border/80">
                  <p className="text-[14px] sm:text-[14.5px] text-brand-slate leading-relaxed font-normal">
                    While we implement robust security measures, please note that no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to maintaining the highest standards of data protection.
                  </p>
                </div>
              </section>

              {/* 5. Data Retention */}
              <section id="data-retention" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-normal tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">5.</span>
                  <span>Data Retention</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                  We retain personal information and client data only as long as necessary to fulfill the purposes for which it was collected, including any legal, accounting, or reporting requirements. When information is no longer needed, we securely destroy or anonymize it in accordance with our data retention policies and applicable legal requirements.
                </p>
              </section>

              {/* 6. Your Rights and Choices */}
              <section id="rights-choices" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-normal tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">6.</span>
                  <span>Your Rights and Choices</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal mb-4">
                  Depending on your jurisdiction, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="space-y-3 pl-2 text-[15px] sm:text-base text-brand-slate leading-relaxed mb-4">
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <strong className="text-brand-dark font-semibold">Access:</strong> The right to request access to the personal information we hold about you
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <strong className="text-brand-dark font-semibold">Correction:</strong> The right to request correction of inaccurate or incomplete information
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <strong className="text-brand-dark font-semibold">Deletion:</strong> The right to request deletion of your personal information, subject to legal and contractual obligations
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <strong className="text-brand-dark font-semibold">Opt-Out:</strong> The right to opt out of certain uses of your information, such as marketing communications
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <div>
                      <strong className="text-brand-dark font-semibold">Data Portability:</strong> The right to receive your personal information in a structured, commonly used format
                    </div>
                  </li>
                </ul>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                  To exercise any of these rights, please contact us using the information provided below.
                </p>
              </section>

              {/* 7. Cookies and Tracking Technologies */}
              <section id="cookies-tracking" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-normal tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">7.</span>
                  <span>Cookies and Tracking Technologies</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                  Our website may use cookies and similar tracking technologies to enhance user experience and gather analytics data. Cookies are small text files stored on your device that help us understand how visitors use our website. You can control cookie preferences through your browser settings, though disabling cookies may affect certain website functionality.
                </p>
              </section>

              {/* 8. Third-Party Links */}
              <section id="third-party" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-normal tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">8.</span>
                  <span>Third-Party Links</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                  Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                </p>
              </section>

              {/* 9. Children's Privacy */}
              <section id="children-privacy" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-normal tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">9.</span>
                  <span>Children&apos;s Privacy</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                  Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected information from a child, we will take steps to delete such information promptly.
                </p>
              </section>

              {/* 10. International Data Transfers */}
              <section id="international-transfers" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-normal tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">10.</span>
                  <span>International Data Transfers</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                  If you are located outside the United States, please note that the information you provide may be transferred to and processed in the United States or other jurisdictions where we or our service providers operate. By using our services, you consent to such transfers and processing in accordance with this Privacy Policy.
                </p>
              </section>

              {/* 11. Changes to This Privacy Policy */}
              <section id="changes" className="scroll-mt-28 mb-10 pb-8 border-b border-brand-border/60">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-normal tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">11.</span>
                  <span>Changes to This Privacy Policy</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal">
                  We reserve the right to update or modify this Privacy Policy at any time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the updated policy on our website with a new &ldquo;Last Updated&rdquo; date. Your continued use of our services after such changes constitutes your acceptance of the updated Privacy Policy.
                </p>
              </section>

              {/* 12. Contact Us */}
              <section id="contact" className="scroll-mt-28">
                <h2 className="font-serif text-2xl sm:text-[1.65rem] text-primary font-normal tracking-tight mb-3 flex items-baseline gap-2">
                  <span className="font-mono text-base sm:text-lg text-brand-taupe font-medium">12.</span>
                  <span>Contact Us</span>
                </h2>
                <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed font-normal mb-5">
                  If you have any questions, concerns, or requests regarding this Privacy Policy or our data handling practices, please contact us at:
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
                  We are committed to conducting our business in accordance with these principles to ensure that the confidentiality of personal information is protected and maintained. Your trust is our priority.
                </div>
              </section>

            </article>

          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicyPage;
