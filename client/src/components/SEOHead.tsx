import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEOHead({
  title = 'WebNova Solutions - Premium Web Development & Design Agency',
  description = 'Transform your digital presence with WebNova Solutions. We create modern, responsive websites that captivate audiences and drive business results.',
  keywords = 'web development, web design, responsive websites, SEO optimization, digital agency, custom websites',
  image = '/og-image.jpg',
  url = 'https://webnovasolutions.com'
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        if (property) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'WebNova Solutions');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0');

    // Open Graph tags
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', image, true);
    updateMetaTag('og:url', url, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:site_name', 'WebNova Solutions', true);

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', image);

    // Additional SEO tags
    updateMetaTag('theme-color', '#000000');
    updateMetaTag('msapplication-TileColor', '#000000');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', url);

    // Structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "WebNova Solutions",
      "description": description,
      "url": url,
      "logo": `${url}/logo.png`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-555-123-4567",
        "contactType": "customer service",
        "email": "hello@webnovasolutions.com"
      },
      "sameAs": [
        "https://twitter.com/webnovasolutions",
        "https://linkedin.com/company/webnovasolutions"
      ],
      "service": [
        {
          "@type": "Service",
          "name": "Web Development",
          "description": "Custom website development using modern technologies"
        },
        {
          "@type": "Service", 
          "name": "UI/UX Design",
          "description": "User interface and experience design services"
        }
      ]
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

  }, [title, description, keywords, image, url]);

  return null;
}