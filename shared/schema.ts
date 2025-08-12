import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email"),
  password: text("password").notNull(),
  name: text("name"),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
  username: text("username").notNull().unique(),
});

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  websiteType: text("website_type").notNull(),
  pageCount: text("page_count").notNull(),
  domainSetup: text("domain_setup").notNull(),
  ecommerce: text("ecommerce").notNull(),
  specialFeatures: text("special_features").notNull(),
  designStatus: text("design_status").notNull(),
  otherFeatures: text("other_features"),
  websiteName: text("website_name").notNull(),
  status: text("status").default("pending").notNull(), // pending, reviewed, approved, completed
  estimatedCost: integer("estimated_cost"), // in cents
  priceQuote: integer("price_quote"), // admin price quote in cents
  notes: text("notes"), // admin notes
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projectRequests = pgTable("project_requests", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  company: text("company"),
  projectType: text("project_type").notNull(),
  projectTitle: text("project_title").notNull(),
  description: text("description").notNull(),
  budget: text("budget").notNull(),
  timeframe: text("timeframe").notNull(),
  features: text("features"), // JSON string array
  hasExistingSite: text("has_existing_site"),
  existingSiteUrl: text("existing_site_url"),
  inspiration: text("inspiration"),
  additionalNotes: text("additional_notes"),
  status: text("status").default("new").notNull(), // new, contacted, in_progress, completed
  createdAt: timestamp("created_at").defaultNow(),
});

export const consultations = pgTable("consultations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  consultationType: text("consultation_type").notNull(),
  preferredDate: text("preferred_date"),
  preferredTime: text("preferred_time"),
  projectDescription: text("project_description"),
  specificQuestions: text("specific_questions"),
  currentChallenges: text("current_challenges"),
  status: text("status").default("pending").notNull(), // pending, scheduled, completed, cancelled
  createdAt: timestamp("created_at").defaultNow(),
});

export const templates = pgTable("templates", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // business, ecommerce, portfolio, landing, blog
  price: integer("price").notNull(), // in cents
  previewUrl: text("preview_url"), // live preview URL
  thumbnailImage: text("thumbnail_image").notNull(), // thumbnail image path
  features: text("features").notNull(), // JSON array of features
  technologies: text("technologies").notNull(), // JSON array of tech stack
  demoUrl: text("demo_url"), // live demo URL
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const templatePurchases = pgTable("template_purchases", {
  id: serial("id").primaryKey(),
  templateId: integer("template_id").references(() => templates.id).notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  amount: integer("amount").notNull(), // in cents
  status: text("status").default("pending").notNull(), // pending, completed, failed, refunded
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertQuoteSchema = createInsertSchema(quotes).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  status: true,
  estimatedCost: true,
  notes: true,
});

export const updateQuoteSchema = createInsertSchema(quotes).pick({
  websiteType: true,
  pageCount: true,
  domainSetup: true,
  ecommerce: true,
  specialFeatures: true,
  designStatus: true,
  otherFeatures: true,
  websiteName: true,
});

export const adminUpdateQuoteSchema = createInsertSchema(quotes).pick({
  status: true,
  priceQuote: true,
  notes: true,
});

export const insertProjectRequestSchema = createInsertSchema(projectRequests).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertConsultationSchema = createInsertSchema(consultations).omit({
  id: true,
  createdAt: true,
  status: true,
});

export const insertTemplateSchema = createInsertSchema(templates).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTemplatePurchaseSchema = createInsertSchema(templatePurchases).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type UpdateQuote = z.infer<typeof updateQuoteSchema>;
export type AdminUpdateQuote = z.infer<typeof adminUpdateQuoteSchema>;
export type Quote = typeof quotes.$inferSelect;
export type InsertProjectRequest = z.infer<typeof insertProjectRequestSchema>;
export type ProjectRequest = typeof projectRequests.$inferSelect;
export type InsertConsultation = z.infer<typeof insertConsultationSchema>;
export type Consultation = typeof consultations.$inferSelect;
export type Template = typeof templates.$inferSelect;
export type InsertTemplate = z.infer<typeof insertTemplateSchema>;
export type TemplatePurchase = typeof templatePurchases.$inferSelect;
export type InsertTemplatePurchase = z.infer<typeof insertTemplatePurchaseSchema>;
