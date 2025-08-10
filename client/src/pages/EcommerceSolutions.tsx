import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Package, CreditCard, TrendingUp, Shield, Zap, Globe, CheckCircle, Sparkles, Users, Award, Clock, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { SiInstagram } from "react-icons/si";

const ecommerceFeatures = [
  {
    title: "Product Management",
    description: "Powerful inventory system with variants, SKUs, and bulk operations",
    icon: Package,
    features: [
      "Unlimited product listings",
      "Product variants & options",
      "Inventory tracking",
      "Bulk import/export",
      "Product categories & tags",
      "Digital product support"
    ]
  },
  {
    title: "Shopping Cart & Checkout",
    description: "Seamless checkout experience that converts visitors into customers",
    icon: ShoppingCart,
    features: [
      "One-page checkout",
      "Guest checkout option",
      "Cart abandonment recovery",
      "Multiple payment methods",
      "Express checkout",
      "Order tracking"
    ]
  },
  {
    title: "Payment Processing",
    description: "Secure payment gateway integration with local and international options",
    icon: CreditCard,
    features: [
      "Stripe & PayPal integration",
      "Local payment methods (Mada, STC Pay)",
      "Multi-currency support",
      "PCI compliant security",
      "Automatic tax calculation",
      "Refund management"
    ]
  },
  {
    title: "Analytics & Reporting",
    description: "Data-driven insights to grow your online business",
    icon: BarChart,
    features: [
      "Sales analytics dashboard",
      "Customer behavior tracking",
      "Conversion rate optimization",
      "Revenue reports",
      "Product performance metrics",
      "Google Analytics integration"
    ]
  },
  {
    title: "Marketing Tools",
    description: "Built-in marketing features to drive sales and engagement",
    icon: TrendingUp,
    features: [
      "Discount codes & coupons",
      "Email marketing integration",
      "SEO optimization",
      "Social media integration",
      "Product reviews & ratings",
      "Referral programs"
    ]
  },
  {
    title: "Mobile Commerce",
    description: "Optimized shopping experience across all devices",
    icon: Globe,
    features: [
      "Responsive mobile design",
      "Progressive web app (PWA)",
      "Mobile-first checkout",
      "Touch-optimized interface",
      "App-like experience",
      "Fast loading times"
    ]
  }
];

const platforms = [
  {
    name: "WooCommerce",
    description: "WordPress-based solution",
    features: ["Flexible", "Large plugin ecosystem", "Cost-effective"]
  },
  {
    name: "Shopify",
    description: "All-in-one platform",
    features: ["Easy to use", "Built-in hosting", "App marketplace"]
  },
  {
    name: "Custom Solution",
    description: "Tailored to your needs",
    features: ["Full control", "Unique features", "Scalable architecture"]
  }
];

const stats = [
  { value: "1 Year", label: "Experience" },
  { value: "Latest", label: "Technologies Used" },
  { value: "100%", label: "Secure Checkout" },
  { value: "24/7", label: "Support Available" }
];

