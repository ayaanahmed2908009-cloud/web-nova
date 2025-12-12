import { motion } from "framer-motion";
import { ArrowRight, Award, Users, Briefcase, Star } from "lucide-react";
import { Link } from "wouter";

const clients = [
  {
    name: "Zeoofgroup",
    image: "/zeoofgroup-website.png",
    description: "Complete digital transformation for a leading real estate company. We delivered website architecture, SEO strategy, and digital marketing solutions.",
    category: "Real Estate",
    link: "https://zeoofgroup.com"
  },
  {
    name: "SABR",
    image: "/sabr-image.jpg",
    description: "One of the largest non-profit organizations in the Eastern Region, bringing together 1,000+ people through impactful community events.",
    category: "Non-Profit Organization",
    link: "https://sabr-events.sa"
  },
  {
    name: "PIF College Prep",
    image: "/pif-new.png",
    description: "A comprehensive educational management system for the Public Investment Fund College Preparation Program, serving 100+ students.",
    category: "Educational Platform"
  }
];

const stats = [
  { icon: Briefcase, value: "8+", label: "Projects Delivered" },
  { icon: Users, value: "100%", label: "Client Satisfaction" },
  { icon: Award, value: "1+", label: "Years Experience" },
  { icon: Star, value: "5.0", label: "Average Rating" }
];

export default function ClientsWall() {
  return (
    <section className="w-full bg-gradient-to-b from-white via-gray-50/50 to-white relative z-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-0 w-72 h-72 bg-gray-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-40" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-gray-50 rounded-full blur-2xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-8 relative">
        
        {/* Header Section */}
        <div className="pt-20 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-end">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-5 sm:space-y-6 md:space-y-8 text-center lg:text-left"
            >
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-[11px] sm:text-xs md:text-sm tracking-[0.25em] sm:tracking-[0.3em] text-gray-400 uppercase font-medium"
              >
                Working Together With Our Clients
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1]"
              >
                To Achieve Their
                <br />
                Business' Vision
              </motion.h2>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center lg:text-left"
            >
              <p className="text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto lg:mx-0 lg:ml-auto">
                Whether we're developing powerful management software, building a sleek new website, or designing a high-performance mobile app, you can always count on WebNova Solution.
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-5 mt-6 sm:mt-8">
                <Link href="/portfolio">
                  <motion.div
                    className="inline-flex items-center gap-2 text-gray-900 font-medium cursor-pointer group"
                    whileHover={{ x: 4 }}
                  >
                    <span className="text-sm sm:text-base">view more</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </Link>
                
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-gray-200 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ y: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400 rotate-90" />
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 mb-3" />
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Divider Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-12 sm:mb-16 md:mb-20"
        />

        {/* Featured Client - Zeoofgroup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-14 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="text-[10px] sm:text-xs tracking-[0.2em] text-gray-400 uppercase">Featured Project</span>
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-[10px] sm:text-xs text-gray-400">01</span>
          </div>
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl group cursor-pointer shadow-sm">
            <img
              src={clients[0].image}
              alt={`${clients[0].name} - ${clients[0].category}`}
              className="w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 md:p-10 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed mb-4 max-w-2xl">{clients[0].description}</p>
              {clients[0].link && (
                <a 
                  href={clients[0].link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white font-medium hover:gap-3 transition-all text-sm sm:text-base"
                >
                  <span>Visit Website</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
          <div className="pt-5 sm:pt-6 md:pt-8 text-center sm:text-left">
            <p className="text-[10px] sm:text-xs tracking-[0.2em] text-gray-400 uppercase mb-2">{clients[0].category}</p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{clients[0].name}</h3>
          </div>
        </motion.div>

        {/* Two Column Grid - SABR and PIF */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-20 pb-20 sm:pb-28 md:pb-32 lg:pb-40">
          {/* SABR */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] text-gray-400 uppercase">Community Impact</span>
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[10px] sm:text-xs text-gray-400">02</span>
            </div>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl group cursor-pointer bg-gray-50 shadow-sm">
              <img
                src={clients[1].image}
                alt={`${clients[1].name} - ${clients[1].category}`}
                className="w-full h-[280px] sm:h-[340px] md:h-[400px] lg:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-sm sm:text-base text-white/90 leading-relaxed mb-3">{clients[1].description}</p>
                {clients[1].link && (
                  <a 
                    href={clients[1].link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white font-medium hover:gap-3 transition-all text-sm sm:text-base"
                  >
                    <span>Visit Website</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
            <div className="pt-5 sm:pt-6 md:pt-8 text-center sm:text-left">
              <p className="text-[10px] sm:text-xs tracking-[0.2em] text-gray-400 uppercase mb-2">{clients[1].category}</p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{clients[1].name}</h3>
            </div>
          </motion.div>

          {/* PIF - Offset on large screens */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="md:mt-16 lg:mt-24"
          >
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <span className="text-[10px] sm:text-xs tracking-[0.2em] text-gray-400 uppercase">Education</span>
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-[10px] sm:text-xs text-gray-400">03</span>
            </div>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl group cursor-pointer bg-gray-900 shadow-sm">
              <img
                src={clients[2].image}
                alt={`${clients[2].name} - ${clients[2].category}`}
                className="w-full h-[280px] sm:h-[340px] md:h-[400px] lg:h-[480px] object-contain group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-sm sm:text-base text-white/90 leading-relaxed">{clients[2].description}</p>
              </div>
            </div>
            <div className="pt-5 sm:pt-6 md:pt-8 text-center sm:text-left">
              <p className="text-[10px] sm:text-xs tracking-[0.2em] text-gray-400 uppercase mb-2">{clients[2].category}</p>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{clients[2].name}</h3>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center pb-20 sm:pb-28 md:pb-32"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-12 sm:mb-16" />
          <p className="text-sm sm:text-base text-gray-400 mb-4">Ready to join our success stories?</p>
          <Link href="/project-form">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 bg-gray-900 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base"
            >
              Start Your Project
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
