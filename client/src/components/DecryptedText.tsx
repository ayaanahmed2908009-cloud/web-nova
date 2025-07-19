import { useState, useEffect, useRef } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'view' | 'immediate';
  revealDirection?: 'left' | 'right' | 'center';
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?',
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  revealDirection = 'left'
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLSpanElement>(null);

  const getRandomChar = () => characters[Math.floor(Math.random() * characters.length)];

  const startDecryption = () => {
    if (isDecrypting || isRevealed) return;
    
    setIsDecrypting(true);
    let iteration = 0;

    intervalRef.current = setInterval(() => {
      setDisplayText(prevText => {
        return text
          .split('')
          .map((char, index) => {
            // For loading screen continuous animation, show random chars continuously
            if (text.includes('████')) {
              // Multiple random character changes for more hectic effect
              const randomChance = Math.random();
              if (randomChance > 0.3) {
                return getRandomChar();
              } else if (randomChance > 0.15) {
                return getRandomChar();
              } else {
                return getRandomChar();
              }
            }
            
            if (revealDirection === 'left') {
              if (index < iteration) return char;
            } else if (revealDirection === 'right') {
              if (index >= text.length - iteration) return char;
            } else { // center
              const center = Math.floor(text.length / 2);
              const distance = Math.abs(index - center);
              if (distance <= iteration / 2) return char;
            }
            
            if (iteration < maxIterations) {
              return getRandomChar();
            }
            return char;
          })
          .join('');
      });

      iteration++;

      // For continuous loading animation, keep looping
      if (text.includes('████') && iteration > maxIterations) {
        iteration = Math.floor(maxIterations * 0.7); // Reset but keep some progression
      } else if (iteration > text.length + maxIterations) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        setDisplayText(text);
        setIsDecrypting(false);
        setIsRevealed(true);
      }
    }, speed);
  };

  useEffect(() => {
    if (animateOn === 'immediate') {
      startDecryption();
    } else if (animateOn === 'view') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isRevealed) {
            startDecryption();
          }
        },
        { threshold: 0.1 }
      );

      if (elementRef.current) {
        observer.observe(elementRef.current);
      }

      return () => observer.disconnect();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [animateOn, isRevealed]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      startDecryption();
    }
  };

  return (
    <span
      ref={elementRef}
      className={`${parentClassName} ${isRevealed ? className : encryptedClassName}`}
      onMouseEnter={handleMouseEnter}
      style={{ cursor: animateOn === 'hover' ? 'pointer' : 'default' }}
    >
      {displayText}
    </span>
  );
}