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
    category: "Non-Profit Organization"
  },
  {
    name: "PIF College Prep",
    image: "/pif-cover.jpeg",
    description: "A comprehensive educational management system for the Public Investment Fund College Preparation Program, serving 100+ students.",
    category: "Educational Platform"
  }
];

export default function ClientsWall() {
  return (
    <section className="w-full bg-gradient-to-b from-white via-gray-50 to-white relative z-20 py-16 md:py-24 lg:py-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="relative">
          {/* Header Section - Always stacked on mobile/tablet */}
          <div className="flex flex-col lg:grid lg:grid-cols-12 lg:min-h-screen">
            {/* Text Content */}
            <div className="w-full lg:col-span-5 pb-8 md:pb-12 lg:py-32">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-4 md:space-y-6 lg:sticky lg:top-32 text-center lg:text-left"
              >
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] text-gray-400 uppercase font-medium"
                >
                  Working Together
                  <br />
                  With Our Clients
                </motion.p>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                >
                  To Achieve Their
                  <br />
                  Business' Vision
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="text-sm md:text-base text-gray-500 leading-relaxed max-w-md mx-auto lg:mx-0"
                >
                  Whether we're developing powerful management software, building a sleek new website, or designing a high-performance mobile app, you can always count on WebNova Solution. We work closely with every client to bring their vision to life—efficiently, creatively, and with unwavering attention to detail.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center justify-center lg:justify-start gap-4 pt-2 md:pt-4"
                >
                  <Link href="/portfolio">
                    <motion.div
                      className="inline-flex items-center gap-2 text-gray-900 font-medium cursor-pointer group"
                      whileHover={{ x: 4 }}
                    >
                      <span className="text-sm md:text-base">view more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </Link>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-gray-300 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-3 h-3 md:w-4 md:h-4 text-gray-400 rotate-90" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* First Client - Zeoofgroup */}
            <div className="w-full lg:col-span-7 relative mb-8 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:absolute lg:top-0 lg:right-0 w-full lg:w-[90%]"
              >
                <div className="relative overflow-hidden rounded-xl md:rounded-2xl group cursor-pointer">
                  <img
                    src={clients[0].image}
                    alt={`${clients[0].name} - ${clients[0].category}`}
                    className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-sm md:text-base text-white/90 leading-relaxed mb-3 md:mb-4">{clients[0].description}</p>
                    {clients[0].link && (
                      <a 
                        href={clients[0].link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white font-medium hover:gap-3 transition-all text-sm md:text-base"
                      >
                        <span>Visit Website</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="pt-4 md:pt-6 text-center lg:text-left">
                  <p className="text-[10px] md:text-xs tracking-[0.2em] text-gray-400 uppercase mb-1 md:mb-2">{clients[0].category}</p>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{clients[0].name}</h3>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Second Row - SABR and PIF */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-16 pb-16 md:pb-24 lg:pb-32 pt-8 md:pt-12 lg:pt-0">
            {/* SABR */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl group cursor-pointer bg-gray-100">
                <img
                  src={clients[1].image}
                  alt={`${clients[1].name} - ${clients[1].category}`}
                  className="w-full h-[280px] sm:h-[320px] md:h-[380px] lg:h-[450px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-sm md:text-base text-white/90 leading-relaxed">{clients[1].description}</p>
                </div>
              </div>
              <div className="pt-4 md:pt-6 text-center md:text-left">
                <p className="text-[10px] md:text-xs tracking-[0.2em] text-gray-400 uppercase mb-1 md:mb-2">{clients[1].category}</p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{clients[1].name}</h3>
              </div>
            </motion.div>

            {/* PIF */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:pt-32"
            >
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl group cursor-pointer bg-gray-100">
                <img
                  src={clients[2].image}
                  alt={`${clients[2].name} - ${clients[2].category}`}
                  className="w-full h-[280px] sm:h-[320px] md:h-[380px] lg:h-[450px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 md:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-sm md:text-base text-white/90 leading-relaxed">{clients[2].description}</p>
                </div>
              </div>
              <div className="pt-4 md:pt-6 text-center md:text-left">
                <p className="text-[10px] md:text-xs tracking-[0.2em] text-gray-400 uppercase mb-1 md:mb-2">{clients[2].category}</p>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{clients[2].name}</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
