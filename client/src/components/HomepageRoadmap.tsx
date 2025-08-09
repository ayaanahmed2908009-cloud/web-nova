import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle, ArrowRight } from "lucide-react";

interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  details: string;
}

const roadmapSteps: RoadmapStep[] = [
  {
    id: 1,
    title: "Initial Inquiry",
    description: "We understand your goals and challenges",
    details: "We start by having a detailed conversation about your business objectives and current challenges."
  },
  {
    id: 2,
    title: "Needs Assessment", 
    description: "We review your systems and resources",
    details: "Our team conducts a comprehensive review of your existing systems and available resources."
  },
  {
    id: 3,
    title: "Market & Tech Review",
    description: "We evaluate trends and tech stack",
    details: "We analyze market trends, competitors, and determine the best technology stack for your project."
  },
  {
    id: 4,
    title: "Strategy & Planning",
    description: "We outline strategy and project plan",
    details: "We develop a comprehensive business strategy with detailed timelines and realistic budgets."
  },
  {
    id: 5,
    title: "Risk Assessment",
    description: "We identify challenges and solutions",
    details: "Our team identifies potential risks and develops specific mitigation strategies."
  },
  {
    id: 6,
    title: "Action Plan Delivery",
    description: "You get a clear roadmap for execution",
    details: "You receive a comprehensive action plan with clear steps and success metrics."
  }
];

