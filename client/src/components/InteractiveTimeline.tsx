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
    title: "Discovery & Planning",
    description: "We dive deep into your business goals, target audience, and technical requirements to create a comprehensive project roadmap.",
    duration: "1-2 days",
    detailedDescription: "This crucial foundation phase involves comprehensive research and strategic planning. We conduct stakeholder interviews, analyze your current digital presence, research competitors, and define user personas. Our team creates detailed wireframes, establishes information architecture, and develops a technical specification document that serves as the blueprint for your entire project.",
    deliverables: [
      "Project Brief & Requirements Document",
      "User Persona Analysis",
      "Competitor Research Report", 
      "Site Architecture & Wireframes",
      "Technical Specifications",
      "Timeline & Milestone Schedule"
    ],
    tools: ["Figma", "Miro", "Google Analytics", "Hotjar"],
    keyFeatures: [
      "Stakeholder consultation sessions",
      "Market & competitor analysis",
      "User journey mapping",
      "Technical feasibility assessment"
    ]
  },
  {
    id: 2,
    title: "Design & Prototyping", 
    description: "Our designers craft pixel-perfect mockups and interactive prototypes that bring your vision to life.",
    duration: "3-5 days",
    detailedDescription: "We transform your vision into stunning visual designs that captivate your audience. This phase includes creating mood boards, developing your brand identity, designing high-fidelity mockups for all screen sizes, and building interactive prototypes. We focus on user experience, accessibility, and modern design principles to ensure your website not only looks exceptional but also converts visitors into customers.",
    deliverables: [
      "Brand Guidelines & Style Guide",
      "High-Fidelity Desktop Mockups",
      "Mobile & Tablet Responsive Designs",
      "Interactive Prototype",
      "Design System & Component Library",
      "Final Design Presentation"
    ],
    tools: ["Figma", "Adobe Creative Suite", "Principle", "InVision"],
    keyFeatures: [
      "Custom brand identity development",
      "Responsive design for all devices",
      "Interactive prototype testing",
      "Accessibility-first design approach"
    ]
  },
  {
    id: 3,
    title: "Development & Testing",
    description: "Clean, efficient code meets rigorous testing to ensure your website performs flawlessly across all devices.",
    duration: "5-10 days", 
    detailedDescription: "Our expert developers bring your designs to life using cutting-edge technologies and best practices. We write clean, semantic code that's optimized for performance and SEO. This phase includes front-end development, back-end integration, database setup, content management system implementation, and comprehensive testing across multiple browsers and devices to ensure flawless functionality.",
    deliverables: [
      "Fully Functional Website",
      "Content Management System",
      "SEO Optimization Implementation",
      "Performance Optimization Report",
      "Security Implementation",
      "Quality Assurance Testing Report"
    ],
    tools: ["React", "Node.js", "PostgreSQL", "Vite", "Tailwind CSS"],
    keyFeatures: [
      "Modern framework implementation",
      "Database design & optimization",
      "Cross-browser compatibility testing",
      "Performance & security auditing"
    ]
  },
  {
    id: 4,
    title: "Launch & Optimization",
    description: "From deployment to performance optimization, we ensure your site launches smoothly and continues to excel.",
    duration: "1-2 days",
    detailedDescription: "We handle every aspect of your website launch with precision and care. This includes domain setup, hosting configuration, SSL certificate installation, and DNS management. Post-launch, we monitor performance metrics, implement analytics tracking, provide training on content management, and offer ongoing support to ensure your website continues to perform at its peak.",
    deliverables: [
      "Live Website Deployment",
      "Domain & Hosting Setup",
      "SSL Certificate & Security Config",
      "Analytics & Tracking Implementation",
      "CMS Training Documentation",
      "Maintenance & Support Plan"
    ],
    tools: ["Replit Deployments", "Cloudflare", "Google Analytics", "Search Console"],
    keyFeatures: [
      "Zero-downtime deployment",
      "Performance monitoring setup",
      "SEO & analytics configuration", 
      "Comprehensive launch checklist"
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