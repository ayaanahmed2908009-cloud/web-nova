import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CrypticLoadingScreenProps {
  isVisible: boolean;
  onComplete?: () => void;
  duration?: number;
}

const crypticMessages = [
  "w3bn0v4",
  "s0lut10ns",
  "1n1t14l1z1ng",
  "l04d1ng",
  "r34dy"
];

const glitchCharacters = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~";

export default function CrypticLoadingScreen({ 
  isVisible, 
  onComplete, 
  duration = 3000 
}: CrypticLoadingScreenProps) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [showReveal, setShowReveal] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

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
            }, 300);
          }
        }, 400);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [messageIndex, isVisible, showReveal]);

  // Reveal and fade sequence
  useEffect(() => {
    if (!showReveal) return;

    // Show reveal for 1.5 seconds, then fade out
    const revealTimer = setTimeout(() => {
      setFadeOut(true);
      // Complete after fade animation
      setTimeout(() => {
        onComplete?.();
      }, 800);
    }, 1500);

    return () => clearTimeout(revealTimer);
  }, [showReveal, onComplete]);



  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: fadeOut ? 0.8 : 0 }}
        className="fixed inset-0 z-50 bg-white flex items-center overflow-hidden"
      >
        {/* Main content positioned mid-left */}
        <div className="relative ml-16 md:ml-24 lg:ml-32">
          {!showReveal ? (
            <>
              {/* Cryptic loading phase */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="font-mono text-2xl md:text-3xl tracking-wider text-black lowercase">
                  {currentMessage}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="ml-1"
                  >
                    _
                  </motion.span>
                </div>
              </motion.div>
            </>
          ) : (
            <>
              {/* Reveal phase */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-normal text-black mb-3 tracking-wide"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  WebNova Solutions
                </motion.h1>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <p className="text-gray-600 text-lg md:text-xl font-light tracking-wide mb-4">
                    an agency built on excellence
                  </p>
                  <motion.div
                    className="w-24 h-px bg-black"
                    initial={{ width: 0 }}
                    animate={{ width: 96 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
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