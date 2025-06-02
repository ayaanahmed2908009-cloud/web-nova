import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CrypticTextProps {
  text: string;
  className?: string;
  onClick?: () => void;
}

const crypticChars = "!@#$%^&*()_+-=[]{}|;:,.<>?~`";
const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export default function CrypticText({ text, className = "", onClick }: CrypticTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const scrambleInterval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(scrambleInterval);
        
        // Add cryptic phase
        setTimeout(() => {
          let crypticIteration = 0;
          const crypticInterval = setInterval(() => {
            setDisplayText(
              text
                .split("")
                .map((letter, index) => {
                  if (letter === " ") return " ";
                  return crypticChars[Math.floor(Math.random() * crypticChars.length)];
                })
                .join("")
            );

            crypticIteration++;
            if (crypticIteration >= 8) { // Show cryptic for a bit
              clearInterval(crypticInterval);
              
              // Decode back to original
              setTimeout(() => {
                let decodeIteration = 0;
                const decodeInterval = setInterval(() => {
                  setDisplayText(
                    text
                      .split("")
                      .map((letter, index) => {
                        if (index < decodeIteration) {
                          return text[index];
                        }
                        return crypticChars[Math.floor(Math.random() * crypticChars.length)];
                      })
                      .join("")
                  );

                  decodeIteration++;
                  if (decodeIteration >= text.length) {
                    clearInterval(decodeInterval);
                    setDisplayText(text);
                  }
                }, 30);
              }, 200);
            }
          }, 50);
        }, 100);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(scrambleInterval);
  }, [isHovered, text]);

  return (
    <motion.button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setDisplayText(text);
      }}
      onClick={onClick}
      className={`relative overflow-hidden font-mono tracking-wide text-black ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <span className="relative z-10 block transition-all duration-300">
        {displayText}
      </span>
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
    </motion.button>
  );
}