import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Smartphone, Users, Globe, Shield, Code2, CheckCircle, Star, Zap, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { MagneticElement, FloatingElement, GlowingBorder } from "@/components/MagneticElements";

const appTypes = [
  {
    id: "private",
    title: "Private Apps",
    subtitle: "For Companies & Employees",
    description: "Internal applications designed for your team, employees, and company operations",
    icon: Users,

    features: [
      "Employee management systems",
      "Internal communication tools",
      "Workflow automation",
      "Data analytics dashboards",
      "Secure authentication",
      "Role-based access control"
    ],
    benefits: [
      "Enhanced productivity",
      "Streamlined operations",
      "Secure data handling",
      "Custom integrations"
    ],

  },
  {
    id: "public",
    title: "Public Apps", 
    subtitle: "For Customers & Market",
    description: "Consumer-facing applications for your customers and the general public",
    icon: Globe,

    features: [
      "E-commerce platforms",
      "Social media apps",
      "Booking systems",
      "Entertainment apps",
      "Educational platforms",
      "Service marketplaces"
    ],
    benefits: [
      "Reach wider audience",
      "Generate revenue",
      "Build brand presence",
      "Customer engagement"
    ],

  }
];

const technologies = [
  { 
    name: "React Native", 
    description: "Build native apps with React",
    color: "from-gray-800 to-black",
    icon: "⚛︎",
    bgColor: "bg-white",
    borderColor: "border-gray-300"
  },
  { 
    name: "Flutter", 
    description: "Google's UI toolkit",
    color: "from-gray-700 to-gray-900",
    icon: "🦋",
    bgColor: "bg-white",
    borderColor: "border-gray-300"
  },
  { 
    name: "iOS Native", 
    description: "Swift & SwiftUI development",
    color: "from-black to-gray-800",
    icon: "📱",
    bgColor: "bg-white",
    borderColor: "border-gray-300"
  },
  { 
    name: "Android Native", 
    description: "Kotlin & Java development",
    color: "from-gray-900 to-black",
    icon: "📲",
    bgColor: "bg-white",
    borderColor: "border-gray-300"
  },
  { 
    name: "Progressive Web Apps", 
    description: "Web apps that feel native",
    color: "from-gray-800 to-gray-600",
    icon: "🌐",
    bgColor: "bg-white",
    borderColor: "border-gray-300"
  },
  { 
    name: "Cross-Platform", 
    description: "One codebase, all platforms",
    color: "from-black to-gray-700",
    icon: "🔗",
    bgColor: "bg-white",
    borderColor: "border-gray-300"
  }
];

const developmentProcess = [
  {
    step: "01",
    title: "Discovery & Planning",
    description: "We analyze your requirements and create a detailed project roadmap"
  },
  {
    step: "02", 
    title: "Design & Prototyping",
    description: "User-centered design with interactive prototypes and wireframes"
  },
  {
    step: "03",
    title: "Development",
    description: "Agile development with regular updates and testing phases"
  },
  {
    step: "04",
    title: "Testing & Launch",
    description: "Comprehensive testing before deployment to app stores"
  },
  {
    step: "05",
    title: "Support & Updates",
    description: "Ongoing maintenance, updates, and feature enhancements"
  }
];

