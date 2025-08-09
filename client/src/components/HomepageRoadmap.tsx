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

  // Interactive carousel for large screens
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-black mb-2">Our Consultation Process</h3>
        <p className="text-gray-600">Navigate through our proven 6-step process</p>
      </div>

      {/* Interactive Roadmap */}
      <div className="relative">
        {/* Background Progress Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
        <motion.div 
          className="absolute top-1/2 left-0 h-0.5 bg-black -translate-y-1/2 z-10"
          initial={{ width: "0%" }}
          animate={{ 
            width: `${((currentStep + 1) / roadmapSteps.length) * 100}%` 
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Step Indicators */}
        <div className="relative flex justify-between items-center">
          {roadmapSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative z-20 cursor-pointer"
              onClick={() => setCurrentStep(index)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-black text-white shadow-lg' 
                    : 'bg-white border-2 border-gray-300 text-gray-600'
                }`}
                whileHover={{ 
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)" 
                }}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="font-bold text-sm">{step.id}</span>
                )}
              </motion.div>
              
              {/* Step Title */}
              <motion.div
                className="absolute top-16 left-1/2 -translate-x-1/2 text-center min-w-24"
                initial={{ opacity: 0.6 }}
                animate={{ 
                  opacity: index === currentStep ? 1 : 0.6,
                  scale: index === currentStep ? 1.05 : 1
                }}
              >
                <div className={`text-xs font-medium ${
                  index === currentStep ? 'text-black' : 'text-gray-500'
                }`}>
                  {step.title}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Current Step Details */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mt-12"
        >
          <Card className="border-2 border-black bg-gradient-to-br from-white to-gray-50 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center mx-auto mb-4"
                >
                  <span className="text-2xl font-bold">{roadmapSteps[currentStep].id}</span>
                </motion.div>
                
                <motion.h4
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-black"
                >
                  {roadmapSteps[currentStep].title}
                </motion.h4>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 max-w-2xl mx-auto"
                >
                  {roadmapSteps[currentStep].details}
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={prevStep}
          className="flex items-center gap-2 hover:bg-black hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        
        <div className="flex gap-2">
          {roadmapSteps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentStep ? 'bg-black w-6' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={nextStep}
          className="flex items-center gap-2 hover:bg-black hover:text-white transition-colors"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Auto-advance indicator */}
      <motion.div
        className="text-center text-xs text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Click on any step or use navigation arrows to explore
      </motion.div>
    </div>
  );
}