import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CrypticAlternatingTextProps {
  texts: string[];
  className?: string;
  interval?: number;
}

const crypticChars = "!@#$%^&*()_+-=[]{}|;:,.<>?~`";
const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export default function CrypticAlternatingText({ 
  texts, 
  className = "", 
  interval = 4000 
}: CrypticAlternatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayText, setDisplayText] = useState(texts[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const scrambleToTarget = (target: string) => {
    setIsTransitioning(true);
    
    // Phase 1: Scramble current text
    let scrambleIteration = 0;
    const scrambleInterval = setInterval(() => {
      setDisplayText(
        target
          .split("")
          .map((letter) => {
            if (letter === " ") return " ";
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join("")
      );

      scrambleIteration++;
      if (scrambleIteration >= 8) {
        clearInterval(scrambleInterval);
        
        // Phase 2: Cryptic symbols
        let crypticIteration = 0;
        const crypticInterval = setInterval(() => {
          setDisplayText(
            target
              .split("")
              .map((letter) => {
                if (letter === " ") return " ";
                return crypticChars[Math.floor(Math.random() * crypticChars.length)];
              })
              .join("")
          );

          crypticIteration++;
          if (crypticIteration >= 6) {
            clearInterval(crypticInterval);
            
            // Phase 3: Decode to target
            let decodeIteration = 0;
            const decodeInterval = setInterval(() => {
              setDisplayText(
                target
                  .split("")
                  .map((letter, index) => {
                    if (index < decodeIteration) {
                      return target[index];
                    }
                    if (letter === " ") return " ";
                    return crypticChars[Math.floor(Math.random() * crypticChars.length)];
                  })
                  .join("")
              );

              decodeIteration++;
              if (decodeIteration >= target.length) {
                clearInterval(decodeInterval);
                setDisplayText(target);
                setIsTransitioning(false);
              }
            }, 50);
          }
        }, 80);
      }
    }, 60);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        const nextIndex = (currentIndex + 1) % texts.length;
        setCurrentIndex(nextIndex);
        scrambleToTarget(texts[nextIndex]);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, texts, interval, isTransitioning]);

  return (
    <motion.div
      className={`font-mono tracking-wide ${className}`}
      animate={{ opacity: [1, 0.8, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="relative z-10 block transition-all duration-300">
        {displayText}
      </span>
    </motion.div>
  );
}