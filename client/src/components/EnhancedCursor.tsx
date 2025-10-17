import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

interface CursorVariant {
  default: {
    x: number;
    y: number;
    scale: number;
    opacity: number;
    backgroundColor: string;
    mixBlendMode?: string;
  };
  hover: {
    scale: number;
    opacity: number;
    backgroundColor: string;
  };
  click: {
    scale: number;
    opacity: number;
  };
}

export default function EnhancedCursor() {
  const [mousePosition, setMousePosition] = useState<Position>({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState<Position[]>([]);
  const [clickEffect, setClickEffect] = useState<Position | null>(null);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Update trail
      setTrail(prev => {
        const newTrail = [{ x: e.clientX, y: e.clientY }, ...prev.slice(0, 8)];
        return newTrail;
      });
    };

    const mouseEnter = () => setIsVisible(true);
    const mouseLeave = () => setIsVisible(false);
    
    const mouseDown = (e: MouseEvent) => {
      setClickEffect({ x: e.clientX, y: e.clientY });
      setCursorVariant('click');
      
      // Remove click effect after animation
      setTimeout(() => {
        setClickEffect(null);
        setCursorVariant('default');
      }, 300);
    };

    const addEventListeners = () => {
      document.addEventListener('mousemove', mouseMove);
      document.addEventListener('mouseenter', mouseEnter);
      document.addEventListener('mouseleave', mouseLeave);
      document.addEventListener('mousedown', mouseDown);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseenter', mouseEnter);
      document.removeEventListener('mouseleave', mouseLeave);
      document.removeEventListener('mousedown', mouseDown);
    };

    addEventListeners();

    // Add hover effects for interactive elements
    const addHoverEffect = (element: Element) => {
      element.addEventListener('mouseenter', () => setCursorVariant('hover'));
      element.addEventListener('mouseleave', () => setCursorVariant('default'));
    };

    // Apply to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
    interactiveElements.forEach(addHoverEffect);

    // Observe for dynamically added elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            if (element.matches('a, button, [role="button"], input, textarea, select')) {
              addHoverEffect(element);
            }
            // Check children
            const children = element.querySelectorAll('a, button, [role="button"], input, textarea, select');
            children.forEach(addHoverEffect);
          }
        });
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      removeEventListeners();
      observer.disconnect();
    };
  }, []);

  const variants: CursorVariant = {
    default: {
      x: mousePosition.x - 10,
      y: mousePosition.y - 10,
      scale: 1,
      opacity: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      mixBlendMode: 'difference'
    },
    hover: {
      scale: 2,
      opacity: 0.8,
      backgroundColor: 'rgba(59, 130, 246, 0.6)'
    },
    click: {
      scale: 0.5,
      opacity: 1
    }
  };

  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null; // Don't show cursor on touch devices
  }

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-5 h-5 pointer-events-none z-[9999] rounded-full"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
          mass: 0.5
        }}
        style={{
          mixBlendMode: cursorVariant === 'default' ? 'difference' : 'normal',
          opacity: isVisible ? 1 : 0
        }}
        initial={{ opacity: 0 }}
      />

      {/* Cursor trail */}
      <AnimatePresence>
        {trail.map((position, index) => (
          <motion.div
            key={index}
            className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9998] rounded-full bg-blue-400/30"
            initial={{ 
              x: position.x - 4, 
              y: position.y - 4, 
              scale: 1,
              opacity: 0.6 
            }}
            animate={{ 
              x: position.x - 4, 
              y: position.y - 4,
              scale: 1 - (index * 0.1),
              opacity: 0.6 - (index * 0.08)
            }}
            exit={{ 
              scale: 0, 
              opacity: 0 
            }}
            transition={{
              duration: 0.2,
              delay: index * 0.02
            }}
          />
        ))}
      </AnimatePresence>

      {/* Click effect */}
      <AnimatePresence>
        {clickEffect && (
          <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[9997]"
            initial={{ 
              x: clickEffect.x, 
              y: clickEffect.y,
              scale: 0,
              opacity: 1 
            }}
            animate={{ 
              scale: 3,
              opacity: 0 
            }}
            exit={{ 
              scale: 4, 
              opacity: 0 
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-8 h-8 border-2 border-blue-500 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9996] rounded-full border border-white/20"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
          opacity: isVisible ? 1 : 0
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
        initial={{ opacity: 0 }}
      />
    </>
  );
}