import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState(0); // 0: intro, 1: rsoom, 2: mechamorals, 3: morality-ai, 4: simplephysics, 5: pifprep
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sectionProgress, setSectionProgress] = useState(0);
  
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

  // Track scroll progress for progress indicator
  useEffect(() => {
    const updateScrollProgress = () => {
      const totalSections = 6; // intro, rsoom, mechamorals, morality-ai, simplephysics, pifprep
      const sectionProgress = currentSection / (totalSections - 1);
      
      // Add micro-progress within current section based on time spent or interactions
      let microProgress = 0;
      
      if (currentSection === 0) {
        // Progress based on typing completion
        microProgress = (typedText.length / mainText.length) * 0.5 + 
                       (typedSubtext.length / subText.length) * 0.5;
      } else if (currentSection === 3) {
        // Progress based on chat completion in Morality AI
        microProgress = chatMessages.length / chatSequence.length;
      } else {
        // For other sections, progress gradually over time
        microProgress = canProceed ? 1 : 0.5;
      }
      
      const totalProgress = (sectionProgress + (microProgress / totalSections)) * 100;
      setScrollProgress(Math.min(totalProgress, 100));
      setSectionProgress(microProgress * 100);
    };

    updateScrollProgress();
  }, [currentSection, typedText, typedSubtext, chatMessages, canProceed]);

  // Handle proceeding to next section
  const proceedToNext = () => {
    if (canProceed) {
      if (currentSection === 0) {
        // Moving from intro to RSOOM first
        setCurrentSection(1);
        setCanProceed(false);
        // Show RSOOM text after a delay
        setTimeout(() => {
          setShowRsoomText(true);
          setTimeout(() => {
            setCanProceed(true);
          }, 2000);
        }, 1000);
      } else if (currentSection === 1) {
        // Moving from RSOOM to mechamorals
        setCurrentSection(2);
        setShowRsoomText(false);
        setCanProceed(false);
      } else if (currentSection === 2) {
        // Moving from mechamorals to morality AI
        setCurrentSection(3);
        setShowMoralityInterface(true);
        setCanProceed(false);
        // Start chat simulation after interface loads
        setTimeout(() => {
          startChatSimulation();
        }, 1000);
      } else if (currentSection === 3 && showMoralityInterface) {
        // Moving from Morality AI to Simple Physics
        setCurrentSection(4);
        setShowMoralityInterface(false);
        setCanProceed(false);
        setTimeout(() => {
          setCanProceed(true);
        }, 1000);
      } else if (currentSection === 4) {
        // Moving from Simple Physics to PIF Prep
        setCurrentSection(5);
        setCanProceed(false);
        setTimeout(() => {
          setCanProceed(true);
        }, 1000);
      } else if (currentSection === 5) {
        // Exit from PIF Prep back to beginning
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
        // Enable scrolling after all messages complete
        setTimeout(() => {
          setShowChatOptions(true);
          setCanProceed(true); // Enable scroll to next section
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
    // Moving from Morality AI to Simple Physics
    setCurrentSection(4);
    setShowMoralityInterface(false);
    setCanProceed(false);
    setTimeout(() => {
      setCanProceed(true);
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

        {/* Section 1: RSOOM */}
        {currentSection === 1 && (
          <motion.section 
            key="rsoom"
            className="h-screen w-full bg-black relative absolute inset-0 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            {/* Floating Particle Sticks Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 bg-gradient-to-b from-yellow-400/20 to-transparent"
                  style={{
                    height: Math.random() * 100 + 50,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, Math.random() * 10 - 5, 0],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {showRsoomText && (
              <motion.div
                className="min-h-screen px-8 py-12 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                {/* Header */}
                <motion.div
                  className="text-center mb-20"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <h1 className="text-6xl md:text-7xl font-bold text-yellow-400 mb-2 tracking-tight">
                    welcome to{" "}
                    <span className="relative inline-block">
                      rsoom
                      <motion.div
                        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-white via-yellow-400 to-white"
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
                  className="max-w-7xl mx-auto relative"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                >
                  {/* Glowing border effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-yellow-400/10 to-yellow-400/20 rounded-2xl blur-sm"></div>
                  
                  <div className="relative bg-black/40 backdrop-blur-sm border border-yellow-400/50 rounded-2xl p-10 mb-12 shadow-2xl">
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-yellow-400 rounded-tl-2xl"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-yellow-400 rounded-tr-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-yellow-400 rounded-bl-2xl"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-yellow-400 rounded-br-2xl"></div>

                    {/* Top Stats Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                      <motion.div
                        className="text-center group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2 }}
                      >
                        <div className="relative">
                          <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-3">
                            10,000+
                          </div>
                          <div className="absolute inset-0 text-5xl md:text-6xl font-bold text-yellow-400/20 blur-sm">
                            10,000+
                          </div>
                        </div>
                        <div className="text-gray-300 text-xl font-light tracking-wide">Site Views Achieved</div>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-3"></div>
                      </motion.div>
                      <motion.div
                        className="text-center group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.2 }}
                      >
                        <div className="relative">
                          <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-3">
                            95%
                          </div>
                          <div className="absolute inset-0 text-5xl md:text-6xl font-bold text-yellow-400/20 blur-sm">
                            95%
                          </div>
                        </div>
                        <div className="text-gray-300 text-xl font-light tracking-wide">Client Satisfaction</div>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-3"></div>
                      </motion.div>
                    </div>

                    {/* Three Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                      {/* SEO Optimization */}
                      <motion.div
                        className="text-center group relative"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.4 }}
                      >
                        <div className="relative mb-6">
                          <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-lg"></div>
                          <div className="relative bg-black/60 border border-yellow-400/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                            <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">SEO Optimization</h3>
                        <p className="text-gray-400 text-base leading-relaxed font-light">
                          Advanced SEO strategies including keyword optimization, meta tags, 
                          structured data, and performance optimization to boost search rankings and 
                          drive organic traffic.
                        </p>
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-4"></div>
                      </motion.div>

                      {/* Payment Processing */}
                      <motion.div
                        className="text-center group relative"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.6 }}
                      >
                        <div className="relative mb-6">
                          <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-lg"></div>
                          <div className="relative bg-black/60 border border-yellow-400/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                            <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">Payment Solutions</h3>
                        <p className="text-gray-400 text-base leading-relaxed font-light">
                          Secure payment gateways like Stripe and PayPal integration, enabling 
                          credit cards, digital wallets, and recurring subscriptions 
                          with enterprise-level security.
                        </p>
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-4"></div>
                      </motion.div>

                      {/* Admin System */}
                      <motion.div
                        className="text-center group relative"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 2.8 }}
                      >
                        <div className="relative mb-6">
                          <div className="absolute inset-0 bg-yellow-400/20 rounded-full blur-lg"></div>
                          <div className="relative bg-black/60 border border-yellow-400/30 rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                            <svg className="w-10 h-10 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-wide">Admin Dashboard</h3>
                        <p className="text-gray-400 text-base leading-relaxed font-light">
                          Custom-built admin panels with role-based access control, real-time analytics, 
                          content management capabilities, and comprehensive reporting tools for 
                          efficient business operations.
                        </p>
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-yellow-400 to-transparent mx-auto mt-4"></div>
                      </motion.div>
                    </div>
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
                    onClick={proceedToNext}
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black px-8 py-3 text-lg rounded-xl border-2 hover:shadow-lg hover:shadow-white/25 transition-all duration-300"
                  >
                    Continue Portfolio
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </motion.section>
        )}

        {/* Section 2: Mechamorals */}
        {currentSection === 2 && (
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
          </motion.section>
        )}

        {/* Section 3: Morality AI */}
        {currentSection === 3 && showMoralityInterface && (
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

                {/* Scroll Indicator - appears after chat completes */}
                {chatMessages.length >= chatSequence.length && !isTyping && canProceed && (
                  <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1 }}
                    onClick={proceedToNext}
                  >
                    <motion.div
                      className="flex flex-col items-center text-gray-400 hover:text-white transition-colors"
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


              </div>
            </motion.div>
          </motion.section>
        )}

        {/* Section 4: Simple Physics Online Classes */}
        {currentSection === 4 && (
          <motion.section 
            key="simplephysics"
            className="h-screen w-full bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative absolute inset-0 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="min-h-screen px-8 py-12 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Header */}
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                  Simple Physics
                </h1>
                <h2 className="text-3xl md:text-4xl font-semibold text-blue-200 mb-6">
                  Online Classes
                </h2>
                <p className="text-xl text-blue-100 mb-8">Educational Excellence in Physics Learning</p>
                <div className="w-32 h-1 bg-gradient-to-r from-blue-400 via-white to-purple-400 mx-auto"></div>
              </motion.div>

              {/* Main Content */}
              <motion.div
                className="max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-12 mb-12">
                  {/* Education Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.5 }}
                    >
                      <div className="text-4xl font-bold text-blue-300 mb-2">500+</div>
                      <div className="text-gray-200 text-sm">Students Taught</div>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.7 }}
                    >
                      <div className="text-4xl font-bold text-purple-300 mb-2">95%</div>
                      <div className="text-gray-200 text-sm">Success Rate</div>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.9 }}
                    >
                      <div className="text-4xl font-bold text-indigo-300 mb-2">50+</div>
                      <div className="text-gray-200 text-sm">Course Modules</div>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 2.1 }}
                    >
                      <div className="text-4xl font-bold text-cyan-300 mb-2">24/7</div>
                      <div className="text-gray-200 text-sm">Online Access</div>
                    </motion.div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.3 }}
                    >
                      <div className="w-16 h-16 bg-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C20.832 18.477 19.247 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Interactive Learning</h3>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        Comprehensive physics courses with interactive simulations and real-world examples
                      </p>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.5 }}
                    >
                      <div className="w-16 h-16 bg-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Progress Tracking</h3>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        Advanced student portal with progress tracking and personalized learning paths
                      </p>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.7 }}
                    >
                      <div className="w-16 h-16 bg-indigo-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Expert Tutors</h3>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        Qualified physics instructors with personalized one-on-one teaching support
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.9 }}
                >
                  <Button
                    onClick={proceedToNext}
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-3 text-lg rounded-xl border-2 transition-all duration-300"
                  >
                    Next Project
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.section>
        )}

        {/* Section 5: PIF Prep */}
        {currentSection === 5 && (
          <motion.section 
            key="pifprep"
            className="h-screen w-full bg-gradient-to-br from-green-700 via-emerald-800 to-teal-900 relative absolute inset-0 overflow-y-auto"
            initial={{ opacity: 0, rotateX: 45 }}
            animate={{ opacity: 1, rotateX: 0 }}
            exit={{ opacity: 0, rotateX: -45 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="min-h-screen px-8 py-12 relative z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              {/* Header */}
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                  PIF <span className="text-emerald-400">Prep</span>
                </h1>
                <p className="text-2xl text-emerald-200 mb-8">Excellence in Academic Preparation</p>
                <div className="w-32 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto"></div>
              </motion.div>

              {/* Main Content */}
              <motion.div
                className="max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <div className="bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-3xl p-12 mb-12">
                  {/* Academic Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.5 }}
                    >
                      <div className="text-4xl font-bold text-emerald-300 mb-2">1000+</div>
                      <div className="text-gray-200 text-sm">Students Prepared</div>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.7 }}
                    >
                      <div className="text-4xl font-bold text-teal-300 mb-2">98%</div>
                      <div className="text-gray-200 text-sm">Success Rate</div>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.9 }}
                    >
                      <div className="text-4xl font-bold text-green-300 mb-2">15+</div>
                      <div className="text-gray-200 text-sm">Subject Areas</div>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 2.1 }}
                    >
                      <div className="text-4xl font-bold text-cyan-300 mb-2">5+</div>
                      <div className="text-gray-200 text-sm">Years Experience</div>
                    </motion.div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.3 }}
                    >
                      <div className="w-16 h-16 bg-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Certified Programs</h3>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        Comprehensive preparation programs with industry-recognized certifications
                      </p>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.5 }}
                    >
                      <div className="w-16 h-16 bg-teal-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Performance Analytics</h3>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        Advanced tracking system with detailed performance analytics and progress reports
                      </p>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.7 }}
                    >
                      <div className="w-16 h-16 bg-green-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Expert Mentorship</h3>
                      <p className="text-gray-200 text-sm leading-relaxed">
                        Personalized mentorship from industry experts and experienced professionals
                      </p>
                    </motion.div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.9 }}
                >
                  <Button
                    onClick={proceedToNext}
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-teal-900 px-8 py-3 text-lg rounded-xl border-2 transition-all duration-300"
                  >
                    Back to Start
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Adaptive Scroll Progress Indicator */}
      <motion.div
        className="fixed top-1/2 right-8 transform -translate-y-1/2 z-50 hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <div className="flex flex-col items-center space-y-4">
          {/* Section Labels */}
          <div className="text-right text-xs text-gray-400 font-medium space-y-8">
            <div className={`transition-all duration-300 ${currentSection === 0 ? 'text-white font-bold' : ''}`}>
              Intro
            </div>
            <div className={`transition-all duration-300 ${currentSection === 1 ? 'text-yellow-400 font-bold' : ''}`}>
              RSOOM
            </div>
            <div className={`transition-all duration-300 ${currentSection === 2 ? 'text-green-400 font-bold' : ''}`}>
              Mechamorals
            </div>
            <div className={`transition-all duration-300 ${currentSection === 3 ? 'text-blue-400 font-bold' : ''}`}>
              Morality AI
            </div>
            <div className={`transition-all duration-300 ${currentSection === 4 ? 'text-purple-400 font-bold' : ''}`}>
              Simple Physics
            </div>
            <div className={`transition-all duration-300 ${currentSection === 5 ? 'text-emerald-400 font-bold' : ''}`}>
              PIF Prep
            </div>
          </div>

          {/* Progress Dots */}
          <div className="flex flex-col space-y-4">
            {[0, 1, 2, 3, 4, 5].map((section) => (
              <motion.div
                key={section}
                className="relative cursor-pointer"
                onClick={() => {
                  if (section <= currentSection || canProceed) {
                    setCurrentSection(section);
                    setCanProceed(true);
                  }
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Outer ring */}
                <div className={`w-4 h-4 rounded-full border-2 transition-all duration-500 ${
                  section <= currentSection 
                    ? 'border-white bg-white/20' 
                    : 'border-gray-500 bg-transparent'
                }`}>
                  {/* Inner dot */}
                  <motion.div
                    className={`w-2 h-2 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                      section === currentSection
                        ? getSectionColor(section)
                        : section < currentSection
                        ? 'bg-white'
                        : 'bg-transparent'
                    }`}
                    animate={{
                      scale: section === currentSection ? [1, 1.3, 1] : 1,
                    }}
                    transition={{
                      duration: 2,
                      repeat: section === currentSection ? Infinity : 0,
                    }}
                  />
                </div>

                {/* Progress arc for current section */}
                {section === currentSection && (
                  <motion.div
                    className="absolute inset-0 w-4 h-4"
                    initial={{ rotate: -90 }}
                    style={{
                      background: `conic-gradient(${getSectionColor(section)} ${sectionProgress}%, transparent ${sectionProgress}%)`,
                      borderRadius: '50%',
                      mask: 'radial-gradient(circle, transparent 40%, black 40%)',
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Overall Progress Bar */}
          <div className="w-1 h-32 bg-gray-700 rounded-full relative overflow-hidden">
            <motion.div
              className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-400 to-purple-400 rounded-full"
              style={{ height: `${scrollProgress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Progress Percentage */}
          <motion.div
            className="text-xs font-bold text-white bg-black/50 px-2 py-1 rounded"
            animate={{ scale: scrollProgress > 0 ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 0.5 }}
          >
            {Math.round(scrollProgress)}%
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

// Helper function to get section-specific colors
function getSectionColor(section: number): string {
  const colors = [
    'bg-white',        // Intro
    'bg-yellow-400',   // RSOOM
    'bg-green-400',    // Mechamorals
    'bg-blue-400',     // Morality AI
    'bg-purple-400',   // Simple Physics
    'bg-emerald-400',  // PIF Prep
  ];
  return colors[section] || 'bg-white';
}