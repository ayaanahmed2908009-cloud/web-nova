import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, CheckCircle, User, Briefcase, Smartphone, Globe } from "lucide-react";
import CustomCursor from "@/components/CustomCursor";
import PageTransition from "@/components/PageTransition";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

const projectTypes = [
  { id: "website", label: "Website Development", icon: Globe },
  { id: "private-app", label: "Private App (Company/Employees)", icon: Briefcase },
  { id: "public-app", label: "Public App (Customers/Market)", icon: Smartphone },
  { id: "consultation", label: "Consultation", icon: User }
];

const budgetRanges = [
  "Under 1,000 SAR",
  "1,000 - 3,000 SAR", 
  "3,000 - 5,000 SAR",
  "5,000 - 10,000 SAR",
  "10,000+ SAR",
  "I prefer to discuss budget"
];

const timeframes = [
  "ASAP (Rush project)",
  "Within 2 weeks",
  "Within 1 month",
  "Within 2-3 months",
  "Flexible timeline"
];

const features = [
  { id: "responsive", label: "Mobile Responsive Design" },
  { id: "cms", label: "Content Management System" },
  { id: "ecommerce", label: "E-commerce Functionality" },
  { id: "auth", label: "User Authentication/Login" },
  { id: "payment", label: "Payment Processing" },
  { id: "api", label: "API Integration" },
  { id: "analytics", label: "Analytics & Tracking" },
  { id: "seo", label: "SEO Optimization" },
  { id: "hosting", label: "Hosting & Domain Setup" },
  { id: "maintenance", label: "Ongoing Maintenance" }
];

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    // Personal Info
    name: "",
    email: "",
    phone: "",
    company: "",
    
    // Project Details
    projectType: "",
    projectTitle: "",
    description: "",
    budget: "",
    timeframe: "",
    features: [] as string[],
    
    // Additional Info
    hasExistingSite: "",
    existingSiteUrl: "",
    inspiration: "",
    additionalNotes: ""
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalSteps = 4;

  useSEO({
    title: "Start Your Project - WebNova",
    description: "Tell us about your project requirements and get a personalized quote for your website or mobile app.",
    keywords: "project form, website quote, app development, web design consultation",
    canonical: "/project-form"
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (featureId: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(f => f !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Here you would typically send the data to your backend
    // For now, we'll simulate a submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    // Redirect to success page or dashboard
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.name && formData.email && formData.phone);
      case 2:
        return !!(formData.projectType && formData.projectTitle && formData.description);
      case 3:
        return !!(formData.budget && formData.timeframe);
      case 4:
        return true; // Step 4 is optional
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps && validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Personal Information</h3>
              <p className="text-gray-600 mb-6">Let's start with your contact details</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  className="mt-2"
                  required
                />
                {!formData.name && currentStep > 1 && (
                  <p className="text-red-500 text-sm mt-1">Full name is required</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your@email.com"
                  className="mt-2"
                  required
                />
                {!formData.email && currentStep > 1 && (
                  <p className="text-red-500 text-sm mt-1">Email address is required</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="05xxxxxxxx"
                  className="mt-2"
                  required
                />
                {!formData.phone && currentStep > 1 && (
                  <p className="text-red-500 text-sm mt-1">Phone number is required</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="company">Company/Organization</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="Optional"
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Project Type</h3>
              <p className="text-gray-600 mb-6">What type of project are you looking for?</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {projectTypes.map((type) => (
                <motion.div
                  key={type.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleInputChange("projectType", type.id)}
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.projectType === type.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      formData.projectType === type.id ? "bg-blue-500 text-white" : "bg-gray-100"
                    }`}>
                      <type.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{type.label}</h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectTitle">Project Title *</Label>
                <Input
                  id="projectTitle"
                  value={formData.projectTitle}
                  onChange={(e) => handleInputChange("projectTitle", e.target.value)}
                  placeholder="Give your project a name"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe your project goals, target audience, and key requirements..."
                  rows={4}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Budget & Timeline</h3>
              <p className="text-gray-600 mb-6">Help us understand your project scope</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label>Budget Range</Label>
                <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>{range}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label>Timeline</Label>
                <Select value={formData.timeframe} onValueChange={(value) => handleInputChange("timeframe", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="When do you need this completed?" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeframes.map((time) => (
                      <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <Label>Features & Requirements</Label>
              <p className="text-sm text-gray-500 mb-4">Select all features you need (optional)</p>
              <div className="grid md:grid-cols-2 gap-3">
                {features.map((feature) => (
                  <div key={feature.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature.id}
                      checked={formData.features.includes(feature.id)}
                      onCheckedChange={() => handleFeatureToggle(feature.id)}
                    />
                    <Label htmlFor={feature.id} className="text-sm">{feature.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-4">Additional Information</h3>
              <p className="text-gray-600 mb-6">Any additional details that would help us</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label>Do you have an existing website?</Label>
                <Select value={formData.hasExistingSite} onValueChange={(value) => handleInputChange("hasExistingSite", value)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, I have an existing website</SelectItem>
                    <SelectItem value="no">No, this is a new project</SelectItem>
                    <SelectItem value="redesign">Yes, but I want a complete redesign</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {formData.hasExistingSite === "yes" && (
                <div>
                  <Label htmlFor="existingSiteUrl">Current Website URL</Label>
                  <Input
                    id="existingSiteUrl"
                    value={formData.existingSiteUrl}
                    onChange={(e) => handleInputChange("existingSiteUrl", e.target.value)}
                    placeholder="https://yourwebsite.com"
                    className="mt-2"
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="inspiration">Inspiration/Reference Sites</Label>
                <Textarea
                  id="inspiration"
                  value={formData.inspiration}
                  onChange={(e) => handleInputChange("inspiration", e.target.value)}
                  placeholder="Share URLs of websites/apps you like or describe your preferred style..."
                  rows={3}
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  placeholder="Anything else you'd like us to know about your project..."
                  rows={3}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
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

        <div className="max-w-4xl mx-auto px-8 py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Start Your Project
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tell us about your project requirements and we'll provide a personalized quote
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm font-medium text-gray-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
              />
            </div>
          </div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-gray-200/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Project Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => e.preventDefault()}>
                  {renderStep()}
                  
                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Previous
                    </Button>
                    
                    {currentStep === totalSteps ? (
                      <Button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting || !validateStep(currentStep)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>Submitting...</>
                        ) : (
                          <>
                            <CheckCircle className="w-4 h-4" />
                            Submit Project
                          </>
                        )}
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!validateStep(currentStep)}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        <Footer />
      </div>
    </PageTransition>
  );
}