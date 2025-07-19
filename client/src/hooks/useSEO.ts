import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: any;
}

export function useSEO({
  title = "WebNova Solution - Modern Websites for Ambitious Brands",
  description = "WebNova builds sleek, conversion-driven websites for startups and small businesses. From design to launch, we help you grow online.",
  keywords = "web design, website development, modern websites, responsive design, digital presence, web development agency, premium web design",
  canonical,
  ogImage = "https://webnovasolution.com/og-image.jpg",
  ogType = "website",
  structuredData
}: SEOProps = {}) {
  
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Update Open Graph tags
    updateMetaProperty('og:title', title);
    updateMetaProperty('og:description', description);
    updateMetaProperty('og:image', ogImage);
    updateMetaProperty('og:type', ogType);
    
    // Update Twitter tags
    updateMetaProperty('twitter:title', title);
    updateMetaProperty('twitter:description', description);
    updateMetaProperty('twitter:image', ogImage);
    
    // Update canonical URL if provided
    if (canonical) {
      updateCanonical(canonical);
    }
    
    // Add structured data if provided
    if (structuredData) {
      updateStructuredData(structuredData);
    }
    
  }, [title, description, keywords, canonical, ogImage, ogType, structuredData]);
}

function updateMetaTag(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    element.name = name;
    document.head.appendChild(element);
  }
  element.content = content;
}

function updateMetaProperty(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute('property', property);
    document.head.appendChild(element);
  }
  element.content = content;
}

function updateCanonical(url: string) {
  let element = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!element) {
    element = document.createElement('link');
    element.rel = 'canonical';
    document.head.appendChild(element);
  }
  element.href = url;
}

function updateStructuredData(data: any) {
  // Remove existing structured data script
  const existingScript = document.querySelector('script[data-seo="structured-data"]');
  if (existingScript) {
    existingScript.remove();
  }
  
  // Add new structured data
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-seo', 'structured-data');
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}