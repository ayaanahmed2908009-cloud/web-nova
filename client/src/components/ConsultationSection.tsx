import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Clock, Target, CheckCircle, ArrowRight } from "lucide-react";

const consultationTypes = [
  {
    title: "General Consultation",
    description: "Comprehensive consultation covering all aspects of your digital project needs",
    icon: MessageSquare,
    duration: "60-90 minutes",
    price: "500-1000 SAR",
    features: ["Technology Review", "Business Strategy", "Project Planning", "Budget Planning", "Risk Assessment", "Market Analysis"]
  }
];

export default function ConsultationSection() {
  return (
    <section id="consultation" className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 relative">
        {/* Header with Left-Aligned Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          className="grid lg:grid-cols-2 gap-16 items-center w-full mb-16"
        >
          {/* Left side - Title with immersive fade */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-20%" }}
            className="space-y-8"
          >
            <div className="overflow-hidden">
              <motion.h2 
                className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-gray-900"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.8, 
                    ease: [0.16, 1, 0.3, 1],
                    staggerChildren: 0.1,
                    delayChildren: 0.2
                  }
                }}
                viewport={{ once: true, margin: "-20%" }}
              >
                <motion.span 
                  className="block text-gray-900"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  Expert
                </motion.span>
                <motion.span 
                  className="block text-gray-600"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  Consultation
                </motion.span>
                <motion.span 
                  className="block text-gray-900"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Services
                </motion.span>
              </motion.h2>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                filter: "blur(0px)",
                transition: { 
                  duration: 0.8, 
                  delay: 0.6,
                  ease: [0.16, 1, 0.3, 1] 
                }
              }}
              viewport={{ once: true, margin: "-20%" }}
              className="text-xl text-gray-600 leading-relaxed max-w-lg"
            >
              Get personalized guidance from our experienced team. Whether you need technical advice, 
              strategic planning, or project consultation, we're here to help you succeed.
            </motion.p>
          </motion.div>
          
          {/* Right side - Statistics */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">2+</div>
                <div className="text-gray-600">Consultation Projects</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">100%</div>
                <div className="text-gray-600">Satisfaction Rate</div>
              </div>
              <div className="text-center col-span-2">
                <div className="text-4xl font-bold text-gray-900 mb-2">1</div>
                <div className="text-gray-600">Year Experience</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Consultation Types */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}  // Delay to start after heading animation
          viewport={{ once: true }}
          className="grid md:grid-cols-1 max-w-4xl mx-auto gap-8 mb-20"
        >
          {consultationTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + (index * 0.1) }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full border-2 hover:border-gray-400 transition-all duration-300 hover:shadow-xl group-hover:scale-105">
                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-4 rounded-2xl bg-black group-hover:bg-gray-800 transition-all duration-300">
                      <type.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-black">{type.price}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                        <Clock className="w-4 h-4" />
                        {type.duration}
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-3xl mb-4 group-hover:text-gray-800 transition-colors">
                    {type.title}
                  </CardTitle>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {type.description}
                  </p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {type.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-black rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 2px, transparent 0)`,
                backgroundSize: '50px 50px'
              }}></div>
            </div>
            
            <div className="relative">
              <h3 className="text-4xl font-bold mb-6">Ready to Get Expert Advice?</h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Book a consultation with our team and get personalized recommendations for your project. 
                We'll help you make informed decisions and avoid costly mistakes.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/consultation">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg font-semibold group"
                    >
                      Book Consultation
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </Link>
                
                <Link href="/services">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white text-black bg-white hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                    >
                      View All Services
                    </Button>
                  </motion.div>
                </Link>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 text-gray-300 max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-3 py-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-center sm:text-left font-medium">Professional Consultation</span>
                </div>
                <div className="flex items-center justify-center gap-3 py-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-center sm:text-left font-medium">Expert Team</span>
                </div>
                <div className="flex items-center justify-center gap-3 py-2">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-center sm:text-left font-medium">Actionable Insights</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}