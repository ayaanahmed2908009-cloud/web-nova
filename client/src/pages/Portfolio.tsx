import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import { useSEO } from "@/hooks/useSEO";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";

export default function PortfolioPage() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useSEO({
    title: "Examples - WebNova Solution | Modern Web Design Showcase",
    description: "Here are our best examples: full-stack websites built to help organizations reach more people.",
    keywords: "web design website examples, modern websites, responsive design showcase, web development examples, website gallery",
    canonical: "https://webnovasolution.com/examples",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Examples - WebNova Solution",
      "description": "Showcase of modern web design and development projects",
      "url": "https://webnovasolution.com/examples",
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://webnovasolution.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Examples",
            "item": "https://webnovasolution.com/examples"
          }
        ]
      }
    }
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hide navbar for immersive portfolio experience */}
      <style>{`
        body { overflow: hidden !important; }
      `}</style>

      <Portfolio />
    </div>
  );
}
