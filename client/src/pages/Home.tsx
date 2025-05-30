import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import ScrollCounter from "@/components/ScrollCounter";
import InteractiveTimeline from "@/components/InteractiveTimeline";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <ScrollCounter />
      <WhyUs />
      <InteractiveTimeline />
      <Testimonials />
      <Pricing />
    </div>
  );
}