export default function HomepageRoadmap() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % roadmapSteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + roadmapSteps.length) % roadmapSteps.length);
  };

  if (!isLargeScreen) {
    // Simple grid layout for smaller screens
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-black mb-2">Our Consultation Process</h3>
          <p className="text-gray-600 text-sm">Six steps to your success</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {roadmapSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border border-gray-200 hover:border-gray-300 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                      {step.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-black text-sm mb-1">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 text-xs">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  // Interactive vertical roadmap for large screens
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-3xl p-12 shadow-2xl border border-gray-100">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Consultation Process</h3>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            Experience our structured approach to understanding your needs and delivering exceptional results
          </p>
        </motion.div>
      </div>

      {/* Enhanced Timeline Roadmap */}
      <div className="relative max-w-4xl mx-auto">
        {/* Elegant Curved Lines */}
        <svg 
          className="absolute inset-0 w-full h-full z-0" 
          viewBox="0 0 500 700" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop 
                offset="0%" 
                stopColor="#1f2937" 
                stopOpacity="0.8"
              />
              <stop 
                offset={`${((currentStep + 1) / roadmapSteps.length) * 100}%`} 
                stopColor="#1f2937" 
                stopOpacity="0.8"
              />
              <stop 
                offset={`${((currentStep + 1) / roadmapSteps.length) * 100}%`} 
                stopColor="#d1d5db" 
                stopOpacity="0.3"
              />
              <stop 
                offset="100%" 
                stopColor="#d1d5db" 
                stopOpacity="0.3"
              />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Main flowing path */}
          <motion.path
            d="M 100 80 
               C 120 75 160 85 220 90
               C 280 95 320 105 350 130
               C 380 155 360 175 320 180
               C 280 185 220 195 160 200
               C 120 205 100 225 110 250
               C 120 275 160 285 220 290
               C 280 295 320 305 350 330
               C 380 355 360 375 320 380
               C 280 385 220 395 160 400
               C 120 405 100 425 110 450
               C 120 475 180 485 250 500
               C 320 515 380 525 400 550
               C 420 575 400 595 370 600
               C 340 605 280 615 220 620"
            stroke="url(#progressGradient)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ 
              duration: 3, 
              ease: [0.16, 1, 0.3, 1]
            }}
          />
          
          {/* Accent lines */}
          {[1, 2].map((lineIndex) => (
            <motion.path
              key={lineIndex}
              d={`M ${100 + lineIndex * 8} ${80 + lineIndex * 5} 
                 C ${120 + lineIndex * 8} ${75 + lineIndex * 5} ${160 + lineIndex * 8} ${85 + lineIndex * 5} ${220 + lineIndex * 8} ${90 + lineIndex * 5}
                 C ${280 + lineIndex * 8} ${95 + lineIndex * 5} ${320 + lineIndex * 8} ${105 + lineIndex * 5} ${350 + lineIndex * 8} ${130 + lineIndex * 5}
                 C ${380 + lineIndex * 8} ${155 + lineIndex * 5} ${360 + lineIndex * 8} ${175 + lineIndex * 5} ${320 + lineIndex * 8} ${180 + lineIndex * 5}
                 C ${280 + lineIndex * 8} ${185 + lineIndex * 5} ${220 + lineIndex * 8} ${195 + lineIndex * 5} ${160 + lineIndex * 8} ${200 + lineIndex * 5}
                 C ${120 + lineIndex * 8} ${205 + lineIndex * 5} ${100 + lineIndex * 8} ${225 + lineIndex * 5} ${110 + lineIndex * 8} ${250 + lineIndex * 5}
                 C ${120 + lineIndex * 8} ${275 + lineIndex * 5} ${160 + lineIndex * 8} ${285 + lineIndex * 5} ${220 + lineIndex * 8} ${290 + lineIndex * 5}
                 C ${280 + lineIndex * 8} ${295 + lineIndex * 5} ${320 + lineIndex * 8} ${305 + lineIndex * 5} ${350 + lineIndex * 8} ${330 + lineIndex * 5}
                 C ${380 + lineIndex * 8} ${355 + lineIndex * 5} ${360 + lineIndex * 8} ${375 + lineIndex * 5} ${320 + lineIndex * 8} ${380 + lineIndex * 5}
                 C ${280 + lineIndex * 8} ${385 + lineIndex * 5} ${220 + lineIndex * 8} ${395 + lineIndex * 5} ${160 + lineIndex * 8} ${400 + lineIndex * 5}
                 C ${120 + lineIndex * 8} ${405 + lineIndex * 5} ${100 + lineIndex * 8} ${425 + lineIndex * 5} ${110 + lineIndex * 8} ${450 + lineIndex * 5}
                 C ${120 + lineIndex * 8} ${475 + lineIndex * 5} ${180 + lineIndex * 8} ${485 + lineIndex * 5} ${250 + lineIndex * 8} ${500 + lineIndex * 5}`}
              stroke="url(#progressGradient)"
              strokeWidth="1"
              fill="none"
              strokeLinecap="round"
              opacity={0.4 - lineIndex * 0.15}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 3, 
                delay: lineIndex * 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
            />
          ))}
        </svg>

        {/* Enhanced Step Layout */}
        <div className="relative space-y-24 py-16">
          {roadmapSteps.map((step, index) => {
            const positions = [
              { x: '15%', side: 'right' },    // Step 1 - left side
              { x: '85%', side: 'left' },     // Step 2 - right side  
              { x: '20%', side: 'right' },    // Step 3 - left side
              { x: '80%', side: 'left' },     // Step 4 - right side
              { x: '25%', side: 'right' },    // Step 5 - left side
              { x: '50%', side: 'center' }    // Step 6 - center
            ];
            
            const position = positions[index];
            
            return (
              <motion.div
                key={step.id}
                className="relative z-20"
                style={{ 
                  marginLeft: position.x,
                  transform: `translateX(-50%)`
                }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className={`flex items-center gap-6 cursor-pointer group ${
                  position.side === 'left' ? 'flex-row-reverse' : 
                  position.side === 'center' ? 'flex-col items-center' : 'flex-row'
                }`}
                onClick={() => setCurrentStep(index)}
                >
                  {/* Enhanced Circle Indicator */}
                  <motion.div
                    className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 ${
                      index <= currentStep 
                        ? 'bg-gradient-to-br from-gray-800 to-black text-white shadow-2xl' 
                        : 'bg-white border-3 border-gray-300 text-gray-600 shadow-lg hover:border-gray-400'
                    }`}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Pulsing ring for active step */}
                    {index === currentStep && (
                      <motion.div
                        className="absolute inset-0 rounded-full border-2 border-gray-400"
                        animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                    
                    {index < currentStep ? (
                      <CheckCircle className="w-10 h-10" />
                    ) : (
                      <span className="font-bold text-xl">{step.id}</span>
                    )}
                  </motion.div>
                  
                  {/* Enhanced Step Content Card */}
                  <motion.div
                    className={`${position.side === 'center' ? 'w-96 mt-6' : 'w-80'}`}
                    initial={{ opacity: 0.8 }}
                    animate={{ 
                      opacity: index === currentStep ? 1 : 0.85,
                      scale: index === currentStep ? 1.03 : 1
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <Card className={`border-0 shadow-xl transition-all duration-500 bg-white group-hover:shadow-2xl ${
                      index === currentStep 
                        ? 'ring-2 ring-gray-300 shadow-2xl transform' 
                        : 'hover:shadow-xl'
                    }`}>
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4">
                          <div className={`w-3 h-3 rounded-full mt-2 ${
                            index === currentStep ? 'bg-gray-800' : 'bg-gray-300'
                          }`}></div>
                          <div className="flex-1">
                            <h4 className={`font-bold text-lg mb-3 transition-colors ${
                              index === currentStep ? 'text-gray-900' : 'text-gray-700'
                            }`}>
                              {step.title}
                            </h4>
                            <p className={`text-base leading-relaxed transition-colors ${
                              index === currentStep ? 'text-gray-700' : 'text-gray-600'
                            }`}>
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    {/* Enhanced Speech Bubble */}
                    <AnimatePresence>
                      {index === currentStep && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9, y: 10 }}
                          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                          className={`absolute z-30 ${
                            position.side === 'left' 
                              ? '-left-96 top-1/2 -translate-y-1/2' 
                              : position.side === 'right'
                              ? '-right-96 top-1/2 -translate-y-1/2'
                              : 'left-1/2 -translate-x-1/2 -top-6'
                          } ${position.side === 'center' ? 'w-96' : 'w-88'}`}
                        >
                          {/* Enhanced Speech Bubble */}
                          <div className="relative">
                            <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl shadow-2xl p-6 relative backdrop-blur-sm">
                              {/* Elegant Arrow */}
                              <div className={`absolute w-6 h-6 bg-gradient-to-br from-white to-gray-50 border-l border-b border-gray-200 transform rotate-45 ${
                                position.side === 'left' 
                                  ? 'right-[-12px] top-1/2 -translate-y-1/2' 
                                  : position.side === 'right'
                                  ? 'left-[-12px] top-1/2 -translate-y-1/2'
                                  : 'bottom-[-12px] left-1/2 -translate-x-1/2'
                              }`}></div>
                              
                              <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-black text-white flex items-center justify-center text-sm font-bold">
                                    {step.id}
                                  </div>
                                  <div>
                                    <h5 className="font-bold text-gray-900 text-base">Detailed Process</h5>
                                    <div className="w-12 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 mt-1"></div>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed pl-11">
                                  {step.details}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>



      {/* Enhanced Navigation Controls */}
      <div className="flex justify-center items-center gap-6 mt-16">
        <Button
          variant="outline"
          size="default"
          onClick={prevStep}
          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 hover:border-gray-800 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        
        <div className="flex gap-2">
          {roadmapSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentStep 
                  ? 'bg-gradient-to-r from-gray-700 to-gray-900 w-8 shadow-md' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
        
        <Button
          variant="outline"
          size="default"
          onClick={nextStep}
          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 hover:border-gray-800 hover:bg-gray-50 text-gray-700 hover:text-gray-900 transition-all duration-300 rounded-xl shadow-md hover:shadow-lg"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
      
      {/* Elegant Footer */}
      <motion.div
        className="text-center mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <p className="text-gray-500 text-sm">
          Click on any step to explore our detailed consultation process
        </p>
      </motion.div>
    </div>
  );
}