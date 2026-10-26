import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import SplineBrain from './SplineBrain';
import { useRef } from "react";
import CubertoMagneticButton from './CubertoMagneticButton';
import { ArrowDown, Sparkles, Zap, Star } from 'lucide-react';

const textVariants = {
  hidden: { opacity: 0, y: 120, rotateX: -15 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 1.2,
      delay: custom * 0.15,
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 100
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
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);


  return (
    <motion.section
      ref={containerRef}
      id="who"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden pt-4 pb-8 md:pt-8 md:pb-0"
      style={{ y, opacity }}
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 right-20 w-3 h-3 bg-black rounded-full"
        >
          <Sparkles className="w-3 h-3 text-yellow-400" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-16 w-4 h-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-80"
        />
        <motion.div
          className="absolute top-1/2 left-10 w-2 h-2 bg-green-500 rounded-full"
        />
        <motion.div
          className="absolute top-40 left-1/3 w-32 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"
        />
        <motion.div
          className="absolute bottom-40 right-1/4 w-24 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
        />

        {/* Additional floating elements */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-6 h-6 border border-gray-300 rounded-full"
        >
          <Star className="w-4 h-4 text-gray-400 m-0.5" />
        </motion.div>
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-5 h-5 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg opacity-70"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-8 md:py-20 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center w-full">
          <div className="flex flex-col justify-center space-y-6 md:space-y-8 text-center md:text-left">
            <div className="overflow-hidden perspective-1000">
              <motion.h2
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={0}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.1] sm:leading-tight tracking-tight relative"
                style={{
                  transformStyle: "preserve-3d"
                }}
              >
                <motion.span
                  className="block bg-gradient-to-r from-gray-900 via-black to-gray-800 bg-clip-text text-transparent"
                >
                  Building
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-black via-gray-800 to-gray-900 bg-clip-text text-transparent"
                >
                  Local
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-gray-800 via-black to-gray-900 bg-clip-text text-transparent relative"
                >
                  Visibility
                  <motion.span
                    className="absolute -right-4 -top-2 w-3 h-3 bg-yellow-400 rounded-full inline-block"
                  />
                </motion.span>
              </motion.h2>
            </div>

            <motion.div
              variants={slideUpVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.p
                className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg relative mx-auto md:mx-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
                We help Saudi small businesses and nonprofits be seen with{" "}
                <motion.span
                  className="font-semibold text-gray-800 relative"
                  whileHover={{ scale: 1.05 }}
                >
                  full-stack websites at cost.
                  <motion.span
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 origin-left block"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 2, duration: 0.6 }}
                  />
                </motion.span>
                {" "}
                You pay the cost of the website and nothing more.
                <motion.span
                  className="inline-block ml-1 text-blue-500"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ delay: 2.5, duration: 0.8 }}
                >
                  <Zap className="w-4 h-4 inline" />
                </motion.span>
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center md:items-start"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                <Link href="/examples">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CubertoMagneticButton
                      className="bg-gradient-to-r from-black via-gray-900 to-black text-white hover:shadow-2xl transition-all duration-500 rounded-full px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-medium relative overflow-hidden group w-full max-w-xs sm:w-auto sm:max-w-none"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        See Our Best Examples
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.4 }}
                      />
                      <motion.div
                        className="absolute top-0 left-0 w-full h-full bg-white/10"
                      />
                    </CubertoMagneticButton>
                  </motion.div>
                </Link>

                <Link href="/get-website">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CubertoMagneticButton
                      className="border-2 border-gray-800 text-gray-800 hover:shadow-xl transition-all duration-500 rounded-full px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-medium relative overflow-hidden group w-full max-w-xs sm:w-auto sm:max-w-none backdrop-blur-sm"
                    >
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                        <ArrowDown className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                        Get Your Website
                      </span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black"
                        initial={{ scale: 0, borderRadius: "50%" }}
                        whileHover={{ scale: 1, borderRadius: "0%" }}
                        transition={{ duration: 0.4 }}
                      />
                    </CubertoMagneticButton>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
            className="h-full flex items-center"
          >
            <div className="relative h-[400px] sm:h-[500px] md:h-[600px] w-full group">
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

        {/* Enhanced scroll indicator */}
        <motion.div
          className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer touch-manipulation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          onClick={() => {
            const servicesSection = document.getElementById('services');
            servicesSection?.scrollIntoView({ behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="flex flex-col items-center text-gray-600 group">
            <motion.span
              className="text-xs uppercase tracking-wider mb-3 font-medium group-hover:text-black transition-colors"
            >
              Discover More
            </motion.span>
            <motion.div
              className="relative"
            >
              <div className="w-0.5 h-12 bg-gradient-to-b from-gray-400 via-gray-600 to-transparent"></div>
              <motion.div
                className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-600 rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Transition to Services */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
    </motion.section>
  );
}
