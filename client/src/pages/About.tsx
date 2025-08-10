import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Award, Globe, Clock } from "lucide-react";
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
        className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 mt-20"
      >
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div className="text-xl font-bold">About Us</div>
          <Link href="/services">
            <Button variant="outline" size="sm">
              Our Services
            </Button>
          </Link>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-8" style={{ paddingTop: '120px', paddingBottom: '64px' }}>
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 text-gray-700 rounded-full text-sm font-medium">
              👥 Meet the Team Behind WebNova
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            About WebNova
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Born from innovation and determination, WebNova is the result of two founders who met through the PIF College Preparation Program and discovered their shared passion for creating affordable, high-quality software solutions for Saudi businesses.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-900 rounded-xl mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Story Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid lg:grid-cols-2 gap-16 items-center mb-20"
        >
          <div>
            <h2 className="text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                <strong>September 2024:</strong> Both founders were accepted into the prestigious PIF College Preparation Program, marking the beginning of an unexpected journey that would lead to WebNova's creation.
              </p>
              <p>
                <strong>December 2024:</strong> Destiny brought us together at a competition hosted by the PIF program. The challenge was to create a platform solving one of the UN's Sustainable Development Goals. We were assigned to the same group and tasked with developing SDG 17 - creating an AI-driven platform that displayed global crises with severity metrics and resource requirements.
              </p>
              <p>
                <strong>March 2025:</strong> While our competition project was shelved after the event, we discovered something more valuable - a significant gap in the Saudi market for affordable, high-quality software solutions for businesses. This realization gave birth to WebNova.
              </p>
              <p>
                <strong>Today:</strong> We've grown to serve 8 clients, including the Public Investment Fund of Saudi Arabia, proving that our vision of delivering premium software at accessible prices resonates with the Saudi business community.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              To bridge the gap in Saudi Arabia's software market by providing businesses with affordable, high-quality digital solutions. We're committed to proving that premium software doesn't have to come with premium prices, making exceptional digital experiences accessible to every Saudi business.
            </p>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + (index * 0.1) }}
                className="p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 text-lg">The talented people behind WebNova</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + (index * 0.1) }}
                className="text-center p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <div className="text-gray-600 font-medium mb-3">{member.role}</div>
                <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-6">Ready to Work Together?</h3>
          <p className="text-gray-600 mb-8 text-lg">
            Let's create something amazing for your business
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/project-form">
              <Button size="lg" className="px-8">
                Start Your Project
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="px-8">
                See Our Work
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      <Footer />
      </div>
    </PageTransition>
  );
}