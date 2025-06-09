import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

const formSchema = z.object({
  websiteType: z.enum(["portfolio", "landing", "ecommerce", "blog", "custom"]),
  pageCount: z.enum(["single", "basic", "intermediate", "advanced"]),
  domainSetup: z.enum(["no", "yes"]),
  ecommerce: z.enum(["no", "basic", "advanced"]),
  specialFeatures: z.array(z.string()),
  designStatus: z.enum(["ready", "needed"]),
  otherFeatures: z.string().optional(),
  websiteName: z.string().min(1, "Website name is required"),
});

type QuoteFormData = z.infer<typeof formSchema>;

interface QuoteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const authSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type AuthFormData = z.infer<typeof authSchema>;

const formSteps = [
  { id: 'type', title: 'Website Type' },
  { id: 'pages', title: 'Pages' },
  { id: 'setup', title: 'Setup & Features' },
  { id: 'design', title: 'Design' },
  { id: 'details', title: 'Final Details' },
];

export default function QuoteForm({ open, onOpenChange }: QuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const { toast } = useToast();
  const { isAuthenticated, register, login, isRegistering, isLoggingIn } = useAuth();

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specialFeatures: [],
      otherFeatures: "",
      websiteName: "",
    },
  });

  const authForm = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const submitQuote = useMutation({
    mutationFn: async (data: QuoteFormData) => {
      const response = await apiRequest("POST", "/api/quote", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Quote Request Submitted!",
        description: "We'll review your requirements and get back to you within 3 business days.",
        duration: 5000,
      });
      onOpenChange(false);
      form.reset();
      setCurrentStep(0);
      setShowAuth(false);
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit quote request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: QuoteFormData) => {
    // If user is not authenticated, show auth interface
    if (!isAuthenticated) {
      setShowAuth(true);
      return;
    }
    
    // If authenticated, submit the quote directly
    submitQuote.mutate(data);
  };

  const handleAuth = async (data: AuthFormData) => {
    try {
      if (authMode === 'register') {
        await register(data);
        toast({
          title: "Account Created!",
          description: "Welcome to WebNova Solutions. Your quote is being submitted.",
        });
      } else {
        await login(data);
        toast({
          title: "Welcome Back!",
          description: "You're now logged in. Submitting your quote.",
        });
      }
      
      // Auto-submit the quote after successful auth
      const quoteData = form.getValues();
      submitQuote.mutate(quoteData);
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    }
  };

  const nextStep = () => {
    const currentStepField = getCurrentStepField();
    const value = form.getValues(currentStepField as any);

    if (!value && currentStepField !== "otherFeatures") {
      toast({
        title: "Please make a selection",
        description: "Choose an option before proceeding to the next step.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < formSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const getCurrentStepField = () => {
    switch (currentStep) {
      case 0: return "websiteType";
      case 1: return "pageCount";
      case 2: return "domainSetup";
      case 3: return "specialFeatures";
      case 4: return "designStatus";
      default: return "";
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <FormField
              control={form.control}
              name="websiteType"
              render={({ field }) => (
                <FormItem className="space-y-6">
                  <FormLabel className="text-lg font-semibold">What type of website do you need?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid gap-4"
                    >
                      {[
                        { value: "portfolio", label: "Personal portfolio", desc: "Showcase your work and skills" },
                        { value: "landing", label: "Business landing page", desc: "Convert visitors into customers" },
                        { value: "ecommerce", label: "E-commerce store", desc: "Sell products online" },
                        { value: "blog", label: "Blog or news site", desc: "Share your content" },
                        { value: "custom", label: "Custom multi-page website", desc: "Complex functionality" },
                      ].map((option) => (
                        <FormItem key={option.value} className="flex items-center space-x-3">
                          <FormControl>
                            <div className="relative">
                              <RadioGroupItem
                                value={option.value}
                                className="peer sr-only"
                                id={option.value}
                              />
                              <label
                                htmlFor={option.value}
                                className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary
                                  ${field.value === option.value 
                                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                                    : "border-border hover:bg-gray-50"}`}
                                onClick={() => {
                                  field.onChange(option.value);
                                }}
                              >
                                <span className="font-medium">{option.label}</span>
                                <span className="text-sm text-muted-foreground">{option.desc}</span>
                              </label>
                            </div>
                          </FormControl>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </motion.div>
        );
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <FormField
              control={form.control}
              name="pageCount"
              render={({ field }) => (
                <FormItem className="space-y-6">
                  <FormLabel className="text-lg font-semibold">How many pages do you need?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid gap-4"
                    >
                      {[
                        { value: "single", label: "Single Page", desc: "Perfect for landing pages" },
                        { value: "basic", label: "2-3 Pages", desc: "Basic website structure" },
                        { value: "intermediate", label: "4-6 Pages", desc: "Medium-sized website" },
                        { value: "advanced", label: "7+ Pages", desc: "Large website" },
                      ].map((option) => (
                        <FormItem key={option.value} className="flex items-center space-x-3">
                          <FormControl>
                            <div className="relative">
                              <RadioGroupItem
                                value={option.value}
                                className="peer sr-only"
                                id={`page-${option.value}`}
                              />
                              <label
                                htmlFor={`page-${option.value}`}
                                className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary
                                  ${field.value === option.value 
                                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                                    : "border-border hover:bg-gray-50"}`}
                                onClick={() => field.onChange(option.value)}
                              >
                                <span className="font-medium">{option.label}</span>
                                <span className="text-sm text-muted-foreground">{option.desc}</span>
                              </label>
                            </div>
                          </FormControl>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="domainSetup"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-lg font-semibold">Do you need domain & hosting setup?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid gap-4"
                    >
                      {[
                        { value: "no", label: "No, I have one", desc: "You'll provide domain & hosting" },
                        { value: "yes", label: "Yes, need setup", desc: "We'll handle everything" },
                      ].map((option) => (
                        <FormItem key={option.value} className="flex items-center space-x-3">
                          <FormControl>
                            <div className="relative">
                              <RadioGroupItem
                                value={option.value}
                                className="peer sr-only"
                                id={`domain-${option.value}`}
                              />
                              <label
                                htmlFor={`domain-${option.value}`}
                                className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary
                                  ${field.value === option.value 
                                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                                    : "border-border hover:bg-gray-50"}`}
                                onClick={() => field.onChange(option.value)}
                              >
                                <span className="font-medium">{option.label}</span>
                                <span className="text-sm text-muted-foreground">{option.desc}</span>
                              </label>
                            </div>
                          </FormControl>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ecommerce"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-lg font-semibold">Do you need e-commerce functionality?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid gap-4"
                    >
                      {[
                        { value: "no", label: "No e-commerce", desc: "Standard website features" },
                        { value: "basic", label: "Basic store", desc: "Up to 10 products" },
                        { value: "advanced", label: "Advanced store", desc: "10+ products" },
                      ].map((option) => (
                        <FormItem key={option.value} className="flex items-center space-x-3">
                          <FormControl>
                            <div className="relative">
                              <RadioGroupItem
                                value={option.value}
                                className="peer sr-only"
                                id={`ecom-${option.value}`}
                              />
                              <label
                                htmlFor={`ecom-${option.value}`}
                                className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary
                                  ${field.value === option.value 
                                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                                    : "border-border hover:bg-gray-50"}`}
                                onClick={() => field.onChange(option.value)}
                              >
                                <span className="font-medium">{option.label}</span>
                                <span className="text-sm text-muted-foreground">{option.desc}</span>
                              </label>
                            </div>
                          </FormControl>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="specialFeatures"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-lg font-semibold">What special features do you need?</FormLabel>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {["Contact forms", "Appointment booking system", "Live chat integration", "Blog functionality"].map((feature) => (
                      <div
                        key={feature}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          field.value?.includes(feature)
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50"
                        }`}
                        onClick={() => {
                          const current = field.value || [];
                          field.onChange(
                            current.includes(feature)
                              ? current.filter(f => f !== feature)
                              : [...current, feature]
                          );
                        }}
                      >
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={field.value?.includes(feature)}
                            onChange={() => {}}
                            className="h-4 w-4"
                          />
                          <span>{feature}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="otherFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Other features (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Describe any other features you need" className="mt-2" />
                  </FormControl>
                </FormItem>
              )}
            />
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="designStatus"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-lg font-semibold">Do you have a design ready?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid gap-4"
                    >
                      {[
                        { value: "ready", label: "I have a design", desc: "You'll provide the design assets" },
                        { value: "needed", label: "Need design help", desc: "We'll create the design for you" },
                      ].map((option) => (
                        <FormItem key={option.value} className="flex items-center space-x-3">
                          <FormControl>
                            <div className="relative">
                              <RadioGroupItem
                                value={option.value}
                                className="peer sr-only"
                                id={`design-${option.value}`}
                              />
                              <label
                                htmlFor={`design-${option.value}`}
                                className={`flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary
                                  ${field.value === option.value 
                                    ? "border-primary bg-primary/5 ring-2 ring-primary/20" 
                                    : "border-border hover:bg-gray-50"}`}
                                onClick={() => field.onChange(option.value)}
                              >
                                <span className="font-medium">{option.label}</span>
                                <span className="text-sm text-muted-foreground">{option.desc}</span>
                              </label>
                            </div>
                          </FormControl>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="websiteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Website or Business Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your website or business name" className="mt-2" />
                  </FormControl>
                </FormItem>
              )}
            />
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {showAuth ? "Create Your WebNova Account" : "Get Your Personalized Quote"}
          </DialogTitle>
          {!showAuth && (
            <div className="flex justify-center space-x-2 mt-4">
              {formSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`h-2 w-8 rounded-full transition-all ${
                    index === currentStep 
                      ? "bg-primary" 
                      : index < currentStep 
                        ? "bg-primary/60"
                        : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          )}
        </DialogHeader>

        {showAuth ? (
          <div className="space-y-6 mt-6">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                To submit your quote request, please create a WebNova Solutions account or log in.
              </p>
              <div className="flex space-x-2 mb-6">
                <Button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  variant={authMode === 'register' ? 'default' : 'outline'}
                  className="flex-1"
                >
                  Create Account
                </Button>
                <Button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  variant={authMode === 'login' ? 'default' : 'outline'}
                  className="flex-1"
                >
                  Login
                </Button>
              </div>
            </div>

            <form onSubmit={authForm.handleSubmit(handleAuth)} className="space-y-4">
              <div>
                <label htmlFor="username" className="block mb-2">Username</label>
                <Input
                  id="username"
                  placeholder="Enter your username"
                  {...authForm.register("username")}
                />
                {authForm.formState.errors.username && (
                  <p className="text-red-500 text-sm mt-1">{authForm.formState.errors.username.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block mb-2">Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  {...authForm.register("password")}
                />
                {authForm.formState.errors.password && (
                  <p className="text-red-500 text-sm mt-1">{authForm.formState.errors.password.message}</p>
                )}
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setShowAuth(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Back to Quote
                </Button>
                <Button
                  type="submit"
                  disabled={isRegistering || isLoggingIn}
                  className="flex-1"
                >
                  {isRegistering || isLoggingIn ? "Processing..." : 
                   authMode === 'register' ? "Create Account & Submit Quote" : "Login & Submit Quote"}
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence mode="wait">
                {renderStep()}
              </AnimatePresence>

              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>

                {currentStep === formSteps.length - 1 ? (
                  <Button type="submit" disabled={submitQuote.isPending}>
                    {submitQuote.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      isAuthenticated ? "Submit Quote Request" : "Create Account & Submit Quote"
                    )}
                  </Button>
                ) : (
                  <Button 
                    type="button" 
                    onClick={nextStep}
                    className="relative overflow-hidden group"
                  >
                    <span className="relative z-10">Next</span>
                  </Button>
                )}
              </div>

              {currentStep === formSteps.length - 1 && (
                <p className="text-sm text-muted-foreground text-center mt-6">
                  After submission, you will receive your personalized quote within 3 business days.
                </p>
              )}
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}