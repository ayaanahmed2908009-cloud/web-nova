import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Users, Award, Globe, Clock, Target, Lightbulb, Rocket, Heart, TrendingUp, CheckCircle } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

const stats = [
  { number: "8+", label: "Happy Clients", icon: Users },
  { number: "1", label: "Year Experience", icon: Clock },
  { number: "2", label: "Dedicated Founders", icon: Award },
  { number: "100%", label: "Client Satisfaction", icon: Globe }
];

const team = [
  {
    name: "Ayaan Ahmed",
    role: "Head of Coding Team",
    bio: "Functionality expert specializing in full-stack development, system architecture, and technical solutions"
  },
  {
    name: "Fahad Alsaif",
    role: "Head of Design",
    bio: "Creative design leader focused on user experience, visual aesthetics, and brand identity"
  }
];

const values = [
  {
    title: "Quality First",
    description: "We never compromise on quality. Every project receives our full attention to detail and commitment to excellence."
  },
  {
    title: "Client Success",
    description: "Your success is our success. We work closely with you to understand your goals and deliver results that matter."
  },
  {
    title: "Innovation",
    description: "We stay ahead of industry trends and use cutting-edge technologies to give you a competitive advantage."
  },
  {
    title: "Transparency",
    description: "Clear communication, honest timelines, and transparent pricing. No surprises, just great results."
  }
];

