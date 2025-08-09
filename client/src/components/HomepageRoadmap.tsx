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
        {/* Organized Curved SVG Path */}
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
                stopColor="#d1d5db" 
              />
            </linearGradient>
          </defs>
          <motion.path
            d="M50 80 Q180 40 300 100 Q220 160 100 180 Q280 220 300 280 Q120 320 100 380 Q280 420 200 500"
            stroke="url(#progressGradient)"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
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
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Current Step Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="mt-8"
        >
          <Card className="border-2 border-black bg-gradient-to-br from-white to-gray-50 shadow-lg">
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-3"
                >
                  <span className="text-lg font-bold">{roadmapSteps[currentStep].id}</span>
                </motion.div>
                
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg font-bold text-black"
                >
                  {roadmapSteps[currentStep].title}
                </motion.h4>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 text-sm leading-relaxed"
                >
                  {roadmapSteps[currentStep].details}
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

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