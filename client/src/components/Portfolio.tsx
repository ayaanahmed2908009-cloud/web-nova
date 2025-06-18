import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState(0); // 0: intro, 1: mechamorals, 2: morality-ai, 3: rsoom
  const [typedText, setTypedText] = useState("");
  const [showSubtext, setShowSubtext] = useState(false);
  const [typedSubtext, setTypedSubtext] = useState("");
  const [showMoralityInterface, setShowMoralityInterface] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'ai', text: string}>>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [robotLoaded, setRobotLoaded] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [showRsoomText, setShowRsoomText] = useState(false);
  
  const mainText = "Are you ready for our masterpieces?";
  const subText = "Scroll down to be blessed";
  
  const chatSequence = [
    { role: 'user' as const, text: "How can I get an AI chatbot just like Morality AI in my website?" },
    { role: 'ai' as const, text: "Look no further! WebNova Solutions can incorporate an AI chatbot for you with an extra cost of just $30 ($10 monthly). Check out our pricing section for more details!" },
    { role: 'user' as const, text: "That's amazing, thank you!" },
    { role: 'ai' as const, text: "No worries, any time! Would you like to discover more about Morality AI or continue with our portfolio?" }
  ];

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

  // Subtext typing animation
  useEffect(() => {
    if (showSubtext) {
      let currentIndex = 0;
      const subtextInterval = setInterval(() => {
        if (currentIndex <= subText.length) {
          setTypedSubtext(subText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(subtextInterval);
          setTimeout(() => {
            setCanProceed(true);
          }, 500);
        }
      }, 60);

      return () => clearInterval(subtextInterval);
    }
  }, [showSubtext]);

  // Handle proceeding to next section
  const proceedToNext = () => {
    if (canProceed) {
      if (currentSection === 0) {
        setCurrentSection(1);
        setCanProceed(false);
      } else if (currentSection === 1) {
        // Moving from mechamorals directly to morality AI
        setCurrentSection(2);
        setShowMoralityInterface(true);
        setCanProceed(false);
        // Start chat simulation after interface loads
        setTimeout(() => {
          startChatSimulation();
        }, 1000);
      } else if (currentSection === 2 && showMoralityInterface) {
        // Moving from Morality AI to RSOOM
        setCurrentSection(3);
        setShowMoralityInterface(false);
        setCanProceed(false);
        // Show RSOOM text after a delay
        setTimeout(() => {
          setShowRsoomText(true);
          setTimeout(() => {
            setCanProceed(true);
          }, 2000);
        }, 1000);
      } else if (currentSection === 3) {
        // Exit from RSOOM back to beginning
        setCurrentSection(0);
        setShowRsoomText(false);
        setChatMessages([]);
        setCurrentMessageIndex(0);
        setShowChatOptions(false);
        setCanProceed(true);
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

  // Chat simulation function
  const startChatSimulation = () => {
    setCurrentMessageIndex(0);
    setChatMessages([]);
    
    const addMessage = (index: number) => {
      if (index >= chatSequence.length) {
        // Show options after all messages
        setTimeout(() => {
          setShowChatOptions(true);
        }, 1000);
        return;
      }
      
      setIsTyping(true);
      
      setTimeout(() => {
        setChatMessages(prev => [...prev, chatSequence[index]]);
        setIsTyping(false);
        
        setTimeout(() => {
          addMessage(index + 1);
        }, 1500);
      }, 1000);
    };
    
    addMessage(0);
  };

  const handleContinuePortfolio = () => {
    // Moving from Morality AI to RSOOM
    setCurrentSection(3);
    setShowMoralityInterface(false);
    setCanProceed(false);
    // Show RSOOM text after a delay
    setTimeout(() => {
      setShowRsoomText(true);
      setTimeout(() => {
        setCanProceed(true);
      }, 2000);
    }, 1000);
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
            exit={{ opacity: 0, scale: 0.8 }}
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

        {/* Section 2: Morality AI */}
        {currentSection === 2 && showMoralityInterface && (
          <motion.section 
            key="morality-ai"
            className="h-screen w-full bg-black relative absolute inset-0"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            {/* Morality AI Interface */}
            <motion.div 
              className="absolute inset-0 flex items-center justify-center p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full max-w-4xl bg-black/90 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden flex flex-col h-[80vh]">
                {/* Header */}
                <div className="text-center py-8 px-8 border-b border-gray-800">
                  {/* Robot Icon */}
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-black" viewBox="0 0 64 64" fill="currentColor">
                        <circle cx="32" cy="20" r="8"/>
                        <rect x="28" y="32" width="8" height="20" rx="2"/>
                        <circle cx="24" cy="18" r="2"/>
                        <circle cx="40" cy="18" r="2"/>
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Morality AI</h2>
                  <p className="text-gray-400">Your ethical AI companion</p>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {chatMessages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.role === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-700 text-gray-100'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-gray-700 px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                          />
                          <motion.div
                            className="w-2 h-2 bg-gray-400 rounded-full"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Chat Options */}
                {showChatOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 border-t border-gray-800"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        onClick={() => window.open('https://mechamorals.vercel.app/', '_blank')}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Discover More About Morality AI
                      </Button>
                      <Button
                        onClick={handleContinuePortfolio}
                        variant="outline"
                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        Continue Portfolio
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </motion.section>
        )}

        {/* Section 3: RSOOM */}
        {currentSection === 3 && (
          <motion.section 
            key="rsoom"
            className="h-screen w-full bg-black relative absolute inset-0 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {showRsoomText && (
              <motion.div
                className="min-h-screen px-8 py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {/* Header */}
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-2">
                    welcome to{" "}
                    <span className="relative inline-block">
                      rsoom
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-white"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        style={{ originX: 0 }}
                      />
                    </span>
                  </h1>
                </motion.div>

                {/* Yellow Frame Container */}
                <motion.div
                  className="max-w-6xl mx-auto border-2 border-yellow-400 rounded-lg p-8 mb-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  {/* Top Stats Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2 }}
                    >
                      <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">10,000+</div>
                      <div className="text-gray-300 text-lg">Site Views Achieved</div>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.2 }}
                    >
                      <div className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2">95%</div>
                      <div className="text-gray-300 text-lg">Client Satisfaction</div>
                    </motion.div>
                  </div>

                  {/* Three Columns */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* SEO Optimization */}
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.4 }}
                    >
                      <div className="mb-4">
                        <svg className="w-16 h-16 mx-auto text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">SEO Optimization</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        We implement advanced SEO strategies including keyword optimization, meta tags, 
                        structured data, and performance optimization to boost your search rankings and 
                        drive organic traffic to your website.
                      </p>
                    </motion.div>

                    {/* Payment Processing */}
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.6 }}
                    >
                      <div className="mb-4">
                        <svg className="w-16 h-16 mx-auto text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Payment Solutions</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        We integrate secure payment gateways like Stripe and PayPal, enabling your 
                        business to accept credit cards, digital wallets, and recurring subscriptions 
                        with enterprise-level security and compliance.
                      </p>
                    </motion.div>

                    {/* Admin System */}
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.8 }}
                    >
                      <div className="mb-4">
                        <svg className="w-16 h-16 mx-auto text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                          <path d="M9 11H7v6h2v-6zm4 0h-2v6h2v-6zm4 0h-2v6h2v-6z"/>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Admin Dashboard</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Custom-built admin panels with role-based access control, real-time analytics, 
                        content management capabilities, and comprehensive reporting tools to manage 
                        your business operations efficiently.
                      </p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Navigation Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 3 }}
                >
                  <Button
                    onClick={() => window.open('https://rsoom.online/', '_blank')}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 text-lg"
                  >
                    Discover RSOOM
                  </Button>
                  <Button
                    onClick={proceedToNext}
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg"
                  >
                    Continue Portfolio
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}