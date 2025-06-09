import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import ScrollCounter from "@/components/ScrollCounter";
import InteractiveTimeline from "@/components/InteractiveTimeline";
import QuoteSection from "@/components/QuoteSection";
import FloatingActionButton from "@/components/FloatingActionButton";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import SEOHead from "@/components/SEOHead";
import SectionInView from "@/components/SectionInView";
import WebsiteMetrics from "@/components/WebsiteMetrics";
import Analytics from "@/components/Analytics";
import { ParallaxElement } from "@/components/ParallaxElement";
import { Toaster } from "@/components/ui/toaster";

import CubertoSmoothScroll from "@/components/CubertoSmoothScroll";

export default function Home() {
  return (
    <div className="min-h-screen bg-white relative">
      <SEOHead />
      <ScrollProgressBar />
      <CubertoSmoothScroll />
      
      {/* Global Parallax Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <ParallaxElement speed={0.1} className="absolute top-[20%] right-[10%] w-8 h-8 bg-gray-100 rounded-full opacity-30">
          <div className="w-full h-full"></div>
        </ParallaxElement>
        <ParallaxElement speed={0.3} className="absolute top-[60%] left-[5%] w-6 h-6 border border-gray-200 rounded-full opacity-40">
          <div className="w-full h-full"></div>
        </ParallaxElement>
        <ParallaxElement speed={0.2} className="absolute top-[80%] right-[20%] w-4 h-16 bg-gradient-to-t from-gray-100 to-transparent opacity-25">
          <div className="w-full h-full"></div>
        </ParallaxElement>
        <ParallaxElement speed={0.4} className="absolute top-[40%] left-[80%] w-2 h-2 bg-black rounded-full opacity-20">
          <div className="w-full h-full"></div>
        </ParallaxElement>
        <ParallaxElement speed={0.15} className="absolute top-[30%] left-[15%] w-12 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-50">
          <div className="w-full h-full"></div>
        </ParallaxElement>
      </div>

      <Navbar />
      
      <SectionInView>
        <ParallaxElement speed={0.05} className="relative">
          <Hero />
        </ParallaxElement>
      </SectionInView>
      
      <SectionInView delay={0.2}>
        <ParallaxElement speed={0.1} className="relative">
          <Services />
        </ParallaxElement>
      </SectionInView>
      
      <SectionInView delay={0.1}>
        <ParallaxElement speed={0.08} className="relative">
          <ScrollCounter />
        </ParallaxElement>
      </SectionInView>
      
      <SectionInView delay={0.3}>
        <ParallaxElement speed={0.12} className="relative">
          <WhyUs />
        </ParallaxElement>
      </SectionInView>
      
      <SectionInView delay={0.2}>
        <ParallaxElement speed={0.06} className="relative">
          <InteractiveTimeline />
        </ParallaxElement>
      </SectionInView>
      
      <SectionInView delay={0.1}>
        <ParallaxElement speed={0.09} className="relative">
          <Testimonials />
        </ParallaxElement>
      </SectionInView>
      
      <SectionInView delay={0.2}>
        <ParallaxElement speed={0.03} className="relative">
          <Pricing />
        </ParallaxElement>
      </SectionInView>

      <SectionInView delay={0.1}>
        <WebsiteMetrics />
      </SectionInView>

      <SectionInView delay={0.3}>
        <QuoteSection />
      </SectionInView>

      <Analytics />
      <FloatingActionButton />
      <Toaster />
    </div>
  );
}