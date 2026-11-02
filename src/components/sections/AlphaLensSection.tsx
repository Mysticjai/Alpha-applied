import React, { useState } from 'react';
import { ArrowRight, Stack, FileXls, ShieldCheck, ChartBar, Check, Info, Warning } from '@phosphor-icons/react';
import { siteContent } from '../../content/siteContent';
import { SectionHeading } from '../ui/SectionHeading';
import { AnimatedContent } from '../ui/AnimatedContent';

export const AlphaLensSection: React.FC = () => {
  const { alphaLens } = siteContent;
  const [activeTab, setActiveTab] = useState(0);

  const tabIcons = [
    <FileXls key="t0" className="w-4 h-4" />,
    <Stack key="t1" className="w-4 h-4" />,
    <ShieldCheck key="t2" className="w-4 h-4" />,
    <ChartBar key="t3" className="w-4 h-4" />,
  ];

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const gapMonths = ['Mar', 'Jun'];

  return (
    <section
      id="alpha-lens"
      className="section-padding bg-[#004643] text-white border-y border-[#003330] relative scroll-mt-20 overflow-hidden"
    >
      {/* Subtle background brand glow for depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-light/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-dark/30 rounded-full blur-2xl pointer-events-none" />

      <div className="site-container relative z-10">
        {/* Header (Theme B - Light variant) */}
        <AnimatedContent distance={16} duration={0.55} threshold={0.15}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-12 border-b border-white/15">
            <SectionHeading
              title={alphaLens.title}
              subtitle={alphaLens.subtitle}
              variant="light"
            />
            <div className="shrink-0">
              <a
                href={alphaLens.cta.href}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white text-[14px] font-semibold rounded-md shadow-md shadow-accent/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>{alphaLens.cta.label}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </AnimatedContent>

        {/* Feature Grid & Platform Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-12 items-start">

          {/* Left Column: 4 Feature Tabs (5 cols) */}
          <AnimatedContent distance={16} duration={0.55} stagger={0.08} threshold={0.15} className="lg:col-span-5 flex flex-col space-y-4">
            {alphaLens.features.map((feature, idx) => {
              const isSelected = activeTab === idx;
              return (
                <div key={feature.id}>
                  <button
                    onClick={() => setActiveTab(idx)}
                    className={`w-full text-left p-5 rounded-xl border transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#003432] border-surface-warm/40 shadow-md ring-1 ring-surface-warm/30'
                        : 'bg-[#003B38]/60 border-white/10 hover:bg-[#003B38] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-semibold tracking-wider text-brand-taupe-light uppercase">
                        {tabIcons[idx]}
                        {feature.categoryLabel}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-accent" />
                      )}
                    </div>
                    <h4 className="text-base font-semibold text-white">
                      {feature.title}
                    </h4>
                    {feature.subheading && (
                      <div className="text-xs text-brand-taupe-light mt-0.5 font-medium">
                        {feature.subheading}
                      </div>
                    )}
                    <p className="mt-2 text-xs sm:text-sm text-surface-warm/75 leading-relaxed">
                      {feature.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-white/10">
                      {feature.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-surface-warm/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                </div>
              );
            })}
          </AnimatedContent>

          {/* Right Column: Platform Architecture Showcase (7 cols) */}
          <AnimatedContent distance={16} duration={0.55} delay={0.08} threshold={0.15} className="lg:col-span-7">
            <div className="bg-[#003432] rounded-xl border border-white/15 shadow-2xl overflow-hidden flex flex-col">

            {/* Window Chrome Header */}
            <div className="bg-[#002725] px-5 py-3.5 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-accent/70 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#EAB308]/70 inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#22C55E]/70 inline-block" />
                <span className="ml-3 font-mono text-xs text-surface-warm/70 font-medium">
                  Alpha Lens Architecture Preview
                </span>
              </div>
              <span className="text-[11px] font-mono font-semibold text-surface-warm bg-white/10 px-2.5 py-0.5 rounded">
                PROPRIETARY TOOLING
              </span>
            </div>

            {/* Showcase Body */}
            <div className="p-6 sm:p-7 bg-[#003835]/90 text-white">

              {/* Module Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div>
                  <span className="text-xs text-surface-warm/60 font-mono">
                    Active Workflow: {alphaLens.features[activeTab].categoryLabel}
                  </span>
                  <div className="font-heading text-lg text-white font-semibold mt-0.5">
                    {alphaLens.features[activeTab].title}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-white bg-white/10 px-2.5 py-1 rounded">
                    <Check className="w-3.5 h-3.5 text-accent-light" />
                    Litigation Ready
                  </span>
                </div>
              </div>

              {/* Dynamic View based on Selected Feature */}
              {activeTab === 0 && (
                <div className="mt-6 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase text-brand-taupe-light tracking-wider">
                    <span>Sample Extraction Output</span>
                    <span className="text-surface-warm/60">17-Column Schema</span>
                  </div>
                  
                  {/* Mock Table */}
                  <div className="rounded border border-white/10 overflow-hidden">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-[#002725] text-surface-warm/70 border-b border-white/10">
                        <tr>
                          <th className="p-2.5">Date</th>
                          <th className="p-2.5">Description</th>
                          <th className="p-2.5 text-right">Debit</th>
                          <th className="p-2.5 text-right">Credit</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 bg-[#002B29]">
                        <tr>
                          <td className="p-2.5 text-surface-warm/70">2024-03-12</td>
                          <td className="p-2.5 text-white">Wire Transfer - Corporate Disbursement</td>
                          <td className="p-2.5 text-right text-accent-light">$45,000.00</td>
                          <td className="p-2.5 text-right text-surface-warm/50">-</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 text-surface-warm/70">2024-03-15</td>
                          <td className="p-2.5 text-white">Client Retainer Depository Credit</td>
                          <td className="p-2.5 text-right text-surface-warm/50">-</td>
                          <td className="p-2.5 text-right text-[#22C55E]">$18,500.00</td>
                        </tr>
                        <tr>
                          <td className="p-2.5 text-surface-warm/70">2024-03-20</td>
                          <td className="p-2.5 text-white">Interbank Operating Transfer</td>
                          <td className="p-2.5 text-right text-accent-light">$12,500.00</td>
                          <td className="p-2.5 text-right text-surface-warm/50">-</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="p-3 rounded bg-[#002B29] border border-white/10 flex items-center justify-between text-xs">
                    <span className="text-surface-warm font-semibold">Balance Reconciliation:</span>
                    <span className="text-[#22C55E] font-bold">Closing balance reconciled: $12,847.33</span>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="mt-6 font-mono text-xs space-y-4">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase text-brand-taupe-light tracking-wider">
                    <span>Statement Coverage: Chase ••2281</span>
                    <span className="text-surface-warm/60">Annual Scope</span>
                  </div>

                  {/* 12-Month Coverage Heatmap */}
                  <div className="p-4 rounded bg-[#002B29] border border-white/10">
                    <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5 text-center text-[10px]">
                      {months.map((m) => {
                        const isGap = gapMonths.includes(m);
                        return (
                          <div
                            key={m}
                            className={`p-2 rounded font-semibold ${
                              isGap
                                ? 'bg-accent/30 border border-accent text-accent-light'
                                : 'bg-white/10 border border-white/10 text-white'
                            }`}
                          >
                            <div>{m}</div>
                            <div className="text-[9px] opacity-75 mt-0.5">
                              {isGap ? 'GAP' : 'OK'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Gap Alert Notice */}
                  <div className="p-3 rounded bg-accent/15 border border-accent/40 flex items-start gap-2.5 text-accent-light">
                    <Warning className="w-4 h-4 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-white">2 gaps detected: Mar 2024, Jun 2024</div>
                      <div className="text-[11px] text-surface-warm/80 mt-0.5">
                        Production gap identified: request from opposing counsel
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="mt-6 font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase text-brand-taupe-light tracking-wider">
                    <span>QC Validation Results</span>
                    <span className="text-surface-warm/60">9-Point Validation</span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 rounded bg-[#002B29] border border-white/10 flex items-center justify-between">
                      <span className="text-surface-warm">Opening Balance Match</span>
                      <span className="text-[#22C55E] font-bold">PASS</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#002B29] border border-white/10 flex items-center justify-between">
                      <span className="text-surface-warm">Total Credits Verified</span>
                      <span className="text-[#22C55E] font-bold">PASS</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#002B29] border border-white/10 flex items-center justify-between">
                      <span className="text-surface-warm">Total Debits Verified</span>
                      <span className="text-[#22C55E] font-bold">PASS</span>
                    </div>
                    <div className="p-2.5 rounded bg-[#002B29] border border-white/10 flex items-center justify-between">
                      <span className="text-surface-warm">Closing Balance Match</span>
                      <span className="text-[#22C55E] font-bold">PASS</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded bg-primary-dark/80 border border-white/15 flex items-center justify-between">
                    <div>
                      <div className="text-white font-bold text-sm">100% QC Score: Litigation Grade</div>
                      <div className="text-[10px] text-surface-warm/70">
                        Two-layer validation combining 9 rule-based checks with AI review
                      </div>
                    </div>
                    <Check className="w-5 h-5 text-[#22C55E]" />
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div className="mt-6 font-mono text-xs space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase text-brand-taupe-light tracking-wider">
                    <span>Analytics Engine for Divorce: Output Preview</span>
                    <span className="text-surface-warm/60">Flagship Engine</span>
                  </div>

                  {/* Mock Report Tabs */}
                  <div className="flex flex-wrap gap-1.5 p-1 rounded bg-[#002725] border border-white/10">
                    {['Anomaly Report', 'Heatmap', 'Spend Analysis', 'Earnings', 'Transfers', 'AI Insights'].map((tab, i) => (
                      <span
                        key={tab}
                        className={`px-2.5 py-1 rounded text-[10px] font-semibold ${
                          i === 0 ? 'bg-accent text-white' : 'text-surface-warm/70 hover:text-white'
                        }`}
                      >
                        {tab}
                      </span>
                    ))}
                  </div>

                  {/* Data Rows from Original Site */}
                  <div className="rounded border border-white/10 overflow-hidden text-[11px]">
                    <div className="grid grid-cols-12 gap-2 bg-[#002725] p-2.5 text-surface-warm/60 font-semibold uppercase text-[10px]">
                      <span className="col-span-3">Date</span>
                      <span className="col-span-5">Description</span>
                      <span className="col-span-2 text-right">Debit</span>
                      <span className="col-span-2 text-right">Score</span>
                    </div>
                    <div className="divide-y divide-white/5 bg-[#002B29]">
                      <div className="grid grid-cols-12 gap-2 p-2.5 items-center">
                        <span className="col-span-3 text-surface-warm/70">03-15-24</span>
                        <span className="col-span-5 text-white">WIRE TRF TO OFFSHORE ACCT</span>
                        <span className="col-span-2 text-right text-accent-light font-bold">$47,200</span>
                        <span className="col-span-2 text-right text-accent-light font-bold">9.2</span>
                      </div>
                      <div className="grid grid-cols-12 gap-2 p-2.5 items-center bg-white/[0.02]">
                        <span className="col-span-3 text-surface-warm/70">03-22-24</span>
                        <span className="col-span-5 text-white">VENMO *UNDISCLOSED PAYEE</span>
                        <span className="col-span-2 text-right text-accent-light font-bold">$8,500</span>
                        <span className="col-span-2 text-right text-accent-light font-bold">8.7</span>
                      </div>
                      <div className="grid grid-cols-12 gap-2 p-2.5 items-center">
                        <span className="col-span-3 text-surface-warm/70">04-01-24</span>
                        <span className="col-span-5 text-white">ATM WITHDRAWAL: CASH</span>
                        <span className="col-span-2 text-right text-accent-light font-bold">$15,000</span>
                        <span className="col-span-2 text-right text-accent-light font-bold">8.1</span>
                      </div>
                      <div className="grid grid-cols-12 gap-2 p-2.5 items-center bg-white/[0.02]">
                        <span className="col-span-3 text-surface-warm/70">04-11-24</span>
                        <span className="col-span-5 text-white">CHECK #4472: UNKNOWN</span>
                        <span className="col-span-2 text-right text-accent-light font-bold">$22,750</span>
                        <span className="col-span-2 text-right text-accent-light font-bold">7.9</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 rounded bg-accent/20 border border-accent/40 flex items-center justify-between gap-3 text-accent-light">
                    <div className="flex items-center gap-2 font-medium">
                      <Warning className="w-4 h-4 shrink-0" />
                      <span>3 anomalies flagged · Potential hidden transfers detected</span>
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-accent/40 text-white shrink-0">
                      High Risk
                    </span>
                  </div>
                </div>
              )}

              {/* Developer / Illustrative Notice */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-surface-warm/65">
                <span className="flex items-center gap-1.5 italic">
                  <Info className="w-3.5 h-3.5 text-brand-taupe-light shrink-0" />
                  {alphaLens.demoDisclaimer}
                </span>
                <span className="font-mono text-surface-warm/90 font-semibold">Alpha Lens Platform</span>
              </div>
            </div>
          </div>
          </AnimatedContent>

        </div>
      </div>
    </section>
  );
};
