import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState(0); // 0: intro, 1: mechamorals, 2: morality-ai, 3: rsoom, 4: techwave, 5: nexusmart
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
        // Moving from RSOOM to TechWave
        setCurrentSection(4);
        setShowRsoomText(false);
        setCanProceed(false);
        setTimeout(() => {
          setCanProceed(true);
        }, 1000);
      } else if (currentSection === 4) {
        // Moving from TechWave to NexusMart
        setCurrentSection(5);
        setCanProceed(false);
        setTimeout(() => {
          setCanProceed(true);
        }, 1000);
      } else if (currentSection === 5) {
        // Exit from NexusMart back to beginning
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
              
              {/* Additional diagonal particles */}
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={`diag-${i}`}
                  className="absolute w-0.5 bg-gradient-to-r from-yellow-400/10 to-transparent"
                  style={{
                    width: Math.random() * 80 + 40,
                    height: '1px',
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: Math.random() * 6 + 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: Math.random() * 3,
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
                    onClick={() => window.open('https://rsoom.online/', '_blank')}
                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-yellow-400/25 transition-all duration-300"
                  >
                    Discover RSOOM
                  </Button>
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

        {/* Section 4: TechWave Digital Solutions */}
        {currentSection === 4 && (
          <motion.section 
            key="techwave"
            className="h-screen w-full bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative absolute inset-0 overflow-y-auto"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

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
                <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                  Tech<span className="text-blue-400">Wave</span>
                </h1>
                <p className="text-2xl text-blue-200 mb-8">Digital Solutions Platform</p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
              </motion.div>

              {/* Main Content */}
              <motion.div
                className="max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <div className="bg-white/10 backdrop-blur-sm border border-blue-400/30 rounded-3xl p-12 mb-12">
                  {/* Stats Row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.5 }}
                    >
                      <div className="text-4xl font-bold text-blue-400 mb-2">50+</div>
                      <div className="text-gray-300">Tech Solutions</div>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.7 }}
                    >
                      <div className="text-4xl font-bold text-purple-400 mb-2">24/7</div>
                      <div className="text-gray-300">Support System</div>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.9 }}
                    >
                      <div className="text-4xl font-bold text-indigo-400 mb-2">99.9%</div>
                      <div className="text-gray-300">Uptime Reliability</div>
                    </motion.div>
                  </div>

                  {/* Features Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 2.1 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">Advanced CRM</h3>
                          <p className="text-gray-300">Customer relationship management with AI insights</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">Analytics Dashboard</h3>
                          <p className="text-gray-300">Real-time business intelligence and reporting</p>
                        </div>
                      </div>
                    </motion.div>
                    <motion.div
                      className="space-y-4"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 2.3 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">Enterprise Security</h3>
                          <p className="text-gray-300">Bank-level encryption and security protocols</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white">Lightning Fast</h3>
                          <p className="text-gray-300">Optimized performance and quick load times</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <motion.div
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 2.5 }}
                >
                  <Button
                    onClick={() => window.open('https://techwave-demo.vercel.app/', '_blank')}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    Visit TechWave
                  </Button>
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

        {/* Section 5: NexusMart E-commerce */}
        {currentSection === 5 && (
          <motion.section 
            key="nexusmart"
            className="h-screen w-full bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 relative absolute inset-0 overflow-y-auto"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            exit={{ opacity: 0, rotateY: -90 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>

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
                <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
                  Nexus<span className="text-emerald-400">Mart</span>
                </h1>
                <p className="text-2xl text-emerald-200 mb-8">Next-Gen E-commerce Platform</p>
                <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 mx-auto"></div>
              </motion.div>

              {/* Main Content */}
              <motion.div
                className="max-w-6xl mx-auto"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <div className="bg-white/10 backdrop-blur-sm border border-emerald-400/30 rounded-3xl p-12 mb-12">
                  {/* E-commerce Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.5 }}
                    >
                      <div className="text-3xl font-bold text-emerald-400 mb-2">15K+</div>
                      <div className="text-gray-300 text-sm">Products</div>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.7 }}
                    >
                      <div className="text-3xl font-bold text-cyan-400 mb-2">5M+</div>
                      <div className="text-gray-300 text-sm">Transactions</div>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 1.9 }}
                    >
                      <div className="text-3xl font-bold text-teal-400 mb-2">98%</div>
                      <div className="text-gray-300 text-sm">Satisfaction</div>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: 2.1 }}
                    >
                      <div className="text-3xl font-bold text-green-400 mb-2">2.5s</div>
                      <div className="text-gray-300 text-sm">Load Time</div>
                    </motion.div>
                  </div>

                  {/* E-commerce Features */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.3 }}
                    >
                      <div className="w-16 h-16 bg-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5l2.5 5m0 0l2.5-5M19 13h-6" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Smart Cart</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        AI-powered shopping cart with personalized recommendations and smart bundling
                      </p>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.5 }}
                    >
                      <div className="w-16 h-16 bg-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Secure Payments</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Multiple payment gateways with fraud detection and PCI compliance
                      </p>
                    </motion.div>
                    <motion.div
                      className="text-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 2.7 }}
                    >
                      <div className="w-16 h-16 bg-teal-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3">Analytics Pro</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        Advanced sales analytics with revenue tracking and customer insights
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
                    onClick={() => window.open('https://nexusmart-ecommerce.vercel.app/', '_blank')}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                  >
                    Explore NexusMart
                  </Button>
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
    </div>
  );
}