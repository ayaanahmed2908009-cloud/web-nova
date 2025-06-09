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

  // Endpoint to view stored quotes (for testing)
  app.get("/api/quotes", (_req, res) => {
    res.json(quoteRequests);
  });

  const httpServer = createServer(app);
  return httpServer;
}