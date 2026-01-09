import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
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
    name: "RSOOM",
    image: "/rsoom-logo.jpg",
    description: "A comprehensive e-commerce platform with advanced SEO optimization, secure payment processing, and a powerful admin dashboard.",
    category: "E-commerce Platform",
    link: "https://rsoom.online"
  }
];

export default function ClientsWall() {
  return (
    <section className="w-full bg-gradient-to-b from-white via-gray-50/50 to-white relative z-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-8">
        
        {/* Header Section */}
        <div className="pt-20 sm:pt-28 md:pt-32 lg:pt-40 pb-12 sm:pb-16 md:pb-20 lg:pb-24">
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

        {/* Featured Client - Zeoofgroup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-10 sm:mb-14 md:mb-20"
        >
          <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl group cursor-pointer shadow-sm bg-gray-100">
            <img
              src={clients[0].image}
              alt={`${clients[0].name} - ${clients[0].category}`}
              className="w-full h-auto aspect-[16/9] object-contain group-hover:scale-105 transition-transform duration-700"
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

        {/* Two Column Grid - SABR and Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-20">
          {/* SABR */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
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

          {/* Partnership Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex items-center"
          >
            <div className="space-y-6 md:pl-8 lg:pl-12">
              <p className="text-xs sm:text-sm md:text-base tracking-[0.02em] text-gray-500 leading-[1.8] font-light">
                At WebNova Solution, we take a partnership-first approach. Beyond delivery, we provide ongoing support, transparent communication, and continuous optimisation to ensure every system performs at its best. From custom dashboards and automation tools to full-scale digital platforms, our goal is simple: empower businesses with technology that saves time, reduces complexity, and drives sustainable growth.
              </p>
            </div>
          </motion.div>
        </div>

        {/* PIF - Separate Row with more offset */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-20 pb-20 sm:pb-28 md:pb-32 lg:pb-40 mt-16 sm:mt-20 md:mt-24 lg:mt-32">
          {/* Vision Text */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex items-center order-2 md:order-1"
          >
            <div className="space-y-6 md:pr-8 lg:pr-12">
              <p className="text-xs sm:text-sm md:text-base tracking-[0.02em] text-gray-500 leading-[1.8] font-light">
                As we continue to expand our capabilities and innovate across industries, WebNova Solution remains committed to setting new standards in efficiency and digital excellence. Every project is an opportunity to push boundaries, refine our craft, and deliver solutions that make a measurable impact. With WebNova, businesses don't just get a service provider—they gain a reliable, forward-thinking partner for the future.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            viewport={{ once: true }}
            className="order-1 md:order-2"
          >
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl group cursor-pointer bg-gray-900 shadow-sm">
              <img
                src={clients[2].image}
                alt={`${clients[2].name} - ${clients[2].category}`}
                className="w-full h-auto aspect-[16/9] object-contain group-hover:scale-105 transition-transform duration-700"
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
      </div>
    </section>
  );
}
