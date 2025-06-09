import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerSchema, loginSchema, insertProjectSchema } from "@shared/schema";
import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

interface AuthRequest extends Request {
  userId?: number;
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
  app.post("/api/quote", async (req, res) => {
    try {
      const formData = quoteFormSchema.parse(req.body);

      // Store the quote request
      quoteRequests.push({
        ...formData,
        timestamp: new Date(),
      });

      res.json({ 
        message: "Quote request submitted successfully",
        requestCount: quoteRequests.length 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid form data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
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
    res.json(quoteRequests);
  });

  const httpServer = createServer(app);
  return httpServer;
}