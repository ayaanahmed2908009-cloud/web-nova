import { useEffect, useState } from 'react';

export interface ParallaxOptions {
  speed?: number;
  direction?: 'up' | 'down';
  offset?: number;
  disabled?: boolean;
}

export function useParallax(options: ParallaxOptions = {}) {
  const {
    speed = 0.5,
    direction = 'up',
    offset = 0,
    disabled = false
  } = options;

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const transform = disabled ? 0 : (() => {
    const rate = (scrollY + offset) * speed;
    return direction === 'up' ? -rate : rate;
  })();

  return {
    transform
  };
}

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / totalHeight;
      setProgress(Math.min(Math.max(currentProgress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

export function useMouseParallax(strength: number = 0.1) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
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

  return {
    transform: `translate3d(${mousePosition.x}px, ${mousePosition.y}px, 0)`
  };
}