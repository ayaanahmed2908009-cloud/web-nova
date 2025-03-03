import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const formSchema = z.object({
  websiteType: z.enum(["portfolio", "landing", "ecommerce", "blog", "custom"]),
  pageCount: z.enum(["single", "basic", "intermediate", "advanced"]),
  domainSetup: z.enum(["no", "yes"]),
  ecommerce: z.enum(["no", "basic", "advanced"]),
  specialFeatures: z.array(z.string()),
  designStatus: z.enum(["ready", "needed"]),
  otherFeatures: z.string().optional(),
});

type QuoteFormData = z.infer<typeof formSchema>;

interface QuoteFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function QuoteForm({ open, onOpenChange }: QuoteFormProps) {
  const [specialFeatures, setSpecialFeatures] = useState<string[]>([]);

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      specialFeatures: [],
      otherFeatures: "",
    },
  });

  const onSubmit = (data: QuoteFormData) => {
    console.log(data);
    // Here you would typically send this data to your backend
    onOpenChange(false);
  };

  const toggleFeature = (feature: string) => {
    setSpecialFeatures(prev => 
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Get Your Personalized Quote</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      className="space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="portfolio" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Personal portfolio (Basic)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="landing" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Business landing page (Basic)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="ecommerce" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          E-commerce store (Advanced)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="blog" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Blog or news site (Intermediate)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="custom" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Custom multi-page website (Advanced)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pageCount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How many pages do you need?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="single" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          1 (Landing page)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="basic" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          2-3 (Basic website)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="intermediate" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          4-6 (Intermediate website)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="advanced" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          7+ (Advanced website)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domainSetup"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you need a custom domain & hosting setup?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          No, I already have one
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="yes" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Yes, I need help setting it up
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ecommerce"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you need e-commerce functionality?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="no" />
                        </FormControl>
                        <FormLabel className="font-normal">No</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="basic" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Yes, basic store (1-10 products)
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="advanced" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Yes, advanced store (10+ products)
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specialFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you need any special features?</FormLabel>
                  <div className="space-y-2">
                    {["Contact forms", "Appointment booking system", "Live chat integration", "Blog functionality"].map((feature) => (
                      <FormItem key={feature} className="flex items-center space-x-3">
                        <FormControl>
                          <input
                            type="checkbox"
                            checked={specialFeatures.includes(feature)}
                            onChange={() => toggleFeature(feature)}
                            className="h-4 w-4"
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{feature}</FormLabel>
                      </FormItem>
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
                  <FormLabel>Other features (please specify)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter other features you need" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="designStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Do you have a design in mind?</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-2"
                    >
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="ready" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          I have a design ready
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="needed" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          I need NovaWeb Solutions to design it
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit Quote Request
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
