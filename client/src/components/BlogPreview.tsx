import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    title: "5 Essential Web Design Trends for Saudi Businesses in 2025",
    excerpt: "Discover the latest web design trends that are driving success for Saudi Arabian businesses, from Arabic typography to mobile-first design.",
    date: "January 15, 2025",
    category: "Web Design",
    readTime: "5 min read",
    image: "/blog/web-design-trends-2025.jpg"
  },
  {
    title: "How to Choose the Right Web Design Agency in Riyadh",
    excerpt: "A comprehensive guide to selecting the perfect web design partner for your business in Saudi Arabia's capital city.",
    date: "January 10, 2025", 
    category: "Business Tips",
    readTime: "7 min read",
    image: "/blog/choose-web-agency-riyadh.jpg"
  },
  {
    title: "SEO for Saudi Businesses: Complete Local Search Guide",
    excerpt: "Master local SEO strategies to rank higher in Saudi Arabian search results and attract more customers to your business.",
    date: "January 5, 2025",
    category: "SEO",
    readTime: "10 min read",
    image: "/blog/seo-saudi-businesses.jpg"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

export default function BlogPreview() {
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
          <motion.div variants={cardVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Latest <span className="text-gray-600">Insights</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest web design trends, tips, and insights for Saudi Arabian businesses
            </p>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post, index) => (
              <motion.div key={index} variants={cardVariants}>
                <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-gray-50 hover:bg-white">
                  <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg relative overflow-hidden">
                    <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-0 transition-opacity duration-300"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white text-black px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </div>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 leading-tight group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {post.excerpt}
                    </p>
                    
                    <Button variant="ghost" className="p-0 h-auto text-black hover:text-gray-600 group/btn">
                      Read More 
                      <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div variants={cardVariants} className="text-center">
            <Button variant="outline" size="lg" className="hover:bg-black hover:text-white transition-colors">
              View All Articles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Blog Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "WebNova Solutions Blog",
          "description": "Web design and digital marketing insights for Saudi Arabian businesses",
          "url": "https://webnova-solutions.replit.app/blog",
          "author": {
            "@type": "Organization",
            "name": "WebNova Solutions"
          },
          "blogPost": blogPosts.map(post => ({
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.excerpt,
            "datePublished": post.date,
            "author": {
              "@type": "Organization", 
              "name": "WebNova Solutions"
            },
            "publisher": {
              "@type": "Organization",
              "name": "WebNova Solutions"
            }
          }))
        })}
      </script>
    </section>
  );
}