import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    details: "+966 50 123 4567",
    description: "Available 9 AM - 6 PM (Saudi Time)"
  },
  {
    icon: Mail,
    title: "Email Us", 
    details: "hello@webnova-solutions.com",
    description: "We respond within 2 hours"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "Riyadh, Saudi Arabia",
    description: "Serving clients across the Kingdom"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Sun - Thu: 9 AM - 6 PM",
    description: "Closed on Fridays & Saturdays"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function Contact() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Get Your <span className="text-gray-600">Free Quote</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to transform your business with a professional website? Contact WebNova Solutions today 
              for a free consultation and custom quote for your Saudi Arabian business.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Let's Start Your Project</h3>
                <p className="text-gray-600 mb-8">
                  Whether you need a simple business website, complex e-commerce platform, or complete digital transformation, 
                  our team is here to help. We specialize in creating websites that work perfectly for Saudi Arabian businesses.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="group"
                  >
                    <Card className="p-6 border-0 bg-gray-50 group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-0">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover:bg-black transition-colors duration-300">
                            <item.icon className="w-5 h-5 text-black group-hover:text-white transition-colors duration-300" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{item.title}</h4>
                            <p className="text-black font-medium mb-1">{item.details}</p>
                            <p className="text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-black text-white hover:bg-gray-800">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Get Free Quote
                </Button>
                <Button variant="outline" size="lg" className="hover:bg-black hover:text-white">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </motion.div>
            </motion.div>

            {/* Service Areas */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Service Areas</h3>
                <p className="text-gray-600 mb-6">
                  We proudly serve businesses throughout Saudi Arabia with local expertise and international standards.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  "Riyadh", "Jeddah", "Dammam", "Mecca", 
                  "Medina", "Khobar", "Tabuk", "Abha",
                  "Najran", "Jazan", "Hail", "Al-Ahsa"
                ].map((city, index) => (
                  <motion.div
                    key={city}
                    variants={itemVariants}
                    className="p-4 rounded-lg bg-gray-50 text-center hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-medium">{city}</span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h4 className="font-semibold mb-3">Why Choose Local?</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Understanding of Saudi market and culture</li>
                  <li>• Arabic language and RTL design expertise</li>
                  <li>• Local payment gateway integration</li>
                  <li>• Same timezone support and communication</li>
                  <li>• Knowledge of local business regulations</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Local Business Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "WebNova Solutions",
          "description": "Professional web design and development services in Saudi Arabia",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "SA",
            "addressRegion": "Riyadh Province",
            "addressLocality": "Riyadh"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 24.7136,
            "longitude": 46.6753
          },
          "telephone": "+966501234567",
          "email": "hello@webnova-solutions.com",
          "url": "https://webnova-solutions.replit.app",
          "priceRange": "500 SAR - 5000 SAR",
          "openingHours": "Su-Th 09:00-18:00",
          "areaServed": [
            "Riyadh", "Jeddah", "Dammam", "Mecca", "Medina", "Saudi Arabia"
          ],
          "serviceArea": {
            "@type": "Country",
            "name": "Saudi Arabia"
          }
        })}
      </script>
    </section>
  );
}