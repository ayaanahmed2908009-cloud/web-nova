import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useParallax, useMouseParallax } from '@/hooks/useParallax';

interface ParallaxContainerProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  offset?: number;
  className?: string;
  mouseParallax?: boolean;
  mouseStrength?: number;
}

export function ParallaxContainer({
  children,
  speed = 0.5,
  direction = 'up',
  offset = 0,
  className = '',
  mouseParallax = false,
  mouseStrength = 0.05
}: ParallaxContainerProps) {
  const { transform } = useParallax({ speed, direction, offset });
  const { transform: mouseTransform } = useMouseParallax(mouseStrength);

  return (
    <motion.div
      className={className}
      style={{
        transform: mouseParallax 
          ? `translateY(${transform}px) ${mouseTransform}`
          : `translateY(${transform}px)`,
        willChange: 'transform'
      }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxLayerProps {
  children: ReactNode;
  speed: number;
  className?: string;
  zIndex?: number;
}

export function ParallaxLayer({ children, speed, className = '', zIndex = 0 }: ParallaxLayerProps) {
  const { transform } = useParallax({ speed });

  return (
    <motion.div
      className={`absolute inset-0 ${className}`}
      style={{
        transform: `translateY(${transform}px)`,
        zIndex,
        willChange: 'transform'
      }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  backgroundLayers?: {
    speed: number;
    element: ReactNode;
    zIndex?: number;
  }[];
}

export function ParallaxSection({ children, className = '', backgroundLayers = [] }: ParallaxSectionProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {backgroundLayers.map((layer, index) => (
        <ParallaxLayer
          key={index}
          speed={layer.speed}
          zIndex={layer.zIndex || index}
        >
          {layer.element}
        </ParallaxLayer>
      ))}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}