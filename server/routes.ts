import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

const quoteFormSchema = z.object({
  websiteType: z.enum(["portfolio", "landing", "ecommerce", "blog", "custom"]),
  pageCount: z.enum(["single", "basic", "intermediate", "advanced"]),
  domainSetup: z.enum(["no", "yes"]),
  ecommerce: z.enum(["no", "basic", "advanced"]),
  specialFeatures: z.array(z.string()),
  designStatus: z.enum(["ready", "needed"]),
  otherFeatures: z.string().optional(),
  websiteName: z.string().min(1),
});

// Store quote requests in memory for now
const quoteRequests: any[] = [];

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