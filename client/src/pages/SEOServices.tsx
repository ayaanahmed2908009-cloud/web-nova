import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Target, BarChart3, Globe, CheckCircle, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const seoServices = [
  {
    title: "Keyword Research",
    description: "Identify high-value keywords that your target audience is searching for",
    icon: Search,
    features: [
      "Competitor keyword analysis",
      "Long-tail keyword discovery",
      "Search volume analysis",
      "Keyword difficulty assessment"
    ]
  },
  {
    title: "On-Page SEO",
    description: "Optimize your website's content and structure for search engines",
    icon: Target,
    features: [
      "Title tag optimization",
      "Meta descriptions",
      "Header tag structure",
      "Content optimization"
    ]
  },
  {
    title: "Technical SEO",
    description: "Improve your website's technical foundation for better search visibility",
    icon: BarChart3,
    features: [
      "Site speed optimization",
      "Mobile responsiveness",
      "XML sitemaps",
      "Schema markup"
    ]
  },
  {
    title: "Local SEO",
    description: "Dominate local search results for your business location",
    icon: Globe,
    features: [
      "Google My Business optimization",
      "Local directory listings",
      "Location-based keywords",
      "Review management"
    ]
  }
];

const seoPackages = [
  {
    name: "SEO Starter",
    price: "1,500 SAR",
    duration: "per month",
    description: "Perfect for small businesses starting their SEO journey",
    features: [
      "Keyword research (20 keywords)",
      "On-page optimization (5 pages)",
      "Monthly progress report",
      "Basic technical SEO audit"
    ]
  },
  {
    name: "SEO Professional",
    price: "3,500 SAR",
    duration: "per month",
    description: "Comprehensive SEO for growing businesses",
    features: [
      "Keyword research (50 keywords)",
      "On-page optimization (15 pages)",
      "Content creation (4 articles)",
      "Technical SEO improvements",
      "Local SEO optimization",
      "Monthly detailed reports"
    ]
  },
  {
    name: "SEO Enterprise",
    price: "6,500 SAR",
    duration: "per month",
    description: "Advanced SEO for large businesses and e-commerce",
    features: [
      "Unlimited keyword research",
      "Full website optimization",
      "Content creation (8 articles)",
      "Advanced technical SEO",
      "Local & national SEO",
      "Weekly performance reports",
      "Dedicated SEO specialist"
    ]
  }
];

export default function SEOServices() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useSEO({
    title: "SEO Optimization Services - WebNova",
    description: "Professional SEO services to improve your website's search engine rankings and organic traffic. Keyword research, on-page optimization, and technical SEO.",
    keywords: "SEO services, search engine optimization, keyword research, on-page SEO, technical SEO, local SEO, Saudi Arabia",
    canonical: "/seo-services"
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
              <Search className="w-8 h-8 text-gray-900" />
              <Badge variant="outline" className="border-gray-300 text-gray-600">
                SEO Services
              </Badge>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gray-900">
              SEO Optimization
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Improve your website's search engine rankings and drive organic traffic with our comprehensive SEO services. From keyword research to technical optimization.
            </p>
          </motion.div>

          {/* SEO Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our SEO Services</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {seoServices.map((service) => (
                <motion.div
                  key={service.title}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group cursor-pointer"
                >
                  <Card className="bg-white border-gray-200 hover:border-gray-400 h-full shadow-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="w-16 h-16 rounded-xl bg-black flex items-center justify-center mb-4">
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <CardTitle className="text-2xl text-gray-900">{service.title}</CardTitle>
                      <p className="text-gray-600">{service.description}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-gray-600">
                            <CheckCircle className="w-4 h-4 text-gray-900" />
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

          {/* SEO Packages */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">SEO Packages</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {seoPackages.map((pkg, index) => (
                <motion.div
                  key={pkg.name}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`group cursor-pointer ${index === 1 ? 'ring-2 ring-gray-900/30' : ''}`}
                >
                  <Card className="bg-white border-gray-200 hover:border-gray-400 h-full shadow-sm hover:shadow-lg transition-all duration-300">
                    <CardHeader className="text-center pb-4">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold text-gray-900">{pkg.name}</h3>
                        <div className="flex items-center justify-center gap-1 mt-2">
                          <span className="text-3xl font-bold text-gray-900">{pkg.price}</span>
                          <span className="text-gray-600">/{pkg.duration}</span>
                        </div>
                      </div>
                      <p className="text-gray-600">{pkg.description}</p>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <ul className="space-y-3">
                        {pkg.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-gray-600">
                            <CheckCircle className="w-4 h-4 text-gray-900" />
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

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-gray-50 rounded-2xl p-12 border border-gray-200">
              <h2 className="text-4xl font-bold mb-6 text-gray-900">Ready to Improve Your Rankings?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Let's analyze your website and create a custom SEO strategy to increase your organic traffic and search visibility.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/project-form">
                  <Button 
                    size="lg"
                    className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg"
                  >
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Start SEO Project
                  </Button>
                </Link>
                
                <Link href="/consultation">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 text-lg"
                  >
                    SEO Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
        
        <Footer />
      </div>
    </PageTransition>
  );
}