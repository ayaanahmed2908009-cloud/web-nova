import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

interface MoralityTransitionProps {
  onComplete: () => void;
}

export default function MoralityTransition({ onComplete }: MoralityTransitionProps) {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show text after a brief delay
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 1000);

    // Complete transition after animation
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 w-full h-full">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
          animate={{
            background: [
              "linear-gradient(45deg, #1e1b4b, #312e81, #1e3a8a)",
              "linear-gradient(90deg, #312e81, #1e3a8a, #1e1b4b)",
              "linear-gradient(135deg, #1e3a8a, #1e1b4b, #312e81)",
              "linear-gradient(180deg, #1e1b4b, #312e81, #1e3a8a)"
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, 30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 text-center px-8">
        <AnimatePresence>
          {showText && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-4xl mx-auto"
            >
              <h1 
                className="text-6xl md:text-8xl font-light text-white mb-8 leading-tight tracking-wide"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Welcome to
              </h1>
              <motion.h2 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl md:text-6xl font-medium text-white mb-6"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Morality AI
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl md:text-2xl text-white/90 font-light leading-relaxed"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                A distinguished component of Mechamorals
              </motion.p>
              
              {/* Subtle loading indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 2 }}
                className="mt-12"
              >
                <div className="flex items-center justify-center space-x-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="w-2 h-2 bg-white/60 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    className="w-2 h-2 bg-white/60 rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="w-2 h-2 bg-white/60 rounded-full"
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
    </motion.div>
  );
}