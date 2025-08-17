import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, Paintbrush, Settings, LineChart, Smartphone, MessageSquare } from "lucide-react";
import { CubertoSection, CubertoGrid, CubertoCard, CubertoText } from "./CubertoLayout";
import { useEffect } from "react";

const services = [
  {
    title: "Website Development",
    description: "Custom-built websites using modern technologies and best practices",
    icon: Code2,
  },
  {
    title: "Mobile App Development",
    description: "Private company apps and public consumer applications for iOS and Android",
    icon: Smartphone,
  },
  {
    title: "Website Maintenance",
    description: "Regular updates and maintenance to keep your site running smoothly",
    icon: Settings,
  },
  {
    title: "SEO Optimization",
    description: "Improve your site's visibility and reach your target audience",
    icon: LineChart,
  },
  {
    title: "Consultation",
    description: "Expert advice and project planning to guide your digital journey",
    icon: MessageSquare,
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: custom * 0.08,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

const immersiveVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.98
  },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: custom * 0.1,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export default function Services() {
  // Add services structured data
  useEffect(() => {
    const servicesStructuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "WebNova Solution",
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Web Design and Development Services",
        "itemListElement": services.map((service, index) => ({
          "@type": "Offer",
          "name": service.title,
          "description": service.description,
          "category": "Web Design Services",
          "priceRange": "500-5000 SAR",
          "position": index + 1
        }))
      }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-services', 'structured-data');
    script.textContent = JSON.stringify(servicesStructuredData);
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[data-services="structured-data"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return (
    <section id="services" className="min-h-screen w-full bg-white relative z-20" 
             aria-labelledby="services-heading" 
             role="region">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-gray-900"></div>
        <div className="absolute top-40 right-20 w-24 h-24 rounded-full bg-gray-700"></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 rounded-full bg-gray-800"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24 w-full relative z-30 flex items-center min-h-screen">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full"
        >
          {/* Left side - Title with immersive fade */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-10%" }}
            className="space-y-4 md:space-y-6 text-center lg:text-left"
          >
            <div className="overflow-hidden">
              <h2 
                id="services-heading"
                className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900"
              >
                <span className="block text-gray-900">What</span>
                <span className="block text-gray-600">We</span>
                <span className="block text-gray-900">Do</span>
              </h2>
            </div>
            
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
              We craft digital experiences that transform your business presence and drive meaningful results through strategic design and development.
            </p>

            <div className="w-24 h-px bg-gradient-to-r from-gray-400 to-transparent mx-auto lg:mx-0" />
          </motion.div>

          {/* Right side - Services with immersive reveals */}
          <motion.div 
            variants={immersiveVariants}
            custom={1}
            className="space-y-4"
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.4, 
                    delay: index * 0.05
                  }
                }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="group border-b border-gray-200 pb-4 last:border-b-0 relative"
              >
                <div className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-gray-100/50 group-hover:bg-white group-hover:shadow-xl transition-all duration-700">
                  <div className="flex-shrink-0 p-2 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-black group-hover:to-gray-800 transition-all duration-300">
                    <service.icon className="w-5 h-5 text-black group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1 tracking-tight group-hover:text-black transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                  
                  <div className="absolute top-4 right-4 w-2 h-2 bg-gray-300 rounded-full opacity-60" />
                </div>
                
                <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full opacity-70" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
