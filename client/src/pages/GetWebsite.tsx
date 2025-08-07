import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code2, Palette, Zap, Shield, Globe, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";

const websiteTypes = [
  {
    title: "Business Website",
    description: "Professional corporate presence with modern design",
    features: ["Company Profile", "Service Pages", "Contact Forms", "SEO Optimization"],
    price: "1,500 - 3,000 SAR",
    icon: Globe,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "E-commerce Store",
    description: "Complete online store with payment integration",
    features: ["Product Catalog", "Shopping Cart", "Payment Gateway", "Inventory Management"],
    price: "3,000 - 5,000 SAR",
    icon: Shield,
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Portfolio Website",
    description: "Showcase your work with stunning visual layouts",
    features: ["Gallery System", "Project Showcase", "Client Testimonials", "Contact Integration"],
    price: "800 - 2,000 SAR",
    icon: Palette,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Landing Page",
    description: "High-converting single page for campaigns",
    features: ["Lead Capture", "A/B Testing", "Analytics", "Mobile Optimized"],
    price: "500 - 1,200 SAR",
    icon: Zap,
    color: "from-orange-500 to-red-500"
  }
];

const features = [
  "Responsive Design",
  "Fast Loading Speed",
  "SEO Optimized",
  "Security Features",
  "Analytics Integration",
  "Social Media Integration",
  "Content Management",
  "24/7 Support"
];

export default function GetWebsite() {
  return (
    <PageTransition>
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
          <div className="text-xl font-bold">Get Your Website</div>
          <Link href="/portfolio">
            <Button variant="outline" size="sm">
              View Portfolio
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
              ✨ Website Solutions Tailored for You
            </span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Choose Your Perfect Website
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From simple landing pages to complex e-commerce stores, we build websites that grow with your business and exceed your expectations
          </p>
        </motion.div>

        {/* Website Types Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, staggerChildren: 0.1 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {websiteTypes.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="h-full border-2 hover:border-gray-300 transition-all duration-300 hover:shadow-xl">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${type.color}`}>
                      <type.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-sm font-medium">
                      {type.price}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl group-hover:text-gray-900 transition-colors">
                    {type.title}
                  </CardTitle>
                  <p className="text-gray-600 leading-relaxed">
                    {type.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {type.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/dashboard">
                    <Button className="w-full group-hover:bg-gray-900 transition-colors">
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* What's Included Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-900 rounded-3xl p-12 text-white"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What's Included in Every Website</h2>
            <p className="text-gray-300 text-lg">
              Professional features that make your website stand out
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + (index * 0.1) }}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <h3 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h3>
          <p className="text-gray-600 mb-8 text-lg">
            Get a personalized quote and timeline for your website
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="px-8">
                Request Quote
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="px-8">
                View Our Work
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
      </div>
    </PageTransition>
  );
}