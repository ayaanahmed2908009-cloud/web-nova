import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, DollarSign, Globe, Layout, Palette, Settings, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface Project {
  id: number;
  websiteName: string;
  websiteType: string;
  pageCount: string;
  domainSetup: string;
  ecommerce: string;
  specialFeatures: string[];
  designStatus: string;
  otherFeatures?: string;
  quote: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  in_progress: "bg-blue-100 text-blue-800 border-blue-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  on_hold: "bg-red-100 text-red-800 border-red-200",
};

const websiteTypeIcons = {
  portfolio: Layout,
  landing: Globe,
  ecommerce: DollarSign,
  blog: Calendar,
  custom: Settings,
};

export default function Dashboard() {
  const { user, logout } = useAuth();

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    staleTime: 1000 * 60 * 5,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Client Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
              >
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Welcome Section */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0">
              <CardHeader>
                <CardTitle className="text-2xl">Welcome back, {user?.name}!</CardTitle>
                <CardDescription className="text-violet-100">
                  Here's an overview of your projects and their progress
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Stats Overview */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                <Layout className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{projects.length}</div>
                <p className="text-xs text-muted-foreground">Active projects in development</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${projects.reduce((sum: number, p: Project) => sum + p.quote, 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Across all projects</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Project Value</CardTitle>
                <Globe className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${projects.length > 0 
                    ? Math.round(projects.reduce((sum: number, p: Project) => sum + p.quote, 0) / projects.length).toLocaleString()
                    : '0'
                  }
                </div>
                <p className="text-xs text-muted-foreground">Per project estimate</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Projects Section */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
              {projects.length === 0 && (
                <Button
                  onClick={() => window.location.href = "/#quote"}
                  className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                >
                  Start Your First Project
                </Button>
              )}
            </div>

            {projects.length === 0 ? (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Layout className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                  <p className="text-gray-500 mb-6">
                    Get started by filling out our project form to receive your custom quote
                  </p>
                  <Button
                    onClick={() => window.location.href = "/#quote"}
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                  >
                    Create Your First Project
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {projects.map((project: Project, index: number) => {
                  const IconComponent = websiteTypeIcons[project.websiteType as keyof typeof websiteTypeIcons] || Settings;
                  
                  return (
                    <motion.div
                      key={project.id}
                      variants={itemVariants}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="hover:shadow-xl transition-all duration-300 border-l-4 border-l-violet-500">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-violet-100 to-indigo-100 rounded-lg flex items-center justify-center">
                                <IconComponent className="h-5 w-5 text-violet-600" />
                              </div>
                              <div>
                                <CardTitle className="text-xl">{project.websiteName}</CardTitle>
                                <CardDescription className="capitalize">
                                  {project.websiteType} Website • {project.pageCount} pages
                                </CardDescription>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">
                                ${project.quote.toLocaleString()}
                              </div>
                              <Badge 
                                variant="secondary" 
                                className={statusColors[project.status as keyof typeof statusColors] || statusColors.pending}
                              >
                                {project.status.replace('_', ' ')}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="space-y-6">
                          {/* Project Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <h4 className="font-semibold text-sm text-gray-700 flex items-center">
                                <Globe className="h-4 w-4 mr-2" />
                                Project Specifications
                              </h4>
                              <div className="space-y-1 text-sm">
                                <p><span className="font-medium">Type:</span> {project.websiteType}</p>
                                <p><span className="font-medium">Pages:</span> {project.pageCount}</p>
                                <p><span className="font-medium">Domain Setup:</span> {project.domainSetup}</p>
                                <p><span className="font-medium">E-commerce:</span> {project.ecommerce}</p>
                                <p><span className="font-medium">Design:</span> {project.designStatus}</p>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <h4 className="font-semibold text-sm text-gray-700 flex items-center">
                                <Zap className="h-4 w-4 mr-2" />
                                Special Features
                              </h4>
                              <div className="flex flex-wrap gap-1">
                                {project.specialFeatures.map((feature, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {feature.replace('-', ' ')}
                                  </Badge>
                                ))}
                              </div>
                              {project.otherFeatures && (
                                <p className="text-sm text-gray-600 mt-2">
                                  <span className="font-medium">Additional:</span> {project.otherFeatures}
                                </p>
                              )}
                            </div>
                          </div>
                          
                          <Separator />
                          
                          {/* Timeline */}
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm text-gray-700 flex items-center">
                              <Clock className="h-4 w-4 mr-2" />
                              Project Timeline
                            </h4>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span>Started: {new Date(project.createdAt).toLocaleDateString()}</span>
                              <span>Last Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                            </div>
                            
                            {/* Progress Bar */}
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>
                                  {project.status === 'pending' ? '10%' : 
                                   project.status === 'in_progress' ? '50%' : 
                                   project.status === 'completed' ? '100%' : '25%'}
                                </span>
                              </div>
                              <Progress 
                                value={
                                  project.status === 'pending' ? 10 : 
                                  project.status === 'in_progress' ? 50 : 
                                  project.status === 'completed' ? 100 : 25
                                } 
                                className="h-2"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}