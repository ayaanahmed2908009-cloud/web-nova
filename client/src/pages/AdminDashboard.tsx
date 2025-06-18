import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Quote, AdminUpdateQuote } from "@shared/schema";
import { Users, FileText, DollarSign, Calendar } from "lucide-react";

export default function AdminDashboard() {
  const { toast } = useToast();
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [priceInput, setPriceInput] = useState("");
  const [statusInput, setStatusInput] = useState("");
  const [notesInput, setNotesInput] = useState("");

  const { data: quotes, isLoading } = useQuery<Quote[]>({
    queryKey: ["/api/admin/quotes"],
  });

  const updateQuoteMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: AdminUpdateQuote }) => {
      return apiRequest(`/api/admin/quotes/${id}`, "PATCH", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/quotes"] });
      toast({
        title: "Quote updated successfully",
        description: "The quote has been updated with new pricing and status.",
      });
      setEditingQuote(null);
      setPriceInput("");
      setStatusInput("");
      setNotesInput("");
    },
    onError: () => {
      toast({
        title: "Error updating quote",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleEditQuote = (quote: Quote) => {
    setEditingQuote(quote);
    setPriceInput(quote.priceQuote ? (quote.priceQuote / 100).toString() : "");
    setStatusInput(quote.status);
    setNotesInput(quote.notes || "");
  };

  const handleSaveQuote = () => {
    if (!editingQuote) return;

    const updateData: AdminUpdateQuote = {
      status: statusInput || editingQuote.status,
      priceQuote: priceInput ? Math.round(parseFloat(priceInput) * 100) : null,
      notes: notesInput || null,
    };

    updateQuoteMutation.mutate({ id: editingQuote.id, data: updateData });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: "default",
      reviewed: "secondary",
      approved: "default",
      completed: "default",
    } as const;

    const colors = {
      pending: "bg-yellow-500",
      reviewed: "bg-blue-500",
      approved: "bg-green-500",
      completed: "bg-purple-500",
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]} className={colors[status as keyof typeof colors]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-xl">Loading admin dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  const totalQuotes = quotes?.length || 0;
  const pendingQuotes = quotes?.filter((q: Quote) => q.status === "pending").length || 0;
  const approvedQuotes = quotes?.filter((q: Quote) => q.status === "approved").length || 0;
  const totalRevenue = quotes?.reduce((sum: number, q: Quote) => sum + (q.priceQuote || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">Manage quote requests and pricing</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Total Quotes</CardTitle>
              <FileText className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{totalQuotes}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Pending</CardTitle>
              <Calendar className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-400">{pendingQuotes}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Approved</CardTitle>
              <Users className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">{approvedQuotes}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-400">
                ${(totalRevenue / 100).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quotes Table */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Quote Requests</CardTitle>
            <CardDescription className="text-gray-400">
              Manage and price all incoming quote requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quotes?.map((quote: Quote) => (
                <div
                  key={quote.id}
                  className="border border-gray-700 rounded-lg p-4 hover:bg-gray-800 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {quote.websiteName}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {quote.websiteType} • {quote.pageCount} pages
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(quote.status)}
                      {quote.priceQuote && (
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          ${(quote.priceQuote / 100).toLocaleString()}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                    <div>
                      <span className="text-gray-400">Domain:</span>
                      <p className="text-white">{quote.domainSetup}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">E-commerce:</span>
                      <p className="text-white">{quote.ecommerce}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Design:</span>
                      <p className="text-white">{quote.designStatus}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Submitted:</span>
                      <p className="text-white">
                        {new Date(quote.createdAt!).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {quote.specialFeatures && (
                    <div className="mb-3">
                      <span className="text-gray-400 text-sm">Special Features:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {JSON.parse(quote.specialFeatures).map((feature: string, index: number) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {quote.notes && (
                    <div className="mb-3">
                      <span className="text-gray-400 text-sm">Admin Notes:</span>
                      <p className="text-white text-sm mt-1">{quote.notes}</p>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedQuote(quote)}
                        >
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{selectedQuote?.websiteName}</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Quote request details
                          </DialogDescription>
                        </DialogHeader>
                        {selectedQuote && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-gray-400">Website Type</Label>
                                <p className="text-white">{selectedQuote.websiteType}</p>
                              </div>
                              <div>
                                <Label className="text-gray-400">Page Count</Label>
                                <p className="text-white">{selectedQuote.pageCount}</p>
                              </div>
                              <div>
                                <Label className="text-gray-400">Domain Setup</Label>
                                <p className="text-white">{selectedQuote.domainSetup}</p>
                              </div>
                              <div>
                                <Label className="text-gray-400">E-commerce</Label>
                                <p className="text-white">{selectedQuote.ecommerce}</p>
                              </div>
                            </div>
                            {selectedQuote.otherFeatures && (
                              <div>
                                <Label className="text-gray-400">Additional Features</Label>
                                <p className="text-white">{selectedQuote.otherFeatures}</p>
                              </div>
                            )}
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <Dialog open={editingQuote?.id === quote.id} onOpenChange={(open) => !open && setEditingQuote(null)}>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm"
                          onClick={() => handleEditQuote(quote)}
                        >
                          Set Price
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-gray-900 border-gray-700 text-white">
                        <DialogHeader>
                          <DialogTitle>Update Quote</DialogTitle>
                          <DialogDescription className="text-gray-400">
                            Set pricing and status for {editingQuote?.websiteName}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="price">Price (USD)</Label>
                            <Input
                              id="price"
                              type="number"
                              value={priceInput}
                              onChange={(e) => setPriceInput(e.target.value)}
                              placeholder="Enter price"
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          </div>
                          <div>
                            <Label htmlFor="status">Status</Label>
                            <Select value={statusInput} onValueChange={setStatusInput}>
                              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent className="bg-gray-800 border-gray-600">
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="reviewed">Reviewed</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="notes">Admin Notes</Label>
                            <Textarea
                              id="notes"
                              value={notesInput}
                              onChange={(e) => setNotesInput(e.target.value)}
                              placeholder="Add notes for this quote"
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              onClick={() => setEditingQuote(null)}
                            >
                              Cancel
                            </Button>
                            <Button
                              onClick={handleSaveQuote}
                              disabled={updateQuoteMutation.isPending}
                            >
                              {updateQuoteMutation.isPending ? "Saving..." : "Save Changes"}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}

              {quotes?.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No quote requests found
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}