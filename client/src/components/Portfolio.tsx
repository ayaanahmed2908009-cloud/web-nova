import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Star, ArrowRight } from "lucide-react";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const projects = [
    {
      id: 1,
      title: "RSOOM",
      category: "E-commerce Platform",
      description: "A comprehensive e-commerce platform with advanced SEO optimization, secure payment processing through Stripe and PayPal, and a powerful admin dashboard.",
      longDescription: "RSOOM represents the pinnacle of modern e-commerce solutions. Built with cutting-edge technology, it features advanced SEO strategies including keyword optimization, meta tags, and structured data to boost search rankings. The platform integrates secure payment gateways like Stripe and PayPal, supporting credit cards, digital wallets, and recurring subscriptions with enterprise-level security. The custom admin panel includes role-based access control, real-time analytics, and comprehensive reporting tools.",
      image: "/api/placeholder/600/400",
      tags: ["React", "Node.js", "Stripe", "SEO", "Admin Panel"],
      stats: {
        views: "10,000+",
        satisfaction: "95%",
        revenue: "$50K+"
      },
      features: ["SEO Optimization", "Payment Processing", "Admin Dashboard", "Real-time Analytics"],
      color: "from-yellow-400 to-orange-500",
      filter: "web"
    },
    {
      id: 2,
      title: "Mechamorals",
      category: "Robotics & AI Hub",
      description: "An interactive platform dedicated to robotics and AI education, featuring 3D visualizations and immersive learning experiences.",
      longDescription: "Mechamorals serves as the ultimate hub for robotics and AI enthusiasts. The platform combines cutting-edge 3D visualizations with interactive learning modules to create an immersive educational experience. Features include robot character concepts, AI interaction simulations, and comprehensive learning paths for different skill levels.",
      image: "/api/placeholder/600/400",
      tags: ["3D Graphics", "AI", "Education", "Interactive Design"],
      stats: {
        users: "2,500+",
        courses: "15+",
        completion: "88%"
      },
      features: ["3D Robot Models", "AI Interactions", "Educational Content", "Progress Tracking"],
      color: "from-green-400 to-blue-500",
      filter: "app"
    },
    {
      id: 3,
      title: "Morality AI",
      category: "AI Chatbot Platform",
      description: "An ethical AI companion with advanced conversational capabilities and moral reasoning integration.",
      longDescription: "Morality AI represents the next generation of ethical AI companions. Built with advanced natural language processing and moral reasoning capabilities, it provides thoughtful, context-aware conversations while maintaining ethical guidelines. The platform includes real-time chat, customizable AI personalities, and comprehensive analytics.",
      image: "/api/placeholder/600/400",
      tags: ["AI", "Chatbot", "Ethics", "NLP"],
      stats: {
        conversations: "50K+",
        accuracy: "94%",
        uptime: "99.9%"
      },
      features: ["Ethical AI", "Real-time Chat", "Custom Personalities", "Analytics Dashboard"],
      color: "from-blue-400 to-purple-500",
      filter: "ai"
    },
    {
      id: 4,
      title: "Simple Physics Online Classes",
      category: "Educational Platform",
      description: "A comprehensive physics learning platform with interactive simulations and personalized learning paths.",
      longDescription: "Simple Physics Online Classes revolutionizes physics education through interactive learning. The platform features comprehensive courses with real-world examples, advanced student portals with progress tracking, and qualified instructors providing personalized support. Over 500 students have benefited from this innovative approach to physics education.",
      image: "/api/placeholder/600/400",
      tags: ["Education", "Physics", "Interactive Learning", "Student Portal"],
      stats: {
        students: "500+",
        success: "95%",
        modules: "50+"
      },
      features: ["Interactive Simulations", "Progress Tracking", "Expert Tutors", "24/7 Access"],
      color: "from-indigo-400 to-cyan-500",
      filter: "web"
    },
    {
      id: 5,
      title: "PIF Prep",
      category: "Academic Preparation",
      description: "Excellence in academic preparation with certified programs and performance analytics.",
      longDescription: "PIF Prep stands as a beacon of academic excellence, having prepared over 1000 students with a remarkable 98% success rate. The platform offers certified programs across 15+ subject areas, advanced performance analytics, and personalized mentorship from industry experts. Five years of experience have refined our approach to academic preparation.",
      image: "/api/placeholder/600/400",
      tags: ["Education", "Certification", "Analytics", "Mentorship"],
      stats: {
        students: "1,000+",
        success: "98%",
        subjects: "15+"
      },
      features: ["Certified Programs", "Performance Analytics", "Expert Mentorship", "Progress Reports"],
      color: "from-emerald-400 to-teal-500",
      filter: "web"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'app', label: 'Mobile Apps' },
    { id: 'ai', label: 'AI Solutions' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.filter === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
          <Link href="/">
            <motion.div
              className="flex items-center gap-3 text-gray-800 hover:text-black transition-colors cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </motion.div>
          </Link>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-900"
          >
            Our Portfolio
          </motion.h1>

          <div className="w-24" /> {/* Spacer for center alignment */}
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-7xl mx-auto px-8 py-16 text-center"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
          Featured Projects
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
          Discover our collection of innovative digital solutions that have transformed businesses and delighted users worldwide
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {filters.map((filterOption) => (
            <motion.button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                filter === filterOption.id
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filterOption.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform group-hover:-translate-y-2">
                  {/* Project Image */}
                  <div className={`h-48 bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                    <motion.div
                      className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                      >
                        <ExternalLink className="w-6 h-6 text-white" />
                      </motion.div>
                    </motion.div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-md text-xs">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{Object.values(project.stats)[0]}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{Object.values(project.stats)[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {(() => {
                const project = projects.find(p => p.id === selectedProject);
                if (!project) return null;

                return (
                  <div>
                    {/* Header */}
                    <div className={`h-64 bg-gradient-to-br ${project.color} relative`}>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-4xl font-bold mb-2">{project.title}</h3>
                        <p className="text-xl opacity-90">{project.category}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                          <h4 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h4>
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {project.longDescription}
                          </p>

                          <h5 className="text-xl font-bold text-gray-900 mb-4">Key Features</h5>
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            {project.features.map((feature) => (
                              <div key={feature} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                <span className="text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <h5 className="text-xl font-bold text-gray-900 mb-4">Technologies Used</h5>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                          <div className="bg-gray-50 rounded-xl p-6">
                            <h5 className="text-lg font-bold text-gray-900 mb-4">Project Stats</h5>
                            <div className="space-y-4">
                              {Object.entries(project.stats).map(([key, value]) => (
                                <div key={key}>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-600 capitalize">{key}</span>
                                    <span className="font-bold text-gray-900">{value}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                              <ExternalLink className="w-4 h-4 mr-2" />
                              View Live Project
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Github className="w-4 h-4 mr-2" />
                              View Source Code
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20"
      >
        <div className="max-w-4xl mx-auto text-center px-8">
          <h3 className="text-4xl font-bold mb-6">Ready to Start Your Project?</h3>
          <p className="text-xl mb-8 opacity-90">
            Let's create something amazing together. Get in touch and let's discuss your next big idea.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-full">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg rounded-full">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}