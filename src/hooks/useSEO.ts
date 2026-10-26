import { useEffect } from 'react';
import { siteSEOData, type RouteSEOData } from '../content/seoData';
import type { AppRoute } from '../App';

function setMetaTag(attributeName: 'name' | 'property', attributeValue: string, content: string) {
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonicalLink(href: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function setSchemaData(schema?: Record<string, unknown>) {
  let script = document.getElementById('spa-dynamic-schema') as HTMLScriptElement | null;
  if (schema) {
    if (!script) {
      script = document.createElement('script');
      script.id = 'spa-dynamic-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  } else if (script) {
    script.remove();
  }
}

export function applySEO(data: RouteSEOData) {
  if (typeof document === 'undefined') return;

  // 1. Document Title
  document.title = data.title;

  // 2. Meta Description
  setMetaTag('name', 'description', data.description);

  // 3. Canonical URL
  setCanonicalLink(data.canonical);

  // 4. Open Graph Tags
  setMetaTag('property', 'og:title', data.title);
  setMetaTag('property', 'og:description', data.description);
  setMetaTag('property', 'og:url', data.canonical);
  setMetaTag('property', 'og:type', data.ogType);
  setMetaTag('property', 'og:site_name', 'Alpha Applied Analytics Solutions');
  setMetaTag('property', 'og:image', data.ogImage);

  // 5. Twitter Card Tags
  setMetaTag('name', 'twitter:card', 'summary_large_image');
  setMetaTag('name', 'twitter:title', data.title);
  setMetaTag('name', 'twitter:description', data.description);
  setMetaTag('name', 'twitter:image', data.ogImage);

  // 6. JSON-LD Structured Data
  setSchemaData(data.schema);
}

export function useSEO(routeOrData: AppRoute | RouteSEOData) {
  useEffect(() => {
    const data: RouteSEOData | undefined =
      typeof routeOrData === 'string' ? siteSEOData[routeOrData] : routeOrData;

    if (data) {
      applySEO(data);
    }
  }, [routeOrData]);
}
