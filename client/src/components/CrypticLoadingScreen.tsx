import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CrypticLoadingScreenProps {
  isVisible: boolean;
  onComplete?: () => void;
  duration?: number;
}

const crypticMessages = [
  "INITIATING NEURAL PATHWAYS...",
  "DECRYPTING QUANTUM SIGNATURES...",
  "SYNCHRONIZING TEMPORAL MATRICES...",
  "CALIBRATING DIGITAL CONSCIOUSNESS...",
  "ACCESSING DIMENSIONAL PROTOCOLS...",
  "LOADING ENCRYPTED MEMORIES...",
  "ESTABLISHING SECURE CONNECTIONS...",
  "VALIDATING BIOMETRIC PATTERNS...",
  "COMPILING REALITY FRAGMENTS...",
  "AUTHENTICATING DIGITAL IDENTITY..."
];

const glitchCharacters = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~";

export default function CrypticLoadingScreen({ 
  isVisible, 
  onComplete, 
  duration = 3000 
}: CrypticLoadingScreenProps) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [glitchText, setGlitchText] = useState("");
  const [isGlitching, setIsGlitching] = useState(false);

  // Typewriter effect for messages
  useEffect(() => {
    if (!isVisible) return;

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
          setMessageIndex((prev) => (prev + 1) % crypticMessages.length);
          setCurrentMessage("");
        }, 800);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [messageIndex, isVisible]);

  // Progress bar animation
  useEffect(() => {
    if (!isVisible) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + (100 / (duration / 100));
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => onComplete?.(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [isVisible, duration, onComplete]);

  // Glitch effect
  useEffect(() => {
    if (!isVisible) return;

    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance to glitch
        setIsGlitching(true);
        let glitchCount = 0;
        const glitchAnimation = setInterval(() => {
          setGlitchText(
            Array.from({ length: 20 }, () => 
              glitchCharacters[Math.floor(Math.random() * glitchCharacters.length)]
            ).join("")
          );
          glitchCount++;
          if (glitchCount > 5) {
            clearInterval(glitchAnimation);
            setIsGlitching(false);
            setGlitchText("");
          }
        }, 50);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, [isVisible]);

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
        {/* Grid pattern background */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-1 h-full">
            {Array.from({ length: 144 }).map((_, i) => (
              <motion.div
                key={i}
                className="border border-green-400"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 0.5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.02,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center max-w-2xl px-8">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-mono text-green-400 mb-4 tracking-wider">
              NOVA<span className="text-white">WEB</span>
            </h1>
            <div className="w-32 h-px bg-green-400 mx-auto"></div>
          </motion.div>

          {/* Cryptic message */}
          <motion.div
            className="mb-8 h-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-green-400 font-mono text-lg tracking-wide">
              {currentMessage}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="ml-1"
              >
                █
              </motion.span>
            </p>
          </motion.div>

          {/* Glitch overlay */}
          {isGlitching && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.1 }}
            >
              <p className="text-red-500 font-mono text-2xl tracking-widest">
                {glitchText}
              </p>
            </motion.div>
          )}

          {/* Progress bar */}
          <div className="mb-6">
            <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-400 to-blue-500"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <motion.p
              className="text-green-400 font-mono text-sm mt-2"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {Math.round(progress)}% COMPLETE
            </motion.p>
          </div>

          {/* Scanning lines */}
          <motion.div
            className="absolute top-0 left-0 w-full h-px bg-green-400"
            animate={{ 
              y: [0, window.innerHeight],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />

          {/* Terminal-style details */}
          <div className="mt-8 text-left max-w-md mx-auto">
            <motion.div
              className="font-mono text-xs text-gray-400 space-y-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 1 }}
            >
              <div>SYSTEM: ONLINE</div>
              <div>SECURITY: MAXIMUM</div>
              <div>STATUS: AUTHENTICATING...</div>
              <div className="text-green-400">READY FOR DEPLOYMENT</div>
            </motion.div>
          </div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-4 left-4">
          <motion.div
            className="w-8 h-8 border-l-2 border-t-2 border-green-400"
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <div className="absolute top-4 right-4">
          <motion.div
            className="w-8 h-8 border-r-2 border-t-2 border-green-400"
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
          />
        </div>
        <div className="absolute bottom-4 left-4">
          <motion.div
            className="w-8 h-8 border-l-2 border-b-2 border-green-400"
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </div>
        <div className="absolute bottom-4 right-4">
          <motion.div
            className="w-8 h-8 border-r-2 border-b-2 border-green-400"
            animate={{ 
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}