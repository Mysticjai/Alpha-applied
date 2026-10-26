import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  EnvelopeSimple,
  Phone,
  ShieldWarning,
  PaperPlaneTilt,
  CaretDown,
  Info,
  Copy,
  Check,
  ArrowCounterClockwise,
  WarningCircle,
  FileText,
} from '@phosphor-icons/react';
import { siteContent } from '../../content/siteContent';
import { SectionHeading } from '../ui/SectionHeading';
import { AnimatedContent } from '../ui/AnimatedContent';

export interface PrimaryOfferingOption {
  id: string;
  label: string;
  hasSubcategories: boolean;
  descriptionHint?: string;
}

export const PRIMARY_OFFERINGS: PrimaryOfferingOption[] = [
  {
    id: 'ai-consulting',
    label: 'AI Consulting & Implementation',
    hasSubcategories: true,
  },
  {
    id: 'litigation-services',
    label: 'Litigation Services',
    hasSubcategories: true,
  },
  {
    id: 'alpha-lens-platform',
    label: 'Alpha Lens Platform',
    hasSubcategories: true,
    descriptionHint:
      'Alpha Lens is our integrated forensic document intelligence platform. Select an optional capability below, and describe your volume, bank statements, or analytical requirements in the Brief Matter Scope field.',
  },
  {
    id: 'multiple-services',
    label: 'Multiple Service Areas',
    hasSubcategories: false,
    descriptionHint:
      'Inquiring about more than one service area or tool? Describe your combined litigation, AI advisory, or Alpha Lens needs in the Brief Matter Scope field below.',
  },
  {
    id: 'general-inquiry',
    label: 'General Inquiry / Not Sure Yet',
    hasSubcategories: false,
    descriptionHint:
      'Not sure which service fits best? Outline your analytical goals or questions below, and our practice team will advise on the most suitable approach.',
  },
  {
    id: 'other',
    label: 'Other Requirement',
    hasSubcategories: false,
  },
];

export const AI_SUBCATEGORIES = [
  { id: '', label: 'All AI Consulting & Implementation (General Overview)' },
  { id: 'ai-assessment', label: 'Assessment & Strategy' },
  { id: 'ai-implementation', label: 'Implementation & Integration' },
  { id: 'ai-integrations', label: 'AI Integrations & Plugin Implementation' },
  { id: 'ai-training', label: 'AI Training & Professional Courses' },
];

export const LITIGATION_SUBCATEGORIES = [
  { id: '', label: 'All Litigation Services (General Overview)' },
  { id: 'damages', label: 'Economic Damages' },
  { id: 'family-law', label: 'Divorce & Family Law' },
  { id: 'doc-analysis', label: 'Document Analysis' },
  { id: 'restructuring', label: 'Bankruptcy & Restructuring' },
  { id: 'ip', label: 'Intellectual Property' },
  { id: 'litigation-support', label: 'Litigation Support' },
];

export const ALPHA_LENS_INTERESTS = [
  { id: '', label: 'All Platform Capabilities (General Overview)' },
  { id: 'platform-demo', label: 'Platform Demo & Technical Walkthrough' },
  { id: 'document-processing', label: 'Forensic Document Processing (PDF Splitting, Cleaning, Bates Stamping)' },
  { id: 'statement-extraction', label: 'Bank Statement & Invoice High-Fidelity Extraction' },
  { id: 'analysis-intelligence', label: 'Forensic Analysis & GL Reconciliation' },
  { id: 'crypto-tracing', label: 'Cross-Asset & Cryptocurrency Tracing' },
  { id: 'enterprise-pilot', label: 'Litigation Case Pilot / Enterprise Deployment' },
];

export interface InquiryFormData {
  primaryOffering: string;
  subCategory: string;
  otherDescription: string;
  name: string;
  organization: string;
  email: string;
  phone: string;
  matterOverview: string;
}

export interface GeneratedEmailData {
  recipient: string;
  subject: string;
  body: string;
  mailtoUrl: string;
  actionType: 'inquiry' | 'sample-report';
  primaryOfferingLabel: string;
  subCategoryLabel?: string;
  name: string;
  organization: string;
  email: string;
  phone?: string;
  matterOverview?: string;
  generatedAt: string;
}

