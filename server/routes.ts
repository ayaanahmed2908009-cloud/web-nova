import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertQuoteSchema, updateQuoteSchema, adminUpdateQuoteSchema } from "@shared/schema";
import session from "express-session";
import bcrypt from "bcryptjs";

export async function registerRoutes(app: Express): Promise<Server> {
  // Add session middleware
  app.use(session({
    secret: process.env.SESSION_SECRET || 'webnova-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
      secure: false, // Set to true in production with HTTPS
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));

  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(validatedData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(validatedData.password, 10);
      
      // Create user
      const user = await storage.createUser({
        username: validatedData.username,
        password: hashedPassword
      });

      // Set session
      (req.session as any).userId = user.id;
      
      res.json({ user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ message: "Invalid registration data" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      // Set session
      (req.session as any).userId = user.id;
      
      res.json({ user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    const userId = (req.session as any)?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }

      res.json({ user: { id: user.id, username: user.username } });
    } catch (error) {
      console.error("Auth check error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Quote routes
  app.post("/api/quote", async (req, res) => {
    const userId = (req.session as any)?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    try {
      const quoteData = insertQuoteSchema.parse({
        ...req.body,
        userId,
        specialFeatures: JSON.stringify(req.body.specialFeatures || [])
      });

      // Save to database
      const quote = await storage.createQuote(quoteData);

      res.json({ 
        message: "Quote request submitted successfully!",
        quote 
      });
    } catch (error) {
      console.error("Quote submission error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/quotes", async (req, res) => {
    const userId = (req.session as any)?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    try {
      const quotes = await storage.getUserQuotes(userId);
      res.json(quotes);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/quotes/:id", async (req, res) => {
    const userId = (req.session as any)?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    try {
      const quoteId = parseInt(req.params.id);
      const quote = await storage.getQuote(quoteId, userId);
      
      if (!quote) {
        return res.status(404).json({ message: "Quote not found" });
      }

      res.json(quote);
    } catch (error) {
      console.error("Error fetching quote:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/quotes/:id", async (req, res) => {
    const userId = (req.session as any)?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    try {
      const quoteId = parseInt(req.params.id);
      const updateData = updateQuoteSchema.parse({
        ...req.body,
        specialFeatures: JSON.stringify(req.body.specialFeatures || [])
      });

      const updatedQuote = await storage.updateQuote(quoteId, userId, updateData);
      res.json({ 
        message: "Quote updated successfully!",
        quote: updatedQuote 
      });
    } catch (error) {
      console.error("Error updating quote:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/quotes/:id", async (req, res) => {
    const userId = (req.session as any)?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    try {
      const quoteId = parseInt(req.params.id);
      const deleted = await storage.deleteQuote(quoteId, userId);
      
      if (!deleted) {
        return res.status(404).json({ message: "Quote not found" });
      }

      res.json({ message: "Quote deleted successfully!" });
    } catch (error) {
      console.error("Error deleting quote:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Admin middleware
  const requireAdmin = async (req: any, res: any, next: any) => {
    const userId = (req.session as any)?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }
    
    try {
      const user = await storage.getUser(userId);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      req.user = user;
      next();
    } catch (error) {
      console.error("Admin auth error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // Admin routes
  app.get("/api/admin/quotes", requireAdmin, async (req, res) => {
    try {
      const quotes = await storage.getAllQuotes();
      res.json(quotes);
    } catch (error) {
      console.error("Error fetching all quotes:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.patch("/api/admin/quotes/:id", requireAdmin, async (req, res) => {
    try {
      const quoteId = parseInt(req.params.id);
      const updateData = adminUpdateQuoteSchema.parse(req.body);
      
      const quote = await storage.adminUpdateQuote(quoteId, updateData);
      res.json(quote);
    } catch (error) {
      console.error("Error updating quote as admin:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Check if user is admin
  app.get("/api/auth/is-admin", async (req, res) => {
    const userId = (req.session as any)?.userId;
    if (!userId) {
      return res.json({ isAdmin: false });
    }

    try {
      const user = await storage.getUser(userId);
      res.json({ isAdmin: user?.role === 'admin' });
    } catch (error) {
      console.error("Error checking admin status:", error);
      res.json({ isAdmin: false });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}