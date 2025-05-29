import { motion } from "framer-motion";

export default function Portfolio() {
  return (
    <section className="min-h-screen pt-20 flex items-center justify-center bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-6">Our Portfolio</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the websites we've created for our clients. From e-commerce stores to portfolio sites, 
            each project is crafted with attention to detail and modern design principles.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12"
        >
          <div className="bg-gray-50 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Portfolio Coming Soon</h3>
            <p className="text-gray-600">
              We're currently preparing our portfolio showcase with real client projects. 
              Check back soon to see our latest work!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}