export default function EcommerceSolutions() {
  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: "E-commerce Solutions - WebNova",
    description: "Complete e-commerce solutions for Saudi businesses. Build your online store with secure payments, inventory management, and powerful analytics. Starting from 1,200 SAR.",
    keywords: "e-commerce development, online store, shopping cart, payment gateway, Saudi Arabia, Mada payment, STC Pay",
    canonical: "/ecommerce-solutions"
  });

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
        <CustomCursor />
        
        {/* Navigation */}
        <div className="absolute top-8 left-8 z-50">
          <Link href="/services">
            <motion.div
              whileHover={{ x: -4 }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Services</span>
            </motion.div>
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-8" style={{ paddingTop: '140px', paddingBottom: '80px' }}>
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <ShoppingCart className="w-8 h-8 text-gray-900" />
              <Badge variant="outline" className="border-gray-300 text-gray-600">
                E-commerce Solutions
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Build Your Online Store
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Launch a powerful e-commerce platform that sells 24/7. From product management to secure payments, we build online stores that convert visitors into customers.
            </p>
            
            {/* Price Range Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full"
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span className="font-semibold">Starting from 1,200 - 5,000 SAR</span>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="text-center p-6 bg-gray-50 rounded-xl"
              >
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex gap-2 p-1 bg-gray-100 rounded-lg">
              <button
                onClick={() => setActiveTab("features")}
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === "features" 
                    ? "bg-black text-white" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab("platforms")}
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === "platforms" 
                    ? "bg-black text-white" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Platforms
              </button>
              <button
                onClick={() => setActiveTab("process")}
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === "process" 
                    ? "bg-black text-white" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Process
              </button>
            </div>
          </div>

          {/* Features Tab */}
          {activeTab === "features" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Complete E-commerce Features</h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                Everything you need to run a successful online business
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ecommerceFeatures.map((feature) => (
                  <motion.div
                    key={feature.title}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group cursor-pointer"
                  >
                    <Card className="bg-white border-gray-200 hover:border-gray-400 h-full shadow-sm hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center mb-4">
                          <feature.icon className="w-8 h-8 text-white" />
                        </div>
                        
                        <CardTitle className="text-xl text-gray-900">{feature.title}</CardTitle>
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </CardHeader>
                      
                      <CardContent className="space-y-2">
                        {feature.features.map((item) => (
                          <div key={item} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{item}</span>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Platforms Tab */}
          {activeTab === "platforms" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Choose Your Platform</h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                We work with leading e-commerce platforms or build custom solutions
              </p>
              
              <div className="grid md:grid-cols-3 gap-8">
                {platforms.map((platform) => (
                  <motion.div
                    key={platform.name}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="text-center"
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300">
                      <CardHeader>
                        <h3 className="text-2xl font-bold text-gray-900">{platform.name}</h3>
                        <p className="text-gray-600">{platform.description}</p>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {platform.features.map((feature) => (
                            <li key={feature} className="flex items-center justify-center gap-2 text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Process Tab */}
          {activeTab === "process" && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Our Development Process</h2>
              <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                From concept to launch in 4-6 weeks
              </p>
              
              <div className="max-w-4xl mx-auto">
                {[
                  { step: "01", title: "Discovery & Planning", description: "We analyze your business needs, target audience, and competitors to create a strategic plan.", time: "Week 1" },
                  { step: "02", title: "Design & UX", description: "Create stunning designs that reflect your brand and optimize the shopping experience.", time: "Week 2" },
                  { step: "03", title: "Development", description: "Build your store with clean code, integrating all necessary features and payment systems.", time: "Week 3-4" },
                  { step: "04", title: "Testing & Launch", description: "Rigorous testing, performance optimization, and smooth deployment of your online store.", time: "Week 5-6" }
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-6 mb-8"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center font-bold">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                        <Badge variant="outline" className="ml-4">{item.time}</Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Why Choose Us */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose WebNova for E-commerce?</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Secure & Reliable</h4>
                <p className="text-sm text-gray-600">PCI compliant with 99.9% uptime</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Fast Performance</h4>
                <p className="text-sm text-gray-600">Optimized for speed and conversions</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Local Expertise</h4>
                <p className="text-sm text-gray-600">Saudi payment methods integrated</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Ready to Build</h4>
                <p className="text-sm text-gray-600">Your first e-commerce project</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
              
              <div className="relative z-10">
                <ShoppingCart className="w-12 h-12 mx-auto mb-6 text-yellow-400" />
                <h2 className="text-4xl font-bold mb-6">Ready to Start Selling Online?</h2>
                <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
                  Launch your e-commerce store with professional design and powerful features.
                </p>
                <p className="text-2xl font-bold text-yellow-400 mb-8">
                  Complete solutions from 1,200 - 5,000 SAR
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    size="lg"
                    onClick={() => window.open('https://instagram.com/webnovasolution', '_blank')}
                    className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg flex items-center gap-2"
                  >
                    <SiInstagram className="w-5 h-5" />
                    Get E-commerce Quote on Instagram
                  </Button>
                  
                  <p className="text-gray-400 text-sm">
                    Or call <a href="tel:+966537330022" className="text-white hover:underline font-semibold">+966 537 330 022</a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        <Footer />
      </div>
    </PageTransition>
  );
}