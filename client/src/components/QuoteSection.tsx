import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowRight, Calculator, CheckCircle2, DollarSign, Globe, Layout, Package, Palette, Settings, Sparkles, Zap } from 'lucide-react';

const formSchema = z.object({
  websiteName: z.string().min(1, "Website name is required"),
  websiteType: z.enum(["portfolio", "landing", "ecommerce", "blog", "custom"]),
  pageCount: z.enum(["single", "basic", "intermediate", "advanced"]),
  domainSetup: z.enum(["yes", "no"]),
  ecommerce: z.enum(["none", "basic", "advanced"]),
  specialFeatures: z.array(z.string()),
  designStatus: z.enum(["new", "redesign"]),
  otherFeatures: z.string().optional(),
});

type QuoteFormData = z.infer<typeof formSchema>;

const websiteTypes = [
  { id: "portfolio", label: "Portfolio", icon: Layout, description: "Personal or professional showcase" },
  { id: "landing", label: "Landing Page", icon: Globe, description: "Single-page marketing site" },
  { id: "ecommerce", label: "E-commerce", icon: Package, description: "Online store with shopping cart" },
  { id: "blog", label: "Blog/News", icon: Sparkles, description: "Content-focused website" },
  { id: "custom", label: "Custom", icon: Settings, description: "Unique business requirements" },
];

const pageCountOptions = [
  { id: "single", label: "Single Page", description: "One comprehensive page" },
  { id: "basic", label: "2-5 Pages", description: "Small business website" },
  { id: "intermediate", label: "6-15 Pages", description: "Medium-sized website" },
  { id: "advanced", label: "16+ Pages", description: "Large, complex website" },
];

const specialFeatureOptions = [
  { id: "analytics", label: "Analytics Integration", description: "Google Analytics, tracking" },
  { id: "seo", label: "SEO Optimization", description: "Search engine optimization" },
  { id: "cms", label: "Content Management", description: "Easy content editing" },
  { id: "blog", label: "Blog System", description: "Built-in blogging platform" },
  { id: "contact", label: "Contact Forms", description: "Custom contact forms" },
  { id: "gallery", label: "Image Gallery", description: "Photo/portfolio galleries" },
  { id: "social", label: "Social Media Integration", description: "Social media feeds" },
  { id: "booking", label: "Booking System", description: "Appointment scheduling" },
  { id: "multilingual", label: "Multi-language", description: "Multiple language support" },
  { id: "api", label: "API Integration", description: "Third-party service integration" },
];

