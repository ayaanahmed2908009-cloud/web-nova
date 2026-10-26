import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Search, Target, BarChart3, Globe, CheckCircle, TrendingUp, Zap, Award, Users, Clock, Sparkles, ChartBar, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { SiInstagram } from "react-icons/si";

const seoServices = [
  {
    title: "Keyword Research & Strategy",
    description: "Data-driven keyword strategy to target your ideal customers",
    icon: Search,
    features: [
      "Competitor keyword gap analysis",
      "Long-tail keyword opportunities",
      "Search intent mapping",
      "Monthly search volume data",
      "Keyword difficulty scoring",
      "Content gap identification"
    ]
  },
  {
    title: "On-Page SEO Excellence",
    description: "Optimize every element of your pages for maximum visibility",
    icon: Target,
    features: [
      "Title tag & meta optimization",
      "Header structure (H1-H6)",
      "Content optimization & LSI keywords",
      "Internal linking strategy",
      "Image alt text optimization",
      "URL structure improvements"
    ]
  },
  {
    title: "Technical SEO Mastery",
    description: "Build a rock-solid technical foundation for search success",
    icon: Shield,
    features: [
      "Core Web Vitals optimization",
      "Mobile-first indexing",
      "XML sitemap generation",
      "Schema markup implementation",
      "Crawl error resolution",
      "Site architecture optimization"
    ]
  },
  {
    title: "Local SEO Domination",
    description: "Become the #1 choice in your local market",
    icon: Globe,
    features: [
      "Google Business Profile optimization",
      "NAP consistency audit",
      "Local citation building",
      "Review generation strategy",
      "Geo-targeted content",
      "Local link building"
    ]
  },
  {
    title: "Content SEO Strategy",
    description: "Create content that ranks and converts",
    icon: ChartBar,
    features: [
      "Topic cluster strategy",
      "Content calendar planning",
      "SEO content writing",
      "Featured snippet optimization",
      "Content refresh strategy",
      "E-E-A-T optimization"
    ]
  },
  {
    title: "Link Building & Authority",
    description: "Build high-quality backlinks that boost your rankings",
    icon: Award,
    features: [
      "Backlink audit & cleanup",
      "Competitor link analysis",
      "Digital PR outreach",
      "Guest posting strategy",
      "Broken link building",
      "Authority link acquisition"
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

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              SEO That Delivers Results
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Rank higher on Google and drive qualified traffic to your website. Our data-driven SEO strategies have helped Saudi businesses increase organic traffic by up to 300% in just 6 months.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-gray-900">93%</div>
                <div className="text-sm text-gray-600 mt-1">Traffic Increase</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-gray-900">1 Year</div>
                <div className="text-sm text-gray-600 mt-1">Experience</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-gray-900">2.5x</div>
                <div className="text-sm text-gray-600 mt-1">ROI Average</div>
              </motion.div>
            </div>
          </motion.div>

          {/* SEO Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">Comprehensive SEO Services</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Everything you need to dominate search results and outrank your competition
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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



          {/* Why Choose Our SEO */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose WebNova for SEO?</h2>

            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Fast Results</h4>
                <p className="text-sm text-gray-600">See ranking improvements within 30 days</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">White Hat Only</h4>
                <p className="text-sm text-gray-600">100% Google-compliant strategies</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Saudi Market Expert</h4>
                <p className="text-sm text-gray-600">We understand local search behavior</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-semibold mb-2">Proven Track Record</h4>
                <p className="text-sm text-gray-600">8+ successful SEO campaigns</p>
              </div>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>

              <div className="relative z-10">
                <Sparkles className="w-12 h-12 mx-auto mb-6 text-yellow-400" />
                <h2 className="text-4xl font-bold mb-6">Ready to Rank #1 on Google?</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Get a free SEO audit and custom strategy to dominate your competition. Contact us now to discuss your SEO goals.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Button
                    size="lg"
                    onClick={() => window.open('https://instagram.com/webnovasolution_', '_blank')}
                    className="bg-white text-black hover:bg-gray-100 px-8 py-4 text-lg flex items-center gap-2"
                  >
                    <SiInstagram className="w-5 h-5" />
                    Get SEO Cost Breakdown on Instagram
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
