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
  const [startFadeTransition, setStartFadeTransition] = useState(false);

  const targetText = "MORALITY AI";

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
            
            // Start fade transition
            setTimeout(() => {
              setStartFadeTransition(true);
            }, 800);
            
            // Complete transition
            setTimeout(() => {
              onComplete();
            }, 2800);
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
      <motion.div
        className="text-center"
        animate={startFadeTransition ? {
          scale: 0.3,
          x: "-45vw",
          y: "-40vh",
          opacity: 0.6
        } : {}}
        transition={{ 
          duration: 2, 
          ease: [0.16, 1, 0.3, 1] 
        }}
      >
        <motion.h1 
          className="text-6xl md:text-8xl font-mono text-white tracking-widest mb-8"
          animate={{ 
            opacity: isDecoding ? [1, 0.8, 1] : startFadeTransition ? 0.4 : 1,
            scale: isDecoding ? [1, 1.05, 1] : 1
          }}
          transition={{ duration: 0.3, repeat: isDecoding ? Infinity : 0 }}
        >
          {displayText}
        </motion.h1>
      </motion.div>

      {/* Background fade overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: startFadeTransition ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      />
    </motion.div>
  );
}