export function buildInquiryEmail(
  formData: InquiryFormData,
  actionType: 'inquiry' | 'sample-report'
): GeneratedEmailData {
  const recipient = 'info@alphaanalyticssol.com';
  const matchedPrimary = PRIMARY_OFFERINGS.find((o) => o.id === formData.primaryOffering);
  const primaryOfferingLabel = matchedPrimary?.label || formData.primaryOffering || 'Professional Services';

  let subCategoryLabel: string | undefined;
  if (formData.primaryOffering === 'ai-consulting' && formData.subCategory) {
    subCategoryLabel = AI_SUBCATEGORIES.find((s) => s.id === formData.subCategory)?.label;
  } else if (formData.primaryOffering === 'litigation-services' && formData.subCategory) {
    subCategoryLabel = LITIGATION_SUBCATEGORIES.find((s) => s.id === formData.subCategory)?.label;
  } else if (formData.primaryOffering === 'alpha-lens-platform' && formData.subCategory) {
    subCategoryLabel = ALPHA_LENS_INTERESTS.find((s) => s.id === formData.subCategory)?.label;
  }

  const orgOrName = formData.organization.trim() || formData.name.trim() || 'Inquiry';

  // 1. Context-Aware Subject Line
  let subject = '';
  if (actionType === 'sample-report') {
    subject = `Sample Report Request — ${orgOrName}`;
  } else {
    switch (formData.primaryOffering) {
      case 'ai-consulting':
        subject = subCategoryLabel && formData.subCategory
          ? `AI Consulting (${subCategoryLabel}) Inquiry — ${orgOrName}`
          : `AI Consulting Inquiry — ${orgOrName}`;
        break;
      case 'litigation-services':
        subject = subCategoryLabel && formData.subCategory
          ? `Litigation Services (${subCategoryLabel}) Inquiry — ${orgOrName}`
          : `Litigation Services Inquiry — ${orgOrName}`;
        break;
      case 'alpha-lens-platform':
        subject = subCategoryLabel && formData.subCategory
          ? `Alpha Lens Platform (${subCategoryLabel}) Inquiry — ${orgOrName}`
          : `Alpha Lens Platform Inquiry — ${orgOrName}`;
        break;
      case 'multiple-services':
        subject = `Multiple Services Inquiry — ${orgOrName}`;
        break;
      case 'general-inquiry':
        subject = `General Inquiry — ${orgOrName}`;
        break;
      case 'other':
      default:
        subject = formData.otherDescription.trim()
          ? `Inquiry (${formData.otherDescription.trim()}) — ${orgOrName}`
          : `Inquiry — ${orgOrName}`;
        break;
    }
  }

  // 2. Professional, Structured Email Body
  const lines: string[] = [];
  lines.push('Dear Alpha Applied Analytics Solutions Team,');
  lines.push('');

  const targetOfferingDesc = subCategoryLabel && formData.subCategory
    ? `${primaryOfferingLabel} (${subCategoryLabel})`
    : primaryOfferingLabel;

  if (actionType === 'sample-report') {
    lines.push(`I am reaching out to request a representative sample report regarding ${targetOfferingDesc} to evaluate analytical support for our practice.`);
  } else {
    lines.push(`I am reaching out regarding ${targetOfferingDesc} to discuss how Alpha Applied Analytics Solutions can support our practice.`);
  }
  lines.push('');

  lines.push('Contact Information');
  lines.push(`Name: ${formData.name.trim()}`);
  lines.push(`Organization: ${formData.organization.trim()}`);
  lines.push(`Professional Email: ${formData.email.trim()}`);
  if (formData.phone && formData.phone.trim()) {
    lines.push(`Phone: ${formData.phone.trim()}`);
  }
  lines.push('');

  lines.push('Inquiry Details');
  lines.push(`Primary Service: ${primaryOfferingLabel}`);
  if (subCategoryLabel && formData.subCategory) {
    lines.push(`Practice Area / Area of Interest: ${subCategoryLabel}`);
  }
  if (formData.primaryOffering === 'other' && formData.otherDescription && formData.otherDescription.trim()) {
    lines.push(`Specified Requirement: ${formData.otherDescription.trim()}`);
  }
  lines.push(`Inquiry Type: ${actionType === 'sample-report' ? 'Sample Report Request' : 'Strategy Call / Advisory Consultation'}`);
  if (formData.matterOverview && formData.matterOverview.trim()) {
    lines.push(`Matter Scope: ${formData.matterOverview.trim()}`);
  }
  lines.push('');

  if (actionType === 'sample-report') {
    lines.push('Could you please share an appropriate sample report or analysis schedule for our review? I would also welcome the opportunity to discuss our requirements and understand how Alpha Applied Analytics Solutions may be able to assist.');
    lines.push('');
    lines.push('Please let me know the appropriate next steps.');
  } else {
    lines.push('I would appreciate the opportunity to discuss my requirements and understand how Alpha Applied Analytics Solutions may be able to assist.');
    lines.push('');
    lines.push('Please let me know the appropriate next steps and a suitable time to connect.');
  }
  lines.push('');

  lines.push('Regards,');
  lines.push(formData.name.trim());
  if (formData.organization.trim()) {
    lines.push(formData.organization.trim());
  }

  const body = lines.join('\r\n');
  const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return {
    recipient,
    subject,
    body,
    mailtoUrl,
    actionType,
    primaryOfferingLabel,
    subCategoryLabel: formData.subCategory ? subCategoryLabel : undefined,
    name: formData.name.trim(),
    organization: formData.organization.trim(),
    email: formData.email.trim(),
    phone: formData.phone.trim() || undefined,
    matterOverview: formData.matterOverview.trim() || undefined,
    generatedAt: new Date().toISOString(),
  };
}

