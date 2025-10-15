import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CrypticLoadingScreenProps {
  isVisible: boolean;
  onComplete?: () => void;
  duration?: number;
}

const crypticCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const elegantSymbols = "·•‧∙⁎⁺⁻⁼⁽⁾∣∤∥∦∧∨∩∪∫∮∞∴∵∶∷≈≠≤≥⊂⊃⊆⊇⊕⊗⊥⊿";

function generateRandomString(length: number): string {
  const useSymbols = Math.random() < 0.3; // 30% chance for elegant symbols
  const chars = useSymbols ? elegantSymbols : crypticCharacters;
  
  return Array.from({ length }, () => 
    chars[Math.floor(Math.random() * chars.length)]
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

    let frameCount = 0;
    const interval = setInterval(() => {
      // Gradually decrease string length as animation progresses
      const progress = frameCount / 25; // 25 frames total (1.5 seconds)
      const baseLength = Math.max(4, 12 - Math.floor(progress * 8));
      const length = baseLength + Math.floor(Math.random() * 4);
      
      setCrypticText(generateRandomString(length));
      frameCount++;
    }, 100); // Slower, more elegant pace

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
          background: 'radial-gradient(ellipse at center, #ffffff 0%, #f8f9fa 40%, #ffffff 100%)'
        }}
      >
        {/* Elegant floating elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-2 h-2 bg-gray-300 rounded-full opacity-20"
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/5 w-1 h-12 bg-gray-200 opacity-15"
          animate={{
            scaleY: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />

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
                <motion.div 
                  className="text-4xl md:text-5xl lg:text-6xl text-black"
                  style={{
                    fontFamily: "'Canela', 'Playfair Display', 'Georgia', serif",
                    letterSpacing: '0.08em',
                    lineHeight: '0.9',
                    transform: 'scaleY(1.3)',
                    transformOrigin: 'center',
                    textShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    filter: 'contrast(1.05) brightness(1.02)',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}
                  animate={{
                    opacity: [0.7, 1, 0.8, 1],
                    scale: [1, 1.005, 1]
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {crypticText}
                </motion.div>
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