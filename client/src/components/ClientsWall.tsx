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
    <section className="w-full bg-white relative z-20 py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 lg:sticky lg:top-32 lg:self-start"
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
              Whether we're developing powerful management software, building a sleek new website, or designing a high-performance mobile app, you can always count on WebNova Solution. Our team combines technical expertise with a deep understanding of modern business needs, delivering systems that streamline operations and elevate digital presence. We work closely with every client to bring their vision to life—efficiently, creatively, and with unwavering attention to detail.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
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
            </motion.div>
          </motion.div>

          <div className="space-y-8">
            {clients.map((client, index) => (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={`${index % 2 === 1 ? 'lg:ml-16' : 'lg:mr-16'}`}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 group">
                  <img
                    src={client.image}
                    alt={`${client.name} - ${client.category}`}
                    className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{client.name}</h3>
                    <p className="text-white/80 text-sm">{client.category}</p>
                    {client.link && (
                      <a 
                        href={client.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-white/90 text-sm mt-2 hover:text-white transition-colors"
                      >
                        <span>Visit Website</span>
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
