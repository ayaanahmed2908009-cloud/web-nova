import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, MessageSquare, Clock, Target, CheckCircle, Calendar, Phone, Mail, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const consultationTypes = [
  {
    title: "Technical Consultation",
    description: "Get expert advice on technology choices, architecture, and implementation strategies",
    icon: Target,
    duration: "60 minutes",
    price: "Free",
    features: ["Technology Stack Review", "Architecture Planning", "Performance Analysis", "Security Assessment"]
  },
  {
    title: "Business Strategy",
    description: "Strategic planning for your digital transformation and online presence",
    icon: MessageSquare,
    duration: "90 minutes", 
    price: "200 SAR",
    features: ["Market Analysis", "Competitor Research", "Digital Strategy", "ROI Planning"]
  },
  {
    title: "Project Planning",
    description: "Detailed project planning with timeline, budget, and resource allocation",
    icon: Calendar,
    duration: "45 minutes",
    price: "150 SAR",
    features: ["Timeline Creation", "Budget Planning", "Resource Allocation", "Risk Assessment"]
  }
];

const availableSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM", 
  "11:00 AM - 12:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM"
];

export default function Consultation() {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedType, setSelectedType] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    consultationType: "",
    preferredDate: "",
    preferredTime: "",
    projectDescription: "",
    specificQuestions: "",
    currentChallenges: ""
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const submitConsultation = useMutation({
    mutationFn: (data: typeof formData) => apiRequest("/api/consultations", "POST", data),
    onSuccess: () => {
      toast({
        title: "Consultation Booked!",
        description: "We'll contact you within 24 hours to confirm your appointment.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        consultationType: "",
        preferredDate: "",
        preferredTime: "",
        projectDescription: "",
        specificQuestions: "",
        currentChallenges: ""
      });
      setSelectedType("");
      queryClient.invalidateQueries({ queryKey: ["/api/consultations"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to book consultation. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.consultationType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    submitConsultation.mutate(formData);
  };

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
            <Link href="/services">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Services
              </Button>
            </Link>
            <div className="text-xl font-bold">Expert Consultation</div>
            <Link href="/project-form">
              <Button variant="outline" size="sm">
                Start Project
              </Button>
            </Link>
          </div>
        </motion.header>

        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-8 py-16">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Expert Consultation Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get personalized advice from our experienced team. Whether you need technical guidance, 
              strategic planning, or project consultation, we're here to help you make informed decisions.
            </p>
          </motion.div>

          {/* Consultation Types */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {consultationTypes.map((type, index) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + (index * 0.1) }}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedType(type.title);
                  setFormData(prev => ({ ...prev, consultationType: type.title }));
                }}
              >
                <Card className={`h-full border-2 transition-all duration-300 hover:shadow-xl ${
                  selectedType === type.title ? 'border-blue-500 shadow-lg' : 'hover:border-gray-300'
                }`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500">
                        <type.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="text-sm font-medium mb-1">
                          {type.price}
                        </Badge>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {type.duration}
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-blue-600 transition-colors">
                      {type.title}
                    </CardTitle>
                    <p className="text-gray-600 leading-relaxed">
                      {type.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {type.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Consultation Form */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl p-12 shadow-xl"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Book Your Consultation</h2>
              <p className="text-gray-600 text-lg">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="05xxxxxxxx"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                    placeholder="Your company name (optional)"
                  />
                </div>
              </div>

              {/* Consultation Details */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="consultationType">Consultation Type *</Label>
                  <Select value={formData.consultationType} onValueChange={(value) => setFormData(prev => ({ ...prev, consultationType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select consultation type" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultationTypes.map((type) => (
                        <SelectItem key={type.title} value={type.title}>
                          {type.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredDate">Preferred Date</Label>
                  <Input
                    id="preferredDate"
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="preferredTime">Preferred Time</Label>
                  <Select value={formData.preferredTime} onValueChange={(value) => setFormData(prev => ({ ...prev, preferredTime: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableSlots.map((slot) => (
                        <SelectItem key={slot} value={slot}>
                          {slot}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="projectDescription">Project Description</Label>
                  <Textarea
                    id="projectDescription"
                    value={formData.projectDescription}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectDescription: e.target.value }))}
                    placeholder="Briefly describe your project or business needs..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specificQuestions">Specific Questions</Label>
                  <Textarea
                    id="specificQuestions"
                    value={formData.specificQuestions}
                    onChange={(e) => setFormData(prev => ({ ...prev, specificQuestions: e.target.value }))}
                    placeholder="What specific questions or topics would you like to discuss during the consultation?"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentChallenges">Current Challenges</Label>
                  <Textarea
                    id="currentChallenges"
                    value={formData.currentChallenges}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentChallenges: e.target.value }))}
                    placeholder="What are the main challenges or roadblocks you're currently facing?"
                    rows={3}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-8">
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitConsultation.isPending}
                  className="px-12 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {submitConsultation.isPending ? "Booking..." : "Book Consultation"}
                </Button>
                <p className="text-sm text-gray-500 mt-4">
                  We'll review your request and contact you within 24 hours to confirm your consultation
                </p>
              </div>
            </form>
          </motion.div>

          {/* Why Choose Our Consultation */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-900 rounded-3xl p-12 text-white mt-16"
          >
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Choose Our Consultation?</h2>
              <p className="text-gray-300 text-lg">
                Get expert insights from our experienced team
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Expert Knowledge",
                  description: "Over 10 years of experience in web development and digital solutions",
                  icon: Target
                },
                {
                  title: "Personalized Approach",
                  description: "Every consultation is tailored to your specific needs and challenges",
                  icon: User
                },
                {
                  title: "Actionable Insights",
                  description: "Walk away with clear next steps and practical recommendations",
                  icon: CheckCircle
                }
              ].map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 + (index * 0.1) }}
                  className="text-center"
                >
                  <div className="p-4 rounded-2xl bg-white/10 inline-flex mb-6">
                    <benefit.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <Footer />
      </div>
    </PageTransition>
  );
}