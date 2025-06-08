import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface SectionInViewProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
}

export default function SectionInView({ 
  children, 
  className = '',
  threshold = 0.1,
  delay = 0 
}: SectionInViewProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    threshold,
    once: true 
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1]
        }
      });
    }
  }, [isInView, controls, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}