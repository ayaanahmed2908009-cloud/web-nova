import { motion } from 'framer-motion';
import { useLazyLoad } from '@/hooks/useLazyLoad';
import { ReactNode } from 'react';

interface LazyMotionProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
}

export default function LazyMotion({ 
  children, 
  className = "",
  direction = 'up',
  delay = 0,
  duration = 0.6
}: LazyMotionProps) {
  const { elementRef, isVisible } = useLazyLoad({ threshold: 0.1 });

  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return { y: 50, opacity: 0 };
      case 'down': return { y: -50, opacity: 0 };
      case 'left': return { x: 50, opacity: 0 };
      case 'right': return { x: -50, opacity: 0 };
      default: return { y: 50, opacity: 0 };
    }
  };

  return (
    <motion.div
      ref={elementRef as any}
      className={className}
      initial={getInitialTransform()}
      animate={isVisible ? { x: 0, y: 0, opacity: 1 } : getInitialTransform()}
      transition={{
        duration,
        delay,
        ease: [0.33, 1, 0.68, 1]
      }}
    >
      {children}
    </motion.div>
  );
}