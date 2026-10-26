import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  ArrowUp,
  FileText,
  Coins,
  EnvelopeSimple,
  CalendarBlank,
  Stack,
  Cpu,
  ShieldCheck,
  CheckCircle,
  UserCheck,
  SealCheck,
  Sparkle,
  Scissors,
  FolderSimple,
  Hash,
  CopySimple,
  FileXls,
  Receipt,
  ChartBar,
  GitFork,
  FileMagnifyingGlass,
  Buildings,
  Wallet,
  CaretRight,
} from '@phosphor-icons/react';
import { siteContent } from '../content/siteContent';
import { AnimatedContent } from '../components/ui/AnimatedContent';
import { InteractiveImageCard } from '../components/ui/InteractiveImageCard';
import { cardImages } from '../data/cardImages';
import { useHeroScrollExit } from '../hooks/useHeroScrollExit';

// Tool icon helper mapping
function getToolIcon(name: string) {
  switch (name) {
    case 'PDF Splitter':
      return <Scissors className="w-4 h-4 text-primary" />;
    case 'Doc Cleaner':
      return <Sparkle className="w-4 h-4 text-primary" />;
    case 'Categorisation':
      return <FolderSimple className="w-4 h-4 text-primary" />;
    case 'Bates Stamping':
      return <Hash className="w-4 h-4 text-primary" />;
    case 'Duplicate Report':
      return <CopySimple className="w-4 h-4 text-primary" />;
    case 'Bank Statement Extraction':
      return <FileXls className="w-4 h-4 text-primary" />;
    case 'Invoice Extraction':
      return <Receipt className="w-4 h-4 text-primary" />;
    case 'Check Extraction':
      return <SealCheck className="w-4 h-4 text-primary" />;
    case 'Statement Tracker':
      return <CalendarBlank className="w-4 h-4 text-primary" />;
    case 'Description Categoriser':
      return <Stack className="w-4 h-4 text-primary" />;
    case 'Transaction Analysis (+ Regression Analysis)':
      return <ChartBar className="w-4 h-4 text-primary" />;
    case 'GL Mapping to Bank Transactions':
      return <GitFork className="w-4 h-4 text-primary" />;
    case 'Audit Log Analysis':
      return <FileMagnifyingGlass className="w-4 h-4 text-primary" />;
    case 'Divorce Settlement Analysis':
      return <Buildings className="w-4 h-4 text-primary" />;
    case 'QC Bank Extraction':
      return <CheckCircle className="w-4 h-4 text-primary" />;
    case 'Highlight Transactions':
      return <ShieldCheck className="w-4 h-4 text-primary" />;
    default:
      return <FileText className="w-4 h-4 text-primary" />;
  }
}

