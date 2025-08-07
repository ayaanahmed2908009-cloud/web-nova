import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Smartphone, Users, Globe, ArrowRight, Star, CheckCircle } from "lucide-react";

const appTypes = [
  {
    title: "Private Apps",
    subtitle: "For Companies & Employees",
    description: "Internal applications designed for your team and company operations",
    icon: Users,
    color: "from-blue-500 to-indigo-600",
    features: [
      "Employee management",
      "Internal communication",
      "Workflow automation",
      "Data analytics"
    ],
    highlight: "Boost Productivity"
  },
  {
    title: "Public Apps",
    subtitle: "For Customers & Market",
    description: "Consumer-facing applications for your customers and the general public",
    icon: Globe,
    color: "from-emerald-500 to-teal-600",
    features: [
      "E-commerce platforms",
      "Social media apps",
      "Booking systems",
      "Entertainment apps"
    ],
    highlight: "Reach More Customers"
  }
];

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

export default function GetYourApp() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-2 h-2 bg-blue-500 rounded-full opacity-30"></div>
        <div className="absolute bottom-32 left-16 w-3 h-3 bg-emerald-500 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-10 w-1 h-1 bg-indigo-600 rounded-full opacity-40"></div>
        <div className="absolute top-40 left-1/3 w-32 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent opacity-60"></div>
        <div className="absolute bottom-40 right-1/4 w-24 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Smartphone className="w-6 h-6 text-blue-600" />
            <span className="text-sm font-medium text-blue-600 uppercase tracking-wider">Mobile Apps</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            Get Your App
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Transform your business with custom mobile applications. Choose between private employee tools or public consumer apps.
          </p>
        </motion.div>

        {/* App Types Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {appTypes.map((app, index) => (
            <motion.div
              key={app.title}
              variants={fadeInUp}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <Card className="h-full bg-white/80 backdrop-blur-sm border-gray-200/50 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl">
                <CardHeader className="pb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${app.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <app.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="text-2xl text-gray-900">{app.title}</CardTitle>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${app.color} text-white`}>
                      {app.highlight}
                    </span>
                  </div>
                  
                  <p className="text-sm font-medium text-gray-500 mb-2">{app.subtitle}</p>
                  <p className="text-gray-600 leading-relaxed">{app.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-900">Key Features:</h4>
                    <ul className="space-y-2">
                      {app.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-center">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Technologies Preview */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-gray-900">Technologies We Use</h3>
          
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { name: "React Native", icon: "📱" },
              { name: "Flutter", icon: "🚀" },
              { name: "iOS Native", icon: "🍎" },
              { name: "Android", icon: "🤖" },
              { name: "PWA", icon: "🌐" },
              { name: "Cross-Platform", icon: "⚡" }
            ].map((tech) => (
              <motion.div
                key={tech.name}
                whileHover={{ y: -4, scale: 1.05 }}
                className="flex flex-col items-center p-4 bg-white/60 rounded-xl border border-gray-200/50 hover:border-gray-300 transition-colors min-w-[100px]"
              >
                <div className="text-2xl mb-2">{tech.icon}</div>
                <p className="text-sm font-medium text-gray-700">{tech.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-blue-600/10 to-emerald-600/10 rounded-3xl p-12 border border-blue-200/30">
            <h3 className="text-3xl font-bold mb-4 text-gray-900">Ready to Build Your App?</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss your app idea and create a solution that perfectly fits your needs and budget.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/project-form">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white px-8 py-4 text-lg group"
                >
                  <Smartphone className="w-5 h-5 mr-2" />
                  Start Your Project
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              <Link href="/get-app">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 text-lg"
                >
                  Explore App Options
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}