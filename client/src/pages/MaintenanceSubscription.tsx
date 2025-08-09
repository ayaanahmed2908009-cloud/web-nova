import { useEffect } from "react";
import { motion } from "framer-motion";
import { Check, ArrowLeft, Star, Shield, Clock, Phone, Mail, MessageSquare, BarChart3, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "wouter";

const plans = [
  {
    name: "Starter Plan",
    price: "100",
    description: "Ideal for personal websites",
    features: [
      "1 Feature Addition per month",
      "3 Edits & Updates per month", 
      "4 Maintenance & Bug Fixes per month",
      "Standard Response Time (48-72 hours)",
      "Email Support Only"
    ],
    icon: Users,
    color: "from-gray-500 to-gray-600",
    popular: false
  },
  {
    name: "Growth Plan", 
    price: "250",
    description: "Ideal for blogs and newsletter websites",
    features: [
      "2 Feature Additions per month",
      "5 Edits & Updates per month",
      "6 Maintenance & Bug Fixes per month", 
      "Faster Response Time (24-48 hours)",
      "Priority Email Support"
    ],
    icon: BarChart3,
    color: "from-blue-500 to-blue-600",
    popular: false
  },
  {
    name: "Pro Plan",
    price: "400", 
    description: "Ideal for startups",
    features: [
      "3 Feature Additions per month",
      "8 Edits & Updates per month",
      "10 Maintenance & Bug Fixes per month",
      "Priority Response (within 24 hours)",
      "Scheduled Live Chat + Email",
      "SEO Starter Package",
      "Monthly Analytics & Performance Report"
    ],
    icon: Zap,
    color: "from-purple-500 to-purple-600", 
    popular: true
  },
  {
    name: "Premium Plan",
    price: "700",
    description: "Ideal for business on the rise",
    features: [
      "Nearly unlimited Feature Additions & Edits",
      "Comprehensive Maintenance & Security",
      "Priority Response (within hours)",
      "Advanced SEO Optimization",
      "Premium Support (phone, chat, email)",
      "Detailed Monthly Strategy Reports"
    ],
    icon: Shield,
    color: "from-orange-500 to-red-500",
    popular: false
  },
  {
    name: "Elite Plan",
    price: "1,200",
    description: "Ideal for e-commerce stores who want to grow",
    features: [
      "VIP Treatment with highest priority",
      "Monthly Strategic Consulting sessions", 
      "Lightning-fast response (same-day)",
      "Enhanced Security & 24/7 Monitoring",
      "Advanced SEO & Growth Roadmap",
      "Dedicated Account Manager"
    ],
    icon: Star,
    color: "from-yellow-500 to-orange-500",
    popular: false
  }
];

export default function MaintenanceSubscription() {
  // Ensure body scroll is restored when component mounts
  useEffect(() => {
    document.body.style.overflow = 'auto';
    
    return () => {
      // Clean up on unmount
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Back to Home Button */}
      <motion.div 
        className="fixed top-24 left-8 z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Link href="/">
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/90 backdrop-blur-sm border-gray-300 hover:bg-gray-50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </motion.div>

      {/* Hero Section */}
      <section className="pb-20 bg-gradient-to-br from-gray-50 to-white relative z-10" style={{ paddingTop: '140px' }}>
        <div className="max-w-7xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Website Maintenance
              <span className="block text-4xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Subscription Plans
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Keep your website running smoothly with our comprehensive maintenance services. 
              Choose the plan that fits your needs and let us handle the technical details.
            </p>
            
            <div className="flex items-center justify-center gap-8 mb-12">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-gray-600">Secure & Reliable</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-gray-600">Fast Response Times</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-500" />
                <span className="text-gray-600">Expert Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Choose Your Plan</h2>
            <p className="text-xl text-gray-600">
              All plans include regular backups, security monitoring, and performance optimization
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {plans.slice(0, 3).map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-500 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`h-full border-2 ${plan.popular ? 'border-purple-200 shadow-xl' : 'border-gray-200'} hover:shadow-lg transition-shadow`}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} mx-auto mb-4 flex items-center justify-center`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">SAR/month</span>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full py-3 ${plan.popular ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                      onClick={() => window.location.href = '/project-form'}
                    >
                      Choose {plan.name}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Premium Plans */}
          <div className="grid md:grid-cols-2 gap-8">
            {plans.slice(3).map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-2 border-orange-200 shadow-xl hover:shadow-2xl transition-shadow">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${plan.color} mx-auto mb-4 flex items-center justify-center`}>
                      <plan.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600">SAR/month</span>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                      onClick={() => window.location.href = '/project-form'}
                    >
                      Choose {plan.name}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">What's included in maintenance?</h3>
                  <p className="text-gray-600">Regular updates, security monitoring, performance optimization, bug fixes, and content updates based on your chosen plan.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">Can I upgrade my plan?</h3>
                  <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes take effect from the next billing cycle.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">What if I exceed my monthly requests?</h3>
                  <p className="text-gray-600">Additional requests can be handled at our standard hourly rate, or you can upgrade to a higher plan for more included requests.</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">Is there a contract?</h3>
                  <p className="text-gray-600">No long-term contracts required. You can cancel anytime with 30 days notice. We believe in earning your business every month.</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6">Ready to Keep Your Website Running Smoothly?</h3>
            <p className="text-gray-300 text-lg mb-8">
              Let us handle the technical details while you focus on your business. 
              Get started with our maintenance services today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-100"
                onClick={() => window.location.href = '/project-form'}
              >
                Get Started Today
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black"
                onClick={() => window.location.href = '/consultation'}
              >
                Consult First
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}