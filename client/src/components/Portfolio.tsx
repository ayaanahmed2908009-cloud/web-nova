import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

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
    <div className="portfolio-container snap-y snap-mandatory h-screen overflow-y-scroll">
      {/* First Section - Intro with typing animation */}
      <section className="h-screen w-full flex items-center justify-center bg-white snap-start snap-always">
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

      {/* Second Section - Full screen Spline design */}
      <section className="h-screen w-full bg-black relative overflow-hidden snap-start snap-always">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
          className="absolute inset-0 bg-black"
        />
        
        {/* Text overlay at center */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute inset-0 flex items-center justify-center z-20"
        >
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Welcome to Mechamorals
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              The hub for all things robotics and AI related
            </p>
            <Button 
              size="lg"
              className="bg-white text-black hover:bg-gray-200 transition-colors font-semibold px-8 py-3"
              onClick={() => window.open('https://mechamorals.com', '_blank')}
            >
              Try Morality AI
            </Button>
          </div>
        </motion.div>
        
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-20 left-8 z-20"
        >
          <Button 
            variant="ghost"
            className="text-white hover:text-gray-300 hover:bg-white/10 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            ← Back
          </Button>
        </motion.div>

        {/* Full screen Spline design */}
        <div className="absolute inset-0 w-full h-full">
          <iframe
            src="https://my.spline.design/nexbotrobotcharacterconcept-c64f76405283676f4e47793493cea968/"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Mechamorals - Nexbot Robot Character Concept"
            style={{ border: 'none' }}
          />
        </div>
      </section>
    </div>
  );
}