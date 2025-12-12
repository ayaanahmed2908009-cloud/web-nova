import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

const clients = [
  {
    name: "Zeoofgroup",
    image: "/zeoofgroup-website.png",
    category: "Real Estate",
    link: "https://zeoofgroup.com"
  },
  {
    name: "SABR",
    image: "/sabr-image.jpg",
    category: "Non-Profit Organization"
  },
  {
    name: "PIF College Prep",
    image: "/pif-cover.jpeg",
    category: "Educational Platform"
  }
];

export default function ClientsWall() {
  return (
    <section className="w-full bg-white relative z-20 py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-6"
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
              className="text-gray-600 leading-relaxed"
            >
              Whether we're developing powerful management software, building a sleek new website, or designing a high-performance mobile app, you can always count on WebNova Solution. Our team combines technical expertise with a deep understanding of modern business needs, delivering systems that streamline operations and elevate digital presence. We work closely with every client to bring their vision to life—efficiently, creatively, and with unwavering attention to detail.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
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

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                viewport={{ once: true }}
                className="col-span-2 md:col-span-1"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  <img
                    src={clients[0].image}
                    alt={`${clients[0].name} - ${clients[0].category}`}
                    className="w-full h-72 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{clients[0].name}</h3>
                    {clients[0].link && (
                      <a 
                        href={clients[0].link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-white/90 text-sm hover:text-white transition-colors"
                      >
                        <span>Visit Website</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="col-span-1 mt-0 md:mt-24"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  <img
                    src={clients[1].image}
                    alt={`${clients[1].name} - ${clients[1].category}`}
                    className="w-full h-56 md:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-bold text-white">{clients[1].name}</h3>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
                className="col-span-1"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 group">
                  <img
                    src={clients[2].image}
                    alt={`${clients[2].name} - ${clients[2].category}`}
                    className="w-full h-56 md:h-72 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-xl font-bold text-white">{clients[2].name}</h3>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
