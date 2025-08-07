import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Smartphone, Users, Globe, Shield, Code2, CheckCircle, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const appTypes = [
  {
    id: "private",
    title: "Private Apps",
    subtitle: "For Companies & Employees",
    description: "Internal applications designed for your team, employees, and company operations",
    icon: Users,
    color: "from-blue-500 to-indigo-600",
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
    color: "from-emerald-500 to-teal-600",
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
  { name: "React Native", icon: "📱" },
  { name: "Flutter", icon: "🚀" },
  { name: "iOS Native", icon: "🍎" },
  { name: "Android Native", icon: "🤖" },
  { name: "Progressive Web Apps", icon: "🌐" },
  { name: "Cross-Platform", icon: "⚡" }
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

  useSEO({
    title: "Mobile App Development Services - WebNova",
    description: "Professional mobile app development for private company apps and public consumer applications. iOS, Android, and cross-platform solutions.",
    keywords: "mobile app development, iOS app, Android app, private apps, public apps, company apps, Saudi Arabia",
    canonical: "/get-app"
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-black text-white overflow-hidden">
        <CustomCursor />
        
        {/* Navigation */}
        <div className="absolute top-8 left-8 z-50">
          <Link href="/">
            <motion.div
              whileHover={{ x: -4 }}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </motion.div>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-8 py-20">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Smartphone className="w-8 h-8 text-blue-500" />
              <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                Mobile Apps
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Get Your App
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
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
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your App Type</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {appTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedType(type.id)}
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedType === type.id ? 'ring-2 ring-white/30' : ''
                  }`}
                >
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-gray-600 h-full">
                    <CardHeader className="pb-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mb-4`}>
                        <type.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <CardTitle className="text-2xl text-white">{type.title}</CardTitle>
                      <p className="text-lg text-gray-400">{type.subtitle}</p>
                      <p className="text-gray-300">{type.description}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-white">Key Features:</h4>
                        <ul className="space-y-2">
                          {type.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-gray-300">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-3 text-white">Benefits:</h4>
                        <ul className="space-y-2">
                          {type.benefits.map((benefit) => (
                            <li key={benefit} className="flex items-center gap-2 text-gray-300">
                              <Star className="w-4 h-4 text-yellow-500" />
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

          {/* Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Technologies We Use</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {technologies.map((tech) => (
                <motion.div
                  key={tech.name}
                  whileHover={{ y: -4, scale: 1.05 }}
                  className="text-center p-6 bg-gray-900/30 rounded-xl border border-gray-800 hover:border-gray-600 transition-colors"
                >
                  <div className="text-3xl mb-3">{tech.icon}</div>
                  <p className="text-sm text-gray-300">{tech.name}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Development Process */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Our Development Process</h2>
            
            <div className="space-y-6">
              {developmentProcess.map((phase, index) => (
                <motion.div
                  key={phase.step}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="flex items-center gap-6 p-6 bg-gray-900/30 rounded-xl border border-gray-800"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-xl">
                    {phase.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{phase.title}</h3>
                    <p className="text-gray-400">{phase.description}</p>
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
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-12 border border-blue-500/30">
              <h2 className="text-4xl font-bold mb-6">Ready to Build Your App?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Let's discuss your app idea and create a solution that perfectly fits your needs and budget.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                  >
                    <Code2 className="w-5 h-5 mr-2" />
                    Start Your Project
                  </Button>
                </Link>
                
                <Link href="/portfolio">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg"
                  >
                    View Our Apps
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