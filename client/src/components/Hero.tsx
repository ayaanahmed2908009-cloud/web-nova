import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import SplineBrain from './SplineBrain';
import { useState, useEffect } from "react";
import CubertoMagneticButton from './CubertoMagneticButton';

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

  return (
    <section id="who" className="min-h-screen w-full flex items-center justify-center pt-24 relative overflow-hidden">
      {/* Simplified Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-2 h-2 bg-black rounded-full opacity-30"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-gray-600 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-10 w-1 h-1 bg-gray-800 rounded-full opacity-40"></div>
        <div className="absolute top-40 left-1/3 w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent opacity-60"></div>
        <div className="absolute bottom-40 right-1/4 w-24 h-px bg-gradient-to-r from-transparent via-black to-transparent opacity-40"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 py-20 w-full relative z-10">
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
                <CubertoMagneticButton
                  className="bg-black text-white hover:bg-gray-800 transition-all duration-300 rounded-full px-8 py-4 text-sm font-medium relative overflow-hidden group"
                  onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <span className="relative z-10">Explore Our Work</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </CubertoMagneticButton>
                
                <CubertoMagneticButton
                  className="border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 rounded-full px-8 py-4 text-sm font-medium relative overflow-hidden group"
                  onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">Get Started</span>
                  <motion.div
                    className="absolute inset-0 bg-black"
                    initial={{ y: "100%" }}
                    whileHover={{ y: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </CubertoMagneticButton>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="h-full flex items-center"
          >
            <div className="relative h-[600px] w-full group">
            {/* Cuberto-style floating card */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-white to-gray-50/80 border border-gray-200/50 rounded-3xl overflow-hidden"
              whileHover={{ 
                y: -10,
                rotateX: 5,
                rotateY: 5
              }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30 
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative w-full h-full">
                <SplineBrain />
              </div>
              
              {/* Cuberto-style corner accent */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-gray-400 rounded-full opacity-50"></div>
              <div className="absolute bottom-4 left-4 w-1 h-8 bg-gradient-to-t from-gray-300 to-transparent opacity-30"></div>
            </motion.div>
            
            {/* Static floating elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 border border-gray-200 rounded-full bg-white/80 backdrop-blur-sm"></div>
            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gray-100 rounded-lg"></div>
          </div>
          </motion.div>
        </div>
        
        {/* Static scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center text-gray-400">
            <span className="text-xs uppercase tracking-wide mb-2">Scroll</span>
            <div className="w-0.5 h-8 bg-gray-300"></div>
          </div>
        </div>
      </div>
      
      {/* Transition to Services */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
    </section>
  );
}