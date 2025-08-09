import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, ArrowRight, X } from "lucide-react";

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
    description: "We understand your goals and challenges.",
    details: "During the initial inquiry phase, we'll have a detailed conversation about your business objectives, current challenges, and specific goals you want to achieve. This helps us understand the scope and direction of your project from the very beginning."
  },
  {
    id: 2,
    title: "Needs Assessment",
    description: "We review your current systems, strategy, and resources.",
    details: "Our team conducts a comprehensive review of your existing systems, current business strategy, available resources, and technical infrastructure. This assessment helps us identify gaps, opportunities, and areas for improvement."
  },
  {
    id: 3,
    title: "Market & Technology Review",
    description: "We evaluate trends, competitors, and tech stack.",
    details: "We analyze current market trends, study your competitors' approaches, and evaluate the most suitable technology stack for your project. This ensures your solution will be competitive and built with the right tools."
  },
  {
    id: 4,
    title: "Strategy & Planning",
    description: "We outline business strategy, budget, and project plan.",
    details: "Based on our analysis, we develop a comprehensive business strategy, create detailed project timelines, establish realistic budgets, and outline the implementation approach that aligns with your business goals."
  },
  {
    id: 5,
    title: "Risk Assessment",
    description: "We identify potential challenges and mitigation strategies.",
    details: "Our team identifies potential risks, technical challenges, and market obstacles that could impact your project. We then develop specific mitigation strategies and contingency plans to address these challenges proactively."
  },
  {
    id: 6,
    title: "Action Plan Delivery",
    description: "You receive a clear, actionable roadmap for execution.",
    details: "Finally, you receive a comprehensive action plan with clear steps, timelines, deliverables, and success metrics. This roadmap serves as your guide for successful project execution and achieving your business objectives."
  }
];

export default function ConsultationRoadmap() {
  const [selectedStep, setSelectedStep] = useState<number | null>(null);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-black mb-2">Our Consultation Process</h3>
        <p className="text-gray-600 text-sm">Click on any step to learn more</p>
      </div>

      <div className="space-y-4">
        {roadmapSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative"
          >
            {/* Connector Line */}
            {index < roadmapSteps.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200 z-0" />
            )}
            
            <motion.div
              className="relative z-10 cursor-pointer"
              onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card className={`border-2 transition-all duration-300 ${
                selectedStep === step.id 
                  ? 'border-black shadow-lg bg-gray-50' 
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      selectedStep === step.id 
                        ? 'bg-black text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {selectedStep === step.id ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <span className="font-bold text-sm">{step.id}</span>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-black text-sm mb-1 leading-tight">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 text-xs leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    
                    <ArrowRight className={`w-4 h-4 transition-transform ${
                      selectedStep === step.id ? 'rotate-90' : ''
                    } text-gray-400`} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Expanded Details */}
            <AnimatePresence>
              {selectedStep === step.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="ml-16 mt-2">
                    <Card className="border-l-4 border-l-black bg-white shadow-sm">
                      <CardContent className="p-4">
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {step.details}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center pt-6 border-t border-gray-200"
      >
        <Button 
          variant="outline" 
          size="sm"
          className="text-black border-black hover:bg-black hover:text-white transition-colors"
        >
          Start Your Consultation
        </Button>
      </motion.div>
    </div>
  );
}