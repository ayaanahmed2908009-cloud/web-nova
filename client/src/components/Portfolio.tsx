import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Portfolio() {
  const [typedText, setTypedText] = useState("");
  const [showSubtext, setShowSubtext] = useState(false);
  const [typedSubtext, setTypedSubtext] = useState("");
  
  const mainText = "Are you ready for our masterpieces?";
  const subText = "Scroll down to be blessed";

  useEffect(() => {
    let currentIndex = 0;
    const typeInterval = setInterval(() => {
      if (currentIndex <= mainText.length) {
        setTypedText(mainText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        // Start subtext after main text is complete
        setTimeout(() => {
          setShowSubtext(true);
        }, 500);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, []);

  useEffect(() => {
    if (showSubtext) {
      let currentIndex = 0;
      const subtextInterval = setInterval(() => {
        if (currentIndex <= subText.length) {
          setTypedSubtext(subText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(subtextInterval);
        }
      }, 60);

      return () => clearInterval(subtextInterval);
    }
  }, [showSubtext]);

  return (
    <div className="portfolio-container">
      {/* First Section - Intro with typing animation */}
      <section className="h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
            {typedText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-1 h-8 bg-black ml-1"
            />
          </h1>
          
          {showSubtext && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-lg text-gray-600"
            >
              {typedSubtext}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-0.5 h-4 bg-gray-600 ml-1"
              />
            </motion.p>
          )}
        </div>
      </section>

      {/* Second Section - Fade to black with Mechamorals */}
      <section className="h-screen bg-black relative overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-black"
        />
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="relative z-10 pt-20 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to Mechamorals
            </h2>
            <p className="text-xl md:text-2xl text-gray-300">
              The hub for all things robotics and AI related
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}