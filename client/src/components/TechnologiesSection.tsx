import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  {
    name: "React Native",
    description: "Cross-platform mobile app development",
    icon: "📱",
    color: "from-blue-500 to-cyan-500"
  },
  {
    name: "Flutter",
    description: "Beautiful native apps from single codebase",
    icon: "🎯",
    color: "from-blue-400 to-indigo-500"
  },
  {
    name: "iOS Native",
    description: "Native iOS app development with Swift",
    icon: "🍎",
    color: "from-gray-600 to-gray-800"
  },
  {
    name: "Android",
    description: "Native Android development with Kotlin",
    icon: "🤖",
    color: "from-green-500 to-emerald-500"
  },
  {
    name: "PWA",
    description: "Progressive Web Applications",
    icon: "🌐",
    color: "from-purple-500 to-pink-500"
  },
  {
    name: "Cross-Platform",
    description: "Unified solutions across all platforms",
    icon: "🔄",
    color: "from-orange-500 to-red-500"
  }
];

export default function TechnologiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #000 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Technologies We Use
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            We leverage cutting-edge technologies to build robust, scalable, and beautiful applications 
            that deliver exceptional user experiences across all platforms.
          </motion.p>
        </motion.div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              className="group relative"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.9 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.5 + (index * 0.1),
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              {/* Card */}
              <div className="relative h-full bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-300 group-hover:shadow-2xl group-hover:border-gray-200 overflow-hidden">
                {/* Gradient Background Overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  initial={false}
                />

                {/* Icon */}
                <motion.div
                  className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 10 }}
                >
                  {tech.icon}
                </motion.div>

                {/* Content */}
                <motion.h3 
                  className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-300"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {tech.name}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  {tech.description}
                </motion.p>

                {/* Hover Effect - Shine */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transform -skew-x-12 transition-all duration-700"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.7 }}
                />

                {/* Corner Accent */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${tech.color} opacity-10 rounded-bl-3xl transform translate-x-2 -translate-y-2 group-hover:opacity-20 transition-opacity duration-300`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <motion.p 
            className="text-lg text-gray-600 mb-8"
            whileHover={{ scale: 1.02 }}
          >
            Ready to bring your app idea to life with the latest technologies?
          </motion.p>
          
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="flex items-center space-x-2">
              <span>Start Your Project</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-blue-500 rounded-full opacity-20"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-6 h-6 bg-purple-500 rounded-full opacity-20"
        animate={{ 
          y: [0, 20, 0],
          scale: [1, 0.8, 1]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </section>
  );
}