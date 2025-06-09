import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateQuoteSchema, type Quote, type UpdateQuote } from "@shared/schema";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Edit, Trash2, Plus, Calendar, DollarSign, Clock } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { z } from "zod";

const formSchema = updateQuoteSchema.extend({
  specialFeatures: z.array(z.string()).default([]),
});

type FormData = z.infer<typeof formSchema>;

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  reviewed: "bg-blue-100 text-blue-800", 
  approved: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800"
};

const specialFeaturesOptions = [
  "SEO Optimization",
  "Social Media Integration", 
  "Contact Forms",
  "Live Chat",
  "Newsletter Signup",
  "Analytics Integration",
  "Multi-language Support",
  "Mobile App Integration",
  "Custom Animations",
  "Database Integration"
];

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const { data: quotes = [], isLoading } = useQuery<Quote[]>({
    queryKey: ["/api/quotes"],
    enabled: isAuthenticated,
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      websiteType: "",
      pageCount: "",
      domainSetup: "",
      ecommerce: "",
      specialFeatures: [],
      designStatus: "",
      otherFeatures: "",
      websiteName: "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateQuote }) => {
      const response = await fetch(`/api/quotes/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Failed to update quote: ${response.statusText}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quotes"] });
      setShowEditDialog(false);
      setEditingQuote(null);
      toast({
        title: "Quote Updated",
        description: "Your quote has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update quote.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/quotes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete quote: ${response.statusText}`);
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quotes"] });
      toast({
        title: "Quote Deleted",
        description: "Your quote has been deleted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Delete Failed",
        description: error.message || "Failed to delete quote.",
        variant: "destructive",
      });
    },
  });

  const handleEdit = (quote: Quote) => {
    setEditingQuote(quote);
    let specialFeatures: string[] = [];
    try {
      specialFeatures = JSON.parse(quote.specialFeatures || "[]");
    } catch {
      specialFeatures = [];
    }

    form.reset({
      websiteType: quote.websiteType,
      pageCount: quote.pageCount,
      domainSetup: quote.domainSetup,
      ecommerce: quote.ecommerce,
      specialFeatures,
      designStatus: quote.designStatus,
      otherFeatures: quote.otherFeatures || "",
      websiteName: quote.websiteName,
    });
    setShowEditDialog(true);
  };

  const onSubmit = (data: FormData) => {
    if (!editingQuote) return;
    updateMutation.mutate({
      id: editingQuote.id,
      data: {
        ...data,
        specialFeatures: JSON.stringify(data.specialFeatures),
      },
    });
  };

  const handleFeatureChange = (feature: string, checked: boolean) => {
    const currentFeatures = form.getValues("specialFeatures");
    if (checked) {
      form.setValue("specialFeatures", [...currentFeatures, feature]);
    } else {
      form.setValue("specialFeatures", currentFeatures.filter(f => f !== feature));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please log in to view your dashboard.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.username}
            </h1>
            <p className="text-gray-600">
              Manage your quote requests and track their progress.
            </p>
          </div>

          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : quotes.length === 0 ? (
            <Card className="text-center py-12">
              <CardHeader>
                <CardTitle>No Quotes Yet</CardTitle>
                <CardDescription>
                  You haven't submitted any quote requests yet. Get started by requesting a quote for your new website.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => {
                    const element = document.getElementById('pricing');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.href = '/#pricing';
                    }
                  }}
                  className="mt-4"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Request Your First Quote
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {quotes.map((quote: Quote, index: number) => (
                <motion.div
                  key={quote.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{quote.websiteName}</CardTitle>
                          <CardDescription className="capitalize">
                            {quote.websiteType.replace(/([A-Z])/g, ' $1')}
                          </CardDescription>
                        </div>
                        <Badge className={statusColors[quote.status as keyof typeof statusColors]}>
                          {quote.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {format(new Date(quote.createdAt!), 'MMM dd, yyyy')}
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {quote.pageCount} pages
                        </div>

                        {quote.estimatedCost && (
                          <div className="flex items-center text-sm text-gray-600">
                            <DollarSign className="h-4 w-4 mr-2" />
                            ${(quote.estimatedCost / 100).toFixed(2)}
                          </div>
                        )}

                        <div className="flex justify-end space-x-2 pt-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(quote)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Quote</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this quote for "{quote.websiteName}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => deleteMutation.mutate(quote.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Edit Quote Dialog */}
          <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Quote Request</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="websiteName">Website Name</Label>
                    <Input
                      id="websiteName"
                      {...form.register("websiteName")}
                      placeholder="Enter website name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="websiteType">Website Type</Label>
                    <Select
                      value={form.watch("websiteType")}
                      onValueChange={(value) => form.setValue("websiteType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select website type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="businessWebsite">Business Website</SelectItem>
                        <SelectItem value="ecommerce">E-commerce Store</SelectItem>
                        <SelectItem value="portfolio">Portfolio</SelectItem>
                        <SelectItem value="blog">Blog</SelectItem>
                        <SelectItem value="landingPage">Landing Page</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="pageCount">Number of Pages</Label>
                    <Select
                      value={form.watch("pageCount")}
                      onValueChange={(value) => form.setValue("pageCount", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select page count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-5">1-5 pages</SelectItem>
                        <SelectItem value="6-10">6-10 pages</SelectItem>
                        <SelectItem value="11-20">11-20 pages</SelectItem>
                        <SelectItem value="21+">21+ pages</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="domainSetup">Domain Setup</Label>
                    <Select
                      value={form.watch("domainSetup")}
                      onValueChange={(value) => form.setValue("domainSetup", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select domain option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="needNewDomain">Need new domain</SelectItem>
                        <SelectItem value="haveExistingDomain">Have existing domain</SelectItem>
                        <SelectItem value="helpMeChoose">Help me choose</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="ecommerce">E-commerce Required?</Label>
                    <Select
                      value={form.watch("ecommerce")}
                      onValueChange={(value) => form.setValue("ecommerce", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select e-commerce option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="yes">Yes, full online store</SelectItem>
                        <SelectItem value="simple">Simple payment processing</SelectItem>
                        <SelectItem value="no">No e-commerce needed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="designStatus">Design Status</Label>
                    <Select
                      value={form.watch("designStatus")}
                      onValueChange={(value) => form.setValue("designStatus", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select design status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="haveDesign">Have existing design</SelectItem>
                        <SelectItem value="needDesign">Need design created</SelectItem>
                        <SelectItem value="inspiration">Have inspiration/examples</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Special Features</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {specialFeaturesOptions.map((feature) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox
                          id={feature}
                          checked={form.watch("specialFeatures").includes(feature)}
                          onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                        />
                        <Label htmlFor={feature} className="text-sm">
                          {feature}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="otherFeatures">Additional Requirements</Label>
                  <Textarea
                    id="otherFeatures"
                    {...form.register("otherFeatures")}
                    placeholder="Any other specific requirements or features you need..."
                    rows={3}
                  />
                </div>

                <div className="flex justify-end space-x-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowEditDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={updateMutation.isPending}>
                    {updateMutation.isPending ? "Updating..." : "Update Quote"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </div>
  );
}