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
      setCrypticText(generateRandomString(Math.floor(Math.random() * 15) + 5));
    }, 50); // Very fast, 20fps

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
        className="fixed inset-0 z-50 bg-white flex items-center overflow-hidden"
      >
        {/* Main content positioned mid-left */}
        <div className="relative ml-16 md:ml-24 lg:ml-32">
          {!showReveal ? (
            <>
              {/* Fast cryptic animation */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div className="font-mono text-2xl md:text-3xl tracking-wider text-black">
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
                    fontFamily: "'Playfair Display', 'Georgia', serif",
                    fontWeight: 400,
                    letterSpacing: '0.02em'
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  WebNova Solutions
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <p 
                    className="text-gray-600 text-lg md:text-xl mb-4"
                    style={{ 
                      fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
                      fontWeight: 300,
                      letterSpacing: '0.01em'
                    }}
                  >
                    an agency built on excellence
                  </p>
                  <motion.div
                    className="h-px bg-black transition-all duration-75 ease-out"
                    style={{ width: `${lineWidth}px` }}
                    initial={{ width: 0 }}
                    animate={{ width: 96 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
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