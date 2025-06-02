import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, ArrowRight, Clock, Star, Settings } from 'lucide-react';

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  duration: string;
}

interface DetailedStep extends TimelineStep {
  detailedDescription: string;
  deliverables: string[];
  tools: string[];
  keyFeatures: string[];
}

const timelineSteps: DetailedStep[] = [
  {
    id: 1,
    title: "Strategic Foundation",
    description: "Your business goals become a clear digital strategy that positions you ahead of competitors.",
    duration: "1-2 days",
    detailedDescription: "We transform your vision into a strategic roadmap that drives real business results. Through deep research and analysis, we uncover opportunities your competitors miss and create a foundation that ensures every design decision serves your bottom line. You'll gain crystal-clear direction and confidence in your digital investment.",
    deliverables: [
      "Strategic Business Assessment",
      "Competitive Advantage Analysis",
      "Target Audience Blueprint", 
      "Conversion-Focused Site Architecture",
      "Technical Success Framework",
      "ROI-Driven Project Roadmap"
    ],
    tools: ["Figma", "Miro", "Google Analytics", "Hotjar"],
    keyFeatures: [
      "Revenue-focused strategy development",
      "Competitive market positioning",
      "User behavior optimization",
      "Technical scalability planning"
    ]
  },
  {
    id: 2,
    title: "Brand Experience Design", 
    description: "Your brand comes alive through designs that captivate visitors and convert them into loyal customers.",
    duration: "3-5 days",
    detailedDescription: "We create a visual identity that doesn't just look stunning—it sells. Every color, font, and layout choice is strategically designed to build trust, communicate value, and guide visitors toward taking action. You'll get a website that not only impresses but actively grows your business.",
    deliverables: [
      "Conversion-Optimized Brand Identity",
      "Revenue-Driving Desktop Designs",
      "Mobile-First Responsive Layouts",
      "Interactive User Experience Prototype",
      "Scalable Design System",
      "Client Presentation & Approval"
    ],
    tools: ["Figma", "Adobe Creative Suite", "Principle", "InVision"],
    keyFeatures: [
      "Psychology-based design decisions",
      "Mobile-first conversion optimization",
      "Interactive user testing",
      "Accessibility compliance guarantee"
    ]
  },
  {
    id: 3,
    title: "High-Performance Development",
    description: "Your design transforms into a lightning-fast, SEO-optimized website that outperforms the competition.",
    duration: "5-10 days", 
    detailedDescription: "We build more than just a website—we engineer a competitive advantage. Using cutting-edge technology and optimization techniques, we create a digital experience that loads instantly, ranks higher in search results, and provides seamless functionality across all devices. Your customers will notice the difference immediately.",
    deliverables: [
      "Lightning-Fast Website",
      "SEO-Optimized Content System",
      "Search Engine Ranking Boost",
      "Performance Analytics Dashboard",
      "Enterprise-Grade Security",
      "Quality Assurance Certification"
    ],
    tools: ["React", "Node.js", "PostgreSQL", "Vite", "Tailwind CSS"],
    keyFeatures: [
      "Sub-second loading speeds",
      "Search engine optimization",
      "Cross-platform compatibility",
      "Advanced security implementation"
    ]
  },
  {
    id: 4,
    title: "Success Launch & Growth",
    description: "Your website goes live with confidence, backed by monitoring systems that ensure continuous peak performance.",
    duration: "1-2 days",
    detailedDescription: "Launch day becomes your competitive advantage activation day. We deploy your website with zero downtime while implementing comprehensive tracking and optimization systems. You'll have complete visibility into your website's performance and the knowledge to maximize its impact on your business growth.",
    deliverables: [
      "Seamless Website Launch",
      "Professional Domain & Hosting",
      "SSL Security & Performance Setup",
      "Growth Analytics Implementation",
      "Content Management Training",
      "Ongoing Success Partnership"
    ],
    tools: ["Replit Deployments", "Cloudflare", "Google Analytics", "Search Console"],
    keyFeatures: [
      "Zero-downtime launch guarantee",
      "Real-time performance monitoring",
      "Growth-focused analytics setup", 
      "Long-term success planning"
    ]
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
          {/* Enhanced Timeline with Progress Line */}
          <div className="relative">
            {/* Vertical progress line */}
            <div className="absolute left-8 top-8 bottom-8 w-px bg-gray-200">
              <motion.div
                className="absolute top-0 left-0 w-full bg-black origin-top"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: activeStep / timelineSteps.length }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              />
              
              {/* Animated flow effect */}
              <motion.div
                className="absolute top-0 left-0 w-full h-4 bg-gradient-to-b from-black to-transparent"
                animate={{ y: [0, 200, 400, 600] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                style={{ opacity: 0.3 }}
              />
            </div>
            
            <div className="space-y-6">
              {timelineSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  className="relative cursor-pointer"
                  onClick={() => setActiveStep(step.id)}
                  whileHover={{ x: 5 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Step number circle */}
                  <motion.div
                    className={`absolute left-6 top-6 w-4 h-4 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                      activeStep >= step.id 
                        ? 'bg-black border-black text-white' 
                        : 'bg-white border-gray-300 text-gray-500'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    animate={activeStep === step.id ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5, repeat: activeStep === step.id ? Infinity : 0 }}
                  >
                    {activeStep >= step.id ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </motion.div>
                  
                  {/* Content card */}
                  <motion.div
                    className={`ml-16 p-6 rounded-2xl border transition-all duration-300 ${
                      activeStep === step.id 
                        ? 'border-black bg-black text-white shadow-xl' 
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`font-semibold text-lg ${
                        activeStep === step.id ? 'text-white' : 'text-black'
                      }`}>
                        {step.title}
                      </h3>
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                        activeStep === step.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {step.duration}
                      </span>
                    </div>
                    
                    <p className={`text-sm leading-relaxed ${
                      activeStep === step.id ? 'text-gray-200' : 'text-gray-600'
                    }`}>
                      {step.description}
                    </p>
                    
                    {/* Progress indicator */}
                    <div className="mt-4 flex items-center gap-2">
                      <span className={`text-xs font-medium ${
                        activeStep === step.id ? 'text-white' : 'text-gray-500'
                      }`}>
                        Step {index + 1} of {timelineSteps.length}
                      </span>
                      <div className={`flex-1 h-1 rounded-full overflow-hidden ${
                        activeStep === step.id ? 'bg-white/20' : 'bg-gray-100'
                      }`}>
                        <motion.div
                          className={`h-full ${
                            activeStep === step.id ? 'bg-white' : 'bg-black'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: activeStep >= step.id ? '100%' : '0%' }}
                          transition={{ duration: 0.8, delay: 0.2 }}
                        />
                      </div>
                    </div>
                    
                    {activeStep === step.id && (
                      <motion.div
                        className="absolute -right-2 top-1/2 transform -translate-y-1/2"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRight className="w-5 h-5 text-white" />
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </div>
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
              <div className="mb-8">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full mb-4">
                  Step {activeStep} Details
                </span>
                <h3 className="text-2xl font-bold mb-4">
                  {timelineSteps[activeStep - 1].title}
                </h3>
                <p className="text-gray-700 leading-relaxed text-base">
                  {timelineSteps[activeStep - 1].detailedDescription}
                </p>
              </div>

              {/* Deliverables */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  What You'll Receive
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {timelineSteps[activeStep - 1].deliverables.map((deliverable, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="w-2 h-2 bg-black rounded-full flex-shrink-0 mt-2" />
                      <span>{deliverable}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tools & Technologies */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-gray-600" />
                  Tools & Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {timelineSteps[activeStep - 1].tools.map((tool, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="px-3 py-1 bg-black text-white text-sm rounded-full font-medium"
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-black mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Key Features
                </h4>
                <div className="space-y-3">
                  {timelineSteps[activeStep - 1].keyFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <ArrowRight className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                      <span className="text-sm leading-relaxed">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">
                    Duration: {timelineSteps[activeStep - 1].duration}
                  </span>
                </div>
                {activeStep < timelineSteps.length && (
                  <motion.button
                    className="flex items-center gap-2 text-black hover:text-gray-600 transition-colors font-medium"
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