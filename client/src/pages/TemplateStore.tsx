import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Eye, Star, Check, Zap, Palette, Code, Globe } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { useQuery } from "@tanstack/react-query";
import { loadStripe } from '@stripe/stripe-js';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const categories = [
  { id: "all", name: "All Templates", icon: Globe },
  { id: "business", name: "Business", icon: Zap },
  { id: "ecommerce", name: "E-commerce", icon: ShoppingCart },
  { id: "portfolio", name: "Portfolio", icon: Palette },
  { id: "landing", name: "Landing Pages", icon: Code }
];

export default function TemplateStore() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();

  // Fetch templates from API
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["/api/templates"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/templates");
      return response.json();
    }
  });

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: "Website Templates Store - Ready-Made Designs - WebNova",
    description: "Browse our collection of professional, ready-made website templates. High-quality designs for business, e-commerce, portfolio, and landing pages.",
    keywords: "website templates, ready-made websites, web design templates, business templates, e-commerce templates, portfolio templates",
    canonical: "/templates"
  });

  const filteredTemplates = selectedCategory === "all" 
    ? templates 
    : templates.filter((template: any) => template.category === selectedCategory);

  const handlePurchase = async (template: any) => {
    try {
      // Create payment intent for template purchase
      const response = await apiRequest('POST', '/api/templates/payment-intent', {
        templateId: template.id,
        customerEmail: 'customer@example.com' // This would come from a form
      });

      if (!response.ok) {
        throw new Error('Failed to create payment intent');
      }

      const { clientSecret } = await response.json();
      const stripe = await stripePromise;

      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // For now, redirect to a contact form since we need customer details
      handleContactUs(template);
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Please contact us to purchase this template.",
        variant: "destructive",
      });
    }
  };

  const handleContactUs = (template: any) => {
    const message = `Hi! I'm interested in the ${template.name} template. Can you provide more details?`;
    window.open(`https://instagram.com/webnovasolution?message=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white text-gray-900">
        <CustomCursor />
        
        {/* Navigation */}
        <div className="absolute top-8 left-8 z-50">
          <Link href="/">
            <motion.div
              whileHover={{ x: -4 }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
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
                Template Store
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Ready-Made Templates
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Professional, high-quality website templates ready for immediate use. Save time and get online faster with our carefully crafted designs.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-600 mt-1">Templates Available</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-gray-900">24h</div>
                <div className="text-sm text-gray-600 mt-1">Instant Download</div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600 mt-1">Customizable</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gray-900 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-medium">{category.name}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Templates Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-20"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <Card className="bg-white border-gray-200 hover:border-gray-400 h-full shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {/* Template Thumbnail */}
                    <div className="relative aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
                        <div className="text-center">
                          <Palette className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">{template.name} Preview</p>
                        </div>
                      </div>
                      
                      {/* Overlay with action buttons */}
                      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="bg-white/90 backdrop-blur-sm border-white/20 text-gray-900 hover:bg-white"
                          onClick={() => window.open(template.demoUrl, '_blank')}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Live Preview
                        </Button>
                      </div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-gray-900 text-white">
                          {template.category}
                        </Badge>
                      </div>

                      {/* Price Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="bg-white/90 backdrop-blur-sm border-white/20 text-gray-900 font-bold">
                          ${(template.price / 100).toFixed(0)}
                        </Badge>
                      </div>
                    </div>

                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                            {template.name}
                          </CardTitle>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {template.description}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-6">
                      {/* Features */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Features</h4>
                        <div className="space-y-2">
                          {template.features.slice(0, 3).map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                              <Check className="w-3 h-3 text-green-600 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                          {template.features.length > 3 && (
                            <div className="text-xs text-gray-500">
                              +{template.features.length - 3} more features
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 mb-3">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {template.technologies.map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs border-gray-300 text-gray-600">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex gap-3">
                          <Button
                            onClick={() => handlePurchase(template)}
                            className="flex-1 bg-gray-900 text-white hover:bg-gray-800"
                            size="sm"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Purchase
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-300"
                            onClick={() => handleContactUs(template)}
                          >
                            Ask Questions
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Why Choose Our Templates */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose Our Templates?</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Clean Code</h4>
                <p className="text-sm text-gray-600">Well-structured, commented code that's easy to customize</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Fast Loading</h4>
                <p className="text-sm text-gray-600">Optimized for speed and performance</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">SEO Ready</h4>
                <p className="text-sm text-gray-600">Built with SEO best practices from the ground up</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Lifetime Support</h4>
                <p className="text-sm text-gray-600">Free updates and technical support included</p>
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
              
              <div className="relative z-10">
                <ShoppingCart className="w-12 h-12 mx-auto mb-6 text-white" />
                <h2 className="text-4xl font-bold mb-6">Need a Custom Template?</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Don't see exactly what you're looking for? We create custom templates tailored to your specific needs.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button 
                    size="lg"
                    onClick={() => window.open('https://instagram.com/webnovasolution', '_blank')}
                    className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg"
                  >
                    Request Custom Template
                  </Button>
                  
                  <p className="text-gray-400 text-sm">
                    Or email us at <a href="mailto:webnovasolution@gmail.com" className="text-white hover:underline font-semibold">webnovasolution@gmail.com</a>
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