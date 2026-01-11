import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Rocket, Target, Mail } from "lucide-react";
import { SiInstagram } from "react-icons/si";

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

export default function Pricing() {

  const processSteps = [
    {
      icon: MessageSquare,
      title: "Initial Consultation",
      description: "We discuss your goals, design preferences, and special features you need."
    },
    {
      icon: Target,
      title: "Personalized Pricing",
      description: "Receive custom pricing based on your project's complexity and requirements."
    },
    {
      icon: Rocket,
      title: "Project Execution", 
      description: "We bring your vision to life with a custom-built digital presence."
    }
  ];

  return (
    <section id="pricing" className="min-h-screen w-full bg-white pt-10 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Animated Elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-1/4 right-16 w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
          animate={{ 
            scaleX: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3] 
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-20 w-24 h-px bg-gradient-to-r from-transparent via-black to-transparent"
          animate={{ 
            scaleX: [1, 2, 1],
            opacity: [0.2, 0.6, 0.2] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2 
          }}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-8 py-20 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
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
                <span className="block">Tailored</span>
                <span className="block text-gray-600">Solutions</span>
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
              Every business is unique, so we craft personalized solutions that match your specific goals and requirements.
            </motion.p>
          </div>

          {/* Right side - Content */}
          <div className="space-y-8">
            <motion.div
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold tracking-tight">Customized For You</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe that no two businesses are the same—so why should their websites be? Every individual and small business has unique goals, branding, and vision, which is why we don't offer generic packages.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you're a freelancer looking for a personal portfolio, a startup in need of a sleek landing page, or a small business requiring a fully functional e-commerce platform, we have you covered.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Process Steps */}
        <div className="space-y-16">
          <div className="text-center">
            <motion.h3 
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              className="text-3xl font-bold tracking-tight mb-4"
            >
              Our Process
            </motion.h3>
          </div>
          
          <div className="space-y-12">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={textVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={index + 4}
                className="group flex items-start gap-8 max-w-3xl mx-auto"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center group-hover:bg-black transition-colors duration-300">
                  <step.icon className="w-7 h-7 text-black group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1 pt-3">
                  <h4 className="text-xl font-semibold mb-3 tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={7}
          className="text-center mt-20 space-y-8"
        >
          <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            You're not just getting a website—you're getting a custom-built digital presence designed to elevate your brand and help you succeed.
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button 
                size="lg" 
                onClick={() => window.open('https://instagram.com/webnovasolution_', '_blank')}
                className="bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-full px-8 py-4 text-sm font-medium flex items-center gap-2"
              >
                <SiInstagram className="w-5 h-5" />
                <span>Get Pricing on Instagram</span>
              </Button>
            </motion.div>
            
            <p className="text-gray-600 text-sm">
              Or call us at <a href="tel:+966537330022" className="font-semibold text-black hover:underline">+966 537 330 022</a>
            </p>
          </div>
        </motion.div>
      </div>

    </section>
  );
}