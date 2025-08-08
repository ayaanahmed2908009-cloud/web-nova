import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sparkles, Zap, Star, Code, Palette, Smartphone } from 'lucide-react';

interface EnhancedLoadingScreenProps {
  isVisible: boolean;
  onComplete: () => void;
  duration?: number;
}

const loadingSteps = [
  { icon: Code, text: "Initializing Framework", color: "from-blue-500 to-cyan-500" },
  { icon: Palette, text: "Loading Design System", color: "from-purple-500 to-pink-500" },
  { icon: Smartphone, text: "Optimizing Experience", color: "from-green-500 to-emerald-500" },
  { icon: Sparkles, text: "Finalizing Magic", color: "from-yellow-500 to-orange-500" }
];

const crypticMessages = [
  "DECRYPTING_DIGITAL_MATRIX...",
  "COMPILING_INNOVATION_PROTOCOLS...",
  "SYNCHRONIZING_CREATIVE_VECTORS...",
  "CALIBRATING_USER_EXPERIENCE...",
  "OPTIMIZING_VISUAL_ALGORITHMS...",
  "ACTIVATING_RESPONSIVE_SYSTEMS..."
];

export default function EnhancedLoadingScreen({ 
  isVisible, 
  onComplete, 
  duration = 3000 
}: EnhancedLoadingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [crypticText, setCrypticText] = useState('');
  const [showBrand, setShowBrand] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    if (!isVisible) return;

    // Generate particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);

    // Cryptic text animation
    let textIndex = 0;
    const textInterval = setInterval(() => {
      setCrypticText(crypticMessages[textIndex]);
      textIndex = (textIndex + 1) % crypticMessages.length;
    }, 400);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        if (newProgress >= 100) {
          clearInterval(progressInterval);
          setShowBrand(true);
          setTimeout(onComplete, 800);
          return 100;
        }
        return newProgress;
      });
    }, duration / 100);

    // Step progression
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        const newStep = prev + 1;
        if (newStep >= loadingSteps.length) {
          clearInterval(stepInterval);
          return loadingSteps.length - 1;
        }
        return newStep;
      });
    }, duration / loadingSteps.length);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [isVisible, duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              className="w-full h-full"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
              animate={{
                backgroundPosition: ['0px 0px', '50px 50px'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Floating particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-60"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
              }}
              animate={{
                y: [-20, -40, -20],
                opacity: [0.6, 1, 0.6],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Main content */}
          <div className="relative z-10 text-center px-8 max-w-2xl">
            <AnimatePresence mode="wait">
              {!showBrand ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-12"
                >
                  {/* Cryptic text */}
                  <motion.div
                    className="text-green-400 font-mono text-sm tracking-wider"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    {crypticText}
                  </motion.div>

                  {/* Main loading indicator */}
                  <div className="space-y-8">
                    <motion.div
                      className="w-24 h-24 mx-auto relative"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full" />
                      <motion.div
                        className="absolute inset-2 border-2 border-transparent border-t-green-400 border-l-yellow-400 rounded-full"
                        animate={{ rotate: -360 }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                      />
                      <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <motion.div
                          animate={{ scale: [0.8, 1.2, 0.8] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <Zap className="w-6 h-6 text-white" />
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Current step */}
                    <motion.div
                      className="space-y-4"
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="flex items-center justify-center gap-3">
                        <motion.div
                          className={`p-3 rounded-2xl bg-gradient-to-r ${loadingSteps[currentStep]?.color} text-white`}
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity }}
                        >
                          {loadingSteps[currentStep] && (() => {
                            const IconComponent = loadingSteps[currentStep].icon;
                            return <IconComponent className="w-6 h-6" />;
                          })()}
                        </motion.div>
                        <span className="text-white text-lg font-medium">
                          {loadingSteps[currentStep]?.text}
                        </span>
                      </div>

                      {/* Progress bar */}
                      <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden mx-auto">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>

                      <div className="text-gray-400 text-sm">
                        {progress}% Complete
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="brand"
                  initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  {/* Brand reveal */}
                  <motion.h1
                    className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
                    animate={{ backgroundPosition: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    WebNova
                  </motion.h1>
                  
                  <motion.div
                    className="flex items-center justify-center gap-2 text-gray-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <span className="text-lg">Crafting Digital Excellence</span>
                    <Star className="w-5 h-5 text-blue-400" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-16 h-16 border-2 border-blue-500/30 rounded-full"
            animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-12 h-12 border-2 border-purple-500/30 rounded-lg"
            animate={{ rotate: [0, -360], scale: [1, 0.9, 1] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}