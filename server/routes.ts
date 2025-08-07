import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertQuoteSchema, updateQuoteSchema, adminUpdateQuoteSchema, insertProjectRequestSchema } from "@shared/schema";
import session from "express-session";
import connectPg from "connect-pg-simple";
import bcrypt from "bcryptjs";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function registerRoutes(app: Express): Promise<Server> {
  // Add session middleware with PostgreSQL store
  const pgStore = connectPg(session);
  app.use(session({
    store: new pgStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
    }),
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

  // Project request routes
  app.post("/api/project-requests", async (req, res) => {
    try {
      const requestData = insertProjectRequestSchema.parse({
        ...req.body,
        features: JSON.stringify(req.body.features || [])
      });
      
      const projectRequest = await storage.createProjectRequest(requestData);
      res.json({ success: true, id: projectRequest.id });
    } catch (error) {
      console.error("Error creating project request:", error);
      res.status(400).json({ message: "Invalid project request data" });
    }
  });

  app.get("/api/admin/project-requests", requireAdmin, async (req, res) => {
    try {
      const requests = await storage.getAllProjectRequests();
      res.json(requests);
    } catch (error) {
      console.error("Error fetching project requests:", error);
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

  // Stripe payment routes
  app.post("/api/create-payment-intent", async (req, res) => {
    const userId = (req.session as any)?.userId;
    if (!userId) {
      return res.status(401).json({ message: "Authentication required" });
    }

    try {
      const { quoteId } = req.body;
      
      // Get the quote to verify ownership and get price
      const quote = await storage.getQuote(quoteId, userId);
      if (!quote) {
        return res.status(404).json({ message: "Quote not found" });
      }
      
      if (!quote.priceQuote) {
        return res.status(400).json({ message: "Quote doesn't have a price yet" });
      }

      if (quote.status !== "approved") {
        return res.status(400).json({ message: "Quote must be approved before payment" });
      }

      // Price is already stored in cents in the database
      const amountInCents = quote.priceQuote;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "usd",
        metadata: {
          quoteId: quote.id.toString(),
          userId: userId.toString(),
        },
        description: `Payment for quote #${quote.id} - ${quote.websiteName}`,
      });

      res.json({ 
        clientSecret: paymentIntent.client_secret,
        amount: (quote.priceQuote / 100).toFixed(2)
      });
    } catch (error: any) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Webhook to handle successful payments
  app.post("/api/stripe-webhook", async (req, res) => {
    try {
      const sig = req.headers['stripe-signature'];
      let event;

      try {
        event = stripe.webhooks.constructEvent(req.body, sig as string, process.env.STRIPE_WEBHOOK_SECRET || '');
      } catch (err: any) {
        console.log(`Webhook signature verification failed.`, err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
      }

      // Handle the event
      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const quoteId = paymentIntent.metadata.quoteId;
        
        if (quoteId) {
          // Update quote status to completed
          await storage.adminUpdateQuote(parseInt(quoteId), { status: "completed" });
          console.log(`Quote ${quoteId} marked as completed after successful payment`);
        }
      }

      res.json({ received: true });
    } catch (error) {
      console.error("Webhook error:", error);
      res.status(500).json({ message: "Webhook error" });
    }
  });

  // SEO-friendly static file handlers (only for specific file extensions)
  app.get('/sitemap.xml', (req, res) => {
    res.set('Content-Type', 'application/xml');
    res.sendFile('sitemap.xml', { root: 'client/public' });
  });

  app.get('/robots.txt', (req, res) => {
    res.set('Content-Type', 'text/plain');
    res.sendFile('robots.txt', { root: 'client/public' });
  });

  app.get('/site.webmanifest', (req, res) => {
    res.set('Content-Type', 'application/manifest+json');
    res.sendFile('site.webmanifest', { root: 'client/public' });
  });

  app.get('/favicon.ico', (req, res) => {
    res.sendFile('favicon.ico', { root: 'client/public' });
  });

  const httpServer = createServer(app);
  return httpServer;
}