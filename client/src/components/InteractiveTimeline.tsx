import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, ArrowRight } from 'lucide-react';

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  duration: string;
}

const timelineSteps: TimelineStep[] = [
  {
    id: 1,
    title: "Discovery & Planning",
    description: "We dive deep into your business goals, target audience, and technical requirements to create a comprehensive project roadmap.",
    duration: "1-2 days"
  },
  {
    id: 2,
    title: "Design & Prototyping",
    description: "Our designers craft pixel-perfect mockups and interactive prototypes that bring your vision to life.",
    duration: "3-5 days"
  },
  {
    id: 3,
    title: "Development & Testing",
    description: "Clean, efficient code meets rigorous testing to ensure your website performs flawlessly across all devices.",
    duration: "5-10 days"
  },
  {
    id: 4,
    title: "Launch & Optimization",
    description: "From deployment to performance optimization, we ensure your site launches smoothly and continues to excel.",
    duration: "1-2 days"
  }
];

export default function InteractiveTimeline() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Development Process
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A proven methodology that delivers exceptional results every time
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Timeline Navigation */}
          <div className="space-y-6">
            {timelineSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`cursor-pointer transition-all duration-300 ${
                  activeStep === step.id ? 'scale-105' : 'hover:scale-102'
                }`}
                onClick={() => setActiveStep(step.id)}
                whileHover={{ x: 5 }}
              >
                <div className="flex items-start gap-4 p-6 rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex-shrink-0">
                    {activeStep >= step.id ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className={`font-semibold ${
                        activeStep === step.id ? 'text-black' : 'text-gray-700'
                      }`}>
                        {step.title}
                      </h3>
                      <span className="text-sm text-gray-500 font-medium">
                        {step.duration}
                      </span>
                    </div>
                    <p className={`text-sm ${
                      activeStep === step.id ? 'text-gray-600' : 'text-gray-500'
                    }`}>
                      Step {index + 1} of {timelineSteps.length}
                    </p>
                  </div>
                  {activeStep === step.id && (
                    <ArrowRight className="w-5 h-5 text-black" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Active Step Details */}
          <div className="relative">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full mb-4">
                  Step {activeStep}
                </span>
                <h3 className="text-2xl font-bold mb-4">
                  {timelineSteps[activeStep - 1].title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {timelineSteps[activeStep - 1].description}
                </p>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  Duration: {timelineSteps[activeStep - 1].duration}
                </span>
                {activeStep < timelineSteps.length && (
                  <motion.button
                    className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors"
                    onClick={() => setActiveStep(activeStep + 1)}
                    whileHover={{ x: 5 }}
                  >
                    Next Step
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}