import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code2, Paintbrush, Settings, LineChart, Smartphone, ShoppingCart, Users, Zap } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";

const services = [
  {
    title: "Website Development",
    description: "Custom-built websites using modern technologies and best practices for optimal performance",
    icon: Code2,
    features: ["Custom Development", "Responsive Design", "Performance Optimization", "Modern Tech Stack"],
    link: "/get-website"
  },
  {
    title: "UI/UX Design",
    description: "Intuitive and engaging user interfaces that enhance user experience and drive conversions",
    icon: Paintbrush,
    features: ["User Research", "Wireframing", "Prototyping", "Visual Design"],
    link: "/design-services"
  },
  {
    title: "Website Maintenance",
    description: "Regular updates and maintenance to keep your site running smoothly and securely",
    icon: Settings,
    features: ["Security Updates", "Content Updates", "Performance Monitoring", "Backup Management"],
    link: "/maintenance"
  },
  {
    title: "SEO Optimization",
    description: "Improve your site's visibility and reach your target audience through search engines",
    icon: LineChart,
    features: ["Keyword Research", "On-Page SEO", "Technical SEO", "Analytics Setup"],
    link: "/seo-services"
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android",
    icon: Smartphone,
    features: ["iOS Development", "Android Development", "Cross-Platform", "App Store Optimization"],
    link: "/mobile-apps"
  },
  {
    title: "E-commerce Solutions",
    description: "Complete online store setup with payment processing and inventory management",
    icon: ShoppingCart,
    features: ["Store Setup", "Payment Integration", "Inventory Management", "Order Processing"],
    link: "/ecommerce"
  },
  {
    title: "Digital Marketing",
    description: "Comprehensive digital marketing strategies to grow your online presence",
    icon: Users,
    features: ["Social Media Marketing", "Content Strategy", "Email Marketing", "PPC Campaigns"],
    link: "/marketing"
  },
  {
    title: "Performance Optimization",
    description: "Speed up your website and improve user experience with advanced optimization techniques",
    icon: Zap,
    features: ["Speed Optimization", "Core Web Vitals", "CDN Setup", "Code Optimization"],
    link: "/optimization"
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <CustomCursor />
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div className="text-xl font-bold">Our Services</div>
          <Link href="/get-website">
            <Button variant="outline" size="sm">
              Get Website
            </Button>
          </Link>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-8 py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Complete Digital Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From concept to launch, we provide end-to-end digital services that transform your business presence and drive meaningful results
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full border-2 hover:border-gray-300 transition-all duration-300 hover:shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-gray-900 group-hover:to-gray-700 transition-all duration-300">
                      <service.icon className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-gray-900 transition-colors mb-2">
                    {service.title}
                  </CardTitle>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <div key={feature} className="text-sm text-gray-600">
                        • {feature}
                      </div>
                    ))}
                  </div>
                  <Link href={service.link}>
                    <Button className="w-full group-hover:bg-gray-900 transition-colors">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gray-900 rounded-3xl p-12 text-white text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a custom solution that perfectly fits your needs and budget
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="px-8">
                Get Quote
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white hover:text-gray-900">
                View Portfolio
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}