import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CrypticLoadingScreenProps {
  isVisible: boolean;
  onComplete?: () => void;
  duration?: number;
}

const crypticCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':\",./<>?~`";

function generateRandomString(length: number): string {
  return Array.from({ length }, () => 
    crypticCharacters[Math.floor(Math.random() * crypticCharacters.length)]
  ).join("");
}

const glitchCharacters = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~";

export default function CrypticLoadingScreen({ 
  isVisible, 
  onComplete, 
  duration = 2500 
}: CrypticLoadingScreenProps) {
  const [crypticText, setCrypticText] = useState("");
  const [showReveal, setShowReveal] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [lineWidth, setLineWidth] = useState(96);

  // Fast cryptic animation
  useEffect(() => {
    if (!isVisible || showReveal) return;

    const interval = setInterval(() => {
      setCrypticText(generateRandomString(Math.floor(Math.random() * 12) + 8));
    }, 60); // Slower, ~16fps

    // Stop cryptic animation and start reveal after 1.5 seconds
    const revealTimer = setTimeout(() => {
      clearInterval(interval);
      setShowReveal(true);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(revealTimer);
    };
  }, [isVisible, showReveal]);

  // Reveal and fade sequence
  useEffect(() => {
    if (!showReveal) return;

    // Show reveal for 1 second, then start line animation and fade
    const revealTimer = setTimeout(() => {
      // Start line shrinking animation
      const lineAnimationInterval = setInterval(() => {
        setLineWidth(prev => {
          if (prev <= 0) {
            clearInterval(lineAnimationInterval);
            setFadeOut(true);
            // Complete after fade animation
            setTimeout(() => {
              onComplete?.();
            }, 400);
            return 0;
          }
          return prev - 3; // Shrink by 3px each frame
        });
      }, 16); // ~60fps
    }, 1000);

    return () => clearTimeout(revealTimer);
  }, [showReveal, onComplete]);



  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: fadeOut ? 0.4 : 0, ease: "easeOut" }}
        className="fixed inset-0 z-50 bg-gradient-to-br from-white via-gray-50 to-white flex items-center overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 50%, #ffffff 100%)'
        }}
      >
        {/* Subtle geometric accents */}
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="80" cy="20" r="1" fill="currentColor" />
            <circle cx="90" cy="40" r="0.5" fill="currentColor" />
            <circle cx="85" cy="60" r="0.8" fill="currentColor" />
            <line x1="75" y1="10" x2="95" y2="30" stroke="currentColor" strokeWidth="0.1" />
          </svg>
        </div>

        {/* Main content positioned mid-left */}
        <div className="relative ml-16 md:ml-24 lg:ml-32 z-10">
          {!showReveal ? (
            <>
              {/* Fast cryptic animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div 
                  className="text-4xl md:text-5xl lg:text-6xl text-black"
                  style={{
                    fontFamily: "'Canela', 'Playfair Display', 'Georgia', serif",
                    letterSpacing: '0.05em',
                    lineHeight: '0.8',
                    transform: 'scaleY(1.4)',
                    transformOrigin: 'center',
                    textShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    filter: 'contrast(1.1)'
                  }}
                >
                  {crypticText}
                </div>
              </motion.div>
            </>
          ) : (
            <>
              {/* Reveal phase with classy fonts */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl text-black mb-3 tracking-wide"
                  style={{ 
                    fontFamily: "'Canela', 'Playfair Display', 'Georgia', serif",
                    fontWeight: 400,
                    letterSpacing: '0.02em',
                    textShadow: '0 2px 4px rgba(0,0,0,0.08)',
                    background: 'linear-gradient(135deg, #000000 0%, #333333 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: fadeOut ? -30 : 0 
                  }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 0.1,
                    y: { duration: fadeOut ? 0.4 : 0.6 }
                  }}
                >
                  WebNova Solutions
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    y: fadeOut ? -20 : 0 
                  }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.3,
                    y: { duration: fadeOut ? 0.4 : 0.5 }
                  }}
                >
                  <p 
                    className="text-gray-500 text-lg md:text-xl mb-4"
                    style={{ 
                      fontFamily: "'Canela', 'Playfair Display', 'Georgia', serif",
                      fontWeight: 300,
                      letterSpacing: '0.02em',
                      color: '#6b7280',
                      textShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}
                  >
                    an agency built on excellence
                  </p>
                  <motion.div
                    className="h-px transition-all duration-75 ease-out"
                    style={{ 
                      width: `${lineWidth}px`,
                      background: 'linear-gradient(90deg, #000000 0%, #666666 50%, #000000 100%)',
                      boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                    }}
                    initial={{ width: 0 }}
                    animate={{ 
                      width: 96,
                      y: fadeOut ? -10 : 0
                    }}
                    transition={{ 
                      width: { duration: 0.6, delay: 0.5 },
                      y: { duration: fadeOut ? 0.4 : 0 }
                    }}
                  />
                </motion.div>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}