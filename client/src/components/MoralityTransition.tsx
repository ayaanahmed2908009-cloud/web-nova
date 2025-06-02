import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MoralityTransitionProps {
  onComplete: () => void;
}

const crypticChars = "!@#$%^&*()_+-=[]{}|;:,.<>?~`";

export default function MoralityTransition({ onComplete }: MoralityTransitionProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDecoding, setIsDecoding] = useState(false);
  const [showFinalText, setShowFinalText] = useState(false);

  const targetText = "MECHAMORALS";

  useEffect(() => {
    // Start with cryptic characters
    let crypticIteration = 0;
    const crypticInterval = setInterval(() => {
      setDisplayText(
        targetText
          .split("")
          .map(() => crypticChars[Math.floor(Math.random() * crypticChars.length)])
          .join("")
      );

      crypticIteration++;
      if (crypticIteration >= 15) {
        clearInterval(crypticInterval);
        setIsDecoding(true);
        
        // Decode to target text
        let decodeIteration = 0;
        const decodeInterval = setInterval(() => {
          setDisplayText(
            targetText
              .split("")
              .map((letter, index) => {
                if (index < decodeIteration) {
                  return targetText[index];
                }
                return crypticChars[Math.floor(Math.random() * crypticChars.length)];
              })
              .join("")
          );

          decodeIteration++;
          if (decodeIteration >= targetText.length) {
            clearInterval(decodeInterval);
            setDisplayText(targetText);
            
            // Show final text after decode
            setTimeout(() => {
              setShowFinalText(true);
            }, 500);
            
            // Complete transition
            setTimeout(() => {
              onComplete();
            }, 2500);
          }
        }, 80);
      }
    }, 100);

    return () => {
      clearInterval(crypticInterval);
    };
  }, [onComplete, targetText]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      {/* Main cryptic text */}
      <div className="text-center">
        <motion.h1 
          className="text-6xl md:text-8xl font-mono text-white tracking-widest mb-8"
          animate={{ 
            opacity: isDecoding ? [1, 0.8, 1] : 1,
            scale: isDecoding ? [1, 1.05, 1] : 1
          }}
          transition={{ duration: 0.3, repeat: isDecoding ? Infinity : 0 }}
        >
          {displayText}
        </motion.h1>
        
        {/* Final text overlay */}
        <AnimatePresence>
          {showFinalText && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-white/80 font-light tracking-wide"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Welcome to Morality AI
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}