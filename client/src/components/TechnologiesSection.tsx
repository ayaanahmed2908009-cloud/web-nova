import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  {
    name: "React Native",
    description: "Cross-platform mobile app development",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
          fill="currentColor"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        <motion.circle
          cx="12"
          cy="12"
          r="3"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
      </svg>
    ),
    color: "from-gray-800 to-black"
  },
  {
    name: "Flutter",
    description: "Beautiful native apps from single codebase",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M14.5 3L8 9.5L10.5 12L21 1.5L14.5 3Z"
          fill="currentColor"
          initial={{ scale: 0, x: -20 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        />
        <motion.path
          d="M14.5 10L8 16.5L12.5 21L21 12.5L14.5 10Z"
          fill="currentColor"
          initial={{ scale: 0, x: 20 }}
          animate={{ scale: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </svg>
    ),
    color: "from-gray-700 to-gray-900"
  },
  {
    name: "iOS Native",
    description: "Native iOS app development with Swift",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.47C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"
          fill="currentColor"
          initial={{ scale: 0, y: -10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
      </svg>
    ),
    color: "from-black to-gray-800"
  },
  {
    name: "Android",
    description: "Native Android development with Kotlin",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        {/* Android Head */}
        <motion.path
          d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10z"
          fill="currentColor"
          initial={{ scale: 0, y: 10 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />
        {/* Android Body */}
        <motion.path
          d="M15.5 6.5C15.5 5.12 14.38 4 13 4h-2c-1.38 0-2.5 1.12-2.5 2.5V8h7V6.5z"
          fill="currentColor"
          initial={{ scale: 0, y: -5 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        />
        {/* Android Eyes */}
        <motion.circle
          cx="10"
          cy="6"
          r="0.5"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
        <motion.circle
          cx="14"
          cy="6"
          r="0.5"
          fill="white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        />
        {/* Android Antennae */}
        <motion.line
          x1="9"
          y1="3"
          x2="8"
          y2="1.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
        <motion.line
          x1="15"
          y1="3"
          x2="16"
          y2="1.5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </svg>
    ),
    color: "from-gray-900 to-black"
  },
  {
    name: "PWA",
    description: "Progressive Web Applications",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <motion.circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
        />
        <motion.path
          d="M8 12L12 8L16 12L12 16L8 12Z"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
        <motion.path
          d="M12 2V6"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        />
        <motion.path
          d="M12 18V22"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        />
      </svg>
    ),
    color: "from-gray-800 to-gray-600"
  },
  {
    name: "Cross-Platform",
    description: "Unified solutions across all platforms",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
        <motion.path
          d="M12 2L22 12L12 22L2 12L12 2Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          initial={{ scale: 0, rotate: 45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        />
        <motion.circle
          cx="12"
          cy="12"
          r="3"
          fill="currentColor"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        />
        <motion.path
          d="M8 8L16 16"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.path
          d="M16 8L8 16"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        />
      </svg>
    ),
    color: "from-black to-gray-700"
  }
];

export default function TechnologiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-white relative overflow-hidden">
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
            className="text-4xl md:text-5xl font-bold text-black mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Technologies We Use
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
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
              <div className="relative h-full bg-white rounded-2xl p-8 shadow-lg border border-gray-200 transition-all duration-300 group-hover:shadow-2xl group-hover:border-gray-300 overflow-hidden">
                {/* Gradient Background Overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-3 transition-opacity duration-300`}
                  initial={false}
                />

                {/* Icon */}
                <motion.div
                  className={`mb-4 transform transition-transform duration-300 group-hover:scale-110 bg-gradient-to-br ${tech.color} text-white rounded-xl w-16 h-16 flex items-center justify-center`}
                  initial={{ rotate: 0, scale: 0.8 }}
                  animate={{ rotate: 0, scale: 1 }}
                  whileHover={{ 
                    rotate: 360,
                    scale: 1.1,
                    transition: { duration: 0.6, ease: "easeInOut" }
                  }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tech.icon}
                  </motion.div>
                </motion.div>

                {/* Content */}
                <motion.h3 
                  className="text-xl font-bold text-black mb-3 group-hover:text-gray-800 transition-colors duration-300"
                  initial={{ opacity: 0.8 }}
                  whileHover={{ opacity: 1 }}
                >
                  {tech.name}
                </motion.h3>
                
                <motion.p 
                  className="text-gray-700 text-sm leading-relaxed group-hover:text-black transition-colors duration-300"
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
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${tech.color} opacity-5 rounded-bl-3xl transform translate-x-2 -translate-y-2 group-hover:opacity-10 transition-opacity duration-300`} />
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
            className="text-lg text-gray-700 mb-8"
            whileHover={{ scale: 1.02 }}
          >
            Ready to bring your app idea to life with the latest technologies?
          </motion.p>
          
          <motion.button
            className="bg-gradient-to-r from-gray-700 to-black text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              window.location.href = '/services';
            }}
          >
            <span className="flex items-center space-x-2">
              <span>Start Your Project</span>
              <motion.span
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
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-6 h-6 bg-purple-500 rounded-full opacity-20"
      />
    </section>
  );
}