import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe, Code, Palette } from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Fashion Store",
    description: "Modern online store with payment integration and inventory management",
    category: "E-commerce",
    technologies: ["React", "Node.js", "Stripe"],
    websiteUrl: "https://fashionstore-demo.vercel.app",
    clientName: "StyleHub Boutique",
    completionDate: "2024",
    features: ["Payment Gateway", "Admin Dashboard", "Mobile Responsive"],
    backgroundColor: "bg-gradient-to-br from-pink-50 to-purple-50"
  },
  {
    id: 2,
    title: "Restaurant Landing Page",
    description: "Elegant restaurant website with online reservation system",
    category: "Restaurant",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    websiteUrl: "https://restaurant-demo.vercel.app",
    clientName: "Bella Vista Restaurant",
    completionDate: "2024",
    features: ["Online Reservations", "Menu Display", "Contact Forms"],
    backgroundColor: "bg-gradient-to-br from-orange-50 to-red-50"
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Creative portfolio for a freelance photographer",
    category: "Portfolio",
    technologies: ["React", "Next.js", "Sanity CMS"],
    websiteUrl: "https://photographer-portfolio.vercel.app",
    clientName: "Alex Photography",
    completionDate: "2024",
    features: ["Image Gallery", "Blog System", "SEO Optimized"],
    backgroundColor: "bg-gradient-to-br from-blue-50 to-cyan-50"
  },
  {
    id: 4,
    title: "Business Consulting",
    description: "Professional corporate website with service booking",
    category: "Corporate",
    technologies: ["React", "TypeScript", "Firebase"],
    websiteUrl: "https://consulting-firm.vercel.app",
    clientName: "Strategic Solutions Inc",
    completionDate: "2024",
    features: ["Appointment Booking", "Team Profiles", "Case Studies"],
    backgroundColor: "bg-gradient-to-br from-gray-50 to-slate-50"
  }
];

export default function Portfolio() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, portfolioItems.length - 1]);

  useEffect(() => {
    const unsubscribe = progress.on("change", (latest) => {
      setCurrentIndex(Math.round(latest));
    });

    return () => unsubscribe();
  }, [progress]);

  const currentItem = portfolioItems[currentIndex] || portfolioItems[0];

  return (
    <section 
      id="portfolio" 
      ref={containerRef}
      className="min-h-[400vh] relative"
    >
      {/* Fixed viewport that shows the transitioning websites */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background that changes with each project */}
        <motion.div 
          className={`absolute inset-0 ${currentItem.backgroundColor} transition-all duration-1000`}
          key={currentItem.id}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            
            {/* Project Information */}
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div>
                <span className="text-sm text-gray-500 bg-white/50 px-3 py-1 rounded-full">
                  {currentItem.category}
                </span>
                <h2 className="text-4xl font-bold mt-4 mb-2">{currentItem.title}</h2>
                <p className="text-gray-600 text-lg">{currentItem.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">
                    Client
                  </h4>
                  <p className="text-lg">{currentItem.clientName}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentItem.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="bg-black text-white px-3 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-sm text-gray-500 uppercase tracking-wide mb-2">
                    Key Features
                  </h4>
                  <div className="space-y-1">
                    {currentItem.features.map((feature) => (
                      <div key={feature} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-black rounded-full mr-3"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <Button 
                className="bg-black text-white hover:bg-gray-800 transition-colors"
                onClick={() => window.open(currentItem.websiteUrl, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Live Website
              </Button>
            </motion.div>

            {/* Website Preview */}
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                {/* Browser Chrome */}
                <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-white rounded mx-4 px-3 py-1 text-xs text-gray-500">
                    {currentItem.websiteUrl}
                  </div>
                </div>
                
                {/* Website Content */}
                <div className="h-[400px] bg-white relative overflow-hidden">
                  {/* Website Mockup Content */}
                  <div className={`w-full h-full ${currentItem.backgroundColor} flex items-center justify-center`}>
                    <div className="text-center space-y-4">
                      <div className="text-2xl font-bold text-gray-800">{currentItem.title}</div>
                      <div className="text-gray-600">Interactive Website Preview</div>
                      <div className="flex justify-center gap-2">
                        {currentItem.technologies.map((tech) => (
                          <span key={tech} className="text-xs bg-black text-white px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Overlay to make it clickable */}
                  <div className="absolute inset-0 bg-transparent cursor-pointer hover:bg-black/5 transition-colors"
                       onClick={() => window.open(currentItem.websiteUrl, '_blank')}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {portfolioItems.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-8 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-black' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-4 right-8 text-sm text-gray-500">
          Scroll to see more projects
        </div>
      </div>
    </section>
  );
}