import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState(0); // 0: intro, 1: mechamorals, 2: rsoom
  const [typedText, setTypedText] = useState("");
  const [showSubtext, setShowSubtext] = useState(false);
  const [typedSubtext, setTypedSubtext] = useState("");
  const [rsoomPhase, setRsoomPhase] = useState(0);
  const [rsoomText1, setRsoomText1] = useState("");
  const [rsoomText2, setRsoomText2] = useState("");
  const [robotLoaded, setRobotLoaded] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  
  const mainText = "Are you ready for our masterpieces?";
  const subText = "Scroll down to be blessed";
  const rsoomFirstText = "Ahh Mechamorals our first born. Next we want to show you *pause* our next may not be as advanced but she sure is pretty";
  const rsoomSecondText = "Welcome to rsoom";

  // Intro typing animation
  useEffect(() => {
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= mainText.length) {
        setTypedText(mainText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
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
          // Allow proceeding after intro completes
          setTimeout(() => {
            setCanProceed(true);
          }, 2000);
        }
      }, 60);

      return () => clearInterval(subtextInterval);
    }
  }, [showSubtext]);

  // Handle proceeding to next section
  const proceedToNext = () => {
    if (canProceed) {
      setCurrentSection(currentSection + 1);
      setCanProceed(false);
      
      if (currentSection === 1) {
        // Moving from mechamorals to rsoom
        setTimeout(() => {
          startRsoomSequence();
        }, 1000);
      }
    }
  };

  // Robot animation completion
  const handleRobotLoad = () => {
    setRobotLoaded(true);
    // Give 5 seconds for robot animation to play
    setTimeout(() => {
      setCanProceed(true);
    }, 5000);
  };

  // Rsoom sequence
  const startRsoomSequence = () => {
    // Start rsoom typing sequence
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= rsoomFirstText.length) {
        setRsoomText1(rsoomFirstText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setRsoomText1("");
          setTimeout(() => {
            setRsoomPhase(1);
            let currentIndex2 = 0;
            const typeInterval2 = setInterval(() => {
              if (currentIndex2 <= rsoomSecondText.length) {
                setRsoomText2(rsoomSecondText.slice(0, currentIndex2));
                currentIndex2++;
              } else {
                clearInterval(typeInterval2);
                setTimeout(() => {
                  setRsoomPhase(2);
                  setRsoomText2("");
                  setTimeout(() => {
                    setRsoomPhase(3);
                  }, 6000);
                }, 3000);
              }
            }, 80);
          }, 1500);
        }, 3000);
      }
    }, 50);
  };

  // Disable all scrolling and only allow controlled navigation
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (canProceed && e.deltaY > 0) {
        proceedToNext();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'ArrowDown' || e.key === ' ') && canProceed) {
        e.preventDefault();
        proceedToNext();
      }
    };

    document.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('wheel', handleWheel);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [canProceed, currentSection]);

  return (
    <div className="portfolio-container h-screen overflow-hidden relative">
      <AnimatePresence mode="wait">
        {/* Section 0: Intro */}
        {currentSection === 0 && (
          <motion.section 
            key="intro"
            className="h-screen w-full flex items-center justify-center bg-white absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                {typedText}
                <span className="animate-pulse">|</span>
              </h1>
              
              {showSubtext && (
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg text-gray-600"
                >
                  {typedSubtext}
                  <span className="animate-pulse">|</span>
                </motion.p>
              )}

              {canProceed && (
                <motion.div
                  className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  onClick={proceedToNext}
                >
                  <motion.div
                    className="flex flex-col items-center text-black"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <span className="text-sm mb-2">Continue the journey</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}

        {/* Section 1: Mechamorals */}
        {currentSection === 1 && (
          <motion.section 
            key="mechamorals"
            className="h-screen w-full bg-black relative absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Text overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
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
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute bottom-20 left-8 z-20"
            >
              <Button 
                variant="ghost"
                className="text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
                onClick={() => setCurrentSection(0)}
              >
                ← Back
              </Button>
            </motion.div>

            {/* Robot iframe */}
            <div className="absolute inset-0 w-full h-full">
              <iframe
                src="https://my.spline.design/nexbotrobotcharacterconcept-c64f76405283676f4e47793493cea968/"
                width="100%"
                height="100%"
                frameBorder="0"
                title="Mechamorals - Nexbot Robot Character Concept"
                style={{ border: 'none' }}
                onLoad={handleRobotLoad}
              />
            </div>

            {/* Continue indicator */}
            {canProceed && (
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                onClick={proceedToNext}
              >
                <motion.div
                  className="flex flex-col items-center text-white"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="text-sm mb-2">Continue to next showcase</span>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              </motion.div>
            )}
          </motion.section>
        )}

        {/* Section 2: Rsoom */}
        {currentSection === 2 && (
          <motion.section 
            key="rsoom"
            className="h-screen w-full bg-black relative absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
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

            {/* Phase 2: Lightning animations */}
            {rsoomPhase === 2 && (
              <div className="absolute inset-0">
                {/* Blue background effects and lightning bolts - keeping existing complex animations */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0.8, 0.5, 0] }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />
                
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-300 to-transparent"
                  initial={{ x: "-100%", opacity: 0 }}
                  animate={{ 
                    x: ["-100%", "0%", "100%"], 
                    opacity: [0, 0.9, 0.6, 0]
                  }}
                  transition={{ duration: 3, ease: [0.25, 0.1, 0.25, 1] }}
                />

                {/* Lightning bolts */}
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-yellow-300"
                    style={{
                      left: `${10 + (i * 9)}%`,
                      top: `${20 + (i % 3) * 25}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0], 
                      scale: [0, 1.5, 0],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ 
                      duration: 1.2, 
                      delay: i * 0.4,
                      ease: [0.68, -0.55, 0.265, 1.55] 
                    }}
                  >
                    ⚡
                  </motion.div>
                ))}
              </div>
            )}

            {/* Phase 3: Final design */}
            {rsoomPhase === 3 && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {/* Navigation and content from existing design */}
                <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6 z-20">
                  <div className="flex items-center space-x-8">
                    {['Home', 'Store', 'Customer Support', 'Careers', 'Contact'].map((item) => (
                      <span key={item} className="text-white text-sm cursor-pointer hover:text-yellow-200 transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                  <button className="bg-yellow-400 text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-yellow-300 transition-colors">
                    ihaaan
                  </button>
                </nav>

                <div className="h-full flex items-center justify-between px-16">
                  <div className="flex-1 max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                      Revolutionizing
                      <br />
                      <span className="text-yellow-200">Design</span> For The
                      <br />
                      Modern Era
                    </h1>
                    
                    <div className="flex gap-4 mt-8">
                      <Button 
                        className="bg-yellow-400 text-black px-8 py-3 rounded font-medium hover:bg-yellow-300 transition-colors"
                        onClick={() => window.open('https://rsoom.online', '_blank')}
                      >
                        See our revolutionary customer support system at first hand
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-yellow-400 text-yellow-400 px-8 py-3 rounded font-medium hover:bg-yellow-400 hover:text-black transition-colors"
                      >
                        Visit Store
                      </Button>
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-16">
                    <div className="border-4 border-yellow-200 rounded-2xl p-8 bg-black/50 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="text-yellow-200 text-4xl mb-4">
                          <svg className="w-24 h-24 mx-auto" viewBox="0 0 64 64" fill="currentColor">
                            <path d="M32 8C24.268 8 18 14.268 18 22c0 7.732 6.268 14 14 14s14-6.268 14-14c0-7.732-6.268-14-14-14zm0 24c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10z"/>
                            <path d="M48 40H16c-2.209 0-4 1.791-4 4v12c0 2.209 1.791 4 4 4h32c2.209 0 4-1.791 4-4V44c0-2.209-1.791-4-4-4zm-16 16c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/>
                          </svg>
                        </div>
                        <h2 className="text-yellow-200 text-2xl font-bold mb-2">RSOOM</h2>
                        <p className="text-yellow-200 text-lg">رسوم</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}