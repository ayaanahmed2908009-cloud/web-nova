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
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-black mb-2">Our Consultation Process</h3>
        <p className="text-gray-600 text-sm">Navigate through our proven 6-step process</p>
      </div>

      {/* Swervy Timeline Roadmap */}
      <div className="relative max-w-2xl mx-auto">
        {/* Multiple Curved Lines like SolarPak */}
        <svg 
          className="absolute inset-0 w-full h-full z-0" 
          viewBox="0 0 400 600" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="progressGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop 
                offset={`${((currentStep + 1) / roadmapSteps.length) * 100}%`} 
                stopColor="#000000" 
              />
              <stop 
                offset={`${((currentStep + 1) / roadmapSteps.length) * 100}%`} 
                stopColor="#e5e7eb" 
              />
            </linearGradient>
          </defs>
          {/* Ultra smooth curved lines */}
          {[0, 1, 2, 3, 4].map((lineIndex) => (
            <motion.path
              key={lineIndex}
              d={`M ${70 + lineIndex * 4} 80 
                  C ${100 + lineIndex * 4} 75 ${140 + lineIndex * 4} 85 ${200 + lineIndex * 4} 90
                  C ${260 + lineIndex * 4} 95 ${300 + lineIndex * 4} 105 ${320 + lineIndex * 4} 130
                  C ${340 + lineIndex * 4} 155 ${310 + lineIndex * 4} 175 ${280 + lineIndex * 4} 180
                  C ${240 + lineIndex * 4} 185 ${180 + lineIndex * 4} 195 ${120 + lineIndex * 4} 200
                  C ${80 + lineIndex * 4} 205 ${60 + lineIndex * 4} 225 ${70 + lineIndex * 4} 250
                  C ${80 + lineIndex * 4} 275 ${120 + lineIndex * 4} 285 ${180 + lineIndex * 4} 290
                  C ${240 + lineIndex * 4} 295 ${280 + lineIndex * 4} 305 ${300 + lineIndex * 4} 330
                  C ${320 + lineIndex * 4} 355 ${310 + lineIndex * 4} 375 ${280 + lineIndex * 4} 380
                  C ${240 + lineIndex * 4} 385 ${180 + lineIndex * 4} 395 ${120 + lineIndex * 4} 400
                  C ${80 + lineIndex * 4} 405 ${60 + lineIndex * 4} 425 ${70 + lineIndex * 4} 450
                  C ${80 + lineIndex * 4} 475 ${140 + lineIndex * 4} 485 ${200 + lineIndex * 4} 500`}
              stroke="url(#progressGradient)"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.8 - lineIndex * 0.15}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ 
                duration: 2.5, 
                delay: lineIndex * 0.1,
                ease: [0.25, 0.1, 0.25, 1]
              }}
            />
          ))}
        </svg>

        {/* Step Indicators with Organized Layout */}
        <div className="relative space-y-20 py-12">
          {roadmapSteps.map((step, index) => {
            const positions = [
              { x: '12.5%', side: 'right' },  // Step 1 - left curve start
              { x: '75%', side: 'left' },     // Step 2 - right peak  
              { x: '25%', side: 'right' },    // Step 3 - left dip
              { x: '75%', side: 'left' },     // Step 4 - right curve
              { x: '25%', side: 'right' },    // Step 5 - left curve
              { x: '50%', side: 'center' }    // Step 6 - center end
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
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className={`flex items-center gap-4 cursor-pointer ${
                  position.side === 'left' ? 'flex-row-reverse' : 
                  position.side === 'center' ? 'flex-col items-center' : 'flex-row'
                }`}
                onClick={() => setCurrentStep(index)}
                >
                  {/* Circle Indicator */}
                  <motion.div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      index <= currentStep 
                        ? 'bg-black text-white shadow-xl' 
                        : 'bg-white border-3 border-gray-300 text-gray-600 shadow-md'
                    }`}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.2)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {index < currentStep ? (
                      <CheckCircle className="w-8 h-8" />
                    ) : (
                      <span className="font-bold text-lg">{step.id}</span>
                    )}
                  </motion.div>
                  
                  {/* Step Content Card */}
                  <motion.div
                    className={`${position.side === 'center' ? 'w-80 mt-4' : 'w-64'}`}
                    initial={{ opacity: 0.7 }}
                    animate={{ 
                      opacity: index === currentStep ? 1 : 0.8,
                      scale: index === currentStep ? 1.05 : 1
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className={`border-2 transition-all duration-300 ${
                      index === currentStep 
                        ? 'border-black shadow-xl bg-white' 
                        : 'border-gray-200 hover:border-gray-400 shadow-md'
                    }`}>
                      <CardContent className="p-5">
                        <h4 className={`font-bold text-base mb-2 ${
                          index === currentStep ? 'text-black' : 'text-gray-700'
                        }`}>
                          {step.title}
                        </h4>
                        <p className={`text-sm leading-relaxed ${
                          index === currentStep ? 'text-gray-700' : 'text-gray-500'
                        }`}>
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                    
                    {/* Expanded Details Under Card */}
                    <AnimatePresence>
                      {index === currentStep && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="mt-4"
                        >
                          <Card className="border border-gray-300 bg-gray-50">
                            <CardContent className="p-4">
                              <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                                  {step.id}
                                </div>
                                <div>
                                  <h5 className="font-semibold text-black mb-2">Detailed Process</h5>
                                  <p className="text-sm text-gray-700 leading-relaxed">
                                    {step.details}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
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



      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={prevStep}
          className="flex items-center gap-1 text-xs hover:bg-black hover:text-white transition-colors"
        >
          <ChevronLeft className="w-3 h-3" />
          Prev
        </Button>
        
        <div className="flex gap-1">
          {roadmapSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index === currentStep ? 'bg-black w-4' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={nextStep}
          className="flex items-center gap-1 text-xs hover:bg-black hover:text-white transition-colors"
        >
          Next
          <ChevronRight className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}