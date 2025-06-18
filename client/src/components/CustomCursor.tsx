import { useState, useEffect, useRef } from 'react';

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame: number;

    const mouseMove = (e: MouseEvent) => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      
      animationFrame = requestAnimationFrame(() => {
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate(${e.clientX - 16}px, ${e.clientY - 16}px) scale(${isHovering ? 1.5 : 1})`;
        }
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', mouseMove);
    
    const buttons = document.querySelectorAll('button, a, [role="button"]');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', handleMouseEnter);
      button.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener('mousemove', mouseMove);
      buttons.forEach(button => {
        button.removeEventListener('mouseenter', handleMouseEnter);
        button.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, [isHovering]);

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '32px',
        height: '32px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'difference',
        transition: 'transform 0.1s ease-out',
        willChange: 'transform',
      }}
    />
  );
}