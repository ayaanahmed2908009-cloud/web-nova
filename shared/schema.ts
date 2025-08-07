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

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type UpdateQuote = z.infer<typeof updateQuoteSchema>;
export type AdminUpdateQuote = z.infer<typeof adminUpdateQuoteSchema>;
export type Quote = typeof quotes.$inferSelect;
export type InsertProjectRequest = z.infer<typeof insertProjectRequestSchema>;
export type ProjectRequest = typeof projectRequests.$inferSelect;
