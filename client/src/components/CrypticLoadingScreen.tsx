import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DecryptedText from "./DecryptedText";

interface CrypticLoadingScreenProps {
  isVisible: boolean;
  onComplete?: () => void;
  duration?: number;
}

const elegantCrypticChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz·•‧∙⁎⁺⁻⁼⁽⁾∣∤∥∦∧∨∩∪∫∮∞∴∵∶∷≈≠≤≥⊂⊃⊆⊇⊕⊗⊥⊿";

const glitchCharacters = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~";

export default function CrypticLoadingScreen({ 
  isVisible, 
  onComplete, 
  duration = 2500 
}: CrypticLoadingScreenProps) {
  const [showReveal, setShowReveal] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  // Handle animation phases
  useEffect(() => {
    if (!isVisible) return;

    // Start reveal phase after slower but more hectic cryptic animation
    const revealTimer = setTimeout(() => {
      setShowReveal(true);
    }, 2800);

    // Start fade out
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 4200);

    // Complete loading
    const completeTimer = setTimeout(() => {
      onComplete?.();
    }, 4600);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [isVisible, onComplete]);





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
        {/* Hectic floating elements */}
        <motion.div 
          className="absolute top-1/4 right-1/4 w-2 h-2 bg-gray-400 rounded-full opacity-30"
          animate={{
            y: [0, -15, 5, -25, 0],
            x: [0, 8, -5, 3, 0],
            opacity: [0.3, 0.7, 0.2, 0.9, 0.3],
            scale: [1, 1.5, 0.7, 1.8, 1]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/5 w-1 h-12 bg-gray-300 opacity-25"
          animate={{
            scaleY: [0.5, 2, 0.3, 2.5, 0.5],
            opacity: [0.25, 0.6, 0.1, 0.8, 0.25],
            rotate: [0, 45, -30, 90, 0]
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "linear",
            delay: 0.1
          }}
        />
        
        {/* Additional chaotic elements */}
        <motion.div 
          className="absolute top-1/3 left-1/5 w-4 h-px bg-black opacity-20"
          animate={{
            scaleX: [0.2, 4, 0.8, 5, 0.2],
            opacity: [0.2, 0.6, 0.1, 0.8, 0.2]
          }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute top-2/3 right-1/6 w-px h-6 bg-gray-500 opacity-30"
          animate={{
            scaleY: [0.3, 3, 0.5, 4, 0.3],
            opacity: [0.3, 0.7, 0.15, 0.9, 0.3]
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            ease: "linear",
            delay: 0.05
          }}
        />
        <motion.div 
          className="absolute top-1/5 right-2/5 w-3 h-3 border border-gray-400 opacity-15"
          animate={{
            rotate: [0, 180, -90, 360, 0],
            scale: [0.5, 1.2, 0.8, 1.5, 0.5],
            opacity: [0.15, 0.4, 0.1, 0.6, 0.15]
          }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            ease: "linear",
            delay: 0.3
          }}
        />

        {/* Main content positioned mid-left */}
        <div className="relative ml-16 md:ml-24 lg:ml-32 z-10">
          {!showReveal ? (
            <>
              {/* Cryptic animation using DecryptedText */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <div
                  style={{
                    fontFamily: "'Canela', 'Playfair Display', 'Georgia', serif",
                    letterSpacing: '0.08em',
                    lineHeight: '0.9',
                    transform: 'scaleY(1.3)',
                    transformOrigin: 'center',
                    textShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    filter: 'contrast(1.05) brightness(1.02)',
                  }}
                >
                  <DecryptedText 
                    text="████████████████████████████████"
                    speed={30}
                    maxIterations={50}
                    characters={elegantCrypticChars + glitchCharacters}
                    animateOn="immediate"
                    revealDirection="center"
                    className="text-4xl md:text-5xl lg:text-6xl text-black"
                    parentClassName="block"
                    encryptedClassName="text-4xl md:text-5xl lg:text-6xl text-black"
                  />
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
                      width: '96px',
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