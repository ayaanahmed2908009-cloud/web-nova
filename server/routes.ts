import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerSchema, loginSchema, insertProjectSchema, type InsertProject } from "@shared/schema";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface AuthRequest extends Request {
  userId?: number;
}

// Calculate quote function
function calculateQuote(projectData: InsertProject): number {
  let basePrice = 0;

  // Website type pricing
  const websiteTypePricing = {
    portfolio: 1500,
    landing: 1000,
    ecommerce: 3000,
    blog: 1200,
    custom: 2500,
  };
  basePrice += websiteTypePricing[projectData.websiteType as keyof typeof websiteTypePricing] || 2000;

  // Page count multiplier
  const pageCountMultiplier = {
    single: 1,
    basic: 1.5,
    intermediate: 2.5,
    advanced: 4,
  };
  basePrice *= pageCountMultiplier[projectData.pageCount as keyof typeof pageCountMultiplier] || 2;

  // Domain setup
  if (projectData.domainSetup === "yes") {
    basePrice += 200;
  }

  // E-commerce features
  if (projectData.ecommerce === "basic") {
    basePrice += 1000;
  } else if (projectData.ecommerce === "advanced") {
    basePrice += 2500;
  }

  // Special features
  const featurePricing = {
    "seo-optimization": 500,
    "analytics-integration": 300,
    "payment-processing": 800,
    "user-authentication": 600,
    "content-management": 700,
    "social-media-integration": 400,
    "mobile-optimization": 500,
    "custom-animations": 800,
  };

  projectData.specialFeatures.forEach(feature => {
    basePrice += featurePricing[feature as keyof typeof featurePricing] || 300;
  });

  // Design status
  if (projectData.designStatus === "needed") {
    basePrice += 1000;
  }

  return Math.round(basePrice);
}

// Middleware to verify JWT token
const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = registerSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await storage.createUser(userData);
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

      res.json({
        message: "User registered successfully",
        token,
        user: { id: user.id, email: user.email, name: user.name }
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = loginSchema.parse(req.body);
      
      const user = await storage.authenticateUser(email, password);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

      res.json({
        message: "Login successful",
        token,
        user: { id: user.id, email: user.email, name: user.name }
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Login failed" });
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const user = await storage.getUser(req.userId!);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ id: user.id, email: user.email, name: user.name });
    } catch (error) {
      res.status(500).json({ message: "Failed to get user info" });
    }
  });

  // Project routes
  app.post("/api/projects", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const projectData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(req.userId!, projectData);

      res.json({
        message: "Project created successfully",
        project
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Failed to create project" });
    }
  });

  app.get("/api/projects", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const projects = await storage.getUserProjects(req.userId!);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Failed to get projects" });
    }
  });

  app.get("/api/projects/:id", authenticateToken, async (req: AuthRequest, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project || project.userId !== req.userId) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Failed to get project" });
    }
  });

  // Legacy quote endpoint for existing form
  app.post("/api/quote", async (req, res) => {
    try {
      const formData = insertProjectSchema.parse(req.body);
      
      // Calculate quote without saving to database
      const quote = calculateQuote(formData);
      
      res.json({ 
        message: "Quote calculated successfully",
        quote,
        formData
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message || "Invalid form data" });
    }
  });

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, phone, message } = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ 
          error: "Missing required fields: name, email, and message are required" 
        });
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      console.log("Contact form submission:", {
        name,
        email,
        phone: phone || "Not provided",
        message,
        timestamp: new Date().toISOString()
      });

      res.json({ 
        success: true, 
        message: "Thank you for your message! We'll get back to you within 24 hours." 
      });

    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({ 
        error: "Internal server error. Please try again later." 
      });
    }
  });

  // Newsletter signup endpoint
  app.post("/api/newsletter", async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ error: "Email is required" });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      console.log("Newsletter signup:", { email, timestamp: new Date().toISOString() });

      res.json({ 
        success: true, 
        message: "Successfully subscribed to our newsletter!" 
      });

    } catch (error) {
      console.error("Newsletter signup error:", error);
      res.status(500).json({ 
        error: "Internal server error. Please try again later." 
      });
    }
  });

  // Endpoint to view stored quotes (for testing)
  app.get("/api/quotes", (_req, res) => {
    res.json([]);
  });

  const httpServer = createServer(app);
  return httpServer;
}