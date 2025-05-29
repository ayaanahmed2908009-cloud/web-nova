import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Portfolio() {
  const [typedText, setTypedText] = useState("");
  const [showSubtext, setShowSubtext] = useState(false);
  const [typedSubtext, setTypedSubtext] = useState("");
  const [rsoomPhase, setRsoomPhase] = useState(0); // 0: first text, 1: second text, 2: animation, 3: final design
  const [rsoomText1, setRsoomText1] = useState("");
  const [rsoomText2, setRsoomText2] = useState("");
  const [robotAnimationComplete, setRobotAnimationComplete] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  
  const mainText = "Are you ready for our masterpieces?";
  const subText = "Scroll down to be blessed";
  const rsoomFirstText = "Ahh Mechamorals our first born. Next we want to show you *pause* our next may not be as advanced but she sure is pretty";
  const rsoomSecondText = "Welcome to rsoom";

  useEffect(() => {
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= mainText.length) {
        setTypedText(mainText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        // Start subtext after main text is complete
        setTimeout(() => {
          setShowSubtext(true);
        }, 500);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    if (showSubtext) {
      let currentIndex = 0;
      const subtextInterval = setInterval(() => {
        if (currentIndex <= subText.length) {
          setTypedSubtext(subText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(subtextInterval);
        }
      }, 60);

      return () => clearInterval(subtextInterval);
    }
  }, [showSubtext]);

  // Rsoom typing sequence
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id === 'rsoom-section' && rsoomPhase === 0) {
            // Phase 1: Type first message
            let currentIndex = 0;
            const typeInterval = setInterval(() => {
              if (currentIndex <= rsoomFirstText.length) {
                setRsoomText1(rsoomFirstText.slice(0, currentIndex));
                currentIndex++;
              } else {
                clearInterval(typeInterval);
                // Wait 3 seconds, then fade out completely
                setTimeout(() => {
                  setRsoomText1(""); // Clear first text
                  
                  // Wait for pause, then start second message
                  setTimeout(() => {
                    setRsoomPhase(1);
                    let currentIndex2 = 0;
                    const typeInterval2 = setInterval(() => {
                      if (currentIndex2 <= rsoomSecondText.length) {
                        setRsoomText2(rsoomSecondText.slice(0, currentIndex2));
                        currentIndex2++;
                      } else {
                        clearInterval(typeInterval2);
                        // Wait 3 seconds, then start animations
                        setTimeout(() => {
                          setRsoomPhase(2);
                          setRsoomText2(""); // Clear second text
                          // Wait for longer animations, then show final design
                          setTimeout(() => {
                            setRsoomPhase(3);
                          }, 6000);
                        }, 3000);
                      }
                    }, 80);
                  }, 1500); // 1.5 second pause between texts
                }, 3000);
              }
            }, 50);
          }
        });
      },
      { threshold: 0.5 }
    );

    const rsoomSection = document.getElementById('rsoom-section');
    if (rsoomSection) {
      observer.observe(rsoomSection);
    }

    return () => observer.disconnect();
  }, [rsoomPhase]);

  // Robot animation completion timer
  useEffect(() => {
    // Set robot animation complete after 8 seconds (giving time for text + robot load)
    const timer = setTimeout(() => {
      setRobotAnimationComplete(true);
      // Show scroll indicator 1 second after animation completes
      setTimeout(() => {
        setShowScrollIndicator(true);
      }, 1000);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // Prevent scrolling until robot animation is complete
  useEffect(() => {
    if (!robotAnimationComplete) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [robotAnimationComplete]);

  return (
    <div className={`portfolio-container ${robotAnimationComplete ? 'snap-y snap-mandatory' : ''} h-screen overflow-y-scroll`}>
      {/* First Section - Intro with typing animation */}
      <section className="h-screen w-full flex items-center justify-center bg-white snap-start snap-always">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            {typedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-1 h-8 bg-black ml-1"
            />
          </h1>
          
          {showSubtext && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-gray-600"
            >
              {typedSubtext}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-0.5 h-4 bg-gray-600 ml-1"
              />
            </motion.p>
          )}
        </div>
      </section>

      {/* Second Section - Full screen Spline design */}
      <section className="h-screen w-full bg-black relative overflow-hidden snap-start snap-always">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-black"
        />
        
        {/* Text overlay at center */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute inset-0 flex items-center justify-center z-20"
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to Mechamorals
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              The hub for all things robotics and AI related
            </p>
            <Button 
              size="lg"
              className="bg-white text-black hover:bg-gray-200 transition-colors font-semibold px-8 py-3"
              onClick={() => window.open('https://mechamorals.com', '_blank')}
            >
              Try Morality AI
            </Button>
          </div>
        </motion.div>
        
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-20 left-8 z-20"
        >
          <Button 
            variant="ghost"
            className="text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ← Back
          </Button>
        </motion.div>

        {/* Full screen Spline design */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://my.spline.design/nexbotrobotcharacterconcept-c64f76405283676f4e47793493cea968/"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Mechamorals - Nexbot Robot Character Concept"
            style={{ border: 'none' }}
            onLoad={() => {
              console.log('Spline iframe loaded successfully');
              // Additional delay to ensure animation is visible
              setTimeout(() => {
                setRobotAnimationComplete(true);
                setTimeout(() => {
                  setShowScrollIndicator(true);
                }, 1000);
              }, 3000);
            }}
          />
        </div>

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="flex flex-col items-center text-white"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-sm mb-2">Scroll to continue</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* Third Section - rsoom with animated sequence */}
      <section 
        id="rsoom-section"
        className="h-screen w-full bg-black snap-start snap-always relative overflow-hidden"
      >
        {/* Phase 0 & 1: Typing animations */}
        {(rsoomPhase === 0 || rsoomPhase === 1) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-4xl px-8">
              {rsoomPhase === 0 && (
                <motion.h1 
                  className="text-2xl md:text-4xl font-medium text-yellow-400"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: rsoomPhase === 1 ? 0 : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {rsoomText1}
                  <span className="animate-pulse">|</span>
                </motion.h1>
              )}
              {rsoomPhase === 1 && (
                <motion.h1 
                  className="text-4xl md:text-6xl font-bold text-yellow-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: rsoomPhase === 2 ? 0 : 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {rsoomText2}
                  <span className="animate-pulse">|</span>
                </motion.h1>
              )}
            </div>
          </div>
        )}

        {/* Phase 2: Enhanced blue animation and lightning bolts */}
        {rsoomPhase === 2 && (
          <div className="absolute inset-0">
            {/* Thunder background effect - brighter */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0.8, 0.5, 0] }}
              transition={{ duration: 2.5, ease: "easeInOut" }}
            />
            
            {/* Primary blue wave animation - brighter */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300 to-transparent"
              initial={{ x: "-100%", opacity: 0, scaleY: 0.5 }}
              animate={{ 
                x: ["−100%", "0%", "100%"], 
                opacity: [0, 0.9, 0.6, 0], 
                scaleY: [0.5, 1.2, 0.8, 0.3]
              }}
              transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1] }}
            />
            
            {/* Secondary wave for depth - brighter */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-l from-transparent via-blue-200 to-transparent"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ 
                x: ["100%", "0%", "-100%"], 
                opacity: [0, 0.7, 0] 
              }}
              transition={{ duration: 2.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            />

            {/* Enhanced SVG Lightning bolts filling the screen */}
            {/* Top row lightning bolts */}
            <motion.div
              className="absolute top-12 left-16"
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0.8, 0], 
                scale: [0, 1.5, 1.2, 0], 
                rotate: [0, 5, -5, 0] 
              }}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <svg width="80" height="120" viewBox="0 0 80 120" className="text-yellow-300 drop-shadow-lg">
                <path d="M40 10 L25 45 L35 45 L20 110 L55 50 L45 50 L60 10 Z" fill="currentColor" className="animate-pulse"/>
                <path d="M40 10 L25 45 L35 45 L20 110 L55 50 L45 50 L60 10 Z" fill="none" stroke="#FACC15" strokeWidth="2" className="animate-pulse"/>
              </svg>
            </motion.div>

            <motion.div
              className="absolute top-20 right-20"
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0.6, 0], 
                scale: [0, 1.3, 1, 0], 
                rotate: [0, -10, 10, 0] 
              }}
              transition={{ duration: 1.5, delay: 1.2, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <svg width="60" height="90" viewBox="0 0 60 90" className="text-yellow-300 drop-shadow-lg">
                <path d="M30 5 L20 35 L25 35 L15 85 L40 40 L35 40 L45 5 Z" fill="currentColor" className="animate-pulse"/>
              </svg>
            </motion.div>

            <motion.div
              className="absolute top-32 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0.9, 0], 
                scale: [0, 1.6, 1.3, 0], 
                rotate: [0, 8, -8, 0] 
              }}
              transition={{ duration: 1.4, delay: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <svg width="90" height="130" viewBox="0 0 90 130" className="text-yellow-300 drop-shadow-lg">
                <path d="M45 8 L28 50 L38 50 L22 120 L62 55 L52 55 L68 8 Z" fill="currentColor" className="animate-pulse"/>
              </svg>
            </motion.div>

            {/* Middle row lightning bolts */}
            <motion.div
              className="absolute top-1/2 left-12"
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0.7, 0], 
                scale: [0, 1.4, 1.1, 0], 
                rotate: [0, 15, -10, 0] 
              }}
              transition={{ duration: 1.3, delay: 2.5, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <svg width="70" height="100" viewBox="0 0 70 100" className="text-yellow-300 drop-shadow-lg">
                <path d="M35 8 L22 40 L30 40 L18 95 L48 45 L40 45 L52 8 Z" fill="currentColor" className="animate-pulse"/>
              </svg>
            </motion.div>

            <motion.div
              className="absolute top-1/2 right-12"
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0.5, 0], 
                scale: [0, 1.2, 0.9, 0], 
                rotate: [0, -5, 5, 0] 
              }}
              transition={{ duration: 1.1, delay: 3.2, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <svg width="50" height="75" viewBox="0 0 50 75" className="text-yellow-300 drop-shadow-lg">
                <path d="M25 5 L18 30 L22 30 L12 70 L32 35 L28 35 L35 5 Z" fill="currentColor" className="animate-pulse"/>
              </svg>
            </motion.div>

            <motion.div
              className="absolute top-1/2 left-1/3"
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0.8, 0], 
                scale: [0, 1.7, 1.4, 0], 
                rotate: [0, -12, 12, 0] 
              }}
              transition={{ duration: 1.6, delay: 1.8, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <svg width="85" height="115" viewBox="0 0 85 115" className="text-yellow-300 drop-shadow-lg">
                <path d="M42 6 L26 48 L36 48 L20 108 L58 52 L48 52 L64 6 Z" fill="currentColor" className="animate-pulse"/>
              </svg>
            </motion.div>

            <motion.div
              className="absolute top-1/2 right-1/3"
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0.6, 0], 
                scale: [0, 1.3, 1, 0], 
                rotate: [0, 10, -8, 0] 
              }}
              transition={{ duration: 1.3, delay: 2.8, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <svg width="65" height="95" viewBox="0 0 65 95" className="text-yellow-300 drop-shadow-lg">
                <path d="M32 7 L21 38 L28 38 L16 88 L43 42 L36 42 L47 7 Z" fill="currentColor" className="animate-pulse"/>
              </svg>
            </motion.div>

            {/* Bottom row lightning bolts */}
            <motion.div
              className="absolute bottom-24 left-20"
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0.7, 0], 
                scale: [0, 1.5, 1.2, 0], 
                rotate: [0, -15, 10, 0] 
              }}
              transition={{ duration: 1.4, delay: 3.8, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <svg width="75" height="105" viewBox="0 0 75 105" className="text-yellow-300 drop-shadow-lg">
                <path d="M37 8 L24 42 L32 42 L19 98 L50 46 L42 46 L55 8 Z" fill="currentColor" className="animate-pulse"/>
              </svg>
            </motion.div>

            <motion.div
              className="absolute bottom-32 right-24"
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0.5, 0], 
                scale: [0, 1.1, 0.8, 0], 
                rotate: [0, 8, -6, 0] 
              }}
              transition={{ duration: 1.2, delay: 4.2, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <svg width="55" height="80" viewBox="0 0 55 80" className="text-yellow-300 drop-shadow-lg">
                <path d="M27 6 L19 32 L24 32 L14 74 L35 38 L30 38 L38 6 Z" fill="currentColor" className="animate-pulse"/>
              </svg>
            </motion.div>

            <motion.div
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0.8, 0], 
                scale: [0, 1.6, 1.3, 0], 
                rotate: [0, -8, 12, 0] 
              }}
              transition={{ duration: 1.5, delay: 3.5, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <svg width="80" height="110" viewBox="0 0 80 110" className="text-yellow-300 drop-shadow-lg">
                <path d="M40 8 L26 44 L34 44 L21 102 L54 48 L46 48 L60 8 Z" fill="currentColor" className="animate-pulse"/>
              </svg>
            </motion.div>

            {/* Corner lightning bolts */}
            <motion.div
              className="absolute top-8 left-8"
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0.6, 0], 
                scale: [0, 1.2, 0.9, 0], 
                rotate: [0, 12, -8, 0] 
              }}
              transition={{ duration: 1.1, delay: 1.5, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <svg width="45" height="70" viewBox="0 0 45 70" className="text-yellow-300 drop-shadow-lg">
                <path d="M22 5 L16 28 L20 28 L12 65 L30 32 L26 32 L32 5 Z" fill="currentColor" className="animate-pulse"/>
              </svg>
            </motion.div>

            <motion.div
              className="absolute top-8 right-8"
              initial={{ opacity: 0, scale: 0, rotate: 0 }}
              animate={{ 
                opacity: [0, 1, 0.7, 0], 
                scale: [0, 1.3, 1, 0], 
                rotate: [0, -10, 14, 0] 
              }}
              transition={{ duration: 1.3, delay: 2.2, ease: [0.68, -0.55, 0.265, 1.55] }}
            >
              <svg width="50" height="75" viewBox="0 0 50 75" className="text-yellow-300 drop-shadow-lg">
                <path d="M25 5 L18 30 L22 30 L12 70 L32 35 L28 35 L35 5 Z" fill="currentColor" className="animate-pulse"/>
              </svg>
            </motion.div>

            {/* Electrical activity background particles */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 4, delay: 1 }}
            >
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.3,
                    repeat: 2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          </div>
        )}

        {/* Phase 3: Final landing page design */}
        {rsoomPhase === 3 && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Enhanced Navigation bar with hover transitions */}
            <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6 z-20">
              <div className="flex items-center space-x-8">
                {['Home', 'Store', 'Customer Support', 'Careers', 'Contact'].map((item) => (
                  <motion.span 
                    key={item}
                    className="text-white text-sm cursor-pointer relative overflow-hidden"
                    whileHover={{ 
                      color: "#FACC15",
                      scale: 1.05
                    }}
                    transition={{ 
                      duration: 0.3, 
                      ease: [0.25, 0.1, 0.25, 1] 
                    }}
                  >
                    <motion.div
                      className="absolute bottom-0 left-0 h-0.5 bg-yellow-400"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                    {item}
                  </motion.span>
                ))}
              </div>
              <motion.button 
                className="bg-yellow-400 text-black px-6 py-2 rounded-full text-sm font-medium relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(250, 204, 21, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  duration: 0.3, 
                  ease: [0.25, 0.1, 0.25, 1] 
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                />
                <span className="relative z-10">ihaaan</span>
              </motion.button>
            </nav>

            {/* Main content */}
            <div className="h-full flex items-center justify-between px-16">
              {/* Left side - Main text */}
              <div className="flex-1 max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  Revolutionizing
                  <br />
                  <span className="text-yellow-200">Design</span> For The
                  <br />
                  Modern Era
                </h1>
                
                <div className="flex gap-4 mt-8">
                  <motion.button 
                    className="bg-yellow-400 text-black px-8 py-3 rounded font-medium relative overflow-hidden"
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 0 25px rgba(250, 204, 21, 0.5)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ 
                      duration: 0.3, 
                      ease: [0.25, 0.1, 0.25, 1] 
                    }}
                    onClick={() => window.open('https://rsoom.online', '_blank')}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                    <span className="relative z-10">See our revolutionary customer support system at first hand</span>
                  </motion.button>
                  <motion.button 
                    className="border border-yellow-400 text-yellow-400 px-8 py-3 rounded font-medium relative overflow-hidden group"
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: "#FACC15",
                      boxShadow: "0 0 20px rgba(250, 204, 21, 0.3)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ 
                      duration: 0.3, 
                      ease: [0.25, 0.1, 0.25, 1] 
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-yellow-400"
                      initial={{ y: "100%" }}
                      whileHover={{ y: "0%" }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                    <motion.span 
                      className="relative z-10"
                      whileHover={{ color: "#000000" }}
                      transition={{ duration: 0.3 }}
                    >
                      Visit Store
                    </motion.span>
                  </motion.button>
                </div>
              </div>

              {/* Enhanced Right side - rsoom logo card */}
              <div className="flex-shrink-0 ml-16">
                <motion.div 
                  className="border-4 border-yellow-200 rounded-2xl p-8 bg-black/50 backdrop-blur-sm relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    borderColor: "#FACC15",
                    boxShadow: "0 0 30px rgba(250, 204, 21, 0.4)"
                  }}
                  transition={{ 
                    duration: 0.3, 
                    ease: [0.25, 0.1, 0.25, 1] 
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-blue-600/20"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                  <div className="text-center relative z-10">
                    <motion.div 
                      className="text-yellow-200 text-4xl mb-4"
                      whileHover={{ 
                        scale: 1.1,
                        filter: "brightness(1.2)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <svg className="w-24 h-24 mx-auto" viewBox="0 0 64 64" fill="currentColor">
                        <path d="M32 8C24.268 8 18 14.268 18 22c0 7.732 6.268 14 14 14s14-6.268 14-14c0-7.732-6.268-14-14-14zm0 24c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10z"/>
                        <path d="M48 40H16c-2.209 0-4 1.791-4 4v12c0 2.209 1.791 4 4 4h32c2.209 0 4-1.791 4-4V44c0-2.209-1.791-4-4-4zm-16 16c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/>
                      </svg>
                    </motion.div>
                    <motion.h2 
                      className="text-yellow-200 text-2xl font-bold mb-2"
                      whileHover={{ 
                        scale: 1.05,
                        color: "#FEF08A"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      RSOOM
                    </motion.h2>
                    <motion.p 
                      className="text-yellow-200 text-lg"
                      whileHover={{ 
                        scale: 1.05,
                        color: "#FEF08A"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      رسوم
                    </motion.p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-yellow-400/20 to-transparent"></div>
              <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-yellow-400 rounded-full animate-pulse delay-1000"></div>
              <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse delay-500"></div>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}