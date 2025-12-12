import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ClientsWall() {
  return (
    <section className="min-h-screen w-full bg-white relative z-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
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
              className="text-gray-600 leading-relaxed max-w-lg"
            >
              We partnered with Zeoofgroup, a leading real estate company, to provide comprehensive digital transformation consultation. Our team delivered website architecture analysis, user experience optimization, SEO strategy development, and digital marketing implementation that resulted in improved online visibility and lead generation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <a href="https://zeoofgroup.com" target="_blank" rel="noopener noreferrer">
                <motion.div
                  className="inline-flex items-center gap-2 text-gray-900 font-medium cursor-pointer group"
                  whileHover={{ x: 4 }}
                >
                  <span>visit zeoofgroup.com</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="/zeoofgroup-website.png"
                alt="Zeoofgroup Real Estate - The Corner Commercial Development"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">8+</span>
                </div>
                <div>
                  <p className="text-gray-900 font-semibold">Happy Clients</p>
                  <p className="text-gray-500 text-sm">Across Saudi Arabia</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
