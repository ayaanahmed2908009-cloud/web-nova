import React, { ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxElementProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
  offset?: string[];
  range?: number[];
}

export function ParallaxElement({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
  offset = ['start end', 'end start'],
  range = [0, 1]
}: ParallaxElementProps) {
  const { scrollYProgress } = useScroll({
    offset: offset as any
  });

  const y = useTransform(
    scrollYProgress,
    range,
    direction === 'up' 
      ? [`${speed * 100}px`, `-${speed * 100}px`]
      : [`-${speed * 100}px`, `${speed * 100}px`]
  );

  return (
    <motion.div
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxBackgroundProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxBackground({
  children,
  speed = 0.5,
  className = ''
}: ParallaxBackgroundProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, speed * 1000]);

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxMouseProps {
  children: ReactNode;
  strength?: number;
  className?: string;
}

export function ParallaxMouse({
  children,
  strength = 0.1,
  className = ''
}: ParallaxMouseProps) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      
      setMousePosition({ x: deltaX, y: deltaY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength]);

  return (
    <motion.div
      className={className}
      style={{
        transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`
      }}
    >
      {children}
    </motion.div>
  );
}