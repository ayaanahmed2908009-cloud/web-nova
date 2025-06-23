import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CrypticLoadingScreenProps {
  isVisible: boolean;
  onComplete?: () => void;
  duration?: number;
}

const crypticMessages = [
  "W3BN0V4_S0LUT10N5",
  "1N1T14L1Z1NG_5Y5T3M5...",
  "4CC355_GR4NT3D",
  "L04D1NG_3XC3LL3NC3...",
  "D3CR7PT1NG_V1510N...",
  "C0MP1L1NG_1NN0V4T10N...",
  "5YNC_C0MPL3T3",
  "R34DY_T0_3XC33D"
];

const glitchCharacters = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~";

export default function CrypticLoadingScreen({ 
  isVisible, 
  onComplete, 
  duration = 4000 
}: CrypticLoadingScreenProps) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showReveal, setShowReveal] = useState(false);
  const [revealProgress, setRevealProgress] = useState(0);

  // Typewriter effect for messages
  useEffect(() => {
    if (!isVisible || showReveal) return;

    const message = crypticMessages[messageIndex];
    let currentIndex = 0;

    const typeInterval = setInterval(() => {
      if (currentIndex <= message.length) {
        setCurrentMessage(message.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        // Wait then move to next message
        setTimeout(() => {
          if (messageIndex < crypticMessages.length - 1) {
            setMessageIndex((prev) => prev + 1);
            setCurrentMessage("");
          } else {
            // Start reveal sequence
            setTimeout(() => {
              setShowReveal(true);
            }, 500);
          }
        }, 600);
      }
    }, 60);

    return () => clearInterval(typeInterval);
  }, [messageIndex, isVisible, showReveal]);

  // Progress bar animation
  useEffect(() => {
    if (!isVisible) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (duration / 100));
        if (newProgress >= 85 && !showReveal) {
          // Slow down progress before reveal
          return prev + 0.5;
        }
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete?.(), 800);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isVisible, duration, onComplete, showReveal]);

  // Reveal animation
  useEffect(() => {
    if (!showReveal) return;

    const revealInterval = setInterval(() => {
      setRevealProgress((prev) => {
        if (prev >= 100) {
          clearInterval(revealInterval);
          // Speed up final progress
          setProgress(100);
          return 100;
        }
        return prev + 4;
      });
    }, 50);

    return () => clearInterval(revealInterval);
  }, [showReveal]);



  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
      >
        {/* Minimal grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }} />
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center max-w-4xl px-8">
          {!showReveal ? (
            <>
              {/* Cryptic loading phase */}
              <motion.div
                className="mb-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="font-mono text-xl md:text-2xl tracking-wider text-white">
                  {currentMessage}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-1"
                  >
                    |
                  </motion.span>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              {/* Reveal phase */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-8"
              >
                <motion.h1 
                  className="text-5xl md:text-7xl font-light text-white mb-6 tracking-wide"
                  style={{
                    clipPath: `inset(0 ${100 - revealProgress}% 0 0)`
                  }}
                >
                  WebNova Solutions
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: revealProgress > 60 ? 1 : 0,
                    y: revealProgress > 60 ? 0 : 20
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="text-gray-400 text-lg md:text-xl font-light tracking-wide">
                    an agency built on excellence
                  </p>
                </motion.div>
              </motion.div>
            </>
          )}

          {/* Progress bar */}
          <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-80">
            <div className="w-full bg-gray-800 h-px overflow-hidden">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </div>
            <motion.p
              className="text-gray-500 text-xs mt-3 text-center font-mono tracking-wider"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {Math.round(progress)}%
            </motion.p>
          </div>
        </div>

        {/* Minimal corner accents */}
        <div className="absolute top-8 left-8">
          <motion.div
            className="w-12 h-px bg-white"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          <motion.div
            className="w-px h-12 bg-white"
            initial={{ height: 0 }}
            animate={{ height: 48 }}
            transition={{ duration: 1.5, delay: 0.7 }}
          />
        </div>
        <div className="absolute top-8 right-8">
          <motion.div
            className="w-12 h-px bg-white ml-auto"
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 1.5, delay: 0.9 }}
          />
          <motion.div
            className="w-px h-12 bg-white ml-auto"
            initial={{ height: 0 }}
            animate={{ height: 48 }}
            transition={{ duration: 1.5, delay: 1.1 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}