export default function QuoteSection() {
  const [currentStep, setCurrentStep] = useState(0);
  const [calculatedQuote, setCalculatedQuote] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteName: "",
      websiteType: "portfolio",
      pageCount: "basic",
      domainSetup: "no",
      ecommerce: "none",
      specialFeatures: [],
      designStatus: "new",
      otherFeatures: "",
    },
  });

  const calculateQuote = (data: QuoteFormData): number => {
    let basePrice = 0;

    const websiteTypePricing = {
      portfolio: 1500,
      landing: 1000,
      ecommerce: 3000,
      blog: 1200,
      custom: 2500,
    };
    basePrice += websiteTypePricing[data.websiteType];

    const pageCountMultiplier = {
      single: 1,
      basic: 1.5,
      intermediate: 2.5,
      advanced: 4,
    };
    basePrice *= pageCountMultiplier[data.pageCount];

    if (data.domainSetup === "yes") {
      basePrice += 200;
    }

    if (data.ecommerce === "basic") {
      basePrice += 1000;
    } else if (data.ecommerce === "advanced") {
      basePrice += 2500;
    }

    const featurePricing = {
      analytics: 200,
      seo: 500,
      cms: 800,
      blog: 600,
      contact: 300,
      gallery: 400,
      social: 250,
      booking: 1000,
      multilingual: 800,
      api: 1200,
    };

    data.specialFeatures.forEach(feature => {
      basePrice += featurePricing[feature as keyof typeof featurePricing] || 0;
    });

    if (data.designStatus === "redesign") {
      basePrice *= 0.8;
    }

    return Math.round(basePrice);
  };

  const onSubmit = async (data: QuoteFormData) => {
    const quote = calculateQuote(data);
    setCalculatedQuote(quote);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Quote Generated Successfully!",
          description: "Your personalized quote has been calculated.",
        });
        setCurrentStep(4); // Move to results step
      } else {
        throw new Error('Failed to generate quote');
      }
    } catch (error) {
      toast({
        title: "Error generating quote",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  if (calculatedQuote !== null && currentStep === 4) {
    return (
      <section id="quote" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <Card className="bg-white shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <div className="flex items-center justify-center mb-4">
                  <CheckCircle2 className="h-16 w-16" />
                </div>
                <CardTitle className="text-3xl font-bold">Your Custom Quote</CardTitle>
                <p className="text-green-100">Based on your project requirements</p>
              </CardHeader>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="text-5xl font-bold text-gray-900 mb-2">
                    ${calculatedQuote.toLocaleString()}
                  </div>
                  <p className="text-gray-600">One-time project cost</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Project Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Website Type:</span>
                        <span className="capitalize">{form.getValues('websiteType')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Page Count:</span>
                        <span className="capitalize">{form.getValues('pageCount')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Domain Setup:</span>
                        <span className="capitalize">{form.getValues('domainSetup')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">E-commerce:</span>
                        <span className="capitalize">{form.getValues('ecommerce')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Special Features</h4>
                    <div className="space-y-1">
                      {form.getValues('specialFeatures').length > 0 ? (
                        form.getValues('specialFeatures').map((feature) => {
                          const featureOption = specialFeatureOptions.find(f => f.id === feature);
                          return (
                            <Badge key={feature} variant="secondary" className="mr-1 mb-1">
                              {featureOption?.label}
                            </Badge>
                          );
                        })
                      ) : (
                        <p className="text-gray-500 text-sm">No additional features</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Start Your Project
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setCalculatedQuote(null);
                      setCurrentStep(0);
                      form.reset();
                    }}
                  >
                    Get Another Quote
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="quote" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-6">
            Get Your Custom Quote
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us about your project and get an instant, personalized quote tailored to your needs.
          </motion.p>
        </motion.div>

        <Form {...form}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {/* Progress Bar */}
            <div className="flex justify-center space-x-2 mb-8">
              {[0, 1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-2 w-12 rounded-full transition-all ${
                    step === currentStep 
                      ? "bg-black" 
                      : step < currentStep 
                        ? "bg-black/60"
                        : "bg-gray-200"
                  }`}
                />
              ))}
            </div>

            {/* Step 0: Basic Info */}
            {currentStep === 0 && (
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Project Basics</h3>
                  <p className="text-gray-600">Let's start with some basic information about your project</p>
                </div>

                <FormField
                  control={form.control}
                  name="websiteName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Website/Project Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your website or project name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="websiteType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What type of website do you need?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          {websiteTypes.map((type) => {
                            const Icon = type.icon;
                            return (
                              <div key={type.id} className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                                <RadioGroupItem value={type.id} id={type.id} />
                                <Icon className="h-5 w-5 text-gray-600" />
                                <div className="flex-1">
                                  <label htmlFor={type.id} className="font-medium cursor-pointer">
                                    {type.label}
                                  </label>
                                  <p className="text-sm text-gray-600">{type.description}</p>
                                </div>
                              </div>
                            );
                          })}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="designStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Is this a new website or redesign?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="new" id="new" />
                            <label htmlFor="new" className="cursor-pointer">New Website</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="redesign" id="redesign" />
                            <label htmlFor="redesign" className="cursor-pointer">Redesign Existing</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {/* Step 1: Pages & Structure */}
            {currentStep === 1 && (
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Pages & Structure</h3>
                  <p className="text-gray-600">How many pages will your website need?</p>
                </div>

                <FormField
                  control={form.control}
                  name="pageCount"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                        >
                          {pageCountOptions.map((option) => (
                            <div key={option.id} className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                              <RadioGroupItem value={option.id} id={option.id} />
                              <div className="flex-1">
                                <label htmlFor={option.id} className="font-medium cursor-pointer">
                                  {option.label}
                                </label>
                                <p className="text-sm text-gray-600">{option.description}</p>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="domainSetup"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Do you need domain setup and hosting configuration?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-6"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="domain-yes" />
                            <label htmlFor="domain-yes" className="cursor-pointer">Yes, please handle domain setup</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="domain-no" />
                            <label htmlFor="domain-no" className="cursor-pointer">No, I'll handle it myself</label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {/* Step 2: E-commerce */}
            {currentStep === 2 && (
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">E-commerce Features</h3>
                  <p className="text-gray-600">Do you need online selling capabilities?</p>
                </div>

                <FormField
                  control={form.control}
                  name="ecommerce"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="space-y-4"
                        >
                          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem value="none" id="ecommerce-none" />
                            <div className="flex-1">
                              <label htmlFor="ecommerce-none" className="font-medium cursor-pointer">
                                No E-commerce
                              </label>
                              <p className="text-sm text-gray-600">Information/marketing website only</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem value="basic" id="ecommerce-basic" />
                            <div className="flex-1">
                              <label htmlFor="ecommerce-basic" className="font-medium cursor-pointer">
                                Basic E-commerce
                              </label>
                              <p className="text-sm text-gray-600">Simple product catalog with payment processing</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                            <RadioGroupItem value="advanced" id="ecommerce-advanced" />
                            <div className="flex-1">
                              <label htmlFor="ecommerce-advanced" className="font-medium cursor-pointer">
                                Advanced E-commerce
                              </label>
                              <p className="text-sm text-gray-600">Full store with inventory, customers, analytics</p>
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {/* Step 3: Features */}
            {currentStep === 3 && (
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">Special Features</h3>
                  <p className="text-gray-600">Select any additional features you need</p>
                </div>

                <FormField
                  control={form.control}
                  name="specialFeatures"
                  render={() => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {specialFeatureOptions.map((feature) => (
                          <FormField
                            key={feature.id}
                            control={form.control}
                            name="specialFeatures"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={feature.id}
                                  className="flex flex-row items-start space-x-3 space-y-0 border rounded-lg p-4"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(feature.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, feature.id])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== feature.id
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <div className="space-y-1 leading-none">
                                    <FormLabel className="cursor-pointer">
                                      {feature.label}
                                    </FormLabel>
                                    <p className="text-sm text-gray-600">
                                      {feature.description}
                                    </p>
                                  </div>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="otherFeatures"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Any other specific requirements?</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe any other features or requirements you have in mind..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                type="button"
                onClick={nextStep}
                disabled={isSubmitting}
                className="bg-black text-white hover:bg-gray-800"
              >
                {currentStep === 3 ? (
                  isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Calculating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Calculator className="w-4 h-4" />
                      <span>Get Quote</span>
                    </div>
                  )
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Next</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </div>
          </motion.div>
        </Form>
      </div>
    </section>
  );
}