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

      {/* Vertical Interactive Roadmap */}
      <div className="relative max-w-md mx-auto">
        {/* Background Progress Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 z-0" />
        <motion.div 
          className="absolute left-6 top-0 w-0.5 bg-black z-10"
          initial={{ height: "0%" }}
          animate={{ 
            height: `${((currentStep + 1) / roadmapSteps.length) * 100}%` 
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Step Indicators */}
        <div className="relative space-y-8">
          {roadmapSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative z-20 cursor-pointer flex items-center gap-4"
              onClick={() => setCurrentStep(index)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  index <= currentStep 
                    ? 'bg-black text-white shadow-lg' 
                    : 'bg-white border-2 border-gray-300 text-gray-600'
                }`}
                whileHover={{ 
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)" 
                }}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <span className="font-bold text-sm">{step.id}</span>
                )}
              </motion.div>
              
              {/* Step Content */}
              <motion.div
                className="flex-1"
                initial={{ opacity: 0.6 }}
                animate={{ 
                  opacity: index === currentStep ? 1 : 0.7,
                  scale: index === currentStep ? 1.02 : 1
                }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`border transition-all duration-300 ${
                  index === currentStep 
                    ? 'border-black shadow-md bg-gray-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}>
                  <CardContent className="p-4">
                    <h4 className={`font-semibold text-sm mb-1 ${
                      index === currentStep ? 'text-black' : 'text-gray-700'
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-xs leading-relaxed ${
                      index === currentStep ? 'text-gray-700' : 'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
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