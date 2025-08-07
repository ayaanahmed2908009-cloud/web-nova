import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Quote, ProjectRequest, Consultation } from "@shared/schema";
import { FileText, MessageSquare, Calendar, DollarSign, Eye, Phone, Mail, Building, Globe, Smartphone, Briefcase, Clock } from "lucide-react";

const ADMIN_PASSWORD = "admin123"; // Simple password for demo

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { data: quotes } = useQuery<Quote[]>({
    queryKey: ["/api/public/quotes"],
    enabled: isAuthenticated,
  });

  const { data: projectRequests } = useQuery<ProjectRequest[]>({
    queryKey: ["/api/public/project-requests"],
    enabled: isAuthenticated,
  });

  const { data: consultations } = useQuery<Consultation[]>({
    queryKey: ["/api/public/consultations"],
    enabled: isAuthenticated,
  });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password");
      setPasswordInput("");
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: "bg-yellow-500",
      reviewed: "bg-blue-500", 
      approved: "bg-green-500",
      completed: "bg-purple-500",
      new: "bg-orange-500",
      contacted: "bg-blue-500",
      in_progress: "bg-cyan-500",
    } as const;

    return (
      <Badge className={`text-white ${colors[status as keyof typeof colors] || 'bg-gray-500'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
      </Badge>
    );
  };

  const getProjectTypeIcon = (type: string) => {
    switch (type) {
      case 'website': return <Globe className="w-4 h-4" />;
      case 'private-app': return <Briefcase className="w-4 h-4" />;
      case 'public-app': return <Smartphone className="w-4 h-4" />;
      case 'consultation': return <MessageSquare className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  // Password protection screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Card className="w-full max-w-md bg-gray-900 border-gray-800">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Admin Access</CardTitle>
            <p className="text-gray-400">Enter the admin password to continue</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter admin password"
                  className="bg-gray-800 border-gray-600 text-white mt-2"
                  autoFocus
                />
                {passwordError && (
                  <p className="text-red-400 text-sm mt-1">{passwordError}</p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={!passwordInput.trim()}
              >
                Access Dashboard
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Main dashboard
  const totalQuotes = quotes?.length || 0;
  const pendingQuotes = quotes?.filter((q) => q.status === "pending").length || 0;
  const totalRevenue = quotes?.reduce((sum, q) => sum + (q.priceQuote || 0), 0) || 0;
  const newProjectRequests = projectRequests?.filter((r) => r.status === "new").length || 0;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 pb-6 border-b border-gray-800">
          <div className="mb-4 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 text-lg">Manage quotes and project requests</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 px-6 py-2.5"
            >
              <Globe className="w-4 h-4 mr-2" />
              Back to Website
            </Button>
            <Button 
              onClick={() => setIsAuthenticated(false)}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 px-6 py-2.5"
            >
              <Eye className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Project Requests</CardTitle>
              <MessageSquare className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-400">{projectRequests?.length || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Consultations</CardTitle>
              <Clock className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-400">{consultations?.length || 0}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">New Requests</CardTitle>
              <Calendar className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-400">{newProjectRequests}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-200">Legacy Quotes</CardTitle>
              <FileText className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-400">{totalQuotes}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900 border-gray-800">
            <TabsTrigger value="projects" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              Project Requests ({projectRequests?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="consultations" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              Consultations ({consultations?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="quotes" className="data-[state=active]:bg-gray-800 data-[state=active]:text-white">
              Legacy Quotes ({totalQuotes})
            </TabsTrigger>
          </TabsList>

          {/* Project Requests Tab */}
          <TabsContent value="projects" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Project Requests from Contact Form</CardTitle>
                <p className="text-gray-400">Customer inquiries from the new project form</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projectRequests?.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No project requests yet</p>
                  ) : (
                    projectRequests?.map((request: ProjectRequest) => (
                      <div
                        key={request.id}
                        className="border border-gray-700 rounded-lg p-6 hover:bg-gray-800 transition-colors"
                      >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            {getProjectTypeIcon(request.projectType)}
                            <div>
                              <h3 className="text-lg font-semibold text-white">
                                {request.projectTitle}
                              </h3>
                              <p className="text-sm text-gray-400">
                                {request.projectType.replace('-', ' ').toUpperCase()} • {request.budget} • {request.timeframe}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(request.status)}
                            <span className="text-xs text-gray-500">
                              {new Date(request.createdAt!).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        {/* Contact Info */}
                        <div className="grid md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-blue-400" />
                            <div>
                              <p className="text-xs text-gray-400">Email</p>
                              <p className="text-white">{request.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-green-400" />
                            <div>
                              <p className="text-xs text-gray-400">Phone</p>
                              <p className="text-white">{request.phone}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-purple-400" />
                            <div>
                              <p className="text-xs text-gray-400">Company</p>
                              <p className="text-white">{request.company || 'Not specified'}</p>
                            </div>
                          </div>
                        </div>

                        {/* Project Details */}
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium text-gray-300 mb-1">Project Description</h4>
                            <p className="text-white">{request.description}</p>
                          </div>

                          {request.features && JSON.parse(request.features).length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-2">Required Features</h4>
                              <div className="flex flex-wrap gap-2">
                                {JSON.parse(request.features).map((feature: string, index: number) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {feature.replace('_', ' ')}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {request.inspiration && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-1">Inspiration/References</h4>
                              <p className="text-white text-sm">{request.inspiration}</p>
                            </div>
                          )}

                          {request.additionalNotes && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-1">Additional Notes</h4>
                              <p className="text-white text-sm">{request.additionalNotes}</p>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Contact Customer
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                            Mark as Contacted
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Consultations Tab */}
          <TabsContent value="consultations" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Consultation Requests</CardTitle>
                <p className="text-gray-400">Expert consultation bookings from customers</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {consultations?.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No consultation requests yet</p>
                  ) : (
                    consultations?.map((consultation: Consultation) => (
                      <div
                        key={consultation.id}
                        className="border border-gray-700 rounded-lg p-6 hover:bg-gray-800 transition-colors"
                      >
                        {/* Header */}
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <Clock className="w-5 h-5 text-cyan-400" />
                            <div>
                              <h3 className="text-lg font-semibold text-white mb-1">
                                {consultation.consultationType}
                              </h3>
                              <p className="text-sm text-gray-400">
                                Requested {new Date(consultation.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          {getStatusBadge(consultation.status)}
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-cyan-400" />
                            <div>
                              <p className="text-xs text-gray-400">Email</p>
                              <p className="text-white">{consultation.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-cyan-400" />
                            <div>
                              <p className="text-xs text-gray-400">Phone</p>
                              <p className="text-white">{consultation.phone || 'Not provided'}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4 text-cyan-400" />
                            <div>
                              <p className="text-xs text-gray-400">Company</p>
                              <p className="text-white">{consultation.company || 'Not specified'}</p>
                            </div>
                          </div>
                        </div>

                        {/* Consultation Details */}
                        <div className="space-y-3">
                          {consultation.preferredDate && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-1">Preferred Date & Time</h4>
                              <p className="text-white">
                                {consultation.preferredDate} 
                                {consultation.preferredTime && ` at ${consultation.preferredTime}`}
                              </p>
                            </div>
                          )}

                          {consultation.projectDescription && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-1">Project Description</h4>
                              <p className="text-white">{consultation.projectDescription}</p>
                            </div>
                          )}

                          {consultation.specificQuestions && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-1">Specific Questions</h4>
                              <p className="text-white text-sm">{consultation.specificQuestions}</p>
                            </div>
                          )}

                          {consultation.currentChallenges && (
                            <div>
                              <h4 className="text-sm font-medium text-gray-300 mb-1">Current Challenges</h4>
                              <p className="text-white text-sm">{consultation.currentChallenges}</p>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700">
                          <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                            Schedule Consultation
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                            Send Calendar Invite
                          </Button>
                          <Button size="sm" variant="outline" className="border-gray-600 text-gray-300">
                            Mark Complete
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Old Quotes Tab */}
          <TabsContent value="quotes" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Legacy Quote System</CardTitle>
                <p className="text-gray-400">Old quote requests from previous system</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {quotes?.length === 0 ? (
                    <p className="text-gray-400 text-center py-8">No quotes in the system</p>
                  ) : (
                    quotes?.map((quote: Quote) => (
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
                        <p className="text-xs text-gray-500">
                          Submitted: {new Date(quote.createdAt!).toLocaleDateString()}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}