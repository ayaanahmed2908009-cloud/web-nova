import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Portfolio() {
  const [currentSection, setCurrentSection] = useState(0); // 0: intro, 1: mechamorals, 2: morality-ai, 3: rsoom
  const [typedText, setTypedText] = useState("");
  const [showSubtext, setShowSubtext] = useState(false);
  const [typedSubtext, setTypedSubtext] = useState("");
  const [rsoomPhase, setRsoomPhase] = useState(0);
  const [rsoomText1, setRsoomText1] = useState("");
  const [rsoomText2, setRsoomText2] = useState("");
  const [showMoralityInterface, setShowMoralityInterface] = useState(false);
  const [showMoralityTitle, setShowMoralityTitle] = useState(false);
  const [titleAnimationComplete, setTitleAnimationComplete] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'ai', text: string}>>([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showChatOptions, setShowChatOptions] = useState(false);
  const [robotLoaded, setRobotLoaded] = useState(false);
  const [canProceed, setCanProceed] = useState(false);

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
        // Move to Morality AI section with title animation
        setCurrentSection(2);
        setCanProceed(false);
        // Show the title animation first
        setTimeout(() => {
          setShowMoralityTitle(true);
        }, 500);
        // After title animation, show interface and start chat
        setTimeout(() => {
          setTitleAnimationComplete(true);
          setShowMoralityInterface(true);
          setTimeout(() => {
            startChatSimulation();
          }, 500);
        }, 3000);
      } else {
        setCurrentSection(currentSection + 1);
        setCanProceed(false);
        
        if (currentSection === 2) {
          // Moving from morality AI to rsoom
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
    setCurrentSection(3);
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
        {currentSection === 2 && (
          <motion.section 
            key="morality-ai"
            className="h-screen w-full bg-gradient-to-br from-gray-50 to-gray-100 relative absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Morality AI Title Animation */}
            {showMoralityTitle && !titleAnimationComplete && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.h1 
                  className="text-6xl md:text-8xl font-bold text-gray-900 tracking-wide"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    opacity: titleAnimationComplete ? 0.6 : 1,
                    x: titleAnimationComplete ? -200 : 0,
                    y: titleAnimationComplete ? -150 : 0,
                    fontSize: titleAnimationComplete ? "2rem" : "6rem",
                  }}
                  transition={{ 
                    duration: 1.5,
                    x: { delay: 1.5, duration: 1 },
                    y: { delay: 1.5, duration: 1 },
                    fontSize: { delay: 1.5, duration: 1 },
                  }}
                >
                  Morality AI
                </motion.h1>
              </motion.div>
            )}

            {/* Modern ChatGPT-like Interface */}
            {showMoralityInterface && (
              <motion.div 
                className="absolute inset-0 flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Header with Morality AI title positioned in top left */}
                {titleAnimationComplete && (
                  <motion.div 
                    className="absolute top-6 left-8 z-10"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <h1 className="text-2xl font-bold text-gray-900">Morality AI</h1>
                  </motion.div>
                )}

                {/* Main chat container - centered like ChatGPT */}
                <div className="flex-1 flex items-center justify-center p-6">
                  <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[75vh]">
                    
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                      {chatMessages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`flex items-start space-x-3 max-w-[85%] ${
                            message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                          }`}>
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                              message.role === 'user' 
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                                : 'bg-gradient-to-r from-gray-700 to-gray-900'
                            }`}>
                              {message.role === 'user' ? 'U' : 'AI'}
                            </div>
                            
                            {/* Message bubble */}
                            <div className={`rounded-2xl px-4 py-3 ${
                              message.role === 'user' 
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                                : 'bg-gray-50 text-gray-800 border border-gray-200'
                            }`}>
                              <p className="text-sm leading-relaxed">{message.text}</p>
                              {message.role === 'ai' && message.text.includes('pricing section') && (
                                <button 
                                  onClick={() => {
                                    const pricingElement = document.querySelector('#pricing') as HTMLElement;
                                    if (pricingElement) {
                                      window.scrollTo({ top: pricingElement.offsetTop, behavior: 'smooth' });
                                    }
                                  }}
                                  className="mt-3 text-blue-600 hover:text-blue-700 underline text-xs font-medium transition-colors flex items-center space-x-1"
                                >
                                  <span>→ View Pricing Section</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                      
                      {isTyping && (
                        <motion.div 
                          className="flex justify-start"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 flex items-center justify-center text-white text-sm font-medium">
                              AI
                            </div>
                            <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3">
                              <div className="flex space-x-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Input area (disabled/read-only for demo) */}
                    <div className="border-t border-gray-200 p-4">
                      <div className="bg-gray-50 rounded-xl px-4 py-3 text-gray-400 text-sm">
                        This is a demo conversation...
                      </div>
                    </div>
                  </div>
                </div>

                {/* Options after chat completion */}
                {showChatOptions && (
                  <motion.div 
                    className="absolute bottom-6 left-1/2 transform -translate-x-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                      <p className="text-gray-700 text-center mb-4 font-medium">What would you like to do next?</p>
                      <div className="flex gap-4 justify-center">
                        <a 
                          href="https://mechamorals.com" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all font-medium shadow-md hover:shadow-lg"
                        >
                          Discover Mechamorals
                        </a>
                        <button 
                          onClick={handleContinuePortfolio}
                          className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-xl transition-colors font-medium shadow-md hover:shadow-lg"
                        >
                          Continue Portfolio
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}