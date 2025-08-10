import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, Instagram, Linkedin, CheckCircle, Globe, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    value: "+966 050 633 6180",
    description: "Sun-Thu from 9am to 6pm",
    link: "tel:+966506336180"
  },
  {
    icon: Mail,
    title: "Email",
    value: "webnovasolution@gmail.com",
    description: "We'll respond within 24 hours",
    link: "mailto:webnovasolution@gmail.com"
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Saudi Arabia",
    description: "Serving clients nationwide",
    link: null
  },
  {
    icon: Clock,
    title: "Business Hours",
    value: "9:00 AM - 6:00 PM",
    description: "Sunday to Thursday (calls)",
    link: null
  }
];

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent Successfully!",
        description: "We'll get back to you within 24 hours.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pb-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden relative" style={{ paddingTop: '140px' }}>
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -top-20 -right-20 w-80 h-80 bg-gray-100 rounded-full opacity-30"
          />
          <motion.div
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-gray-100 rounded-full opacity-20"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <div className="px-6 py-3 bg-gray-100 rounded-full inline-flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-gray-700" />
                <span className="text-gray-700 font-medium">Available for New Projects</span>
              </div>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8">
              Let's Build Something{" "}
              <motion.span 
                className="text-gray-600 inline-block"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                Amazing
              </motion.span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-12 max-w-2xl mx-auto">
              Transform your ideas into reality with our expert team. We're just a message away from starting your next successful project.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-gray-900">24h</p>
                <p className="text-sm text-gray-600">Response Time</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-gray-900">100%</p>
                <p className="text-sm text-gray-600">Client Satisfaction</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <p className="text-3xl font-bold text-gray-900">8+</p>
                <p className="text-sm text-gray-600">Happy Clients</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-8">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose your preferred way to reach us. We're available through multiple channels to assist you.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="h-full text-center border-2 border-transparent hover:border-gray-200 transition-all duration-300 hover:shadow-xl bg-gradient-to-b from-white to-gray-50/50">
                  <CardHeader className="pb-4">
                    <motion.div 
                      className="mx-auto p-4 rounded-full bg-gray-100 group-hover:bg-gray-900 transition-all duration-300 w-fit"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <info.icon className="w-7 h-7 text-gray-900 group-hover:text-white transition-colors duration-300" />
                    </motion.div>
                    <CardTitle className="text-lg font-bold text-gray-900 mt-3">
                      {info.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {info.link ? (
                      <motion.a 
                        href={info.link}
                        className="block text-gray-900 font-bold text-lg hover:text-gray-700 transition-colors"
                        whileHover={{ scale: 1.05 }}
                      >
                        {info.value}
                      </motion.a>
                    ) : (
                      <p className="text-gray-900 font-bold text-lg">{info.value}</p>
                    )}
                    <p className="text-sm text-gray-500 leading-relaxed">{info.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                <MessageSquare className="w-10 h-10 text-gray-700" />
              </div>
            </motion.div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Have a project in mind? Fill out the form below with your requirements and we'll get back to you within 24 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-2xl border-2 border-gray-100 hover:border-gray-200 transition-all duration-300">
              <CardContent className="p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name and Email Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="group"
                    >
                      <Label htmlFor="name" className="flex items-center gap-2 mb-3 text-gray-700 font-medium">
                        <Users className="w-4 h-4" />
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="John Doe"
                        required
                        className="h-14 text-base border-2 focus:border-gray-400 transition-all duration-300 bg-white hover:bg-gray-50"
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="group"
                    >
                      <Label htmlFor="email" className="flex items-center gap-2 mb-3 text-gray-700 font-medium">
                        <Mail className="w-4 h-4" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="john@company.com"
                        required
                        className="h-14 text-base border-2 focus:border-gray-400 transition-all duration-300 bg-white hover:bg-gray-50"
                      />
                    </motion.div>
                  </div>
                  
                  {/* Phone and Subject Row */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="group"
                    >
                      <Label htmlFor="phone" className="flex items-center gap-2 mb-3 text-gray-700 font-medium">
                        <Phone className="w-4 h-4" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="+966 5xxxxxxxx"
                        className="h-14 text-base border-2 focus:border-gray-400 transition-all duration-300 bg-white hover:bg-gray-50"
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      className="group"
                    >
                      <Label htmlFor="subject" className="flex items-center gap-2 mb-3 text-gray-700 font-medium">
                        <Globe className="w-4 h-4" />
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        placeholder="Project Inquiry"
                        required
                        className="h-14 text-base border-2 focus:border-gray-400 transition-all duration-300 bg-white hover:bg-gray-50"
                      />
                    </motion.div>
                  </div>
                  
                  {/* Message Field */}
                  <motion.div
                    whileHover={{ scale: 1.005 }}
                    className="group"
                  >
                    <Label htmlFor="message" className="flex items-center gap-2 mb-3 text-gray-700 font-medium">
                      <MessageSquare className="w-4 h-4" />
                      Your Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your project goals, timeline, and any specific requirements..."
                      required
                      rows={8}
                      className="resize-none text-base border-2 focus:border-gray-400 transition-all duration-300 bg-white hover:bg-gray-50 p-4"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      {formData.message.length}/500 characters
                    </p>
                  </motion.div>
                  
                  {/* Submit Button */}
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="pt-6"
                  >
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 text-lg font-bold group shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                          <span>Sending Your Message...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <span>Send Message</span>
                          <Send className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      )}
                    </Button>
                  </motion.div>
                  
                  {/* Privacy Note */}
                  <p className="text-center text-sm text-gray-500 mt-6">
                    We respect your privacy and will never share your information with third parties.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Office Hours & Location */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Visit Our Office</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're based in Saudi Arabia and available to meet in person or virtually
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Office Hours Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 hover:border-gray-300 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Clock className="w-6 h-6 text-gray-700" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="font-medium text-gray-700">Sunday - Thursday</span>
                      <span className="text-gray-900 font-bold">9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b">
                      <span className="font-medium text-gray-700">Friday</span>
                      <span className="text-gray-900 font-bold">2:00 PM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="font-medium text-gray-700">Saturday</span>
                      <span className="text-gray-500">Closed</span>
                    </div>
                  </div>
                  <div className="pt-4 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Note:</strong> We're available 24/7 for urgent support via email and WhatsApp for existing clients.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            
            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-2 hover:border-gray-300 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <MapPin className="w-6 h-6 text-gray-700" />
                    Our Location
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <p className="text-gray-900 font-semibold text-lg">Riyadh, Saudi Arabia</p>
                    <p className="text-gray-600 leading-relaxed">
                      We serve clients across the Kingdom of Saudi Arabia and internationally. 
                      Available for in-person meetings in Riyadh and virtual meetings worldwide.
                    </p>
                  </div>
                  <div className="pt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <Globe className="w-5 h-5 text-gray-700" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Time Zone</p>
                        <p className="font-semibold text-gray-900">GMT+3 (Arabia Standard Time)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">
              Quick answers to common questions about our services
            </p>
          </motion.div>
          
          <div className="space-y-6">
            {[
              {
                question: "How long does it take to build a website?",
                answer: "Typically, a standard website takes 2-4 weeks from initial consultation to launch. Complex projects may take 6-8 weeks depending on the requirements."
              },
              {
                question: "What's included in website maintenance?",
                answer: "Our maintenance packages include regular updates, security monitoring, backups, content updates, and technical support. Check our maintenance subscription page for detailed plans."
              },
              {
                question: "Do you offer payment plans?",
                answer: "Yes, we offer flexible payment options including 50% upfront and 50% on completion for most projects. Custom payment plans are available for larger projects."
              },
              {
                question: "Can you help with existing websites?",
                answer: "Absolutely! We can redesign, optimize, or maintain existing websites. We'll assess your current site and provide recommendations for improvements."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="border-2 hover:border-gray-300 transition-all duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-4xl font-bold text-gray-900 mb-6">Stay Connected</h3>
            <p className="text-gray-600 text-xl mb-12 max-w-2xl mx-auto">
              Follow our journey and see our latest projects on social media
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-8">
              <motion.a
                href="https://www.linkedin.com/company/web-nova-solution/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center justify-center gap-4 px-12 py-6 bg-gray-900 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[240px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Linkedin className="w-8 h-8 relative z-10" />
                <span className="font-bold text-lg relative z-10">LinkedIn</span>
              </motion.a>
              
              <motion.a
                href="https://www.instagram.com/webnovasolution_?igsh=MXV5NXZjN3Rmd21keQ=="
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -8 }}
                whileTap={{ scale: 0.95 }}
                className="group relative flex items-center justify-center gap-4 px-12 py-6 bg-gray-700 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[240px] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Instagram className="w-8 h-8 relative z-10" />
                <span className="font-bold text-lg relative z-10">Instagram</span>
              </motion.a>
            </div>
            
            {/* Response Time Notice */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-12 inline-flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-full"
            >
              <Clock className="w-5 h-5 text-gray-700" />
              <span className="text-gray-700 font-medium">Average Response Time: Less than 24 hours</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h3>
            <p className="text-gray-300 text-lg mb-8">
              Whether you need a website, mobile app, or consultation, we're here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-100"
                onClick={() => window.location.href = '/project-form'}
              >
                Start Your Project
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black"
                onClick={() => window.location.href = '/consultation'}
              >
                Book Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}