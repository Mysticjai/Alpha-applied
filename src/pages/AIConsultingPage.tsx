import React, { useEffect, useState, useRef } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Compass,
  Cpu,
  FlowArrow,
  GraduationCap,
  CalendarBlank,
  EnvelopeSimple,
  FileText,
  Database,
  Gear,
  CheckCircle,
  CaretRight,
} from '@phosphor-icons/react';
import { siteContent } from '../content/siteContent';
import { AnimatedContent } from '../components/ui/AnimatedContent';
import { useHeroScrollExit } from '../hooks/useHeroScrollExit';
import { AIAssessmentTimeline } from '../components/sections/AIAssessmentTimeline';

export const AIConsultingPage: React.FC = () => {
  const { aiConsulting } = siteContent;
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [networkTriggered, setNetworkTriggered] = useState(false);

  const heroSectionRef = useRef<HTMLElement>(null);
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroSubtitleRef = useRef<HTMLParagraphElement>(null);
  const heroCtaRef = useRef<HTMLDivElement>(null);
  const heroPathwayRef = useRef<HTMLDivElement>(null);
  const networkRef = useRef<HTMLDivElement>(null);

  // Cinematic scroll-linked hero text exit
  useHeroScrollExit({
    triggerRef: heroSectionRef,
    headlineRef: heroTitleRef,
    bodyRef: heroSubtitleRef,
    ctaRef: heroCtaRef,
    extraRef: heroPathwayRef,
    enabled: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener?.('change', motionListener);

    // Observer for Service 03 Integration Network Showcase
    const networkObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNetworkTriggered(true);
          networkObserver.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (networkRef.current) networkObserver.observe(networkRef.current);

    return () => {
      mediaQuery.removeEventListener?.('change', motionListener);
      networkObserver.disconnect();
    };
  }, []);

  const s1 = aiConsulting.services[0]; // AI Assessment & Strategy
  const s2 = aiConsulting.services[1]; // AI Implementation & Integration
  const s3 = aiConsulting.services[2]; // AI Integrations & Plugin Implementation
  const s4 = aiConsulting.services[3]; // AI Training & Professional Courses

  // In-page navigation handler for Practice Disciplines cards
  // Smoothly scrolls to target section without modifying route or URL
  const handleScrollToDiscipline = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    const headerOffset = 88;
    const targetY = Math.max(
      0,
      Math.round(targetEl.getBoundingClientRect().top + window.scrollY - headerOffset)
    );

    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 0.9 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  // Timeline stage titles for Service 01 (Assessment & Strategy)
  const timelineTitles = [
    'Process & Workflow Audit',
    'Opportunity & Value Mapping',
    'Technology & Tool Evaluation',
    'Risk & Feasibility Analysis',
    'Adoption Roadmap Delivery',
  ];

  // 3 Phases for Service 02 (Implementation & Integration)
  const implementationPhases = [
    {
      phase: 'Phase 01',
      title: 'Deployment & Ingestion',
      subtitle: 'Foundation Architecture',
      items: [
        { num: '01', text: s2.items[0] },
        { num: '02', text: s2.items[1] },
      ],
    },
    {
      phase: 'Phase 02',
      title: 'Automation & Tailoring',
      subtitle: 'Workflow Orchestration',
      items: [
        { num: '03', text: s2.items[2] },
        { num: '04', text: s2.items[3] },
      ],
    },
    {
      phase: 'Phase 03',
      title: 'Optimization & Governance',
      subtitle: 'Oversight & Verification',
      items: [
        { num: '05', text: s2.items[4] },
        { num: '06', text: s2.items[5] },
      ],
    },
  ];

  // Module category labels for Service 04 (Training & Professional Courses)
  const moduleCategories = [
    'AI Tools & Platform Capabilities',
    'Prompting & Context Management',
    'Research, Analysis & Documentation',
    'Files & Structured Information',
    'Repeatable AI-Assisted Workflows',
    'Advanced Tools & Integrations',
    'Verification, Limitations & Ethics',
  ];

  return (
    <main className="flex-grow">
      {/* ========================================================================= */}
      {/* SECTION 1: HERO & CONNECTED SERVICE SHORTCUTS                             */}
      {/* ========================================================================= */}
      <section
        ref={heroSectionRef}
        className="bg-surface-warm border-b border-brand-border/60 pt-8 pb-14 lg:pt-12 lg:pb-16 relative overflow-hidden"
      >
        <div className="site-container relative z-10">
          {/* Breadcrumb Navigation */}
          <AnimatedContent distance={10} duration={0.4}>
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-taupe mb-5 sm:mb-6">
              <a href="/#home" data-direction="backward" data-restore-scroll="true" className="hover:text-primary transition-colors">
                Home
              </a>
              <span className="text-brand-border/80 select-none">/</span>
              <span className="text-primary font-semibold">AI Consulting & Implementation</span>
            </nav>
          </AnimatedContent>

          {/* Clean Editorial Intro */}
          <div className="max-w-3xl">
            <AnimatedContent distance={16} duration={0.5} delay={0.05}>
              {/* Main Page Title */}
              <h1
                ref={heroTitleRef}
                className="font-serif text-3xl sm:text-4xl lg:text-[44px] xl:text-[48px] text-primary font-semibold tracking-[-0.02em] leading-[1.14] will-change-[transform,opacity]"
              >
                {aiConsulting.title}
              </h1>

              {/* Introductory Description */}
              <p
                ref={heroSubtitleRef}
                className="mt-4 sm:mt-5 text-base sm:text-lg text-brand-slate leading-relaxed font-normal will-change-[transform,opacity]"
              >
                {aiConsulting.subtitle}
              </p>

              {/* Primary Action Buttons */}
              <div ref={heroCtaRef} className="mt-8 flex flex-wrap items-center gap-4 will-change-[transform,opacity]">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover text-white text-[14px] font-semibold rounded-md shadow-sm shadow-accent/20 hover:shadow-md transition-all duration-200 active:translate-y-px"
                >
                  <span>{aiConsulting.cta.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="/#home"
                  data-direction="backward"
                  data-restore-scroll="true"
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-accent transition-colors py-2 px-2 focus:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Homepage</span>
                </a>
              </div>
            </AnimatedContent>
          </div>

          {/* Refined Connected Service Shortcuts (Unified 4-Stage Pathway Track) */}
          <div ref={heroPathwayRef} className="mt-10 pt-7 border-t border-brand-border/70">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
              {aiConsulting.services.map((svc, i) => {
                const icons = [
                  <Compass key="ic1" className="w-4 h-4 text-primary" />,
                  <Cpu key="ic2" className="w-4 h-4 text-primary" />,
                  <FlowArrow key="ic3" className="w-4 h-4 text-primary" />,
                  <GraduationCap key="ic4" className="w-4 h-4 text-primary" />,
                ];

                const stageNames = ['Assessment & Strategy', 'Implementation', 'Integrations & Plugins', 'Training & Courses'];

                return (
                  <a
                    key={svc.id}
                    href={`#${svc.id}`}
                    data-inpage-scroll="true"
                    data-target={svc.id}
                    onClick={(e) => handleScrollToDiscipline(e, svc.id)}
                    className="group relative p-4 rounded-xl bg-white border border-brand-border/80 hover:border-primary/50 hover:shadow-sm hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-between gap-3 text-left overflow-hidden cursor-pointer"
                  >
                    {/* Hover indicator accent bar */}
                    <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="flex items-center gap-3 min-w-0 pl-1">
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface-warm border border-brand-border/70 text-primary font-mono text-xs font-bold shrink-0 transition-all duration-200">
                        {icons[i]}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-brand-taupe group-hover:text-primary transition-colors">
                          Stage 0{i + 1}
                        </div>
                        <div className="text-xs font-semibold text-primary truncate group-hover:text-primary-dark transition-colors">
                          {stageNames[i]}
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 text-brand-taupe group-hover:text-primary group-hover:translate-x-1 transition-all duration-200">
                      <CaretRight className="w-4 h-4" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SERVICE 01: AI ASSESSMENT & STRATEGY (Connected Timeline Layout)          */}
      {/* ========================================================================= */}
      <section
        id={s1.id}
        className="py-16 sm:py-20 lg:py-24 bg-white border-b border-brand-border/60 scroll-mt-20 relative overflow-hidden"
      >
        <div className="site-container">
          <AnimatedContent distance={20} duration={0.5} threshold={0.12}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start">
              {/* Left Column: Heading, Narrative & Benefit Callout */}
              <div className="lg:col-span-5 flex flex-col justify-start">
                {/* Main Service Heading */}
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] text-primary font-semibold leading-[1.16] tracking-tight mb-3">
                  {s1.title}
                </h2>

                {/* Supporting Headline */}
                <p className="text-base sm:text-lg font-medium text-brand-dark/90 leading-snug mb-5">
                  {s1.headline}
                </p>

                {/* Introductory Description */}
                <p className="text-[14.5px] sm:text-[15.5px] text-brand-slate leading-relaxed font-normal">
                  {s1.description}
                </p>

                {/* Strategic Outcome Deliverable Callout */}
                <div className="mt-8 pt-6 border-t border-brand-border/80">
                  <div className="p-4 sm:p-5 rounded-xl bg-surface-warm/60 border border-brand-border/80 flex items-start gap-3.5 shadow-2xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0 mt-1 shadow-xs" />
                    <div>
                      <p className="text-sm font-medium text-brand-dark leading-relaxed">
                        {s1.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Connected Visual Timeline with Scroll-Synchronized Arrow */}
              <AIAssessmentTimeline
                items={s1.items}
                timelineTitles={timelineTitles}
              />
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SERVICE 02: AI IMPLEMENTATION & INTEGRATION (Connected Workflow Pipeline) */}
      {/* ========================================================================= */}
      <section
        id={s2.id}
        className="py-16 sm:py-20 lg:py-24 bg-surface-warm border-b border-brand-border/60 scroll-mt-20 relative overflow-hidden"
      >
        <div className="site-container">
          <AnimatedContent distance={20} duration={0.5} threshold={0.12}>
            {/* Header Row: Title, Headline, Narrative & Outcome */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-start mb-12">
              <div className="lg:col-span-6">
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] text-primary font-semibold leading-[1.16] tracking-tight mb-3">
                  {s2.title}
                </h2>

                <p className="text-base sm:text-lg font-medium text-brand-dark/90 leading-snug">
                  {s2.headline}
                </p>
              </div>

              <div className="lg:col-span-6 flex flex-col justify-between">
                <p className="text-[14.5px] sm:text-[15.5px] text-brand-slate leading-relaxed font-normal mb-5">
                  {s2.description}
                </p>

                <div className="p-4 rounded-xl bg-white border border-brand-border/80 flex items-start gap-3 shadow-2xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0 mt-1 shadow-xs" />
                  <div>
                    <div className="text-[11px] font-mono uppercase tracking-wider text-brand-taupe font-semibold mb-0.5">
                      Execution Outcome
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-brand-dark leading-relaxed">
                      {s2.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Workflow Visual Showcase: 3 Connected Phased Execution Stages */}
            <div className="mt-8">
              <div className="mb-4 px-1 text-xs font-mono uppercase tracking-wider text-brand-taupe">
                <span className="font-semibold text-primary">Three-Stage Implementation Lifecycle</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative">
                {implementationPhases.map((phase) => (
                  <div
                    key={phase.phase}
                    className="relative rounded-2xl bg-white border border-brand-border/80 p-6 sm:p-7 shadow-xs hover:shadow-md hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                  >
                    {/* Top Accent Line */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-primary" />

                    <div>
                      <h3 className="font-serif text-xl sm:text-[22px] text-primary font-medium tracking-tight mb-5 pt-1">
                        {phase.title}
                      </h3>

                      {/* Phase Steps */}
                      <div className="space-y-4">
                        {phase.items.map((step) => (
                          <div
                            key={step.num}
                            className="p-3.5 rounded-lg bg-surface-warm/40 border border-brand-border/60 flex items-start gap-3 group-hover:bg-surface-warm/70 transition-colors"
                          >
                            <span className="w-6 h-6 rounded-md bg-white border border-brand-border/70 text-primary font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                              {step.num}
                            </span>
                            <p className="text-xs sm:text-[13.5px] text-brand-dark leading-relaxed font-normal">
                              {step.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SERVICE 03: AI INTEGRATIONS & PLUGIN IMPLEMENTATION (Technical Showcase)  */}
      {/* ========================================================================= */}
      <section
        id={s3.id}
        className="py-16 sm:py-20 lg:py-24 bg-white border-b border-brand-border/60 scroll-mt-20 relative overflow-hidden"
      >
        <div className="site-container">
          <AnimatedContent distance={20} duration={0.5} threshold={0.12}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start">
              {/* Left Column: Heading, Narrative, Approved Capabilities & Outcome */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] text-primary font-semibold leading-[1.16] tracking-tight mb-3">
                    {s3.title}
                  </h2>

                  <p className="text-base sm:text-lg font-medium text-brand-dark/90 leading-snug mb-4">
                    {s3.headline}
                  </p>

                  <p className="text-[14.5px] sm:text-[15.5px] text-brand-slate leading-relaxed font-normal mb-6">
                    {s3.description}
                  </p>

                  {/* Approved Service Capabilities Checklist */}
                  <div className="mb-6 space-y-3 border-t border-brand-border/70 pt-5">
                    <div className="text-xs font-mono font-bold uppercase tracking-wider text-primary mb-2">
                      Integration Capabilities:
                    </div>
                    {s3.items.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-dark leading-relaxed group">
                        <CheckCircle weight="fill" className="w-4 h-4 text-primary shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Outcome Highlight */}
                  <div className="pt-4 border-t border-brand-border/70">
                    <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-warm/60 border border-brand-border/70 shadow-2xs">
                      <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0 mt-1 shadow-xs" />
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-brand-dark leading-relaxed">
                          {s3.outcome}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Prominent Technical Architecture Showcase */}
              <div ref={networkRef} className="lg:col-span-7 w-full">
                <div className="rounded-2xl bg-surface-warm/50 border border-brand-border/80 p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
                  {/* Architecture Diagram Canvas */}
                  <div className="flex flex-col items-center">
                    {/* Central Core Hub Node: AI Assistant */}
                    <div
                      className={`px-7 py-5 rounded-2xl bg-primary text-white border-2 border-primary-dark shadow-md text-center max-w-sm w-full transition-all duration-300 relative z-20 ${
                        !prefersReducedMotion && networkTriggered ? 'anim-integration-hub' : ''
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2.5 mb-1.5">
                        <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                          <Cpu className="w-5 h-5 text-accent-light" />
                        </div>
                        <span className="font-serif text-xl sm:text-2xl font-normal tracking-tight text-white">
                          AI Assistant
                        </span>
                      </div>
                      <span className="text-xs font-mono text-surface-warm/85 tracking-wide">
                        Central Knowledge &amp; Workflow Hub
                      </span>
                    </div>

                    {/* Smooth Branching Vector SVG Connectors */}
                    <div className="w-full flex justify-center -my-1 relative z-10 py-2" aria-hidden="true">
                      <svg
                        width="100%"
                        height="50"
                        viewBox="0 0 500 50"
                        fill="none"
                        preserveAspectRatio="xMidYMid meet"
                        className="max-w-lg overflow-visible"
                      >
                        {/* Central vertical stem */}
                        <line
                          x1="250"
                          y1="0"
                          x2="250"
                          y2="25"
                          stroke="#004643"
                          strokeWidth="2"
                          strokeDasharray="25"
                          className={!prefersReducedMotion && networkTriggered ? 'anim-integration-spoke' : ''}
                        />
                        {/* Left branch connector */}
                        <path
                          d="M 250 25 H 125 V 50"
                          stroke="#A79277"
                          strokeWidth="1.75"
                          strokeDasharray="140"
                          fill="none"
                          className={!prefersReducedMotion && networkTriggered ? 'anim-integration-spoke' : ''}
                        />
                        {/* Right branch connector */}
                        <path
                          d="M 250 25 H 375 V 50"
                          stroke="#A79277"
                          strokeWidth="1.75"
                          strokeDasharray="140"
                          fill="none"
                          className={!prefersReducedMotion && networkTriggered ? 'anim-integration-spoke' : ''}
                        />
                      </svg>
                    </div>

                    {/* 4 Connected System Domain Cards (2x2 Grid) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-1">
                      {/* Domain 1: Tools and systems */}
                      <div className="p-4 sm:p-5 rounded-xl bg-white border border-brand-border/80 flex flex-col justify-between hover:border-primary/50 hover:shadow-xs transition-all duration-200 group">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-surface-warm text-primary font-mono text-xs font-bold border border-brand-border/60 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                              <Gear className="w-4 h-4" />
                            </span>
                            <span className="text-xs font-bold text-primary">
                              Tools and systems
                            </span>
                          </div>
                          <p className="text-xs sm:text-[13px] text-brand-slate leading-relaxed font-normal">
                            Integration with relevant tools and operational platforms, where supported.
                          </p>
                        </div>
                      </div>

                      {/* Domain 2: Knowledge sources */}
                      <div className="p-4 sm:p-5 rounded-xl bg-white border border-brand-border/80 flex flex-col justify-between hover:border-primary/50 hover:shadow-xs transition-all duration-200 group">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-surface-warm text-primary font-mono text-xs font-bold border border-brand-border/60 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                              <Database className="w-4 h-4" />
                            </span>
                            <span className="text-xs font-bold text-primary">
                              Knowledge sources
                            </span>
                          </div>
                          <p className="text-xs sm:text-[13px] text-brand-slate leading-relaxed font-normal">
                            Connecting firm repositories, document indices, and knowledge bases.
                          </p>
                        </div>
                      </div>

                      {/* Domain 3: AI-powered workflows */}
                      <div className="p-4 sm:p-5 rounded-xl bg-white border border-brand-border/80 flex flex-col justify-between hover:border-primary/50 hover:shadow-xs transition-all duration-200 group">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-surface-warm text-primary font-mono text-xs font-bold border border-brand-border/60 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                              <FlowArrow className="w-4 h-4" />
                            </span>
                            <span className="text-xs font-bold text-primary">
                              AI-powered workflows
                            </span>
                          </div>
                          <p className="text-xs sm:text-[13px] text-brand-slate leading-relaxed font-normal">
                            Configuration of AI-assisted task execution and multi-step business logic.
                          </p>
                        </div>
                      </div>

                      {/* Domain 4: Research, analysis, and documentation */}
                      <div className="p-4 sm:p-5 rounded-xl bg-white border border-brand-border/80 flex flex-col justify-between hover:border-primary/50 hover:shadow-xs transition-all duration-200 group">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-7 h-7 rounded-lg flex items-center justify-center bg-surface-warm text-primary font-mono text-xs font-bold border border-brand-border/60 shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                              <FileText className="w-4 h-4" />
                            </span>
                            <span className="text-xs font-bold text-primary">
                              Research &amp; Documentation
                            </span>
                          </div>
                          <p className="text-xs sm:text-[13px] text-brand-slate leading-relaxed font-normal">
                            Structured AI-assisted processes for analytical synthesis, drafting, and review.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Compatibility Scope Note */}
                    <div className="mt-6 pt-3.5 border-t border-brand-border/60 text-center text-xs font-mono text-brand-taupe">
                      * Plugin, connector, and tool integrations subject to platform support and compatibility.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SERVICE 04: AI TRAINING & PROFESSIONAL COURSES (Curriculum Syllabus)     */}
      {/* ========================================================================= */}
      <section
        id={s4.id}
        className="py-16 sm:py-20 lg:py-24 bg-surface-warm border-b border-brand-border/60 scroll-mt-20 relative overflow-hidden"
      >
        <div className="site-container">
          <AnimatedContent distance={20} duration={0.5} threshold={0.12}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-16 items-start">
              {/* Left Column: Heading, Narrative, Tailoring Note & Outcome */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] text-primary font-semibold leading-[1.16] tracking-tight mb-3">
                    {s4.title}
                  </h2>

                  <p className="text-base sm:text-lg font-medium text-brand-dark/90 leading-snug mb-4">
                    {s4.headline}
                  </p>

                  <p className="text-[14.5px] sm:text-[15.5px] text-brand-slate leading-relaxed font-normal mb-6">
                    {s4.description}
                  </p>

                  {/* Tailored Training Note */}
                  {s4.additionalNote && (
                    <div className="p-4 sm:p-5 rounded-xl bg-white border border-brand-border/80 mb-6 shadow-2xs">
                      <p className="text-xs sm:text-[13.5px] text-brand-dark leading-relaxed italic">
                        "{s4.additionalNote}"
                      </p>
                    </div>
                  )}
                </div>

                {/* Outcome Highlight */}
                <div className="pt-4 border-t border-brand-border/70">
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-white border border-brand-border/80 shadow-2xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0 mt-1 shadow-xs" />
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-brand-dark leading-relaxed">
                        {s4.outcome}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Executive Masterclass Curriculum Layout (7 Modular Topics) */}
              <div className="lg:col-span-7">
                {/* Structured Curriculum Track Cards */}
                <div className="space-y-3.5">
                  {s4.items.map((topic, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-4.5 rounded-xl bg-white border border-brand-border/80 hover:border-primary/50 hover:shadow-xs transition-all duration-200 flex items-start gap-4 group"
                    >
                      {/* Module Number Tag */}
                      <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface-warm border border-brand-border/70 text-primary font-mono text-xs font-bold shrink-0 mt-0.5 group-hover:bg-primary group-hover:text-white transition-all duration-200">
                        0{idx + 1}
                      </span>

                      <div className="flex-1 min-w-0">
                        <div className="mb-1">
                          <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-bold">
                            {moduleCategories[idx]}
                          </span>
                        </div>
                        <p className="text-xs sm:text-[14px] text-brand-dark leading-relaxed font-normal">
                          {topic}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedContent>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* SECTION 6: CLOSING ADVISORY CTA BANNER                                    */}
      {/* ========================================================================= */}
      <section className="py-16 sm:py-20 lg:py-24 bg-primary text-white relative overflow-hidden">
        <div className="site-container text-center max-w-2xl mx-auto relative z-10">
          <AnimatedContent distance={16} duration={0.55} threshold={0.15}>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-tight text-white leading-tight mb-4">
              Discuss Your Advisory Requirements
            </h2>

            <p className="text-base sm:text-lg text-surface-warm/85 leading-relaxed mb-8 font-normal">
              Connect with our team to evaluate your current analytical workflows and explore practical implementation pathways.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-accent hover:bg-accent-hover text-white text-[14px] sm:text-[15px] font-semibold rounded-md shadow-sm hover:shadow-md transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98] active:translate-y-px"
              >
                <CalendarBlank className="w-4 h-4" />
                <span>Schedule Advisory Discussion</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </a>

              <a
                href="mailto:info@alphaanalyticssol.com?subject=AI%20Consulting%20Inquiry"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white text-[14px] sm:text-[15px] font-medium rounded-md border border-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white active:scale-[0.98]"
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

export default AIConsultingPage;
