import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

const clients = [
  {
    name: "Zeoofgroup",
    image: "/zeoofgroup-website.png",
    description: "Complete digital transformation for a leading real estate company. We delivered website architecture, SEO strategy, and digital marketing solutions.",
    category: "Real Estate",
    link: "https://zeoofgroup.com",
    year: "2024"
  },
  {
    name: "SABR",
    image: "/sabr-image.jpg",
    description: "One of the largest non-profit organizations in the Eastern Region, bringing together 1,000+ people through impactful community events.",
    category: "Non-Profit Organization",
    link: "https://sabr-events.sa",
    year: "2024"
  },
  {
    name: "PIF College Prep",
    image: "/pif-new.png",
    description: "A comprehensive educational management system for the Public Investment Fund College Preparation Program, serving 100+ students.",
    category: "Educational Platform",
    year: "2025"
  }
];

export default function ClientsWall() {
  return (
    <section className="w-full bg-white relative z-20">
      {/* Asymmetric Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-8">
        <div className="pt-24 sm:pt-32 md:pt-40 lg:pt-48">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 lg:gap-16 mb-16 sm:mb-20 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:max-w-2xl"
            >
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "3rem" }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="h-0.5 bg-gray-900 mb-8"
              />
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[0.95] tracking-tight">
                Selected
                <br />
                <span className="text-gray-400">Work</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-md lg:text-right"
            >
              We partner with ambitious brands to create digital experiences that matter.
            </motion.p>
          </div>
        </div>
      </div>

      {/* Full-width Featured Project */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative mb-2"
      >
        <Link href={clients[0].link || "#"}>
          <div className="group cursor-pointer relative overflow-hidden">
            <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden">
              <img
                src={clients[0].image}
                alt={clients[0].name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-12 lg:p-16">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/60 text-xs sm:text-sm tracking-widest uppercase mb-2">{clients[0].category}</p>
                  <h3 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">{clients[0].name}</h3>
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="hidden sm:flex w-12 h-12 md:w-16 md:h-16 rounded-full bg-white items-center justify-center group-hover:scale-110 transition-transform"
                >
                  <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-gray-900" />
                </motion.div>
              </div>
            </div>
            <div className="absolute top-6 right-6 sm:top-8 sm:right-8 md:top-12 md:right-12">
              <span className="text-white/40 text-sm font-mono">{clients[0].year}</span>
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Two Column Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {/* SABR */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Link href={clients[1].link || "#"}>
            <div className="group cursor-pointer relative overflow-hidden bg-gray-100">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={clients[1].image}
                  alt={clients[1].name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-white/60 text-xs tracking-widest uppercase mb-1">{clients[1].category}</p>
                    <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">{clients[1].name}</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
              <div className="absolute top-5 right-5 sm:top-6 sm:right-6">
                <span className="text-white/40 text-xs font-mono">{clients[1].year}</span>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* PIF */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="group cursor-pointer relative overflow-hidden bg-gray-900">
            <div className="aspect-[4/3] overflow-hidden flex items-center justify-center">
              <img
                src={clients[2].image}
                alt={clients[2].name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-1000"
              />
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 md:p-8">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-white/60 text-xs tracking-widest uppercase mb-1">{clients[2].category}</p>
                  <h3 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">{clients[2].name}</h3>
                </div>
              </div>
            </div>
            <div className="absolute top-5 right-5 sm:top-6 sm:right-6">
              <span className="text-white/40 text-xs font-mono">{clients[2].year}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-20 sm:py-24 md:py-32 flex flex-col sm:flex-row items-center justify-between gap-8"
        >
          <div className="text-center sm:text-left">
            <p className="text-gray-400 text-sm mb-2">Want to see more?</p>
            <Link href="/portfolio">
              <span className="text-2xl sm:text-3xl font-bold text-gray-900 hover:text-gray-600 transition-colors cursor-pointer inline-flex items-center gap-3">
                View All Projects
                <ArrowRight className="w-6 h-6" />
              </span>
            </Link>
          </div>
          
          <Link href="/project-form">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-900 text-white px-8 py-4 rounded-full font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-3"
            >
              Start a Project
              <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
