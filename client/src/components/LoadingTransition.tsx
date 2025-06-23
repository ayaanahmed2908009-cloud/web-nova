import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CrypticLoadingScreen from "./CrypticLoadingScreen";

interface LoadingTransitionProps {
  isLoading: boolean;
  onComplete?: () => void;
  duration?: number;
  children: React.ReactNode;
}

export default function LoadingTransition({
  isLoading,
  onComplete,
  duration = 2000,
  children
}: LoadingTransitionProps) {
  const [showContent, setShowContent] = useState(!isLoading);

  useEffect(() => {
    if (!isLoading && !showContent) {
      const timer = setTimeout(() => {
        setShowContent(true);
        onComplete?.();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading, showContent, onComplete]);

  return (
    <>
      <CrypticLoadingScreen
        isVisible={isLoading}
        onComplete={() => setShowContent(true)}
        duration={duration}
      />
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}