import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SplineBrain from './SplineBrain';
import { useState, useEffect } from "react";

const textVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: custom * 0.2,
      ease: [0.33, 1, 0.68, 1]
    }
  })
};

const slideUpVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.33, 1, 0.68, 1]
    }
  }
};

export default function Hero() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate page load
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <span className="text-black">WebNova</span>
              <span className="text-gray-400 ml-2">Solutions</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, delay: 0.5, ease: "easeInOut" }}
            className="h-0.5 bg-black mx-auto"
            style={{ maxWidth: "200px" }}
          />
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-gray-600 mt-6 text-lg tracking-wide"
          >
            Crafting Digital Excellence
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <section id="who" className="min-h-screen w-full flex items-center justify-center pt-24">
      <div className="max-w-7xl mx-auto px-8 py-20 w-full">
        <div className="grid md:grid-cols-2 gap-16 items-center w-full">
          <div className="flex flex-col justify-center space-y-8">
            <div className="overflow-hidden">
              <motion.h2 
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={0}
                className="text-5xl md:text-7xl font-bold leading-tight tracking-tight"
              >
                <span className="block">Crafting</span>
                <span className="block text-gray-600">Digital</span>
                <span className="block">Excellence</span>
              </motion.h2>
            </div>
            
            <motion.div
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                We transform your digital presence with modern, responsive websites 
                that captivate your audience and drive meaningful results for your business.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-full px-8 py-4 text-sm font-medium"
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Explore Our Work
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 rounded-full px-8 py-4 text-sm font-medium"
                  onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Get Started
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="h-full flex items-center"
          >
            <Card className="overflow-hidden relative bg-gradient-to-br from-gray-50/80 via-white to-gray-50/80 border border-gray-200/50 h-[600px] w-full group">
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative w-full h-full">
                <SplineBrain />
              </div>
            </Card>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center text-gray-400"
          >
            <span className="text-xs uppercase tracking-wide mb-2">Scroll</span>
            <div className="w-0.5 h-8 bg-gray-300"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}