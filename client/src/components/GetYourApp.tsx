import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Smartphone, Users, Globe, ArrowRight, Star, CheckCircle, Zap, Code, Palette } from "lucide-react";
import { MagneticElement, FloatingElement, MorphingShape } from "@/components/MagneticElements";
import { useState, useEffect } from "react";

const appTypes = [
  {
    title: "Private Apps",
    subtitle: "For Companies & Employees",
    description: "Internal applications designed for your team and company operations",
    icon: Users,
    features: [
      "Employee management",
      "Internal communication",
      "Workflow automation",
      "Data analytics"
    ],
    highlight: "Boost Productivity"
  },
  {
    title: "Public Apps",
    subtitle: "For Customers & Market",
    description: "Consumer-facing applications for your customers and the general public",
    icon: Globe,
    features: [
      "E-commerce platforms",
      "Social media apps",
      "Booking systems",
      "Entertainment apps"
    ],
    highlight: "Reach More Customers"
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const floatingIcons = [
  { Icon: Code, delay: 0, range: 25 },
  { Icon: Palette, delay: 1, range: 30 },
  { Icon: Zap, delay: 2, range: 20 }
];

export default function GetYourApp() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({
        rotate: [0, 360],
        transition: { duration: 20, ease: "linear" }
      });
    }, 100);
    return () => clearInterval(interval);
  }, [controls]);

  return (
    <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Shapes */}
        <MorphingShape 
          className="absolute top-20 right-20" 
          size={60}
          colors={['#000000', '#374151', '#6B7280']}
        />
        <MorphingShape 
          className="absolute bottom-32 left-16" 
          size={80}
          colors={['#1F2937', '#4B5563', '#9CA3AF']}
        />
        
        {/* Floating Icons */}
        {floatingIcons.map(({ Icon, delay, range }, index) => (
          <FloatingElement 
            key={index}
            range={range} 
            duration={4 + index} 
            delay={delay}
            className={`absolute ${
              index === 0 ? 'top-40 left-1/4' : 
              index === 1 ? 'top-60 right-1/3' :
              'bottom-60 left-1/5'
            }`}
          >
            <motion.div 
              className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center backdrop-blur-sm"
              whileHover={{ scale: 1.2, backgroundColor: "rgba(0,0,0,0.1)" }}
            >
              <Icon className="w-6 h-6 text-gray-700/50" />
            </motion.div>
          </FloatingElement>
        ))}
        
        {/* Animated Lines */}
        <motion.div
          className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"
          animate={{
            scaleX: [0.5, 1, 0.5],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-black to-transparent"
          animate={{
            scaleX: [1, 0.3, 1],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <motion.div 
            className="flex items-center justify-center gap-2 mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              <Smartphone className="w-8 h-8 text-gray-900" />
            </motion.div>
            <motion.span 
              className="text-sm font-medium text-gray-600 uppercase tracking-wider"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Mobile Applications
            </motion.span>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
            animate={{
              backgroundPosition: ['0%', '100%', '0%']
            }}
            style={{
              background: 'linear-gradient(45deg, #000000, #374151, #000000)',
              backgroundSize: '200% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            Get Your App
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Transform your business with custom mobile applications. Choose between private employee tools or public consumer apps.
          </motion.p>
        </motion.div>

        {/* App Types Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {appTypes.map((app, index) => (
            <MagneticElement
              key={app.title}
              strength={0.2}
              className="group cursor-pointer"
            >
              <motion.div
                variants={fadeInUp}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03,
                  rotateY: 5,
                  rotateX: 5 
                }}
                onHoverStart={() => setHoveredCard(index)}
                onHoverEnd={() => setHoveredCard(null)}
                className="h-full"
                style={{ perspective: 1000 }}
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-gray-200 hover:border-gray-400 transition-all duration-500 shadow-sm hover:shadow-2xl relative overflow-hidden">
                  {/* Card Glow Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-gray-900/5 via-transparent to-gray-900/5 opacity-0"
                    animate={{
                      opacity: hoveredCard === index ? 1 : 0,
                      background: hoveredCard === index ? 
                        'linear-gradient(45deg, rgba(0,0,0,0.1), transparent, rgba(0,0,0,0.1))' : 
                        'linear-gradient(45deg, rgba(0,0,0,0.05), transparent, rgba(0,0,0,0.05))'
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <CardHeader className="pb-4 relative z-10">
                    <motion.div 
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-black to-gray-800 flex items-center justify-center mb-4 relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.15,
                        rotate: [0, -5, 5, 0],
                        background: 'linear-gradient(45deg, #000000, #374151, #000000)'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        animate={hoveredCard === index ? {
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        } : {}}
                        transition={{ duration: 0.6 }}
                      >
                        <app.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      {/* Icon Background Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={hoveredCard === index ? {
                          x: [-100, 100],
                          opacity: [0, 1, 0]
                        } : {}}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </motion.div>
                  
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-2xl text-gray-900">{app.title}</CardTitle>
                      <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gray-900 text-white">
                        {app.highlight}
                      </span>
                    </div>
                    
                    <p className="text-sm font-medium text-gray-500 mb-2">{app.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed">{app.description}</p>
                  </CardHeader>
                
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-3 text-gray-900">Key Features:</h4>
                      <ul className="space-y-2">
                        {app.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-gray-900 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </MagneticElement>
          ))}
        </motion.div>

        {/* Technologies Preview */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-gray-900">Technologies We Use</h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "React Native",
              "Flutter", 
              "iOS Native",
              "Android",
              "PWA",
              "Cross-Platform"
            ].map((tech, index) => (
              <MagneticElement key={tech} strength={0.15}>
                <motion.div
                  whileHover={{ 
                    y: -8, 
                    scale: 1.1,
                    rotateY: 10,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex items-center justify-center p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all duration-500 min-h-[80px] cursor-pointer relative overflow-hidden group"
                >
                  {/* Tech card shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{
                      x: [-100, 100]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  />
                  <motion.p 
                    className="text-sm font-medium text-gray-700 text-center z-10"
                    whileHover={{ scale: 1.05 }}
                  >
                    {tech}
                  </motion.p>
                </motion.div>
              </MagneticElement>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center"
        >
          <div className="bg-gray-50 rounded-3xl p-12 border border-gray-200">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Ready to Build Your App?</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss your app idea and create a solution that perfectly fits your needs and budget.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/project-form">
                <MagneticElement strength={0.3}>
                  <motion.div 
                    whileHover={{ 
                      scale: 1.08,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                    }} 
                    whileTap={{ scale: 0.95 }}
                    className="relative overflow-hidden rounded-lg"
                  >
                    <Button 
                      size="lg"
                      className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg group relative overflow-hidden"
                    >
                      {/* Button shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: [-100, 100]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          repeatDelay: 3 
                        }}
                      />
                      <motion.div className="flex items-center z-10 relative">
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Smartphone className="w-5 h-5 mr-2" />
                        </motion.div>
                        Start Your Project
                        <motion.div
                          className="ml-2"
                          animate={{ x: [0, 4, 0] }}
                          transition={{ duration: 1, repeat: Infinity }}
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      </motion.div>
                    </Button>
                  </motion.div>
                </MagneticElement>
              </Link>
              
              <Link href="/get-app">
                <MagneticElement strength={0.25}>
                  <motion.div 
                    whileHover={{ 
                      scale: 1.05,
                      borderColor: "#000000",
                      backgroundColor: "rgba(0,0,0,0.02)"
                    }} 
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 text-lg transition-all duration-500 relative overflow-hidden"
                    >
                      <motion.span
                        className="relative z-10"
                        whileHover={{ letterSpacing: "0.05em" }}
                        transition={{ duration: 0.2 }}
                      >
                        Explore App Options
                      </motion.span>
                    </Button>
                  </motion.div>
                </MagneticElement>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}