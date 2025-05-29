import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code, Palette, Globe } from "lucide-react";

const portfolioItems = [
  {
    id: 1,
    title: "E-commerce Fashion Store",
    description: "Modern online store with payment integration and inventory management",
    category: "E-commerce",
    technologies: ["React", "Node.js", "Stripe", "MongoDB"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop&crop=center",
    liveUrl: "#",
    features: ["Payment Gateway", "Admin Dashboard", "Mobile Responsive"]
  },
  {
    id: 2,
    title: "Restaurant Landing Page",
    description: "Elegant restaurant website with online reservation system",
    category: "Landing Page",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop&crop=center",
    liveUrl: "#",
    features: ["Online Reservations", "Menu Display", "Contact Forms"]
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "Creative portfolio for a freelance photographer",
    category: "Portfolio",
    technologies: ["React", "Next.js", "Sanity CMS"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
    liveUrl: "#",
    features: ["Image Gallery", "Blog System", "SEO Optimized"]
  },
  {
    id: 4,
    title: "Business Consulting",
    description: "Professional corporate website with service booking",
    category: "Corporate",
    technologies: ["React", "TypeScript", "Firebase"],
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center",
    liveUrl: "#",
    features: ["Appointment Booking", "Team Profiles", "Case Studies"]
  },
  {
    id: 5,
    title: "Tech Startup",
    description: "Modern SaaS landing page with interactive demos",
    category: "SaaS",
    technologies: ["React", "Vite", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&crop=center",
    liveUrl: "#",
    features: ["Interactive Demos", "Pricing Calculator", "User Dashboard"]
  },
  {
    id: 6,
    title: "Health & Wellness",
    description: "Healthcare clinic website with appointment scheduling",
    category: "Healthcare",
    technologies: ["React", "Express", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop&crop=center",
    liveUrl: "#",
    features: ["Appointment System", "Patient Portal", "Health Resources"]
  }
];

const categories = ["All", "E-commerce", "Landing Page", "Portfolio", "Corporate", "SaaS", "Healthcare"];

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = selectedCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <section id="portfolio" className="h-screen w-full flex items-center justify-center bg-white overflow-y-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Our Portfolio</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our recent projects and see how we've helped businesses transform their digital presence
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category 
                  ? "bg-black text-white" 
                  : "bg-white text-black border-gray-300 hover:bg-gray-50"
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Portfolio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[500px] overflow-y-auto">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-white text-black hover:bg-gray-100"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Project
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {item.category}
                    </span>
                    <div className="flex gap-1">
                      <Code className="w-4 h-4 text-gray-400" />
                      <Palette className="w-4 h-4 text-gray-400" />
                      <Globe className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-black text-white px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="space-y-1">
                    {item.features.map((feature) => (
                      <div key={feature} className="text-xs text-gray-500 flex items-center">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}