export const ContactSection: React.FC = () => {
  const { contact } = siteContent;
  const [formData, setFormData] = useState<InquiryFormData>({
    primaryOffering: '',
    subCategory: '',
    otherDescription: '',
    name: '',
    organization: '',
    email: '',
    phone: '',
    matterOverview: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [preparedEmail, setPreparedEmail] = useState<GeneratedEmailData | null>(null);
  const [copyStatus, setCopyStatus] = useState<boolean>(false);
  const [showDraftPreview, setShowDraftPreview] = useState<boolean>(false);

  // Field refs for focus management on validation failure
  const primaryOfferingRef = useRef<HTMLSelectElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const organizationRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handlePrimaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      primaryOffering: value,
      subCategory: '',
      otherDescription: '',
    }));
    if (formErrors.primaryOffering) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next.primaryOffering;
        return next;
      });
    }
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      subCategory: e.target.value,
    }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.primaryOffering) {
      errors.primaryOffering = 'Please select a primary service offering.';
    }
    if (!formData.name.trim()) {
      errors.name = 'Full name is required.';
    }
    if (!formData.organization.trim()) {
      errors.organization = 'Law firm or organization is required.';
    }
    const emailVal = formData.email.trim();
    if (!emailVal) {
      errors.email = 'Professional email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      errors.email = 'Please enter a valid email address.';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      if (errors.primaryOffering && primaryOfferingRef.current) {
        primaryOfferingRef.current.focus();
      } else if (errors.name && nameRef.current) {
        nameRef.current.focus();
      } else if (errors.organization && organizationRef.current) {
        organizationRef.current.focus();
      } else if (errors.email && emailRef.current) {
        emailRef.current.focus();
      }
      return false;
    }

    return true;
  };

  const launchMailto = (url: string) => {
    try {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_top';
      link.rel = 'noopener noreferrer';
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        if (document.body.contains(link)) {
          document.body.removeChild(link);
        }
      }, 500);
    } catch (err) {
      console.warn('[ContactSection] Direct mailto launch error:', err);
      // Fallback: window.location
      window.location.href = url;
    }
  };

  const executeEmailGeneration = (actionType: 'inquiry' | 'sample-report') => {
    if (!validateForm()) return;

    const emailData = buildInquiryEmail(formData, actionType);

    // Save to window for empirical test assertions and verification
    if (typeof window !== 'undefined') {
      (window as any).__lastGeneratedMailto = emailData;
      (window as any).__lastSubmittedInquiry = {
        primaryOfferingId: formData.primaryOffering,
        primaryOffering: emailData.primaryOfferingLabel,
        subCategoryId: formData.subCategory || undefined,
        subCategory: emailData.subCategoryLabel,
        otherDescription: formData.otherDescription || undefined,
        name: emailData.name,
        organization: emailData.organization,
        email: emailData.email,
        phone: emailData.phone,
        matterOverview: emailData.matterOverview,
        actionType: emailData.actionType,
        subject: emailData.subject,
        mailtoUrl: emailData.mailtoUrl,
        submittedAt: emailData.generatedAt,
      };
    }

    console.log('[ContactSection] Generated email inquiry:', emailData);

    // Trigger device's mailto handler
    launchMailto(emailData.mailtoUrl);

    // Transition to honest feedback view
    setPreparedEmail(emailData);
    setCopyStatus(false);
  };

  const handlePrimarySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeEmailGeneration('inquiry');
  };

  const handleSampleReportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    executeEmailGeneration('sample-report');
  };

  const handleCopyToClipboard = async () => {
    if (!preparedEmail) return;
    const formattedDraft = `To: ${preparedEmail.recipient}\nSubject: ${preparedEmail.subject}\n\n${preparedEmail.body}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(formattedDraft);
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 3000);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = formattedDraft;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 3000);
      }
    } catch (err) {
      console.warn('[ContactSection] Clipboard write failed:', err);
    }
  };

  const handleReturnToEdit = () => {
    // Preserve entered form data so the visitor can adjust details without retyping
    setPreparedEmail(null);
    setCopyStatus(false);
  };

  const handleResetForm = () => {
    setFormData({
      primaryOffering: '',
      subCategory: '',
      otherDescription: '',
      name: '',
      organization: '',
      email: '',
      phone: '',
      matterOverview: '',
    });
    setFormErrors({});
    setPreparedEmail(null);
    setCopyStatus(false);
  };

  return (
    <section
      id="contact"
      className="section-padding bg-[#003634] text-white border-b border-[#002927] relative scroll-mt-20 overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary-light/10 rounded-full blur-3xl pointer-events-none" />

      <div className="site-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left Column: Context, Verified Direct Contact & Protocols (5 cols) */}
          <AnimatedContent distance={24} duration={0.7} threshold={0.15} className="lg:col-span-5">
            <SectionHeading
              title={contact.title}
              subtitle={contact.subtitle}
              variant="light"
            />

            {/* Direct Verified Contact Details */}
            <div className="mt-8 space-y-3.5">
              <a
                href={`mailto:${contact.details.email}`}
                className="flex items-center gap-3.5 p-4 rounded-xl bg-[#002D2B] border border-white/10 hover:border-white/25 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-accent-light group-hover:scale-105 transition-transform">
                  <EnvelopeSimple className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-surface-warm/60 uppercase tracking-wider block">
                    Direct Practice Email
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-accent-light transition-colors">
                    {contact.details.email}
                  </span>
                </div>
              </a>

              <a
                href={contact.details.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-xl bg-[#002D2B] border border-white/10 hover:border-white/25 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-accent-light group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-surface-warm/60 uppercase tracking-wider block">
                    Phone / WhatsApp
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-accent-light transition-colors">
                    {contact.details.phone}
                  </span>
                </div>
              </a>

              <a
                href={contact.details.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-4 rounded-xl bg-[#002D2B] border border-white/10 hover:border-white/25 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-accent-light group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-[11px] font-mono text-surface-warm/60 uppercase tracking-wider block">
                    LinkedIn Network
                  </span>
                  <span className="text-sm font-semibold text-white group-hover:text-accent-light transition-colors">
                    Alpha Applied Analytics Solutions
                  </span>
                </div>
              </a>
            </div>

            {/* Confidentiality Notice Callout */}
            <div className="mt-8 p-5 rounded-xl bg-[#002B29] border border-white/10">
              <div className="flex items-center gap-2 text-surface-warm font-semibold text-xs uppercase tracking-wider mb-2">
                <ShieldWarning className="w-4 h-4 text-accent-light" />
                <span>Confidentiality &amp; Conflict Checks</span>
              </div>
              <p className="text-xs text-surface-warm/75 leading-relaxed">
                {contact.confidentialityNotice}
              </p>
            </div>
          </AnimatedContent>

          {/* Right Column: Intake Inquiry Form (7 cols) */}
          <AnimatedContent distance={24} duration={0.7} delay={0.12} threshold={0.15} className="lg:col-span-7">
            <div
              id="contact-form"
              className="bg-[#002F2D] p-7 sm:p-9 rounded-2xl border border-white/15 shadow-2xl relative"
            >
              {preparedEmail ? (
                /* ── HONEST POST-SUBMISSION / EMAIL APP FEEDBACK STATE ── */
                <div className="py-4 space-y-6 text-left">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-accent/20 border border-accent/40 text-accent-light flex items-center justify-center mx-auto mb-3 shadow-inner">
                      <EnvelopeSimple className="w-7 h-7" />
                    </div>
                    <div className="inline-block px-3 py-0.5 rounded-full bg-white/10 text-[11px] font-mono uppercase tracking-wider text-accent-light mb-2">
                      {preparedEmail.actionType === 'sample-report' ? 'Sample Report Request' : 'Strategy Call Inquiry'}
                    </div>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                      Your Email Draft Is Ready
                    </h3>
                    <p className="mt-2.5 text-xs sm:text-sm text-surface-warm/85 max-w-lg mx-auto leading-relaxed">
                      Your prefilled email has been prepared and opened in your email application (Outlook or default email client). <span className="text-white font-semibold">Please review the details in your email app and press Send to complete your inquiry.</span>
                    </p>
                  </div>

                  {/* Generated Email Summary Card */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#002624] border border-white/15 space-y-3 font-mono text-xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-white/10 gap-1.5">
                      <span className="text-surface-warm/60 uppercase tracking-wider text-[11px]">Recipient</span>
                      <span className="text-accent-light font-semibold select-all">{preparedEmail.recipient}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between pb-2.5 border-b border-white/10 gap-1.5">
                      <span className="text-surface-warm/60 uppercase tracking-wider text-[11px] shrink-0">Subject</span>
                      <span className="text-white font-sans text-xs sm:text-[13px] text-right font-medium break-words">
                        {preparedEmail.subject}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11.5px] text-surface-warm/75 gap-1.5">
                      <span>Primary Offering:</span>
                      <span className="text-white font-sans font-medium text-right">
                        {preparedEmail.primaryOfferingLabel}
                        {preparedEmail.subCategoryLabel ? ` • ${preparedEmail.subCategoryLabel}` : ''}
                      </span>
                    </div>
                  </div>

                  {/* Primary Fallback & Action Buttons */}
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => launchMailto(preparedEmail.mailtoUrl)}
                        className="py-3 px-4 bg-accent hover:bg-accent-hover text-white text-xs sm:text-sm font-semibold rounded-md shadow-lg shadow-accent/20 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
                      >
                        <PaperPlaneTilt className="w-4 h-4" />
                        <span>Re-Open in Email App</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyToClipboard}
                        className="py-3 px-4 bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-semibold rounded-md border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30"
                      >
                        {copyStatus ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-300">Draft Copied to Clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            <span>Copy Email Draft</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Toggle Draft Preview */}
                    <div className="pt-1">
                      <button
                        type="button"
                        onClick={() => setShowDraftPreview((prev) => !prev)}
                        className="inline-flex items-center gap-1.5 text-xs text-brand-taupe-light hover:text-white transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{showDraftPreview ? 'Hide Full Draft Body' : 'View Generated Draft Body'}</span>
                      </button>

                      {showDraftPreview && (
                        <div className="mt-2 p-3.5 rounded-lg bg-[#002220] border border-white/10 text-xs font-mono text-surface-warm/80 whitespace-pre-line leading-relaxed max-h-60 overflow-y-auto">
                          {preparedEmail.body}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Clear Fallback Guidance */}
                  <div className="p-3.5 rounded-lg bg-white/5 border border-white/10 text-xs text-surface-warm/80 flex items-start gap-2.5">
                    <Info className="w-4 h-4 text-accent-light shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong>Did your email client not open?</strong> Web browsers cannot always launch external email software automatically. Click <strong>Copy Email Draft</strong> above, then open Outlook or your webmail and paste into an email addressed to <strong className="text-white">info@alphaanalyticssol.com</strong>.
                    </p>
                  </div>

                  {/* Navigation / Edit Controls */}
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={handleReturnToEdit}
                      className="inline-flex items-center gap-1.5 text-accent-light hover:text-white font-semibold transition-colors cursor-pointer"
                    >
                      <ArrowCounterClockwise className="w-3.5 h-3.5" />
                      <span>Edit Inquiry Details</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="text-surface-warm/60 hover:text-white transition-colors cursor-pointer"
                    >
                      Start New Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* ── STANDARD INQUIRY FORM ── */
                <form onSubmit={handlePrimarySubmit} className="space-y-5" noValidate>
                  
                  {/* Primary Offering Selector */}
                  <div>
                    <label
                      htmlFor="primaryOffering"
                      className="block text-xs font-semibold uppercase tracking-wider text-brand-taupe-light mb-2"
                    >
                      What Can We Help You With? *
                    </label>
                    <div className="relative">
                      <select
                        ref={primaryOfferingRef}
                        id="primaryOffering"
                        name="primaryOffering"
                        required
                        value={formData.primaryOffering}
                        onChange={handlePrimaryChange}
                        aria-invalid={!!formErrors.primaryOffering}
                        aria-describedby={formErrors.primaryOffering ? 'primaryOffering-error' : undefined}
                        className={`w-full px-4 py-3 pr-10 rounded-lg border ${
                          formErrors.primaryOffering ? 'border-red-400 ring-1 ring-red-400' : 'border-white/15'
                        } bg-[#002624] text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all appearance-none cursor-pointer font-sans`}
                      >
                        <option value="" disabled className="bg-[#002B29] text-surface-warm/50">
                          Select a service or primary offering...
                        </option>
                        {PRIMARY_OFFERINGS.map((offering) => (
                          <option
                            key={offering.id}
                            value={offering.id}
                            className="bg-[#002624] text-surface-warm font-normal py-1"
                          >
                            {offering.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-surface-warm/60">
                        <CaretDown className="w-4 h-4" />
                      </div>
                    </div>
                    {formErrors.primaryOffering && (
                      <p id="primaryOffering-error" className="mt-1.5 text-xs text-red-400 flex items-center gap-1.5">
                        <WarningCircle className="w-3.5 h-3.5" />
                        <span>{formErrors.primaryOffering}</span>
                      </p>
                    )}

                    {/* ── Conditional Subcategory: AI Consulting & Implementation ── */}
                    {formData.primaryOffering === 'ai-consulting' && (
                      <div className="mt-3.5 pt-3 border-t border-white/10">
                        <label
                          htmlFor="aiSubcategory"
                          className="block text-xs font-semibold uppercase tracking-wider text-brand-taupe-light mb-2"
                        >
                          Specific AI Consulting Area (Optional)
                        </label>
                        <div className="relative">
                          <select
                            id="aiSubcategory"
                            name="aiSubcategory"
                            value={formData.subCategory}
                            onChange={handleSubCategoryChange}
                            className="w-full px-4 py-2.5 pr-10 rounded-lg border border-white/15 bg-[#002624] text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all appearance-none cursor-pointer font-sans"
                          >
                            {AI_SUBCATEGORIES.map((sub) => (
                              <option
                                key={sub.id}
                                value={sub.id}
                                className="bg-[#002624] text-surface-warm font-normal py-1"
                              >
                                {sub.label}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-surface-warm/60">
                            <CaretDown className="w-4 h-4" />
                          </div>
                        </div>
                        <p className="mt-1.5 text-[11px] text-surface-warm/60">
                          Optional: Select a practice discipline, or leave as general overview.
                        </p>
                      </div>
                    )}

                    {/* ── Conditional Subcategory: Litigation Services ── */}
                    {formData.primaryOffering === 'litigation-services' && (
                      <div className="mt-3.5 pt-3 border-t border-white/10">
                        <label
                          htmlFor="litigationSubcategory"
                          className="block text-xs font-semibold uppercase tracking-wider text-brand-taupe-light mb-2"
                        >
                          Specific Litigation Practice Area (Optional)
                        </label>
                        <div className="relative">
                          <select
                            id="litigationSubcategory"
                            name="litigationSubcategory"
                            value={formData.subCategory}
                            onChange={handleSubCategoryChange}
                            className="w-full px-4 py-2.5 pr-10 rounded-lg border border-white/15 bg-[#002624] text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all appearance-none cursor-pointer font-sans"
                          >
                            {LITIGATION_SUBCATEGORIES.map((sub) => (
                              <option
                                key={sub.id}
                                value={sub.id}
                                className="bg-[#002624] text-surface-warm font-normal py-1"
                              >
                                {sub.label}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-surface-warm/60">
                            <CaretDown className="w-4 h-4" />
                          </div>
                        </div>
                        <p className="mt-1.5 text-[11px] text-surface-warm/60">
                          Optional: Select a practice area, or leave as general litigation services.
                        </p>
                      </div>
                    )}

                    {/* ── Conditional Subcategory: Alpha Lens Platform ── */}
                    {formData.primaryOffering === 'alpha-lens-platform' && (
                      <div className="mt-3.5 pt-3 border-t border-white/10">
                        <label
                          htmlFor="alphaLensSubcategory"
                          className="block text-xs font-semibold uppercase tracking-wider text-brand-taupe-light mb-2"
                        >
                          Alpha Lens Capability of Interest (Optional)
                        </label>
                        <div className="relative">
                          <select
                            id="alphaLensSubcategory"
                            name="alphaLensSubcategory"
                            value={formData.subCategory}
                            onChange={handleSubCategoryChange}
                            className="w-full px-4 py-2.5 pr-10 rounded-lg border border-white/15 bg-[#002624] text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all appearance-none cursor-pointer font-sans"
                          >
                            {ALPHA_LENS_INTERESTS.map((sub) => (
                              <option
                                key={sub.id}
                                value={sub.id}
                                className="bg-[#002624] text-surface-warm font-normal py-1"
                              >
                                {sub.label}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-surface-warm/60">
                            <CaretDown className="w-4 h-4" />
                          </div>
                        </div>
                        <p className="mt-1.5 text-[11px] text-surface-warm/60">
                          Optional: Select an integrated analytical tool or request a platform demo.
                        </p>
                      </div>
                    )}

                    {/* ── Multiple Service Areas Guidance ── */}
                    {formData.primaryOffering === 'multiple-services' && (
                      <div className="mt-2.5 p-3 rounded-lg bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs text-surface-warm/85">
                        <Info className="w-4 h-4 text-accent-light shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          Inquiring about more than one service area or tool? Describe your combined litigation, AI advisory, or Alpha Lens needs in the <strong>Brief Matter Scope</strong> field below.
                        </p>
                      </div>
                    )}

                    {/* ── General Inquiry Guidance ── */}
                    {formData.primaryOffering === 'general-inquiry' && (
                      <div className="mt-2.5 p-3 rounded-lg bg-white/5 border border-white/10 flex items-start gap-2.5 text-xs text-surface-warm/85">
                        <Info className="w-4 h-4 text-accent-light shrink-0 mt-0.5" />
                        <p className="leading-relaxed">
                          Not sure which service fits best? Outline your analytical goals or questions below, and our practice team will advise on the most suitable approach.
                        </p>
                      </div>
                    )}

                    {/* ── Other Description Input (Optional) ── */}
                    {formData.primaryOffering === 'other' && (
                      <div className="mt-3.5 pt-3 border-t border-white/10">
                        <label
                          htmlFor="otherDescription"
                          className="block text-xs font-semibold uppercase tracking-wider text-brand-taupe-light mb-2"
                        >
                          Please Describe Your Requirement (Optional)
                        </label>
                        <input
                          type="text"
                          id="otherDescription"
                          name="otherDescription"
                          value={formData.otherDescription}
                          onChange={(e) => setFormData({ ...formData, otherDescription: e.target.value })}
                          placeholder="e.g., Forensic cryptocurrency tracing, custom NLP pipeline..."
                          className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-[#002624] text-sm text-white placeholder:text-surface-warm/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                        />
                      </div>
                    )}
                  </div>

                  {/* Name and Organization Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-brand-taupe-light mb-1.5">
                        Full Name *
                      </label>
                      <input
                        ref={nameRef}
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (formErrors.name) setFormErrors((prev) => ({ ...prev, name: '' }));
                        }}
                        aria-invalid={!!formErrors.name}
                        placeholder="Jane Doe, Esq."
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                          formErrors.name ? 'border-red-400 ring-1 ring-red-400' : 'border-white/15'
                        } bg-[#002624] text-sm text-white placeholder:text-surface-warm/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all`}
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <WarningCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="organization" className="block text-xs font-semibold uppercase tracking-wider text-brand-taupe-light mb-1.5">
                        Law Firm / Organization *
                      </label>
                      <input
                        ref={organizationRef}
                        type="text"
                        id="organization"
                        required
                        value={formData.organization}
                        onChange={(e) => {
                          setFormData({ ...formData, organization: e.target.value });
                          if (formErrors.organization) setFormErrors((prev) => ({ ...prev, organization: '' }));
                        }}
                        aria-invalid={!!formErrors.organization}
                        placeholder="Organization Name"
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                          formErrors.organization ? 'border-red-400 ring-1 ring-red-400' : 'border-white/15'
                        } bg-[#002624] text-sm text-white placeholder:text-surface-warm/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all`}
                      />
                      {formErrors.organization && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <WarningCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.organization}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email and Phone Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-brand-taupe-light mb-1.5">
                        Professional Email Address *
                      </label>
                      <input
                        ref={emailRef}
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (formErrors.email) setFormErrors((prev) => ({ ...prev, email: '' }));
                        }}
                        aria-invalid={!!formErrors.email}
                        placeholder="counsel@firm.com"
                        className={`w-full px-4 py-2.5 rounded-lg border ${
                          formErrors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-white/15'
                        } bg-[#002624] text-sm text-white placeholder:text-surface-warm/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all`}
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                          <WarningCircle className="w-3.5 h-3.5" />
                          <span>{formErrors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold uppercase tracking-wider text-brand-taupe-light mb-1.5">
                        Phone Number (Optional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-[#002624] text-sm text-white placeholder:text-surface-warm/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Matter Scope & Confidentiality Reminder */}
                  <div>
                    <label htmlFor="matterOverview" className="block text-xs font-semibold uppercase tracking-wider text-brand-taupe-light mb-1.5">
                      Brief Matter Scope &amp; Analysis Needs (Optional)
                    </label>
                    <textarea
                      id="matterOverview"
                      rows={3}
                      value={formData.matterOverview}
                      onChange={(e) => setFormData({ ...formData, matterOverview: e.target.value })}
                      placeholder={
                        formData.primaryOffering === 'multiple-services'
                          ? "Please outline your multiple service areas and analytical objectives for this matter..."
                          : formData.primaryOffering === 'alpha-lens-platform'
                          ? "Please outline your document volume, statements/tax returns, or discovery objectives..."
                          : "Brief description of financial questions, timeline, or analytical support needed..."
                      }
                      className="w-full px-4 py-2.5 rounded-lg border border-white/15 bg-[#002624] text-sm text-white placeholder:text-surface-warm/30 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                    />

                    {/* Sensitive Information Disclaimer */}
                    <div className="mt-1.5 flex items-start gap-1.5 text-[11px] text-surface-warm/65">
                      <ShieldWarning className="w-3.5 h-3.5 text-accent-light shrink-0 mt-0.5" />
                      <span>
                        Please exclude confidential, privileged, financial-account, or personally sensitive case details from this initial inquiry. Formal conflict clearance will be executed prior to exchanging case files.
                      </span>
                    </div>
                  </div>

                  {/* Primary & Secondary Action Buttons */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                    <button
                      type="submit"
                      className="flex-1 py-3.5 px-6 bg-accent hover:bg-accent-hover text-white text-[14.5px] font-semibold rounded-md shadow-lg shadow-accent/25 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 active:translate-y-px cursor-pointer"
                    >
                      <span>Open Email to Book a Call</span>
                      <PaperPlaneTilt className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleSampleReportClick}
                      className="py-3.5 px-6 rounded-md border border-white/20 hover:border-white/40 hover:bg-white/5 text-white text-[14px] font-semibold transition-all flex items-center justify-center gap-2 text-center cursor-pointer"
                    >
                      <span>Request Sample Report</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-[11px] text-center text-surface-warm/60">
                    Clicking either action prepares a structured email addressed to <strong className="text-white">info@alphaanalyticssol.com</strong> in your configured email client.
                  </p>
                </form>
              )}
            </div>
          </AnimatedContent>

        </div>
      </div>
    </section>
  );
};
