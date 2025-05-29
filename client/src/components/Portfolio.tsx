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
  
  const mainText = "Are you ready for our masterpieces?";
  const subText = "Scroll down to be blessed";
  const rsoomFirstText = "Sure isn't as flashy but our next website showcase gets the job done";
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
                // Wait 2 seconds, then fade out and start second message
                setTimeout(() => {
                  setRsoomPhase(1);
                  setRsoomText1("");
                  
                  // Phase 2: Type second message
                  setTimeout(() => {
                    let currentIndex2 = 0;
                    const typeInterval2 = setInterval(() => {
                      if (currentIndex2 <= rsoomSecondText.length) {
                        setRsoomText2(rsoomSecondText.slice(0, currentIndex2));
                        currentIndex2++;
                      } else {
                        clearInterval(typeInterval2);
                        // Wait 2 seconds, then start animations
                        setTimeout(() => {
                          setRsoomPhase(2);
                          setRsoomText2("");
                          // Wait for animations, then show final design
                          setTimeout(() => {
                            setRsoomPhase(3);
                          }, 3000);
                        }, 2000);
                      }
                    }, 80);
                  }, 500);
                }, 2000);
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

  return (
    <div className="portfolio-container snap-y snap-mandatory h-screen overflow-y-scroll">
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
          />
        </div>
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
                  className="text-3xl md:text-5xl font-bold text-yellow-400"
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

        {/* Phase 2: Blue animation and lightning bolts */}
        {rsoomPhase === 2 && (
          <div className="absolute inset-0">
            {/* Blue wave animation */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "100%", opacity: [0, 0.7, 0] }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            {/* Lightning bolts */}
            <motion.div
              className="absolute top-1/4 left-1/4 text-yellow-300 text-6xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              ⚡
            </motion.div>
            <motion.div
              className="absolute top-1/3 right-1/3 text-yellow-300 text-4xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0] }}
              transition={{ duration: 0.4, delay: 1 }}
            >
              ⚡
            </motion.div>
            <motion.div
              className="absolute bottom-1/3 left-1/3 text-yellow-300 text-5xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.3, 0] }}
              transition={{ duration: 0.35, delay: 1.5 }}
            >
              ⚡
            </motion.div>
            <motion.div
              className="absolute top-1/2 right-1/4 text-yellow-300 text-3xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 0.3, delay: 2 }}
            >
              ⚡
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
            {/* Navigation bar */}
            <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6 z-20">
              <div className="flex items-center space-x-8">
                <span className="text-white text-sm">Home</span>
                <span className="text-white text-sm">Store</span>
                <span className="text-white text-sm">Customer Support</span>
                <span className="text-white text-sm">Careers</span>
                <span className="text-white text-sm">Contact</span>
              </div>
              <button className="bg-yellow-400 text-black px-6 py-2 rounded-full text-sm font-medium">
                ihaaan
              </button>
            </nav>

            {/* Main content */}
            <div className="h-full flex items-center justify-between px-16">
              {/* Left side - Main text */}
              <div className="flex-1 max-w-2xl">
                <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                  Revolutionizing
                  <br />
                  <span className="text-yellow-400">Design</span> For The
                  <br />
                  Modern Era
                </h1>
                
                <div className="flex gap-4 mt-8">
                  <button className="bg-yellow-400 text-black px-8 py-3 rounded font-medium">
                    Get Started
                  </button>
                  <button className="border border-yellow-400 text-yellow-400 px-8 py-3 rounded font-medium hover:bg-yellow-400 hover:text-black transition-colors">
                    Visit Store
                  </button>
                </div>
              </div>

              {/* Right side - rsoom logo card */}
              <div className="flex-shrink-0 ml-16">
                <div className="border-2 border-yellow-400 rounded-2xl p-8 bg-black/50 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-yellow-400 text-4xl mb-4">
                      <svg className="w-16 h-16 mx-auto" viewBox="0 0 64 64" fill="currentColor">
                        <path d="M32 8C24.268 8 18 14.268 18 22c0 7.732 6.268 14 14 14s14-6.268 14-14c0-7.732-6.268-14-14-14zm0 24c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10z"/>
                        <path d="M48 40H16c-2.209 0-4 1.791-4 4v12c0 2.209 1.791 4 4 4h32c2.209 0 4-1.791 4-4V44c0-2.209-1.791-4-4-4zm-16 16c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"/>
                      </svg>
                    </div>
                    <h2 className="text-yellow-400 text-2xl font-bold mb-2">RSOOM</h2>
                    <p className="text-yellow-400 text-lg">رسوم</p>
                  </div>
                </div>
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