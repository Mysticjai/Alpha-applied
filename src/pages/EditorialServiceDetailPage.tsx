import React, { useEffect } from 'react';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { AnimatedContent } from '../components/ui/AnimatedContent';
import { forensicServicesData, type ForensicServiceData } from '../content/forensicServicesData';
import { cardImages } from '../data/cardImages';

const serviceImageMap: Record<string, { src: string; alt: string }> = {
  'economic-damages': cardImages.litigation.economicDamages,
  'document-analysis': cardImages.litigation.documentAnalysis,
  'divorce-family-law': cardImages.litigation.divorceFamilyLaw,
  'bankruptcy-restructuring': cardImages.litigation.bankruptcyRestructuring,
  'intellectual-property': cardImages.litigation.intellectualProperty,
  'litigation-support': cardImages.litigation.litigationSupport,
};

interface EditorialServiceDetailPageProps {
  serviceKey: string;
}

export const EditorialServiceDetailPage: React.FC<EditorialServiceDetailPageProps> = ({ serviceKey }) => {
  const service: ForensicServiceData =
    forensicServicesData[serviceKey] || forensicServicesData['divorce-family-law'];

  const serviceImg = serviceImageMap[serviceKey] || cardImages.litigation.economicDamages;

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
  }, [service, serviceKey]);

  return (
    <main className="flex-grow">
        {/* Breadcrumb Navigation Bar */}
        <section className="border-b border-black/[0.06] bg-white/50 backdrop-blur-xs">
          <div className="site-container py-3 sm:py-3.5">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-brand-slate">
              <a href="/#home" data-direction="backward" data-restore-scroll="true" className="hover:text-primary transition-colors">
                Home
              </a>
              <span className="text-black/30 select-none">/</span>
              <a href="/litigationservices.html" className="hover:text-primary transition-colors">
                Litigation Services
              </a>
              <span className="text-black/30 select-none">/</span>
              <span className="text-primary font-medium truncate">{service.title}</span>
            </nav>
          </div>
        </section>

        {/* Main Editorial Split Layout: Sticky Information Panel (Left) + Vertically Scrolling Numbered Content (Right) */}
        <section className="py-10 sm:py-12 lg:py-16">
          <div className="site-container">
            <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-14 xl:gap-20 relative">
              
              {/* ── LEFT PANEL: Sticky Information Panel on Desktop (~36-38% width) ── */}
              <aside className="w-full lg:w-[38%] xl:w-[36%] lg:sticky lg:top-28 lg:self-start flex flex-col">
                <div className="anim-editorial-panel flex flex-col">
                  {/* Secondary navigation link back to litigation services overview */}
                  <div>
                    <a
                      href="/litigationservices.html"
                      data-direction="backward"
                      className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-mono uppercase tracking-wider text-brand-taupe hover:text-primary transition-colors mb-6 group select-none"
                    >
                      <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 text-brand-taupe group-hover:text-primary" />
                      <span>Back to Litigation Services</span>
                    </a>
                  </div>

                  {/* Exact Title */}
                  <h1 className="font-serif text-3xl sm:text-4xl xl:text-[42px] text-[#004643] font-semibold leading-[1.16] tracking-tight mb-5">
                    {service.title}
                  </h1>

                  {/* Interactive Discipline Image Frame */}
                  <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden relative mb-6 border border-brand-border/70 group shadow-xs">
                    <img
                      src={serviceImg.src}
                      alt={serviceImg.alt}
                      loading="lazy"
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-106 transition-transform duration-500 ease-out will-change-transform motion-reduce:transform-none"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-[#004643]/75 via-[#004643]/20 to-transparent opacity-65 group-hover:opacity-85 transition-opacity duration-300 pointer-events-none"
                      aria-hidden="true"
                    />
                  </div>

                  {/* Introductory Description */}
                  <p className="text-[15px] sm:text-base text-brand-slate leading-relaxed mb-6 font-normal">
                    {service.intro}
                  </p>

                  {/* Primary Consultation Call-to-Action (Crimson) */}
                  <div className="mb-8">
                    <a
                      href="/#contact"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#C62835] hover:bg-[#B2222E] text-white text-[14px] font-semibold rounded-md shadow-sm shadow-[#C62835]/20 hover:shadow-md hover:shadow-[#C62835]/30 transition-all duration-200 active:translate-y-px"
                    >
                      <span>{service.cta.buttonText || 'Book a Call'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Supporting Overview Narrative & Forensic Methodology */}
                  <div className="pt-6 border-t border-black/[0.08] flex flex-col gap-3.5 text-xs sm:text-[13.5px] text-brand-slate/90 leading-relaxed">
                    <h2 className="text-xs font-mono font-semibold uppercase tracking-wider text-[#004643]">
                      {service.overviewHeading}
                    </h2>
                    {service.overviewParagraphs.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Trust & Quality Footnote */}
                  <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center gap-2.5 text-xs text-brand-taupe select-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#004643]" />
                    <span>Strict Confidentiality • Partner Review on Every Engagement</span>
                  </div>
                </div>
              </aside>

              {/* ── RIGHT PANEL: Vertically Scrolling Numbered Service-Content List (~62-64% width) ── */}
              <div className="w-full lg:w-[62%] xl:w-[64%] flex flex-col">
                {/* List Header */}
                <AnimatedContent distance={14} duration={0.5} threshold={0.1}>
                  <div className="border-b border-black/[0.1] pb-5 mb-2">
                    <h2 className="font-serif text-2xl sm:text-3xl text-[#004643] font-semibold tracking-tight">
                      Core Analytical Deliverables
                    </h2>
                  </div>
                </AnimatedContent>

                {/* Numbered Items with Muted Taupe Numerals and Cyprus Green Headings */}
                <AnimatedContent distance={18} duration={0.6} stagger={0.08} threshold={0.1} className="divide-y divide-black/[0.08]">
                  {service.items.map((item) => (
                    <div
                      key={item.number}
                      className="py-8 sm:py-9 flex flex-col sm:flex-row items-start gap-4 sm:gap-7 group hover:bg-black/[0.015] -mx-4 px-4 sm:-mx-6 sm:px-6 rounded-lg transition-all duration-250 border-l-2 border-l-transparent hover:border-l-primary/60"
                    >
                      {/* Prominent Muted Taupe (#A79277) Monospace Number */}
                      <span className="font-mono text-2xl sm:text-3xl font-medium text-[#A79277] group-hover:text-[#004643] transition-colors duration-250 shrink-0 w-12 select-none pt-0.5">
                        {item.number}
                      </span>
                      <div className="flex-grow">
                        {/* Cyprus Green (#004643) Serif Heading */}
                        <h3 className="font-serif text-xl sm:text-2xl text-[#004643] group-hover:text-primary-dark transition-colors duration-200 font-medium tracking-tight mb-2 sm:mb-2.5">
                          {item.title}
                        </h3>
                        {/* Readable Muted Body Copy */}
                        <p className="text-brand-slate text-[15px] sm:text-base leading-relaxed max-w-2xl font-normal">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </AnimatedContent>

                {/* Closing Consultation Card */}
                <AnimatedContent distance={16} duration={0.55} threshold={0.15}>
                  <div className="mt-12 sm:mt-16 p-8 sm:p-10 rounded-xl bg-white border border-brand-border/80 shadow-xs hover:border-[#004643]/30 hover:shadow-sm transition-all duration-300">
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#004643] font-semibold mb-3">
                      {service.cta.heading}
                    </h3>
                    <p className="text-brand-slate text-sm sm:text-base leading-relaxed mb-6 max-w-xl">
                      {service.cta.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4">
                      <a
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-[#C62835] hover:bg-[#B2222E] text-white text-[14px] font-semibold rounded-md shadow-sm transition-all"
                      >
                        <span>{service.cta.buttonText}</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                      <a
                        href="/litigationservices.html"
                        className="inline-flex items-center gap-2 px-4 py-3 text-[14px] font-medium text-primary hover:text-accent transition-colors"
                      >
                        <span>Explore Other Practice Areas</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </AnimatedContent>

              </div>

            </div>
          </div>
        </section>
      </main>
  );
};

export default EditorialServiceDetailPage;
