import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Mail, MapPin, Phone, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  services: [
    { name: "Website Development", href: "/get-website" },
    { name: "App Development", href: "/get-app" },
    { name: "Consultation", href: "/consultation" },
    { name: "SEO Optimization", href: "/seo-services" }
  ],
  company: [
    { name: "About Us", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Our Team", href: "/about" },
    { name: "Contact", href: "/project-form" },
    { name: "Get Quote", href: "/project-form" }
  ]
};

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/company/web-nova-solution/", icon: Linkedin },
  { name: "Instagram", href: "https://www.instagram.com/webnovasolution_?igsh=MXV5NXZjN3Rmd21keQ==", icon: Instagram }
];

export default function Footer() {
  const [, setLocation] = useLocation();

  const handleNavigation = (href: string) => {
    // Prevent any scroll interference and ensure proper navigation
    if (href.startsWith('/')) {
      setLocation(href);
      // Scroll to top after navigation
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                WebNova
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Creating exceptional digital experiences that help businesses thrive in the modern world. From concept to launch, we're your trusted partner.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-4 h-4" />
                  <span>+966 050 633 6180</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-4 h-4" />
                  <span>webnovasolution@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>Riyadh, Saudi Arabia</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Services Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                      onClick={() => handleNavigation(link.href)}
                    >
                      {link.name}
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Company Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="text-gray-400 hover:text-white transition-colors cursor-pointer block"
                      onClick={() => handleNavigation(link.href)}
                    >
                      {link.name}
                    </motion.div>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-12 mb-12"
        >
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-xl font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-6">
              Get the latest updates on web design trends and our newest projects
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-white transition-colors text-white placeholder-gray-400"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-gray-400 text-center md:text-left">
              <p>&copy; 2025 WebNova Solution. All rights reserved.</p>
              <p className="text-sm mt-1">Made with passion in Saudi Arabia</p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <motion.a
                href={socialLinks[0].href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-7 h-7" />
              </motion.a>
              <motion.a
                href={socialLinks[1].href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white hover:from-pink-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Instagram"
              >
                <Instagram className="w-7 h-7" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}