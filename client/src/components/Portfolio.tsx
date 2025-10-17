import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Github, Calendar, Users, Star, ArrowRight, MessageSquare, TrendingUp, Target } from "lucide-react";

export default function Portfolio() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  // Auto-scroll to overview when project is selected
  useEffect(() => {
    if (selectedProject) {
      // Small delay to ensure modal is rendered
      setTimeout(() => {
        const overviewElement = document.getElementById('project-overview');
        if (overviewElement) {
          overviewElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start',
            inline: 'nearest' 
          });
        }
      }, 100);
    }
  }, [selectedProject]);

  const projects = [
    {
      id: 1,
      title: "PIF College Preparation Program",
      category: "Educational Management System",
      description: "A comprehensive full-stack platform empowering program administrators to seamlessly manage students, assignments, events, attendance, and program operations.",
      longDescription: "Developed for the Public Investment Fund College Preparation Program, this sophisticated educational management system revolutionizes how administrators oversee academic excellence. The platform provides a centralized hub for managing all program aspects including student enrollment, assignment tracking, event coordination, and real-time attendance monitoring. With intuitive dashboards and powerful analytics, administrators can make data-driven decisions to enhance student outcomes and streamline program operations. The system ensures efficient communication between staff and students while maintaining comprehensive records and performance metrics.",
      image: "/pif-cover.jpeg",
      tags: ["Full-Stack", "Education", "Admin Dashboard", "Management System"],
      stats: {
        administrators: "15+",
        students: "100+",
        features: "20+"
      },
      features: ["Student Management", "Assignment Tracking", "Event Coordination", "Attendance System", "Analytics Dashboard", "Real-time Updates"],
      color: "from-teal-400 to-green-500",
      filter: "web",
      comingSoon: true
    },
    {
      id: 2,
      title: "Mechamorals",
      category: "Robotics & AI Hub",
      description: "An interactive platform dedicated to robotics and AI education, featuring 3D visualizations and immersive learning experiences.",
      longDescription: "Mechamorals serves as the ultimate hub for robotics and AI enthusiasts. The platform combines cutting-edge 3D visualizations with interactive learning modules to create an immersive educational experience. Features include robot character concepts, AI interaction simulations, and comprehensive learning paths for different skill levels.",
      image: "/mechamorals-robot.png",
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
      title: "Zeoofgroup Real Estate Consultation",
      category: "Digital Strategy Consultation",
      description: "Complete digital transformation consultation for a real estate company, covering website redesign, SEO strategy, and digital marketing implementation.",
      longDescription: "We provided comprehensive consultation services for Zeoofgroup, a real estate company looking to enhance their digital presence. Our consultation covered website architecture analysis, user experience optimization, SEO strategy development, and digital marketing implementation. Through detailed market research and competitor analysis, we identified key opportunities for growth and provided actionable recommendations that resulted in improved online visibility and lead generation.",
      image: "/zeoofgroup-logo.png",
      tags: ["Consultation", "Real Estate", "SEO", "Digital Strategy", "UX Analysis"],
      stats: {
        "consultation": "3 months",
        "improvements": "40%",
        "recommendations": "25+"
      },
      features: ["Website Analysis", "SEO Strategy", "Market Research", "Growth Planning"],
      color: "from-emerald-400 to-teal-500",
      filter: "consultation",
      websiteUrl: "http://Zeoofgroup.com"
    },
    {
      id: 4,
      title: "SABR",
      category: "Non-Profit Organization",
      description: "One of the largest non-profit organizations in the Eastern Region of Saudi Arabia, bringing together 1,000+ people regularly through impactful community events.",
      longDescription: "SABR stands as one of the most influential non-profit organizations in Saudi Arabia's Eastern Region, dedicated to creating meaningful community impact through large-scale events and initiatives. With a proven track record of bringing together over 1,000 participants regularly, SABR has established itself as a cornerstone of community engagement and social development. The organization's events focus on education, cultural exchange, and community building, creating lasting positive change across the region.",
      image: "/sabr-image.jpg",
      tags: ["Non-Profit", "Community", "Events", "Eastern Region"],
      stats: {
        attendees: "1,000+",
        events: "25+",
        impact: "Regional"
      },
      features: ["Large-Scale Events", "Community Building", "Social Impact", "Educational Programs"],
      color: "from-purple-400 to-indigo-500",
      filter: "web",
      comingSoon: true
    },
    {
      id: 5,
      title: "RSOOM",
      category: "E-commerce Platform",
      description: "A comprehensive e-commerce platform with advanced SEO optimization, secure payment processing through Stripe and PayPal, and a powerful admin dashboard.",
      longDescription: "RSOOM represents the pinnacle of modern e-commerce solutions. Built with cutting-edge technology, it features advanced SEO strategies including keyword optimization, meta tags, and structured data to boost search rankings. The platform integrates secure payment gateways like Stripe and PayPal, supporting credit cards, digital wallets, and recurring subscriptions with enterprise-level security. The custom admin panel includes role-based access control, real-time analytics, and comprehensive reporting tools.",
      image: "/rsoom-logo.jpg",
      tags: ["React", "Node.js", "Stripe", "SEO", "Admin Panel"],
      stats: {
        views: "10,000+",
        satisfaction: "95%",
        revenue: "$10K+"
      },
      features: ["SEO Optimization", "Payment Processing", "Admin Dashboard", "Real-time Analytics"],
      color: "from-yellow-400 to-orange-500",
      filter: "web",
      websiteUrl: "https://rsoom.online"
    },
    {
      id: 6,
      title: "Morality AI",
      category: "AI Chatbot Platform",
      description: "An ethical AI companion with advanced conversational capabilities and moral reasoning integration.",
      longDescription: "Morality AI represents the next generation of ethical AI companions. Built with advanced natural language processing and moral reasoning capabilities, it provides thoughtful, context-aware conversations while maintaining ethical guidelines. The platform includes real-time chat, customizable AI personalities, and comprehensive analytics.",
      image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 200'%3E%3Cdefs%3E%3ClinearGradient id='grad2' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%236366f1;stop-opacity:1' /%3E%3Cstop offset='100%25' style='stop-color:%238b5cf6;stop-opacity:1' /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='200' fill='url(%23grad2)'/%3E%3Ctext x='200' y='120' font-family='Arial, sans-serif' font-size='32' font-weight='bold' text-anchor='middle' fill='white'%3EMorality AI%3C/text%3E%3C/svg%3E",
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
      id: 7,
      title: "Simple Physics Online Classes",
      category: "Educational Platform",
      description: "A comprehensive physics learning platform with interactive simulations and personalized learning paths.",
      longDescription: "Simple Physics Online Classes revolutionizes physics education through interactive learning. The platform features comprehensive courses with real-world examples, advanced student portals with progress tracking, and qualified instructors providing personalized support. Over 500 students have benefited from this innovative approach to physics education.",
      image: "/simplephysics-tutor.png",
      tags: ["Education", "Physics", "Interactive Learning", "Student Portal"],
      stats: {
        students: "500+",
        success: "95%",
        modules: "50+"
      },
      features: ["Interactive Simulations", "Progress Tracking", "Expert Tutors", "24/7 Access"],
      color: "from-indigo-400 to-cyan-500",
      filter: "web",
      websiteUrl: "https://simplephysicsonlineclasses.com"
    },

    {
      id: 8,
      title: "Conquer GCSE",
      category: "Educational Platform",
      description: "A new and up-and-coming GCSE revision platform for students by students, featuring interactive learning tools and community support.",
      longDescription: "Conquer GCSE is an innovative educational platform designed by students for students, revolutionizing GCSE revision through interactive learning environments and peer-to-peer support. The platform combines comprehensive study resources with social learning features, creating an engaging ecosystem where students can track their progress, share knowledge, and collaborate on their academic journey. With nature-inspired learning environments and immersive study experiences, Conquer GCSE makes revision both effective and enjoyable.",
      image: "/conquer-gcse.png",
      tags: ["Education", "GCSE", "Student Platform", "Interactive Learning"],
      stats: {
        subjects: "15+",
        students: "1,000+",
        success: "92%"
      },
      features: ["SEO Optimization", "Image Submission", "Personalised Tracker", "Functional Forum"],
      color: "from-blue-400 to-purple-500",
      filter: "web",
      websiteUrl: "https://conquergcse.com"
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'web', label: 'Web Apps' },
    { id: 'app', label: 'Mobile Apps' },
    { id: 'ai', label: 'AI Solutions' },
    { id: 'consultation', label: 'Consultations' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.filter === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-teal-100/20 to-cyan-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-50 bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <Link href="/">
            <motion.div
              className="flex items-center gap-3 text-gray-700 hover:text-black transition-colors cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="p-2 rounded-full bg-gray-100 group-hover:bg-black group-hover:text-white transition-all">
                <ArrowLeft className="w-5 h-5" />
              </div>
              <span className="font-semibold">Back to Home</span>
            </motion.div>
          </Link>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
          >
            Our Portfolio
          </motion.h1>

          <div className="w-32" /> {/* Spacer for center alignment */}
        </div>
      </motion.div>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-6 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100"
        >
          <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Our Work
          </span>
        </motion.div>
        
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
          Featured Projects &<br />Consultations
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          Discover our collection of innovative digital solutions and successful consultation projects that have transformed businesses and delighted users worldwide
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {filters.map((filterOption) => (
            <motion.button
              key={filterOption.id}
              onClick={() => setFilter(filterOption.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                filter === filterOption.id
                  ? 'bg-gradient-to-r from-gray-900 to-gray-700 text-white shadow-xl shadow-gray-900/20'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {filterOption.label}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Projects Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
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
                transition={{ duration: 0.6, delay: index * 0.08 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project.id)}
              >
                <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:border-gray-200 transform group-hover:-translate-y-3">
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  {/* Project Image */}
                  <div className="h-56 bg-gradient-to-br from-gray-900 to-gray-700 relative overflow-hidden">
                    <motion.img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileHover={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="bg-white/20 backdrop-blur-md rounded-full p-4 border-2 border-white/30"
                      >
                        {project.filter === 'consultation' ? (
                          <MessageSquare className="w-7 h-7 text-white" />
                        ) : (
                          <ExternalLink className="w-7 h-7 text-white" />
                        )}
                      </motion.div>
                    </motion.div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        {project.category}
                      </span>
                    </div>

                    {/* Special Badge for Consultation */}
                    {project.filter === 'consultation' && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                          CONSULTATION
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="relative p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-5 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="bg-gradient-to-r from-gray-900 to-gray-700 text-white px-3 py-1 rounded-lg text-xs font-semibold shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-xs font-semibold">
                          +{project.tags.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-gray-600">
                        {project.filter === 'consultation' ? (
                          <>
                            <TrendingUp className="w-4 h-4 text-blue-500" />
                            <span className="text-sm font-medium">{Object.values(project.stats)[0]}</span>
                          </>
                        ) : (
                          <>
                            <Users className="w-4 h-4 text-green-500" />
                            <span className="text-sm font-medium">{Object.values(project.stats)[0]}</span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
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
                    {/* Header with Project Image Banner */}
                    <div className="h-64 relative overflow-hidden">
                      {/* Project Image Background */}
                      <motion.img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover"
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                      />
                      
                      {/* Dark overlay for text readability */}
                      <div className="absolute inset-0 bg-black/40"></div>
                      
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors z-10"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>

                      <div className="absolute bottom-6 left-6 text-white z-10">
                        <h3 className="text-4xl font-bold mb-2 drop-shadow-lg">{project.title}</h3>
                        <p className="text-xl opacity-90 drop-shadow-md">{project.category}</p>
                      </div>

                      {project.filter === 'consultation' && (
                        <div className="absolute bottom-6 right-6 z-10">
                          <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold">
                            CONSULTATION PROJECT
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                          <h4 id="project-overview" className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h4>
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {project.longDescription}
                          </p>

                          <h5 className="text-xl font-bold text-gray-900 mb-4">Key Features</h5>
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            {project.features.map((feature) => (
                              <div key={feature} className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                                <span className="text-gray-700">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <h5 className="text-xl font-bold text-gray-900 mb-4">Technologies Used</h5>
                          <div className="flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium"
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
                            {project.comingSoon ? (
                              <Button 
                                className="w-full bg-gray-400 cursor-not-allowed text-white"
                                disabled
                              >
                                Coming Soon
                              </Button>
                            ) : project.websiteUrl ? (
                              <Button 
                                className="w-full bg-black hover:bg-gray-800 text-white"
                                onClick={() => window.open(project.websiteUrl, '_blank')}
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                {project.filter === 'consultation' ? 'Visit Client Website' : 'View Live Project'}
                              </Button>
                            ) : (
                              <Button className="w-full bg-black hover:bg-gray-800 text-white">
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Live Project
                              </Button>
                            )}


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

      {/* Consultation CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20"
      >
        <div className="max-w-4xl mx-auto text-center px-8">
          <MessageSquare className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h3 className="text-4xl font-bold mb-6">Need Expert Consultation?</h3>
          <p className="text-xl mb-8 opacity-90">
            Like Zeoofgroup, let us analyze your digital presence and provide actionable recommendations for growth. Our consultation services help businesses identify opportunities and create winning strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation">
              <Button className="bg-white text-emerald-600 hover:bg-gray-100 px-8 py-3 text-lg rounded-full">
                Book Consultation
                <Target className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-emerald-600 px-8 py-3 text-lg rounded-full bg-transparent">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>

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
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg rounded-full bg-transparent">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}