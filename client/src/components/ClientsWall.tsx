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
    <section className="w-full bg-gradient-to-b from-white via-gray-50 to-white relative z-20">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="relative">
          <div className="grid grid-cols-12 min-h-screen">
            <div className="col-span-12 lg:col-span-5 py-24 lg:py-32">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-6 lg:sticky lg:top-32"
              >
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="text-sm tracking-[0.3em] text-gray-400 uppercase font-medium"
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
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
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
                  className="text-gray-500 leading-relaxed max-w-md"
                >
                  Whether we're developing powerful management software, building a sleek new website, or designing a high-performance mobile app, you can always count on WebNova Solution. Our team combines technical expertise with a deep understanding of modern business needs, delivering systems that streamline operations and elevate digital presence. We work closely with every client to bring their vision to life—efficiently, creatively, and with unwavering attention to detail.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 pt-4"
                >
                  <Link href="/portfolio">
                    <motion.div
                      className="inline-flex items-center gap-2 text-gray-900 font-medium cursor-pointer group"
                      whileHover={{ x: 4 }}
                    >
                      <span>view more</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.div>
                  </Link>
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center"
                  >
                    <motion.div
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="w-4 h-4 text-gray-400 rotate-90" />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            <div className="col-span-12 lg:col-span-7 relative">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="absolute top-0 right-0 w-full lg:w-[90%] lg:-mr-8"
              >
                <div className="relative overflow-hidden rounded-2xl group cursor-pointer">
                  <img
                    src={clients[0].image}
                    alt={`${clients[0].name} - ${clients[0].category}`}
                    className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white/90 leading-relaxed mb-4">{clients[0].description}</p>
                    {clients[0].link && (
                      <a 
                        href={clients[0].link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white font-medium hover:gap-3 transition-all"
                      >
                        <span>Visit Website</span>
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                <div className="pt-6 pr-4">
                  <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-2">{clients[0].category}</p>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{clients[0].name}</h3>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-8 lg:gap-16 pb-32 pt-8 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-6 lg:col-span-5"
            >
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer bg-gray-100">
                <img
                  src={clients[1].image}
                  alt={`${clients[1].name} - ${clients[1].category}`}
                  className="w-full h-[350px] md:h-[450px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white/90 leading-relaxed">{clients[1].description}</p>
                </div>
              </div>
              <div className="pt-6">
                <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-2">{clients[1].category}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{clients[1].name}</h3>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="col-span-12 md:col-span-6 lg:col-span-7 lg:pt-32"
            >
              <div className="relative overflow-hidden rounded-2xl group cursor-pointer bg-gray-100">
                <img
                  src={clients[2].image}
                  alt={`${clients[2].name} - ${clients[2].category}`}
                  className="w-full h-[350px] md:h-[450px] object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-white/90 leading-relaxed">{clients[2].description}</p>
                </div>
              </div>
              <div className="pt-6">
                <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-2">{clients[2].category}</p>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{clients[2].name}</h3>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
