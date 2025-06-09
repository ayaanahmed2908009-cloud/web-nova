import { users, projects, type User, type InsertUser, type Project, type InsertProject } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  authenticateUser(email: string, password: string): Promise<User | null>;
  
  // Project operations
  createProject(userId: number, projectData: InsertProject): Promise<Project>;
  getUserProjects(userId: number): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  updateProjectQuote(projectId: number, quote: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        password: hashedPassword,
      })
      .returning();
    return user;
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  async createProject(userId: number, projectData: InsertProject): Promise<Project> {
    // Calculate quote based on project details
    const quote = this.calculateQuote(projectData);
    
    const [project] = await db
      .insert(projects)
      .values({
        ...projectData,
        userId,
        quote,
      })
      .returning();
    return project;
  }

  async getUserProjects(userId: number): Promise<Project[]> {
    return await db.select().from(projects).where(eq(projects.userId, userId));
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project || undefined;
  }

  async updateProjectQuote(projectId: number, quote: number): Promise<void> {
    await db
      .update(projects)
      .set({ quote, updatedAt: new Date() })
      .where(eq(projects.id, projectId));
  }

  private calculateQuote(projectData: InsertProject): number {
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
}

export const storage = new DatabaseStorage();
