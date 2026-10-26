import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ClientsWall from "@/components/ClientsWall";
import TechnologiesSection from "@/components/TechnologiesSection";
import GetYourApp from "@/components/GetYourApp";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import ScrollCounter from "@/components/ScrollCounter";

import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import CubertoSmoothScroll from "@/components/CubertoSmoothScroll";
import { useSEO } from "@/hooks/useSEO";

export default function Home() {
  useSEO({
    title: "WebNova Solution - At-Cost Websites for Saudi Communities",
    description: "WebNova builds full-stack websites at minimum cost for Saudi small businesses and nonprofits. You pay the cost of the website and nothing more.",
    keywords: "web design, website development, modern websites, responsive design, digital presence, web development agency, premium web design, saudi arabia web design",
    canonical: "https://webnovasolution.com/",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "WebNova Solution - Home",
      "description": "At-cost websites for Saudi small businesses and nonprofits",
      "url": "https://webnovasolution.com/",
      "mainEntity": {
        "@type": "Organization",
        "name": "WebNova Solution",
        "description": "Full-stack websites at minimum cost for Saudi small businesses and nonprofits",
        "offers": [
          {
            "@type": "Offer",
            "name": "Custom Web Design"
          },
          {
            "@type": "Offer",
            "name": "E-commerce Development"
          }
        ]
      }
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <CubertoSmoothScroll />
      <Navigation />
      <Hero />
      <ClientsWall />
      <Services />
      <TechnologiesSection />
      <GetYourApp />
      <ScrollCounter />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}