export default function GetApp() {
  const [selectedType, setSelectedType] = useState<string>("private");

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: "Mobile App Development Services - WebNova",
    description: "Professional mobile app development for private company apps and public consumer applications. iOS, Android, and cross-platform solutions.",
    keywords: "mobile app development, iOS app, Android app, private apps, public apps, company apps, Saudi Arabia",
    canonical: "/get-app"
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
        <CustomCursor />
        
        {/* Navigation */}
        <div className="absolute top-8 left-8 z-50">
          <Link href="/">
            <motion.div
              whileHover={{ x: -4 }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </motion.div>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-8" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Smartphone className="w-8 h-8 text-gray-900" />
              <Badge variant="outline" className="border-gray-300 text-gray-600">
                Mobile Apps
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
              Get Your App
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Transform your business with custom mobile applications. From private employee tools to public consumer apps, we build solutions that drive results.
            </p>
          </motion.div>

          {/* App Type Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Choose Your App Type</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {appTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedType(type.id)}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedType === type.id ? 'ring-2 ring-gray-900/30' : ''
                  }`}
                >
                  <Card className="bg-white border-gray-200 hover:border-gray-400 h-full shadow-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 rounded-xl bg-black flex items-center justify-center mb-4">
                        <type.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <CardTitle className="text-2xl text-gray-900">{type.title}</CardTitle>
                      <p className="text-lg text-gray-600">{type.subtitle}</p>
                      <p className="text-gray-600">{type.description}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900">Key Features:</h4>
                        <ul className="space-y-2">
                          {type.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-gray-600">
                              <CheckCircle className="w-4 h-4 text-gray-900" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-gray-900">Benefits:</h4>
                        <ul className="space-y-2">
                          {type.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-center gap-2 text-gray-600">
                              <Star className="w-4 h-4 text-gray-900" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      

                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20 relative bg-white p-12 rounded-3xl shadow-lg border border-gray-200"
          >
            {/* Floating background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <FloatingElement range={30} duration={8} delay={0}>
                <div className="absolute top-10 left-1/4 w-20 h-20 bg-blue-500/5 rounded-full blur-xl" />
              </FloatingElement>
              <FloatingElement range={25} duration={10} delay={2}>
                <div className="absolute bottom-20 right-1/3 w-16 h-16 bg-purple-500/5 rounded-full blur-xl" />
              </FloatingElement>
            </div>

            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="flex items-center justify-center gap-3 mb-4"
                whileHover={{ scale: 1.05 }}
              >
                <Zap className="w-8 h-8 text-black" />
                <h2 className="text-3xl font-bold text-black">Technologies We Use</h2>
                <Sparkles className="w-6 h-6 text-gray-800" />
              </motion.div>
              
              <motion.p 
                className="text-lg text-gray-700 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Cutting-edge technologies to build your perfect mobile application
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {technologies.map((tech, index) => (
                <MagneticElement key={tech.name} strength={0.15}>
                  <motion.div
                    initial={{ opacity: 0, y: 50, rotateY: -15 }}
                    animate={{ opacity: 1, y: 0, rotateY: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ 
                      y: -6, 
                      scale: 1.02
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group cursor-pointer h-full"
                    style={{ perspective: 1000 }}
                  >
                    <div className="h-full min-h-[200px] flex items-stretch">
                      <div className={`relative h-full w-full p-4 md:p-6 lg:p-8 ${tech.bgColor} rounded-2xl border-2 ${tech.borderColor} transition-all duration-500 overflow-hidden group-hover:border-opacity-80 flex flex-col justify-center`}>
                        {/* Subtle background gradient */}
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                        />
                        
                        
                        {/* Content */}
                        <div className="relative z-10 text-center">
                          <motion.div 
                            className="text-4xl mb-4"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            {tech.icon}
                          </motion.div>
                          
                          <motion.h3 
                            className="text-xl font-bold mb-3 text-black"
                            whileHover={{ scale: 1.05 }}
                          >
                            {tech.name}
                          </motion.h3>
                          
                          <motion.p 
                            className="text-gray-700 text-sm leading-relaxed"
                            initial={{ opacity: 0.8 }}
                            whileHover={{ opacity: 1, y: -2 }}
                            transition={{ duration: 0.2 }}
                          >
                            {tech.description}
                          </motion.p>
                          
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </MagneticElement>
              ))}
            </div>
            
            {/* Call to action for technologies */}
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <p className="text-gray-700 mb-6">
                Not sure which technology fits your project? Let us help you choose!
              </p>
              
              <Link href="/consultation">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                  >
                    Get Technology Consultation
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>

          {/* Development Process */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Development Process</h2>
            
            <div className="space-y-6">
              {developmentProcess.map((phase, index) => (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="flex items-center gap-6 p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
                >
                  <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center font-bold text-xl text-white">
                    {phase.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-gray-900">{phase.title}</h3>
                    <p className="text-gray-600">{phase.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-gray-50 rounded-2xl p-12 border border-gray-200">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Build Your App?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Let's discuss your app idea and create a solution that perfectly fits your needs and budget.
              </p>
              
              <div className="flex justify-center">
                <Link href="/project-form">
                  <Button 
                    size="lg"
                    className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg"
                  >
                    <Code2 className="w-5 h-5 mr-2" />
                    Start Your Project
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        
        <Footer />
      </div>
    </PageTransition>
  );
}