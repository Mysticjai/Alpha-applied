import React from 'react';
import { FileText, CheckCircle } from '@phosphor-icons/react';

/**
 * Restrained Document Analysis Work Product Preview
 * A calm, professional document sheet representing the actual work product:
 * Structured litigation schedules & verified forensic financial summaries.
 */
export const DocumentAnalysisVisual: React.FC = () => {
  return (
    <div className="w-full max-w-lg mx-auto lg:ml-auto lg:mr-0 rounded-lg bg-white border border-brand-border shadow-sm p-5 sm:p-6">
      {/* Document Masthead */}
      <div className="flex items-center justify-between border-b border-brand-border/70 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-primary shrink-0" />
          <span className="text-[11px] font-mono font-semibold tracking-wider text-primary uppercase">
            Work Product // Summary Schedule
          </span>
        </div>
        <span className="text-[10px] font-mono text-brand-taupe uppercase tracking-wider">
          Confidential
        </span>
      </div>

      {/* Document Title */}
      <div className="mb-4">
        <h4 className="font-serif text-lg text-primary font-normal leading-snug">
          Financial Document Extraction & Reconciliation
        </h4>
        <p className="text-xs text-brand-slate mt-1">
          Case Discovery · Multi-Account Transaction Mapping
        </p>
      </div>

      {/* Structured Output Summary (Clean, quiet rows) */}
      <div className="border border-brand-border/60 rounded bg-surface-warm/30 divide-y divide-brand-border/50 text-xs">
        <div className="p-3 flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono font-semibold uppercase text-brand-taupe tracking-wider block">
              Source Ingestion
            </span>
            <span className="text-brand-dark font-medium mt-0.5 block">
              Bank Statements & Unstructured PDFs
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] text-primary font-medium shrink-0 pt-0.5">
            <CheckCircle className="w-3 h-3 text-primary" /> Ingested
          </span>
        </div>

        <div className="p-3 flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono font-semibold uppercase text-brand-taupe tracking-wider block">
              Data Processing
            </span>
            <span className="text-brand-dark font-medium mt-0.5 block">
              Transaction Normalization & Fund Flow Tracing
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] text-primary font-medium shrink-0 pt-0.5">
            <CheckCircle className="w-3 h-3 text-primary" /> Mapped
          </span>
        </div>

        <div className="p-3 flex items-start justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono font-semibold uppercase text-brand-taupe tracking-wider block">
              Litigation Production
            </span>
            <span className="text-brand-dark font-medium mt-0.5 block">
              Structured 17-Column Schedule & Anomaly Log
            </span>
          </div>
          <span className="inline-flex items-center gap-1 text-[11px] text-accent font-semibold shrink-0 pt-0.5">
            <CheckCircle className="w-3 h-3 text-accent" /> Verified
          </span>
        </div>
      </div>

      {/* Document Footer Note */}
      <div className="mt-3.5 pt-2.5 border-t border-brand-border/40 flex items-center justify-between text-[11px] font-mono text-brand-taupe">
        <span>Format: Structured Excel & Evidentiary PDF</span>
        <span>Human QC Reviewed</span>
      </div>
    </div>
  );
};
