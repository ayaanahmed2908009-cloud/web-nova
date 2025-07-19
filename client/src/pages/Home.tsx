import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import ScrollCounter from "@/components/ScrollCounter";
import InteractiveTimeline from "@/components/InteractiveTimeline";
import FAQ from "@/components/FAQ";
import CubertoSmoothScroll from "@/components/CubertoSmoothScroll";
import { useSEO } from "@/hooks/useSEO";

export default function Home() {
  useSEO({
    title: "WebNova Solution - Modern Websites for Ambitious Brands",
    description: "Transform your digital presence with WebNova Solution - premium web design and development for ambitious brands. Modern, responsive websites that drive results.",
    keywords: "web design, website development, modern websites, responsive design, digital presence, web development agency, premium web design, saudi arabia web design",
    canonical: "https://webnovasolution.com/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "WebNova Solution - Home",
      "description": "Premium web design and development for ambitious brands",
      "url": "https://webnovasolution.com/",
      "mainEntity": {
        "@type": "Organization",
        "name": "WebNova Solution",
        "description": "Premium web design and development agency",
        "offers": [
          {
            "@type": "Offer",
            "name": "Custom Web Design",
            "price": "500-5000",
            "priceCurrency": "SAR"
          },
          {
            "@type": "Offer", 
            "name": "E-commerce Development",
            "price": "1000-5000",
            "priceCurrency": "SAR"
          }
        ]
      }
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <CubertoSmoothScroll />
      <Navbar />
      <Hero />
      <Services />
      <ScrollCounter />
      <WhyUs />
      <InteractiveTimeline />
      <Testimonials />
      <Pricing />
      <FAQ />
    </div>
  );
}