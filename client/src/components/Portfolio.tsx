import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import MoralityTransition from "./MoralityTransition";

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState(0); // 0: intro, 1: mechamorals, 2: rsoom, 3: rsoom-about
  const [typedText, setTypedText] = useState("");
  const [showSubtext, setShowSubtext] = useState(false);
  const [typedSubtext, setTypedSubtext] = useState("");
  const [rsoomPhase, setRsoomPhase] = useState(0);
  const [rsoomText1, setRsoomText1] = useState("");
  const [rsoomText2, setRsoomText2] = useState("");
  const [showMoralityInterface, setShowMoralityInterface] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'ai', text: string}>>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [robotLoaded, setRobotLoaded] = useState(false);
  const [canProceed, setCanProceed] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  
  const mainText = "Are you ready for our masterpieces?";
  const subText = "Scroll down to be blessed";
  const rsoomFirstText = "";
  const rsoomSecondText = "";
  
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
      if (currentSection === 1) {
        // Moving from mechamorals - show transition instead of going to rsoom
        setShowTransition(true);
        setCanProceed(false);
      } else {
        setCurrentSection(currentSection + 1);
        setCanProceed(false);
        
        if (currentSection === 2 && rsoomPhase === 3) {
          // Moving from rsoom to rsoom-about
          setTimeout(() => {
            setCanProceed(true);
          }, 1000);
        }
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

  // Rsoom sequence - directly show Morality AI interface
  const startRsoomSequence = () => {
    setShowMoralityInterface(true);
    // Start chat simulation after interface loads
    setTimeout(() => {
      startChatSimulation();
    }, 1000);
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
        setCurrentMessageIndex(index + 1);
        
        // Continue to next message
        setTimeout(() => {
          addMessage(index + 1);
        }, index === 1 ? 3000 : 2000); // Longer pause after AI's pricing response
      }, 1500);
    };
    
    addMessage(0);
  };

  const handleContinuePortfolio = () => {
    setShowMoralityInterface(false);
    setCurrentSection(2);
    // Skip directly to intense lightning animations
    setRsoomPhase(2);
    setTimeout(() => {
      setRsoomPhase(3);
      // Enable scrolling after RSOOM design loads
      setTimeout(() => {
        setCanProceed(true);
      }, 2000);
    }, 4000); // Shorter but intense animation period
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setShowMoralityInterface(true);
    // Start the chat simulation after interface appears
    setTimeout(() => {
      startChatSimulation();
    }, 500);
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

        {/* Section 2: Rsoom */}
        {currentSection === 2 && (
          <motion.section 
            key="rsoom"
            className="h-screen w-full bg-black relative absolute inset-0"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            {/* Phase 0: Initial typing */}
            {rsoomPhase === 0 && !showMoralityInterface && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center max-w-4xl px-8">
                  <motion.h1 
                    className="text-2xl md:text-4xl font-medium text-yellow-400"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {rsoomText1}
                    <span className="animate-pulse">|</span>
                  </motion.h1>
                </div>
              </div>
            )}

            {/* Morality AI Interface */}
            {showMoralityInterface && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-full max-w-4xl bg-black/90 backdrop-blur-sm rounded-2xl border border-gray-800 overflow-hidden flex flex-col h-[80vh]">
                  {/* Header */}
                  <div className="text-center py-8 px-8 border-b border-gray-800">
                    {/* Robot Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-black" viewBox="0 0 64 64" fill="currentColor">
                          <circle cx="32" cy="20" r="8"/>
                          <circle cx="24" cy="16" r="2"/>
                          <circle cx="40" cy="16" r="2"/>
                          <rect x="20" y="32" width="24" height="20" rx="4"/>
                          <circle cx="28" cy="40" r="2"/>
                          <circle cx="36" cy="40" r="2"/>
                          <rect x="30" y="46" width="4" height="3"/>
                        </svg>
                      </div>
                    </div>
                    
                    <h1 className="text-2xl font-bold text-white mb-2">Morality AI</h1>
                    <p className="text-gray-400 text-sm">Your guide to exploring the ethical dimensions of artificial intelligence</p>
                  </div>

                  {/* Chat Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {chatMessages.map((message, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === 'user' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-800 text-gray-100'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          {message.role === 'ai' && message.text.includes('pricing section') && (
                            <button 
                              onClick={() => window.scrollTo({ top: document.querySelector('#pricing')?.offsetTop || 0, behavior: 'smooth' })}
                              className="mt-2 text-blue-400 underline text-xs hover:text-blue-300 transition-colors"
                            >
                              → View Pricing Section
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-gray-800 text-gray-100 rounded-2xl px-4 py-3">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Options after chat completion */}
                  {showChatOptions && (
                    <motion.div 
                      className="p-6 border-t border-gray-800"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <p className="text-gray-300 text-center mb-4">What would you like to do next?</p>
                      <div className="flex gap-4 justify-center">
                        <a 
                          href="https://mechamorals.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors font-medium"
                        >
                          Discover Mechamorals
                        </a>
                        <button 
                          onClick={handleContinuePortfolio}
                          className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-colors font-medium"
                        >
                          Continue Portfolio
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Phase 1: Welcome to rsoom */}
            {rsoomPhase === 1 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center max-w-4xl px-8">
                  <motion.h1 
                    className="text-4xl md:text-6xl font-bold text-yellow-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: rsoomPhase === 2 ? 0 : 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {rsoomText2}
                    <span className="animate-pulse">|</span>
                  </motion.h1>
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

                {/* Intense Lightning bolts with more yellow dots */}
                {[...Array(25)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-yellow-300"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      fontSize: `${1 + Math.random() * 2}rem`,
                      filter: 'drop-shadow(0 0 8px rgba(253, 224, 71, 0.8))',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0.7, 1, 0], 
                      scale: [0, 2, 1.2, 2.5, 0],
                      rotate: [0, 15, -15, 10, 0],
                      x: [0, Math.random() * 100 - 50, Math.random() * 50 - 25, 0],
                      y: [0, Math.random() * 50 - 25, Math.random() * 30 - 15, 0]
                    }}
                    transition={{ 
                      duration: 0.8 + Math.random() * 0.6, 
                      delay: i * 0.1,
                      ease: [0.68, -0.55, 0.265, 1.55],
                      repeat: Infinity,
                      repeatDelay: Math.random() * 2
                    }}
                  >
                    ⚡
                  </motion.div>
                ))}
                
                {/* Additional yellow energy dots */}
                {[...Array(40)].map((_, i) => (
                  <motion.div
                    key={`dot-${i}`}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      boxShadow: '0 0 12px rgba(250, 204, 21, 0.9)',
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0.5, 1, 0], 
                      scale: [0, 1.5, 0.8, 2, 0],
                      x: [0, Math.random() * 200 - 100],
                      y: [0, Math.random() * 200 - 100]
                    }}
                    transition={{ 
                      duration: 1 + Math.random() * 1.5, 
                      delay: i * 0.05,
                      repeat: Infinity,
                      repeatDelay: Math.random() * 1.5
                    }}
                  />
                ))}
              </div>
            )}

            {/* Phase 3: New RSOOM Design */}
            {rsoomPhase === 3 && (
              <motion.div
                className="absolute inset-0 bg-black"
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
                      <button 
                        className="bg-yellow-400 text-black px-8 py-3 rounded font-medium hover:bg-yellow-300 transition-colors"
                        onClick={() => window.open('https://rsoom.online', '_blank')}
                      >
                        See our revolutionary customer support system at first hand
                      </button>
                      <button 
                        className="border border-yellow-400 text-yellow-400 px-8 py-3 rounded font-medium hover:bg-yellow-400 hover:text-black transition-colors"
                      >
                        Visit Store
                      </button>
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

                {/* Subtle yellow particles for enhanced experience */}
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                      style={{
                        left: `${15 + (i * 12)}%`,
                        top: `${25 + (i % 4) * 20}%`,
                      }}
                      animate={{
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.8, 1.2, 0.8],
                        y: [0, -10, 0],
                      }}
                      transition={{
                        duration: 3,
                        delay: i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                  
                  {/* Floating larger particles */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={`large-${i}`}
                      className="absolute w-2 h-2 bg-yellow-200/40 rounded-full"
                      style={{
                        left: `${20 + (i * 25)}%`,
                        top: `${30 + (i % 2) * 40}%`,
                      }}
                      animate={{
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.5, 1],
                        x: [0, 15, 0],
                        y: [0, -20, 0],
                      }}
                      transition={{
                        duration: 4,
                        delay: i * 1.2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  ))}
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <motion.div
                    className="text-yellow-400 text-center"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="text-sm mb-2">Scroll to learn more</div>
                    <div className="text-2xl">↓</div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.section>
        )}

        {/* Section 3: RSOOM About */}
        {currentSection === 3 && (
          <motion.section 
            key="rsoom-about"
            className="h-screen w-full bg-black absolute inset-0"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.8 }}
          >
            <div className="container mx-auto px-8 py-12 h-full flex flex-col">
              {/* Header with stats */}
              <div className="flex justify-between items-start mb-12">
                <div className="border-l-4 border-yellow-400 pl-6">
                  <h1 className="text-5xl font-bold text-white mb-2">
                    About <span className="text-yellow-400">RSOOM</span>
                  </h1>
                  <p className="text-gray-400 text-lg italic">Immersive Design. Real Results.</p>
                </div>
                
                <div className="flex gap-8">
                  <div className="text-center border border-gray-600 p-6 rounded-lg">
                    <div className="text-4xl font-bold text-white">95%</div>
                    <div className="text-gray-400 text-sm">RETURNING CLIENTS</div>
                  </div>
                  <div className="text-center border border-gray-600 p-6 rounded-lg">
                    <div className="text-4xl font-bold text-white">50+</div>
                    <div className="text-gray-400 text-sm">PROJECTS DELIVERED</div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 flex-1">
                {/* Left side - Description */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      Step into our interactive portfolio and discover how RSOOM brings bold visions to life. From sleek corporate sites to daring brand experiences, each project is a testament to our dedication to innovation, clarity, and performance.
                    </p>
                    
                    <p className="text-white font-semibold">
                      We don't just design — we transform.
                    </p>
                    
                    <p className="text-gray-300 leading-relaxed">
                      Every project solves real problems, sparks meaningful connections, and drives results.
                    </p>
                    
                    <p className="text-yellow-400 font-medium">
                      💡 Built with purpose. Backed by strategy. Designed to convert.
                    </p>
                  </div>

                  <div className="border-t border-gray-700 pt-6">
                    <h3 className="text-white font-semibold mb-3">Highlights</h3>
                    <ul className="text-gray-300 space-y-1">
                      <li>Optimized for SEO</li>
                      <li>5,000+ Monthly Site Viewers</li>
                    </ul>
                  </div>

                  <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
                    <p className="text-gray-300 text-center mb-4">
                      Ready to see what bold design can do for your brand?
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button className="bg-yellow-400 text-black px-6 py-2 rounded font-medium hover:bg-yellow-300 transition-colors">
                        Let's Talk
                      </button>
                      <button className="border border-gray-600 text-gray-300 px-6 py-2 rounded hover:bg-gray-800 transition-colors">
                        Browse Projects
                      </button>
                    </div>
                  </div>
                </div>

                {/* Right side - Philosophy */}
                <div className="space-y-6">
                  <div className="bg-yellow-400 text-black p-1 rounded-lg">
                    <div className="bg-black text-yellow-400 p-4 rounded-lg">
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <span>⚡</span> Our Design Philosophy
                      </h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✅</span>
                          <span className="text-gray-300">We design with intention — no fluff, no fillers.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✅</span>
                          <span className="text-gray-300">We balance bold aesthetics with seamless usability.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-400 mt-1">✅</span>
                          <span className="text-gray-300">We build lasting partnerships through exceptional results.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-gray-600 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-yellow-400">EST.</div>
                      <div className="text-white">2023</div>
                    </div>
                    <div className="border border-gray-600 p-4 rounded-lg text-center">
                      <div className="text-sm text-gray-400">FOCUS</div>
                      <div className="text-white font-medium">Results</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Morality AI Transition Screen */}
      <AnimatePresence>
        {showTransition && (
          <MoralityTransition onComplete={handleTransitionComplete} />
        )}
      </AnimatePresence>
    </div>
  );
}