export type AppRoute =
  | 'home'
  | 'litigation-services'
  | 'alpha-lens'
  | 'ai-consulting'
  | 'divorce-family-law'
  | 'economic-damages'
  | 'document-analysis'
  | 'bankruptcy-restructuring'
  | 'intellectual-property'
  | 'litigation-support'
  | 'terms-of-service'
  | 'privacy-policy';

export function getRouteFromPath(pathname: string): AppRoute {
  const p = pathname.toLowerCase();
  if (p.includes('terms-of-service') || p.includes('termsofservice')) return 'terms-of-service';
  if (p.includes('privacy-policy') || p.includes('privacypolicy')) return 'privacy-policy';
  if (p.includes('divorcefamilylaw') || p.includes('divorce-family-law')) return 'divorce-family-law';
  if (p.includes('economicdamages') || p.includes('economic-damages')) return 'economic-damages';
  if (p.includes('documentanalysis') || p.includes('document-analysis')) return 'document-analysis';
  if (p.includes('bankruptcyrestructuring') || p.includes('bankruptcy-restructuring')) return 'bankruptcy-restructuring';
  if (p.includes('intellectualproperty') || p.includes('intellectual-property')) return 'intellectual-property';
  if (p.includes('litigationsupport') || p.includes('litigation-support')) return 'litigation-support';
  if (p.includes('litigationservices') || p.includes('litigation-services')) return 'litigation-services';
  if (p.includes('alphalens') || p.includes('alpha-lens')) return 'alpha-lens';
  if (p.includes('aiconsulting') || p.includes('ai-consulting')) return 'ai-consulting';
  return 'home';
}
