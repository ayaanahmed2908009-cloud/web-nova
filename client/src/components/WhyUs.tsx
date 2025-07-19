import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Palette, DollarSign } from "lucide-react";

const features = [
  {
    title: "Fast Turnaround",
    description: "Get your website up and running quickly without compromising quality",
    icon: Clock,
  },
  {
    title: "Custom Design",
    description: "Unique designs tailored to your brand and business needs",
    icon: Palette,
  },
  {
    title: "Affordable Pricing",
    description: "Competitive rates with flexible payment options",
    icon: DollarSign,
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom * 0.1,
      ease: [0.33, 1, 0.68, 1]
    }
  })
};

export default function WhyUs() {
  return (
    <section id="why" className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-24 relative overflow-hidden">
      {/* Enhanced Cuberto-style background */}
      <div className="absolute inset-0 opacity-5">
        <motion.svg 
          className="absolute top-0 left-0 w-full h-full" 
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          animate={{ rotate: [0, 0.5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <path d="M0,0 L50,30 L100,0 L100,100 L0,100 Z" fill="url(#gradient1)" />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#000000" />
              <stop offset="100%" stopColor="#374151" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>
      
      {/* Dynamic floating elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-32 right-1/4 w-20 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
          animate={{ 
            scaleX: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-40 left-1/3 w-16 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"
          animate={{ 
            scaleX: [1, 2, 1],
            opacity: [0.4, 0.9, 0.4]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Additional floating geometric shapes */}
        <motion.div 
          className="absolute top-1/4 left-10 w-8 h-8 border border-gray-200 rounded-lg"
          animate={{ 
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-16 w-6 h-6 bg-gray-100 rounded-full"
          animate={{ 
            y: [0, -20, 0],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-8 py-20 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Title */}
          <div className="space-y-8">
            <div className="overflow-hidden">
              <motion.h2 
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                className="text-5xl md:text-7xl font-bold leading-tight tracking-tight"
              >
                <span className="block">Why</span>
                <span className="block text-gray-600">Choose</span>
                <span className="block">Us</span>
              </motion.h2>
            </div>
            
            <motion.p 
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              className="text-lg text-gray-600 leading-relaxed max-w-lg"
            >
              We combine technical expertise with creative vision to deliver digital solutions that exceed expectations and drive real business growth.
            </motion.p>
          </div>

          {/* Right side - Features */}
          <div className="space-y-12">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index + 2}
                className="group"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-black transition-colors duration-300">
                    <feature.icon className="w-5 h-5 text-black group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-semibold mb-3 tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
