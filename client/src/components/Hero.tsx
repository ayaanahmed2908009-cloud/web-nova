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
  const [crypticText1, setCrypticText1] = useState('');
  const [crypticText2, setCrypticText2] = useState('');
  const [finalText1, setFinalText1] = useState('');
  const [finalText2, setFinalText2] = useState('');
  const [showFinal, setShowFinal] = useState(false);

  const finalMessage1 = "WebNova Solutions";
  const finalMessage2 = "An agency built on excellence";
  
  const generateCrypticChar = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const generateCrypticText = (length: number) => {
    return Array.from({length}, () => generateCrypticChar()).join('');
  };

  useEffect(() => {
    // Phase 1: Show cryptic text
    const crypticInterval1 = setInterval(() => {
      setCrypticText1(generateCrypticText(finalMessage1.length));
    }, 50);

    const crypticInterval2 = setInterval(() => {
      setCrypticText2(generateCrypticText(finalMessage2.length));
    }, 50);

    // Phase 2: Start revealing first text after 800ms
    setTimeout(() => {
      clearInterval(crypticInterval1);
      let index = 0;
      const revealInterval1 = setInterval(() => {
        if (index <= finalMessage1.length) {
          setFinalText1(finalMessage1.slice(0, index));
          setCrypticText1(finalMessage1.slice(0, index) + generateCrypticText(finalMessage1.length - index));
          index++;
        } else {
          clearInterval(revealInterval1);
          setFinalText1(finalMessage1);
          setCrypticText1('');
        }
      }, 40);
    }, 800);

    // Phase 3: Start revealing second text after 1200ms
    setTimeout(() => {
      clearInterval(crypticInterval2);
      let index = 0;
      const revealInterval2 = setInterval(() => {
        if (index <= finalMessage2.length) {
          setFinalText2(finalMessage2.slice(0, index));
          setCrypticText2(finalMessage2.slice(0, index) + generateCrypticText(finalMessage2.length - index));
          index++;
        } else {
          clearInterval(revealInterval2);
          setFinalText2(finalMessage2);
          setCrypticText2('');
          setTimeout(() => setShowFinal(true), 300);
        }
      }, 30);
    }, 1200);

    // Phase 4: Hide loading screen
    setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => {
      clearInterval(crypticInterval1);
      clearInterval(crypticInterval2);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="ml-16 md:ml-32 font-mono flex flex-col h-screen justify-center"
        >
          <div className="mb-8">
            <motion.h1 
              className="text-2xl md:text-4xl font-bold tracking-wider text-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              style={{ fontFamily: 'Didot, "Times New Roman", serif' }}
            >
              {finalText1}
              {crypticText1}
            </motion.h1>
          </div>
          
          <div className="mb-8">
            <motion.p 
              className="text-lg md:text-2xl text-gray-800 tracking-wide"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              style={{ fontFamily: 'Didot, "Times New Roman", serif' }}
            >
              {finalText2}
              <span className="text-gray-500">{crypticText2}</span>
            </motion.p>
          </div>

          {showFinal && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "100px", opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-px bg-black"
            />
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <section id="who" className="min-h-screen w-full flex items-center justify-center pt-24 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-20 right-20 w-2 h-2 bg-black rounded-full"
          animate={{ 
            scale: [1, 1.5, 1], 
            opacity: [0.3, 0.7, 0.3],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-32 left-16 w-3 h-3 bg-gray-600 rounded-full"
          animate={{ 
            scale: [1, 2, 1], 
            opacity: [0.2, 0.6, 0.2],
            y: [0, -15, 0]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 1 
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-10 w-1 h-1 bg-gray-800 rounded-full"
          animate={{ 
            scale: [1, 3, 1], 
            opacity: [0.4, 0.8, 0.4],
            y: [0, -25, 0]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 2 
          }}
        />
        
        {/* Floating lines with movement */}
        <motion.div 
          className="absolute top-40 left-1/3 w-32 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
          animate={{
            x: [0, 20, 0],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-40 right-1/4 w-24 h-px bg-gradient-to-r from-transparent via-black to-transparent"
          animate={{
            x: [0, -15, 0],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
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
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    size="lg"
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
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-300 rounded-full px-8 py-4 text-sm font-medium relative overflow-hidden group"
                    onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
                  >
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">Get Started</span>
                    <motion.div
                      className="absolute inset-0 bg-black"
                      initial={{ y: "100%" }}
                      whileHover={{ y: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Button>
                </motion.div>
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
      
      {/* Transition to Services */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white pointer-events-none"></div>
    </section>
  );
}