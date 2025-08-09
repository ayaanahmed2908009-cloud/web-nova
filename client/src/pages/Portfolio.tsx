import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import { useSEO } from "@/hooks/useSEO";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function PortfolioPage() {
  useSEO({
    title: "Portfolio - WebNova Solution | Modern Web Design Showcase",
    description: "Explore our portfolio of modern, responsive websites. See how WebNova Solution creates stunning digital experiences for ambitious brands worldwide.",
    keywords: "web design portfolio, modern websites, responsive design showcase, web development examples, website gallery",
    canonical: "https://webnovasolution.com/portfolio",
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Portfolio - WebNova Solution",
      "description": "Showcase of modern web design and development projects",
      "url": "https://webnovasolution.com/portfolio",
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
            "name": "Portfolio",
            "item": "https://webnovasolution.com/portfolio"
          }
        ]
      }
    }
  });

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Back Navigation Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-20 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div className="text-lg font-semibold text-gray-900">Our Portfolio</div>
          <Link href="/services">
            <Button variant="outline" size="sm">
              Our Services
            </Button>
          </Link>
        </div>
      </motion.header>
      
      <Portfolio />
    </div>
  );
}