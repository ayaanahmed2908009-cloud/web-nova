import {
  users,
  quotes,
  projectRequests,
  consultations,
  type User,
  type InsertUser,
  type Quote,
  type InsertQuote,
  type UpdateQuote,
  type AdminUpdateQuote,
  type ProjectRequest,
  type InsertProjectRequest,
  type Consultation,
  type InsertConsultation,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quote operations
  createQuote(quote: InsertQuote): Promise<Quote>;
  getUserQuotes(userId: number): Promise<Quote[]>;
  getQuote(id: number, userId: number): Promise<Quote | undefined>;
  updateQuote(id: number, userId: number, data: UpdateQuote): Promise<Quote>;
  deleteQuote(id: number, userId: number): Promise<boolean>;
  
  // Admin operations
  getAllQuotes(): Promise<Quote[]>;
  adminUpdateQuote(id: number, data: AdminUpdateQuote): Promise<Quote>;
  
  // Project request operations
  createProjectRequest(request: InsertProjectRequest): Promise<ProjectRequest>;
  getAllProjectRequests(): Promise<ProjectRequest[]>;
  
  // Consultation operations
  createConsultation(consultation: InsertConsultation): Promise<Consultation>;
  getAllConsultations(): Promise<Consultation[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async createQuote(quote: InsertQuote): Promise<Quote> {
    const [newQuote] = await db
      .insert(quotes)
      .values(quote)
      .returning();
    return newQuote;
  }

  async getUserQuotes(userId: number): Promise<Quote[]> {
    return await db.select().from(quotes).where(eq(quotes.userId, userId));
  }

  async getQuote(id: number, userId: number): Promise<Quote | undefined> {
    const [quote] = await db.select().from(quotes).where(
      and(eq(quotes.id, id), eq(quotes.userId, userId))
    );
    return quote || undefined;
  }

  async updateQuote(id: number, userId: number, data: UpdateQuote): Promise<Quote> {
    const [quote] = await db
      .update(quotes)
      .set({ ...data, updatedAt: new Date() })
      .where(and(eq(quotes.id, id), eq(quotes.userId, userId)))
      .returning();
    return quote;
  }

  async deleteQuote(id: number, userId: number): Promise<boolean> {
    const result = await db
      .delete(quotes)
      .where(and(eq(quotes.id, id), eq(quotes.userId, userId)))
      .returning();
    return result.length > 0;
  }

  // Admin operations
  async getAllQuotes(): Promise<Quote[]> {
    return await db.select().from(quotes).orderBy(desc(quotes.createdAt));
  }

  async adminUpdateQuote(id: number, data: AdminUpdateQuote): Promise<Quote> {
    const [quote] = await db
      .update(quotes)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(quotes.id, id))
      .returning();
    return quote;
  }

  async createProjectRequest(request: InsertProjectRequest): Promise<ProjectRequest> {
    const [projectRequest] = await db
      .insert(projectRequests)
      .values(request)
      .returning();
    return projectRequest;
  }

  async getAllProjectRequests(): Promise<ProjectRequest[]> {
    return await db.select().from(projectRequests).orderBy(desc(projectRequests.createdAt));
  }

  async createConsultation(consultation: InsertConsultation): Promise<Consultation> {
    const [newConsultation] = await db
      .insert(consultations)
      .values(consultation)
      .returning();
    return newConsultation;
  }

  async getAllConsultations(): Promise<Consultation[]> {
    return await db.select().from(consultations).orderBy(desc(consultations.createdAt));
  }
}

export const storage = new DatabaseStorage();