export default function About() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        <CustomCursor />
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="lg" className="gap-3 hover:bg-gray-50 transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </Button>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">About WebNova</div>
              <div className="text-sm text-gray-500 font-medium">Our Story</div>
            </div>
          </div>
          <Link href="/services">
            <Button variant="outline" size="lg" className="gap-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all">
              <Globe className="w-4 h-4" />
              <span className="font-medium">Our Services</span>
            </Button>
          </Link>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-8 pt-16 pb-16">
        {/* Hero Section with Enhanced Design */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -top-10 -right-10 w-60 h-60 bg-gray-100 rounded-full opacity-20"
            />
            <motion.div
              animate={{ 
                rotate: -360,
                scale: [1, 1.2, 1]
              }}
              transition={{ 
                duration: 25, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute -bottom-10 -left-10 w-72 h-72 bg-gray-100 rounded-full opacity-15"
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-8 relative z-10"
          >
            <div className="px-8 py-4 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-full text-sm font-bold shadow-2xl flex items-center gap-3">
              <Users className="w-5 h-5" />
              <span>Meet the Team Behind WebNova</span>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-8xl font-bold mb-10 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Our Story
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-5xl mx-auto relative z-10"
          >
            <p className="text-xl md:text-2xl text-gray-600 leading-relaxed mb-8">
              Two ambitious minds from the{" "}
              <motion.span 
                className="font-bold text-gray-900 inline-block"
                whileHover={{ scale: 1.05 }}
              >
                PIF College Preparation Program
              </motion.span>
              {" "}united by a shared vision to revolutionize{" "}
              <motion.span 
                className="font-bold text-gray-900 inline-block"
                whileHover={{ scale: 1.05 }}
              >
                Saudi Arabia's digital landscape
              </motion.span>
              {" "}with affordable excellence.
            </p>
            
            {/* Quick Achievement Pills */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="px-4 py-2 bg-gray-100 rounded-full flex items-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">PIF Partnership</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="px-4 py-2 bg-gray-100 rounded-full flex items-center gap-2"
              >
                <TrendingUp className="w-4 h-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">8+ Happy Clients</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="px-4 py-2 bg-gray-100 rounded-full flex items-center gap-2"
              >
                <Heart className="w-4 h-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">100% Satisfaction</span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-4 gap-6 mb-24"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="relative group"
            >
              <Card className="h-full border-2 border-gray-100 hover:border-gray-300 transition-all duration-300 overflow-hidden">
                <CardContent className="p-8 text-center relative z-10">
                  <motion.div 
                    className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <stat.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div 
                    className="text-4xl font-bold text-gray-900 mb-3"
                    initial={{ scale: 1 }}
                    whileInView={{ scale: [1, 1.2, 1] }}
                    transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
                </CardContent>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced Timeline Story Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a chance meeting to becoming Saudi Arabia's trusted digital partner
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gray-300 via-gray-400 to-gray-300 hidden md:block"></div>
            
            {/* Timeline Events */}
            <div className="space-y-16">
              {[
                {
                  date: "September 2024",
                  title: "The Beginning",
                  description: "Both founders accepted into the prestigious PIF College Preparation Program",
                  icon: Rocket,
                  align: "left"
                },
                {
                  date: "December 2024",
                  title: "Destined Meeting",
                  description: "United at a PIF competition to solve UN SDG 17 - building an AI crisis management platform",
                  icon: Users,
                  align: "right"
                },
                {
                  date: "March 2025",
                  title: "WebNova is Born",
                  description: "Identified the market gap for affordable, high-quality software in Saudi Arabia",
                  icon: Lightbulb,
                  align: "left"
                },
                {
                  date: "Today",
                  title: "Growing Strong",
                  description: "Serving 8+ clients including PIF, proving our vision of accessible excellence",
                  icon: TrendingUp,
                  align: "right"
                }
              ].map((event, index) => (
                <motion.div
                  key={event.date}
                  initial={{ opacity: 0, x: event.align === "left" ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className={`relative flex items-center ${event.align === "right" ? "md:flex-row-reverse" : ""}`}
                >
                  <div className={`w-full md:w-5/12 ${event.align === "right" ? "md:text-right" : ""}`}>
                    <Card className="border-2 hover:border-gray-300 transition-all duration-300 hover:shadow-xl">
                      <CardContent className="p-6">
                        <div className={`flex items-center gap-3 mb-4 ${event.align === "right" ? "md:flex-row-reverse" : ""}`}>
                          <div className="w-12 h-12 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-lg">
                            <event.icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">{event.date}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{event.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline Dot */}
                  <motion.div 
                    className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-white border-4 border-gray-900 rounded-full z-10 hidden md:block"
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mission & Vision Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-24"
        >
          <Card className="border-2 hover:border-gray-300 transition-all duration-300 overflow-hidden group">
            <CardContent className="p-8 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <Target className="w-12 h-12 text-gray-900 mb-4 relative z-10" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed relative z-10">
                To bridge the gap in Saudi Arabia's software market by providing businesses with affordable, 
                high-quality digital solutions. Premium software without premium prices.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-2 hover:border-gray-300 transition-all duration-300 overflow-hidden group">
            <CardContent className="p-8 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <Globe className="w-12 h-12 text-gray-900 mb-4 relative z-10" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 relative z-10">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed relative z-10">
                To become Saudi Arabia's leading digital transformation partner, empowering every business 
                with cutting-edge technology that drives growth and innovation.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Enhanced Values Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that define who we are and how we work
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { ...values[0], icon: Award },
              { ...values[1], icon: Heart },
              { ...values[2], icon: Lightbulb },
              { ...values[3], icon: Target }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full border-2 border-gray-100 hover:border-gray-300 transition-all duration-300 hover:shadow-xl">
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <value.icon className="w-7 h-7 text-gray-700 group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Team Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Meet Our Founders</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate duo driving WebNova's mission forward
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full border-2 border-gray-100 hover:border-gray-300 transition-all duration-300 hover:shadow-2xl overflow-hidden">
                  <CardContent className="p-8">
                    <div className="relative mb-6">
                      <motion.div 
                        className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto relative z-10 group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-500"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Users className="w-16 h-16 text-white opacity-50" />
                        </div>
                      </motion.div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-40 h-40 bg-gray-100 rounded-full opacity-30"></div>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h3>
                      <div className="inline-block px-4 py-2 bg-gray-100 rounded-full mb-4">
                        <span className="text-gray-700 font-semibold text-sm">{member.role}</span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                      
                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-2 justify-center mt-6">
                        {index === 0 ? (
                          <>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Full-Stack</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Architecture</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Backend</span>
                          </>
                        ) : (
                          <>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">UI/UX</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Branding</span>
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">Frontend</span>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Card className="border-2 border-gray-200 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-12 md:p-16 text-center relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full -ml-20 -mt-20"></div>
                  <div className="absolute bottom-0 right-0 w-60 h-60 bg-white rounded-full -mr-30 -mb-30"></div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative z-10"
                >
                  <h3 className="text-4xl md:text-5xl font-bold mb-6">Ready to Transform Your Business?</h3>
                  <p className="text-gray-300 mb-10 text-xl max-w-2xl mx-auto">
                    Join the growing list of Saudi businesses that trust WebNova for their digital success
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link href="/services">
                        <Button 
                          size="lg" 
                          className="px-10 py-6 text-lg bg-white text-gray-900 hover:bg-gray-100 font-bold shadow-xl"
                        >
                          <Rocket className="w-5 h-5 mr-2" />
                          Start Your Project
                        </Button>
                      </Link>
                    </motion.div>
                    
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Link href="/portfolio">
                        <Button 
                          size="lg" 
                          variant="outline" 
                          className="px-10 py-6 text-lg border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold"
                        >
                          <Globe className="w-5 h-5 mr-2" />
                          View Our Portfolio
                        </Button>
                      </Link>
                    </motion.div>
                  </div>
                  
                  {/* Trust Indicators */}
                  <div className="flex flex-wrap justify-center gap-6 mt-12">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-gray-300">Free Consultation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-gray-300">24-Hour Response</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sm text-gray-300">100% Satisfaction</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Footer />
      </div>
    </PageTransition>
  );
}