export const AlphaLensPage: React.FC = () => {
  const { alphaLens } = siteContent;
  const [activeModule, setActiveModule] = useState(0);
  const [isModuleTransitioning, setIsModuleTransitioning] = useState(false);
  const [principleTriggered, setPrincipleTriggered] = useState(false);
  const [cryptoTriggered, setCryptoTriggered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const principleRef = useRef<HTMLElement>(null);
  const cryptoRef = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);

  // Cinematic scroll-linked hero text exit
  useHeroScrollExit({
    triggerRef: heroRef,
    headlineRef,
    bodyRef,
    ctaRef,
    visualRef: diagramRef,
    enabled: true,
  });

  const capabilityImages = [
    cardImages.alphalens.capabilityContinuous,
    cardImages.alphalens.capabilityTraceability,
    cardImages.alphalens.capabilityReconciliation,
    cardImages.alphalens.capabilityMultiFormat,
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    }

    // Reduced motion preference check
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener?.('change', motionListener);

    // IntersectionObserver for Principle Band sequence
    const principleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPrincipleTriggered(true);
          principleObserver.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (principleRef.current) {
      principleObserver.observe(principleRef.current);
    }

    // IntersectionObserver for Crypto Hub-and-Spoke diagram
    const cryptoObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCryptoTriggered(true);
          cryptoObserver.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (cryptoRef.current) {
      cryptoObserver.observe(cryptoRef.current);
    }

    return () => {
      mediaQuery.removeEventListener?.('change', motionListener);
      principleObserver.disconnect();
      cryptoObserver.disconnect();
    };
  }, []);

  // Handle module selection with smooth fast transition
  const handleSelectModule = useCallback((idx: number) => {
    if (idx === activeModule) return;
    setIsModuleTransitioning(true);
    setActiveModule(idx);
    const timeout = setTimeout(() => {
      setIsModuleTransitioning(false);
    }, 220);
    return () => clearTimeout(timeout);
  }, [activeModule]);

  // Keyboard navigation for accessible module tabs
  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex = index;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = (index + 1) % alphaLens.modules.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = (index - 1 + alphaLens.modules.length) % alphaLens.modules.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = alphaLens.modules.length - 1;
    }

    if (nextIndex !== index) {
      handleSelectModule(nextIndex);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <main className="flex-grow">
        {/* ========================================================================= */}
        {/* SECTION 1: PRODUCT HERO                                                   */}
        {/* ========================================================================= */}
        <section
          ref={heroRef}
          className="bg-surface-warm border-b border-brand-border/70 pt-8 pb-14 lg:pt-12 lg:pb-20 relative overflow-hidden"
        >
          <div className="site-container">
            {/* Breadcrumb Navigation */}
            <AnimatedContent distance={10} duration={0.4}>
              <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-taupe mb-6 sm:mb-8">
                <a href="/#home" className="hover:text-primary transition-colors">
                  Home
                </a>
                <span className="text-brand-border/80 select-none">/</span>
                <span className="text-primary font-semibold">AlphaLens Platform</span>
              </nav>
            </AnimatedContent>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Product Positioning & Direct CTAs */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <AnimatedContent distance={16} duration={0.5} delay={0.05}>
                  <div className="mb-5 sm:mb-6">
                    <img
                      src="/images/alphalens-logo.svg"
                      alt="AlphaLens AI — Legal Intelligence. Amplified."
                      className="w-[230px] sm:w-[270px] lg:w-[300px] h-auto object-contain select-none"
                      width={300}
                      height={86}
                    />
                  </div>

                  <h1
                    ref={headlineRef}
                    className="font-serif text-3xl sm:text-4xl lg:text-[44px] text-primary font-normal leading-[1.14] tracking-tight mb-5 will-change-[transform,opacity]"
                  >
                    {alphaLens.headline}
                  </h1>

                  <p
                    ref={bodyRef}
                    className="text-base sm:text-lg text-brand-slate leading-relaxed mb-8 max-w-xl font-normal will-change-[transform,opacity]"
                  >
                    {alphaLens.supportingCopy}
                  </p>

                  <div ref={ctaRef} className="flex flex-wrap items-center gap-4 will-change-[transform,opacity]">
                    <a
                      href={alphaLens.cta.href}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover text-white text-[14px] font-semibold rounded-md shadow-sm shadow-accent/20 hover:shadow-md transition-all duration-200 active:translate-y-px"
                    >
                      <span>{alphaLens.cta.label}</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>

                    <a
                      href="/#home"
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-accent transition-colors py-2 px-2 rounded"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Homepage</span>
                    </a>
                  </div>
                </AnimatedContent>
              </div>

              {/* Right Column: Four-Module Pipeline Diagram with Animated Progressive Flow */}
              <div ref={diagramRef} className="lg:col-span-5 w-full will-change-[transform,opacity]">
                <AnimatedContent distance={16} duration={0.5} delay={0.1}>
                  <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-7 shadow-xs">
                    {/* Flow Nodes 01 through 04 with progressive SVG stroke-dash connector drawing */}
                    <div className="flex flex-col gap-2 relative">
                      {/* Node 01: Document Processing */}
                      <div className={`p-3.5 rounded-lg border bg-surface-warm-card hover:bg-surface-warm/60 hover:border-primary/40 flex items-center justify-between gap-3 transition-all duration-200 ${
                        prefersReducedMotion ? 'border-brand-border/80' : 'anim-pipeline-node-1'
                      }`}>
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded flex items-center justify-center bg-primary/10 text-primary font-mono text-xs font-bold shrink-0 border border-primary/20">
                            01
                          </span>
                          <div>
                            <div className="text-xs font-semibold text-primary">
                              Document Processing
                            </div>
                            <div className="text-[11px] text-brand-slate font-mono">
                              Ingestion & Bates Stamping
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-brand-taupe font-medium px-2 py-0.5 rounded bg-white border border-brand-border/60 shrink-0">
                          4 Tools
                        </span>
                      </div>

                      {/* Directional SVG Connector 01 -> 02 */}
                      <div className="flex justify-center -my-1 relative z-10" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="overflow-visible">
                          <line
                            x1="12"
                            y1="0"
                            x2="12"
                            y2="16"
                            stroke="#004643"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeDasharray="16"
                            className={prefersReducedMotion ? '' : 'anim-pipeline-connector-1 text-primary'}
                          />
                          <polyline
                            points="8,12 12,17 16,12"
                            stroke="#004643"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={prefersReducedMotion ? '' : 'anim-pipeline-tip-1 text-primary'}
                          />
                        </svg>
                      </div>

                      {/* Node 02: Extraction */}
                      <div className={`p-3.5 rounded-lg border bg-surface-warm-card hover:bg-surface-warm/60 hover:border-primary/40 flex items-center justify-between gap-3 transition-all duration-200 ${
                        prefersReducedMotion ? 'border-brand-border/80' : 'anim-pipeline-node-2'
                      }`}>
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded flex items-center justify-center bg-primary/10 text-primary font-mono text-xs font-bold shrink-0 border border-primary/20">
                            02
                          </span>
                          <div>
                            <div className="text-xs font-semibold text-primary">
                              Extraction
                            </div>
                            <div className="text-[11px] text-brand-slate font-mono">
                              Bank Statements & Invoices
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-brand-taupe font-medium px-2 py-0.5 rounded bg-white border border-brand-border/60 shrink-0">
                          4 Tools
                        </span>
                      </div>

                      {/* Directional SVG Connector 02 -> 03 */}
                      <div className="flex justify-center -my-1 relative z-10" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="overflow-visible">
                          <line
                            x1="12"
                            y1="0"
                            x2="12"
                            y2="16"
                            stroke="#004643"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeDasharray="16"
                            className={prefersReducedMotion ? '' : 'anim-pipeline-connector-2 text-primary'}
                          />
                          <polyline
                            points="8,12 12,17 16,12"
                            stroke="#004643"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={prefersReducedMotion ? '' : 'anim-pipeline-tip-2 text-primary'}
                          />
                        </svg>
                      </div>

                      {/* Node 03: Analysis & Intelligence */}
                      <div className={`p-3.5 rounded-lg border bg-surface-warm-card hover:bg-surface-warm/60 hover:border-primary/40 flex items-center justify-between gap-3 transition-all duration-200 ${
                        prefersReducedMotion ? 'border-brand-border/80' : 'anim-pipeline-node-3'
                      }`}>
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded flex items-center justify-center bg-primary/10 text-primary font-mono text-xs font-bold shrink-0 border border-primary/20">
                            03
                          </span>
                          <div>
                            <div className="text-xs font-semibold text-primary">
                              Analysis & Intelligence
                            </div>
                            <div className="text-[11px] text-brand-slate font-mono">
                              Categorization & Regression
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-brand-taupe font-medium px-2 py-0.5 rounded bg-white border border-brand-border/60 shrink-0">
                          5 Tools
                        </span>
                      </div>

                      {/* Directional SVG Connector 03 -> 04 */}
                      <div className="flex justify-center -my-1 relative z-10" aria-hidden="true">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="overflow-visible">
                          <line
                            x1="12"
                            y1="0"
                            x2="12"
                            y2="16"
                            stroke="#004643"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeDasharray="16"
                            className={prefersReducedMotion ? '' : 'anim-pipeline-connector-3 text-primary'}
                          />
                          <polyline
                            points="8,12 12,17 16,12"
                            stroke="#004643"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={prefersReducedMotion ? '' : 'anim-pipeline-tip-3 text-primary'}
                          />
                        </svg>
                      </div>

                      {/* Node 04: Quality Control */}
                      <div className={`p-3.5 rounded-lg border bg-surface-warm-card hover:bg-surface-warm/60 hover:border-primary/40 flex items-center justify-between gap-3 transition-all duration-200 ${
                        prefersReducedMotion ? 'border-brand-border/80' : 'anim-pipeline-node-4'
                      }`}>
                        <div className="flex items-center gap-3">
                          <span className="w-7 h-7 rounded flex items-center justify-center bg-primary/10 text-primary font-mono text-xs font-bold shrink-0 border border-primary/20">
                            04
                          </span>
                          <div>
                            <div className="text-xs font-semibold text-primary">
                              Quality Control
                            </div>
                            <div className="text-[11px] text-brand-slate font-mono">
                              Auditing & Highlight Verification
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-brand-taupe font-medium px-2 py-0.5 rounded bg-white border border-brand-border/60 shrink-0">
                          3 Tools
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-brand-border/60 flex items-center justify-between text-[11px] font-mono text-brand-taupe">
                      <span>16 Specialized Tools Total</span>
                      <span>Continuous Evidentiary Custody</span>
                    </div>
                  </div>
                </AnimatedContent>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 2: THE PRINCIPLE BAND (Sequenced 3-Stage Flow)                    */}
        {/* ========================================================================= */}
        <section
          ref={principleRef}
          className="bg-primary text-white py-14 sm:py-16 border-b border-primary-dark overflow-hidden"
        >
          <div className="site-container">
            <AnimatedContent distance={16} duration={0.5}>
              <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal tracking-tight text-white">
                  {alphaLens.principle.headline}
                </h2>
              </div>
            </AnimatedContent>

            {/* Three-Stage Sequenced Horizontal Diagram: AI Processing → Expert Review → Delivered */}
            <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-0 relative">
              {alphaLens.principle.stages.map((stg, i) => {
                const animClass =
                  !prefersReducedMotion && principleTriggered
                    ? i === 0
                      ? 'anim-principle-stage-1'
                      : i === 1
                      ? 'anim-principle-stage-2'
                      : 'anim-principle-stage-3'
                    : '';

                return (
                  <React.Fragment key={stg.id}>
                    {/* Stage Card */}
                    <div
                      className={`flex-1 p-6 rounded-lg bg-white/[0.06] border border-white/15 flex flex-col justify-between relative group hover:bg-white/[0.1] hover:border-white/30 hover:-translate-y-1 transition-all duration-300 ${animClass}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-white border border-white/10 group-hover:border-white/30 transition-colors">
                            {i === 0 ? (
                              <Cpu className="w-5 h-5 text-white/90" />
                            ) : i === 1 ? (
                              <UserCheck className="w-5 h-5 text-white/90" />
                            ) : (
                              <SealCheck className="w-5 h-5 text-white/90" />
                            )}
                          </div>
                          <span className="text-xs font-mono font-semibold tracking-wider text-brand-taupe-light">
                            0{i + 1}
                          </span>
                        </div>

                        <h3 className="font-serif text-xl sm:text-2xl text-white font-normal mb-2 tracking-tight">
                          {stg.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-surface-warm/85 leading-relaxed font-normal">
                          {stg.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-brand-taupe-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                        <span>{i === 0 ? 'Scalable Automation' : i === 1 ? 'Human Governance' : 'Courtroom Defensibility'}</span>
                      </div>
                    </div>

                    {/* Step Connectors between Stage 01 -> 02 and Stage 02 -> 03 */}
                    {i < 2 && (
                      <>
                        {/* Desktop Horizontal Connector strictly in the gap between cards */}
                        <div
                          className="hidden md:flex shrink-0 w-8 lg:w-12 xl:w-14 items-center justify-center px-1 pointer-events-none"
                          aria-hidden="true"
                        >
                          <svg
                            width="100%"
                            height="16"
                            viewBox="0 0 44 16"
                            fill="none"
                            className="max-w-[44px] overflow-visible"
                          >
                            <line
                              x1="2"
                              y1="8"
                              x2="36"
                              y2="8"
                              stroke="rgba(240, 237, 229, 0.45)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeDasharray="36"
                              className={
                                !prefersReducedMotion && principleTriggered
                                  ? i === 0
                                    ? 'anim-principle-connector-1'
                                    : 'anim-principle-connector-2'
                                  : ''
                              }
                            />
                            <polyline
                              points="30,4 36,8 30,12"
                              stroke="rgba(240, 237, 229, 0.75)"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={
                                !prefersReducedMotion && principleTriggered
                                  ? i === 0
                                    ? 'anim-pipeline-tip-1'
                                    : 'anim-pipeline-tip-2'
                                  : ''
                              }
                            />
                          </svg>
                        </div>

                        {/* Mobile Downward Connector between stacked cards */}
                        <div
                          className="flex md:hidden justify-center -my-1 text-surface-warm/60 pointer-events-none"
                          aria-hidden="true"
                        >
                          <ArrowDown className="w-4 h-4" strokeWidth={1.75} />
                        </div>
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 3: INTERACTIVE FOUR-MODULE PIPELINE EXPLORER                      */}
        {/* ========================================================================= */}
        <section className="bg-white py-14 sm:py-16 lg:py-20 border-b border-brand-border/60">
          <div className="site-container">
            <AnimatedContent distance={16} duration={0.5}>
              <div className="max-w-3xl mb-10 sm:mb-14">
                <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal tracking-tight mb-4">
                  Four Modules. Sixteen Specialized Tools.
                </h2>
                <p className="text-base sm:text-lg text-brand-slate leading-relaxed font-normal">
                  Four modules. Sixteen tools. One integrated pipeline.
                </p>
              </div>
            </AnimatedContent>

            {/* Interactive Module Explorer: Left Selector + Right Tool List */}
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-10 mb-14">
              {/* Left Column: Compact Vertical Module Selector with Accessible Keyboard Nav */}
              <div className="w-full lg:w-[34%] shrink-0 flex flex-col gap-3">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-taupe select-none px-1">
                  Select Module
                </span>

                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5"
                  role="tablist"
                  aria-label="Pipeline Modules"
                  aria-orientation="vertical"
                >
                  {alphaLens.modules.map((m, idx) => {
                    const isSelected = activeModule === idx;

                    return (
                      <button
                        key={m.id}
                        ref={(el) => { tabRefs.current[idx] = el; }}
                        role="tab"
                        aria-selected={isSelected}
                        aria-controls={`module-panel-${m.id}`}
                        id={`module-tab-${m.id}`}
                        tabIndex={isSelected ? 0 : -1}
                        onClick={() => handleSelectModule(idx)}
                        onKeyDown={(e) => handleTabKeyDown(e, idx)}
                        className={`text-left p-4 rounded-lg border transition-all duration-200 flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary relative ${
                          isSelected
                            ? 'bg-surface-warm border-l-4 border-l-primary border-t-brand-border/80 border-r-brand-border/80 border-b-brand-border/80 shadow-xs'
                            : 'bg-white border-brand-border/70 hover:border-brand-border hover:bg-surface-warm/40 hover:translate-x-1'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-8 h-8 rounded flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-all duration-200 ${
                              isSelected ? 'bg-primary text-white scale-105' : 'bg-surface-warm text-brand-dark'
                            }`}
                          >
                            {m.number}
                          </span>
                          <div>
                            <div className={`text-sm font-semibold transition-colors ${isSelected ? 'text-primary font-bold' : 'text-brand-dark'}`}>
                              {m.title}
                            </div>
                            <div className="text-[11px] font-mono text-brand-taupe">
                              {m.subtitle}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-brand-taupe">
                            {m.tools.length} Tools
                          </span>
                          <CaretRight
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isSelected ? 'text-primary translate-x-1' : 'text-brand-taupe/40'
                            }`}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Selected Module Details & Snappy Responsive Tool List */}
              <div
                key={activeModule}
                className={`w-full lg:w-[66%] bg-surface-warm-card rounded-xl border border-brand-border p-6 sm:p-8 lg:p-9 shadow-xs transition-opacity duration-200 ${
                  isModuleTransitioning ? 'opacity-70' : 'opacity-100'
                } animate-[tool-panel-fade-in_220ms_cubic-bezier(0.16,1,0.3,1)_both]`}
                role="tabpanel"
                id={`module-panel-${alphaLens.modules[activeModule].id}`}
                aria-labelledby={`module-tab-${alphaLens.modules[activeModule].id}`}
              >
                {/* Module Header */}
                <div className="pb-6 border-b border-brand-border/70 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-mono font-semibold uppercase tracking-wider text-brand-taupe">
                        MODULE {alphaLens.modules[activeModule].number}
                      </span>
                      <span className="text-brand-border select-none">•</span>
                      <span className="text-xs font-mono font-semibold text-primary uppercase">
                        {alphaLens.modules[activeModule].subtitle}
                      </span>
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-primary font-normal tracking-tight">
                      {alphaLens.modules[activeModule].title}
                    </h3>
                  </div>

                  <span className="text-xs font-mono px-3 py-1 rounded bg-white border border-brand-border text-brand-dark font-medium self-start sm:self-center">
                    {alphaLens.modules[activeModule].tools.length} Tools in Sequence
                  </span>
                </div>

                <p className="text-sm sm:text-[15px] text-brand-slate leading-relaxed mb-6 font-normal">
                  {alphaLens.modules[activeModule].description}
                </p>

                {/* Clean Tool List with Staggered Succession */}
                <div className="divide-y divide-brand-border/70 border-t border-brand-border/70">
                  {alphaLens.modules[activeModule].tools.map((tool, idx) => (
                    <div
                      key={tool.name}
                      style={{
                        animationDelay: prefersReducedMotion ? '0ms' : `${idx * 28}ms`,
                      }}
                      className="py-4 sm:py-4.5 flex items-start gap-3.5 sm:gap-4 hover:bg-black/[0.018] -mx-3 px-3 rounded-lg transition-all duration-200 group animate-[tool-row-enter_200ms_cubic-bezier(0.16,1,0.3,1)_both]"
                    >
                      {/* Outline Icon in Brand Palette Box */}
                      <div className="w-8 h-8 rounded flex items-center justify-center bg-white border border-brand-border text-primary shrink-0 mt-0.5 shadow-2xs group-hover:border-primary/50 group-hover:scale-105 transition-all duration-200">
                        {getToolIcon(tool.name)}
                      </div>

                      <div className="flex-grow">
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                          <span className="font-serif text-base sm:text-[17px] text-primary group-hover:text-primary-dark font-normal tracking-tight transition-colors">
                            {tool.name}
                          </span>
                          <span className="text-[11px] font-mono text-brand-taupe group-hover:text-primary transition-colors">
                            Tool 0{idx + 1}
                          </span>
                        </div>
                        <p className="text-xs sm:text-[13.5px] text-brand-slate leading-relaxed font-normal">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Supporting Feature Row (Coordinated Group Entrance) */}
            <div className="pt-10 border-t border-brand-border/80">
              <AnimatedContent distance={16} duration={0.5} stagger={0.06} threshold={0.15} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {alphaLens.supportingFeatures.map((feat, idx) => (
                  <div key={feat.title} className="h-full">
                    <InteractiveImageCard
                      imageSrc={capabilityImages[idx].src}
                      imageAlt={capabilityImages[idx].alt}
                      title={feat.title}
                      description={feat.description}
                      surfaceBg="#FFFFFF"
                      minHeightClass="min-h-[340px] sm:min-h-[360px]"
                      topAccent={idx % 2 === 0 ? '#004643' : '#A79277'}
                      className="border border-brand-border/80"
                    />
                  </div>
                ))}
              </AnimatedContent>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 4: CRYPTO INTEGRATION (Hub-and-Spoke Animated Infographic)        */}
        {/* ========================================================================= */}
        <section
          ref={cryptoRef}
          className="bg-surface-warm py-14 sm:py-16 lg:py-20 border-b border-brand-border/60 overflow-hidden"
        >
          <div className="site-container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              {/* Left Column: Core Crypto Positioning & Messaging */}
              <div className="lg:col-span-6">
                <AnimatedContent distance={16} duration={0.5}>
                  <h2 className="font-serif text-3xl sm:text-4xl text-primary font-normal tracking-tight mb-4">
                    {alphaLens.cryptoCapabilities.title}
                  </h2>

                  <div className="p-4 sm:p-5 rounded-lg bg-white border border-brand-border mb-5 shadow-2xs">
                    <p className="font-serif text-lg sm:text-xl text-primary font-normal">
                      "{alphaLens.cryptoCapabilities.coreMessage}"
                    </p>
                  </div>

                  <p className="text-base text-brand-slate leading-relaxed mb-6 font-normal">
                    {alphaLens.cryptoCapabilities.description}
                  </p>

                  <div className="pt-4 border-t border-brand-border/70 flex items-center gap-2.5 text-xs font-mono text-brand-slate">
                    <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                    <span>{alphaLens.cryptoCapabilities.reconciliationNote}</span>
                  </div>
                </AnimatedContent>
              </div>

              {/* Right Column: Hub-and-Spoke Ingestion Model with Outward Animated Connectors */}
              <div className="lg:col-span-6">
                <AnimatedContent distance={16} duration={0.5} delay={0.1}>
                  <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-xs">
                    <div className="text-xs font-mono font-semibold text-brand-taupe uppercase tracking-wider mb-6 text-center">
                      Unified Asset Ingestion Model
                    </div>

                    {/* Central Node + 4 Surrounding Sources */}
                    <div className="flex flex-col items-center">
                      {/* Central Node: Bitcoin / Crypto Data in Cyprus Deep Teal */}
                      <div
                        className={`px-6 py-4 rounded-xl bg-primary text-white border border-primary-dark shadow-sm text-center max-w-xs w-full transition-all duration-300 hover:shadow-md hover:scale-[1.02] relative z-20 ${
                          !prefersReducedMotion && cryptoTriggered ? 'anim-crypto-hub' : ''
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2 mb-1">
                          <Coins className="w-5 h-5 text-accent-light" strokeWidth={1.75} />
                          <span className="font-serif text-lg font-normal tracking-tight">
                            Bitcoin / Crypto Data
                          </span>
                        </div>
                        <span className="text-[11px] font-mono text-surface-warm/80">
                          Integrated Evidentiary Pipeline
                        </span>
                      </div>

                      {/* Outward Branching SVG Connectors from Center to 4 Spokes */}
                      <div className="w-full flex justify-center -my-1 relative z-10 py-1" aria-hidden="true">
                        <svg
                          width="100%"
                          height="36"
                          viewBox="0 0 400 36"
                          fill="none"
                          preserveAspectRatio="xMidYMid meet"
                          className="max-w-md overflow-visible"
                        >
                          {/* Central vertical stem */}
                          <line
                            x1="200"
                            y1="0"
                            x2="200"
                            y2="18"
                            stroke="#004643"
                            strokeWidth="1.5"
                            strokeDasharray="18"
                            className={!prefersReducedMotion && cryptoTriggered ? 'anim-crypto-connectors' : ''}
                          />
                          {/* Left branch */}
                          <path
                            d="M 200 18 H 100 V 36"
                            stroke="#A79277"
                            strokeWidth="1.5"
                            strokeDasharray="120"
                            fill="none"
                            className={!prefersReducedMotion && cryptoTriggered ? 'anim-crypto-connectors' : ''}
                          />
                          {/* Right branch */}
                          <path
                            d="M 200 18 H 300 V 36"
                            stroke="#A79277"
                            strokeWidth="1.5"
                            strokeDasharray="120"
                            fill="none"
                            className={!prefersReducedMotion && cryptoTriggered ? 'anim-crypto-connectors' : ''}
                          />
                        </svg>
                      </div>

                      {/* Directional Connector Indicator */}
                      <div className="flex items-center gap-2 text-xs font-mono text-brand-taupe mb-4">
                        <ArrowUp className="w-3.5 h-3.5 text-brand-taupe" strokeWidth={1.75} />
                        <span>Reconciled Sources</span>
                        <ArrowDown className="w-3.5 h-3.5 text-brand-taupe" strokeWidth={1.75} />
                      </div>

                      {/* Surrounding Sources Grid (4 connected nodes in sequence) */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full">
                        {alphaLens.cryptoCapabilities.sources.map((src, i) => {
                          const spokeAnim =
                            !prefersReducedMotion && cryptoTriggered
                              ? i === 0
                                ? 'anim-crypto-spoke-1'
                                : i === 1
                                ? 'anim-crypto-spoke-2'
                                : i === 2
                                ? 'anim-crypto-spoke-3'
                                : 'anim-crypto-spoke-4'
                              : '';

                          return (
                            <div
                              key={src.name}
                              className={`p-4 rounded-lg bg-surface-warm-card border border-brand-border/80 flex flex-col justify-between hover:border-primary/40 hover:bg-white hover:-translate-y-0.5 hover:shadow-xs transition-all duration-250 ${spokeAnim}`}
                            >
                              <div className="flex items-center gap-2.5 mb-1.5">
                                <span className="w-6 h-6 rounded flex items-center justify-center bg-white text-primary font-mono text-xs font-bold border border-brand-border shrink-0">
                                  {i === 0 ? (
                                    <Buildings className="w-3.5 h-3.5" />
                                  ) : i === 1 ? (
                                    <Wallet className="w-3.5 h-3.5" />
                                  ) : i === 2 ? (
                                    <Receipt className="w-3.5 h-3.5" />
                                  ) : (
                                    <FileText className="w-3.5 h-3.5" />
                                  )}
                                </span>
                                <span className="text-xs font-semibold text-primary">
                                  {src.name}
                                </span>
                              </div>
                              <p className="text-xs text-brand-slate leading-relaxed font-normal">
                                {src.details}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-brand-border/60 text-center text-[11px] font-mono text-brand-taupe">
                      Fiat-to-Crypto Bridges • Ledger Reconciliation
                    </div>
                  </div>
                </AnimatedContent>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SECTION 5: CLOSING CTA (Cyprus Deep Teal #004643)                         */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 lg:py-24 bg-primary text-white">
          <div className="site-container text-center max-w-2xl mx-auto">
            <AnimatedContent distance={20} duration={0.65} threshold={0.15}>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal tracking-tight text-white leading-tight mb-5">
                Ready to Streamline Your Litigation Discovery?
              </h2>

              <p className="text-base sm:text-lg text-surface-warm/85 leading-relaxed mb-8 font-normal">
                Experience how AlphaLens AI transforms complex, fragmented financial documents into structured, defensible evidentiary schedules.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-hover text-white text-[14px] sm:text-[15px] font-semibold rounded-md shadow-sm shadow-accent/20 hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98] active:translate-y-px"
                >
                  <CalendarBlank className="w-4 h-4" />
                  <span>Request Platform Demo</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </a>

                <a
                  href="mailto:info@alphaanalyticssol.com?subject=AlphaLens%20AI%20Platform%20Inquiry"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/15 text-white text-[14px] sm:text-[15px] font-medium rounded-md border border-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
                >
                  <EnvelopeSimple className="w-4 h-4" />
                  <span>Email Direct Inquiry</span>
                </a>
              </div>
            </AnimatedContent>
          </div>
        </section>
      </main>
  );
};

export default AlphaLensPage;
