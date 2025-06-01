import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function CubertoSmoothScroll() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setScrollProgress(latest);
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* Animated progress bar with flowing gradient */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 via-black to-gray-300 origin-left z-50"
        style={{ scaleX }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      
      {/* Vertical progress indicator on the side */}
      <motion.div
        className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: scrollProgress > 0.05 ? 1 : 0,
          x: scrollProgress > 0.05 ? 0 : 20
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-32 w-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-black rounded-full"
            style={{ 
              height: `${scrollProgress * 100}%`,
              originY: 1 
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-transparent via-white to-transparent opacity-40"
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        {/* Progress percentage */}
        <motion.div
          className="absolute -left-8 top-1/2 transform -translate-y-1/2 text-xs font-medium text-gray-600"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {Math.round(scrollProgress * 100)}%
        </motion.div>
      </motion.div>
      
      {/* Enhanced scroll indicator */}
      <motion.div
        className="fixed bottom-8 right-8 w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center z-40 bg-white/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: scrollProgress > 0.1 ? 1 : 0,
          scale: scrollProgress > 0.1 ? 1 : 0.8,
          rotate: scrollProgress * 360
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-6 h-6 rounded-full bg-black"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </>
  );
}