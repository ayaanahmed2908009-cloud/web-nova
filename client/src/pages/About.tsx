import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, Award, Globe, Clock } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";

const stats = [
  { number: "50+", label: "Projects Completed", icon: Award },
  { number: "30+", label: "Happy Clients", icon: Users },
  { number: "15+", label: "Countries Served", icon: Globe },
  { number: "2+", label: "Years Experience", icon: Clock }
];

const team = [
  {
    name: "Ahmed Al-Saudi",
    role: "Lead Developer",
    bio: "Full-stack developer with expertise in React, Node.js, and modern web technologies"
  },
  {
    name: "Sara Mohammed",
    role: "UI/UX Designer", 
    bio: "Creative designer focused on user-centered design and conversion optimization"
  },
  {
    name: "Omar Hassan",
    role: "Digital Strategist",
    bio: "Marketing expert specializing in SEO, analytics, and digital growth strategies"
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
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
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

      <div className="max-w-7xl mx-auto px-8 py-16">
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
            We're a passionate team of designers and developers based in Saudi Arabia, dedicated to creating exceptional digital experiences that help businesses thrive and succeed in the modern digital landscape.
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
                Founded in 2023, WebNova emerged from a simple belief: every business deserves a stunning digital presence that truly represents their brand and drives growth.
              </p>
              <p>
                Starting as a small team of passionate developers and designers, we've grown to serve clients across the Middle East and beyond, delivering over 50 successful projects that have transformed how our clients connect with their customers.
              </p>
              <p>
                Today, we're proud to be one of Saudi Arabia's most trusted web development agencies, known for our innovative approach, attention to detail, and commitment to client success.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              To empower businesses with cutting-edge digital solutions that not only look amazing but deliver real results. We believe in creating websites and applications that are fast, secure, and designed to convert visitors into loyal customers.
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
          <div className="grid md:grid-cols-3 gap-8">
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
            <Link href="/dashboard">
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