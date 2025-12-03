import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Dashboard Metrics Types
export interface DashboardMetrics {
  newUsers: {
    count: number;
    change: number;
    period: string;
    breakdown: { platform: string; count: number | string }[];
  };
  retainedUsers: {
    count: number;
    change: number;
    period: string;
    dau: number;
    wau: number;
    mau: number;
  };
  engagement: {
    count: number;
    change: number;
    period: string;
    activeCampaigns: number | string;
    totalCampaigns: number;
    dauMau: number;
  };
  inactive: {
    count: number;
    change: number;
    period: string;
    breakdown: { platform: string; count: number | string }[];
  };
}

export interface EventData {
  name: string;
  count: number;
}

export interface ActiveUserTrend {
  month: string;
  count: number;
}

export interface DauTrend {
  date: string;
  count: number;
}

export interface CohortData {
  time: string;
  acquisition: number;
  retention: number[];
}

// Customer 360 Types
export interface Customer {
  id: string;
  visitorId: string;
  userSince: string;
  lastSeen: string;
  sessions: number;
  clientId: string;
  gender?: string;
  email?: string;
  mobile?: string;
  name?: string;
  maritalStatus?: string;
  dob?: string;
}

export interface CustomerInteraction {
  timestamp: string;
  eventType: string;
  sessionId: string;
  details: Record<string, string>;
}

// Segment Types
export interface Segment {
  id: string;
  name: string;
  description: string;
  size: number;
  conditions: SegmentCondition[];
  createdAt: string;
}

export interface SegmentCondition {
  type: 'event' | 'trait';
  operator: string;
  value: string;
  eventType?: string;
}

// Campaign Types
export type CampaignChannel = 'push' | 'in-app' | 'web-push' | 'web-popup' | 'email' | 'sms' | 'whatsapp';

export interface Campaign {
  id: string;
  name: string;
  channel: CampaignChannel;
  status: 'draft' | 'scheduled' | 'active' | 'completed' | 'paused';
  templateName: string;
  header?: string;
  description?: string;
  expandedText?: boolean;
  expandedImage?: boolean;
  expandedTextDescription?: string;
  category?: string;
  url?: string;
  urlType?: 'landing' | 'deeplink';
  openIn?: 'browser' | 'webview';
  customData?: boolean;
  liveActivity?: boolean;
  sound?: boolean;
  vibrate?: boolean;
  incrementBadge?: boolean;
  audience?: string;
  scheduledAt?: string;
  createdAt: string;
}

export interface Template {
  id: string;
  name: string;
  channel: CampaignChannel;
  content: string;
  createdAt: string;
}

// Funnel Types
export interface FunnelStep {
  name: string;
  count: number;
  percentage: number;
}

export interface Funnel {
  id: string;
  name: string;
  steps: FunnelStep[];
  period: string;
}

// Export/Report Types
export interface ExportReport {
  id: string;
  fileName: string;
  status: 'processing' | 'processed' | 'failed';
  exportDate: string;
  processedDate: string;
}

// Journey Types
export interface JourneyEvent {
  name: string;
  displayName: string;
  type: string;
  display: boolean;
}

export interface ProfileAttribute {
  name: string;
  displayName: string;
  type: string;
  display: boolean;
}

// App Types
export interface App {
  id: string;
  name: string;
  platforms: {
    android: { active: number; inactive: number | string };
    ios: { active: number; inactive: number | string };
    web: { active: number; inactive: number | string };
  };
}

// Settings Types
export interface DisplayPreferenceItem {
  id: string;
  label: string;
  children?: DisplayPreferenceItem[];
}
