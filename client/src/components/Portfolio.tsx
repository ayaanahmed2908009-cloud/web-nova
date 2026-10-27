import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ExternalLink, Users, Star, ArrowRight } from "lucide-react";

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
    },
    {
      id: 3,
      title: "Zeoof",
      category: "Real Estate",
      description: "A website presenting real estate services and helping visitors get in touch.",
      longDescription: "A digital home for Zeoof, with clear service information and a way for visitors to contact the team.",
      image: "/zeoofgroup-website.png",
      tags: ["Real Estate", "Web Development"],
      stats: {},
      features: ["Service Information", "Contact Details", "Responsive Design"],
      color: "from-emerald-400 to-teal-500",
      filter: "web",
      websiteUrl: "https://zeoofgroup.com"
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
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
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

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ paddingTop: '140px', paddingBottom: '40px' }}
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
          Here Are Our Best Examples
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          Websites built to help organizations be discovered, connect with their communities, and grow.
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
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
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
                        <ExternalLink className="w-7 h-7 text-white" />
                      </motion.div>
                    </motion.div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white/95 backdrop-blur-sm text-gray-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                        {project.category}
                      </span>
                    </div>

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
                    {Object.keys(project.stats).length > 0 && (
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="w-4 h-4 text-green-500" />
                        <span className="text-sm font-medium">{Object.values(project.stats)[0]}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Star className="w-4 h-4" />
                        <span>{Object.values(project.stats)[1]}</span>
                      </div>
                    </div>
                    )}
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
                          {Object.keys(project.stats).length > 0 && (
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
                          )}

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
                                View Live Project
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
