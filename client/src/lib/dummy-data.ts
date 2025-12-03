import type {
  DashboardMetrics,
  EventData,
  ActiveUserTrend,
  DauTrend,
  CohortData,
  Customer,
  CustomerInteraction,
  Segment,
  Campaign,
  Template,
  Funnel,
  ExportReport,
  JourneyEvent,
  ProfileAttribute,
  App,
  DisplayPreferenceItem
} from "@shared/schema";

// Dashboard Metrics
export const dashboardMetrics: DashboardMetrics = {
  newUsers: {
    count: 4500,
    change: 1321.8,
    period: "14 Sep, 25 - 13 Oct, 25",
    breakdown: [
      { platform: "Android", count: 6 },
      { platform: "iOS", count: "NA" },
      { platform: "Web", count: 4500 }
    ]
  },
  retainedUsers: {
    count: 10900,
    change: 392.9,
    period: "14 Sep, 25 - 13 Oct, 25",
    dau: 188,
    wau: 19,
    mau: 2400
  },
  engagement: {
    count: 7400,
    change: 235.0,
    period: "14 Sep, 25 - 13 Oct, 25",
    activeCampaigns: "NA",
    totalCampaigns: 5100,
    dauMau: 0.1
  },
  inactive: {
    count: 9,
    change: -90.6,
    period: "14 Sep, 25 - 13 Oct, 25",
    breakdown: [
      { platform: "Android", count: 2 },
      { platform: "iOS", count: 1 },
      { platform: "Web", count: 6 }
    ]
  }
};

// Top 10 Events
export const topEvents: EventData[] = [
  { name: "PageView", count: 11700 },
  { name: "Session_Start", count: 7400 },
  { name: "AppLaunch", count: 3700 },
  { name: "Session_End", count: 3000 },
  { name: "Login", count: 2900 },
  { name: "Campaign_Received", count: 1700 },
  { name: "Registration", count: 1200 },
  { name: "BPPayBill", count: 1100 },
  { name: "PageDuration", count: 554 },
  { name: "BOIProducts", count: 418 }
];

// Active User Trends
export const activeUserTrends: ActiveUserTrend[] = [
  { month: "Jan", count: 189 },
  { month: "Feb", count: 2100 },
  { month: "Mar", count: 1800 },
  { month: "Apr", count: 2200 },
  { month: "May", count: 1950 },
  { month: "Jun", count: 2050 },
  { month: "Jul", count: 2389 }
];

// DAU Trends
export const dauTrends: DauTrend[] = [
  { date: "Oct 1", count: 650 },
  { date: "Oct 5", count: 720 },
  { date: "Oct 10", count: 680 },
  { date: "Oct 15", count: 890 },
  { date: "Oct 20", count: 1100 },
  { date: "Oct 25", count: 1350 },
  { date: "Oct 30", count: 1250 },
  { date: "Nov 5", count: 1180 },
  { date: "Nov 10", count: 1420 }
];

// Install Cohort
export const cohortData: CohortData[] = [
  { time: "January 2025", acquisition: 371, retention: [371, 371, 371, 371, 371, 371, 371, 371, 371, 371, 371] },
  { time: "February 2025", acquisition: 285, retention: [285, 280, 275, 270, 265, 260, 255, 250, 245, 240, 235] },
  { time: "March 2025", acquisition: 420, retention: [420, 410, 400, 390, 380, 370, 360, 350, 340, 330, 320] },
  { time: "April 2025", acquisition: 356, retention: [356, 345, 335, 325, 315, 305, 295, 285, 275, 265, 255] },
  { time: "May 2025", acquisition: 512, retention: [512, 500, 488, 476, 464, 452, 440, 428, 416, 404, 392] }
];

// Customers
export const customers: Customer[] = [
  { id: "1", visitorId: "f05ea961-8c4c-7c8b-ae21-a642d5cd6e18", userSince: "Nov 12, 2025", lastSeen: "Nov 12, 2025", sessions: 0, clientId: "" },
  { id: "2", visitorId: "478fada2-4c2e-7674-af89-4156a3760506", userSince: "Nov 12, 2025", lastSeen: "Nov 12, 2025", sessions: 0, clientId: "" },
  { id: "3", visitorId: "98ea8ec4-d813-7764-958a-5785745497b3", userSince: "Nov 12, 2025", lastSeen: "Nov 12, 2025", sessions: 0, clientId: "" },
  { id: "4", visitorId: "95186779-4f43-7fe2-b714-768a9429964d", userSince: "Nov 12, 2025", lastSeen: "Nov 12, 2025", sessions: 0, clientId: "" },
  { id: "5", visitorId: "3e1c2ccc-951f-74e3-b2ec-320fac9c3ac8", userSince: "Nov 12, 2025", lastSeen: "Nov 12, 2025", sessions: 1, clientId: "" },
  { id: "6", visitorId: "9c9f60b5-b7b1-7adb-a122-802eeef08a2f", userSince: "Nov 12, 2025", lastSeen: "Nov 12, 2025", sessions: 0, clientId: "" },
  { id: "7", visitorId: "9ce4c560-df4f-797d-8103-d5f3645ac9f6", userSince: "Nov 12, 2025", lastSeen: "Nov 12, 2025", sessions: 0, clientId: "" },
  { id: "8", visitorId: "a4238eee-b608-7e71-8dfe-78366a0c6f36", userSince: "Nov 12, 2025", lastSeen: "Nov 12, 2025", sessions: 0, clientId: "" },
  { id: "9", visitorId: "ffbf1a82-3cbf-7ca2-9707-044aa45c27a6", userSince: "Nov 12, 2025", lastSeen: "Nov 12, 2025", sessions: 1, clientId: "" },
  { id: "10", visitorId: "b88bd193-f852-76fe-987a-1a2531679065", userSince: "Nov 12, 2025", lastSeen: "Nov 12, 2025", sessions: 0, clientId: "" }
];

export const customerInteractions: CustomerInteraction[] = [
  { timestamp: "12/11/25 11:01:43", eventType: "Session_Start", sessionId: "b75bfebb-5cb3-70a0-9a1c-8c3a586d5fa4", details: {} },
  { timestamp: "12/11/25 11:01:43", eventType: "PageView", sessionId: "", details: { view: "/omnineo", visit: "1", domain: "uatconnect.bankofindia.bank.in", referrer: "https://in.search.yahoo.com/" } }
];

// Segments
export const segments: Segment[] = [
  { id: "1", name: "High Value Users", description: "Users with more than 10 sessions", size: 2450, conditions: [{ type: "trait", operator: "greater_than", value: "10" }], createdAt: "2025-10-15" },
  { id: "2", name: "Recent Signups", description: "Users who signed up in the last 7 days", size: 856, conditions: [{ type: "event", operator: "in_last", value: "7", eventType: "Registration" }], createdAt: "2025-10-20" },
  { id: "3", name: "Dormant Users", description: "Users inactive for 30+ days", size: 1234, conditions: [{ type: "trait", operator: "greater_than", value: "30" }], createdAt: "2025-09-01" }
];

// Campaigns
export const campaigns: Campaign[] = [
  { id: "1", name: "Feel the Digital Cash revolution Android Nov25", channel: "push", status: "active", templateName: "Feel the Digital Cash revolution Android Nov25", header: "Feel the Digital Cash revolution", description: "Download & register on the 'Bank of India Digital rupee App' available on Google Play store to send & receive digital currency securely, just like cash, but 100% paperless. Download link:", expandedText: true, expandedImage: false, expandedTextDescription: "Download & register on the 'Bank of India Digital rupee App' available on Google Play store to send & receive digital currency securely, just like cash, but 100% paperless. Download link:", category: "", url: "", urlType: "landing", openIn: "browser", customData: true, liveActivity: false, sound: false, vibrate: false, incrementBadge: false, createdAt: "2025-11-01" },
  { id: "2", name: "Holiday Sale Push", channel: "push", status: "scheduled", templateName: "Holiday Sale", header: "Holiday Sale is Live!", description: "Get up to 50% off on all products", createdAt: "2025-11-10" },
  { id: "3", name: "Welcome In-App", channel: "in-app", status: "active", templateName: "Welcome Message", header: "Welcome!", description: "Thanks for joining us", createdAt: "2025-10-05" }
];

// Templates
export const templates: Template[] = [
  { id: "1", name: "Welcome Push", channel: "push", content: "Welcome to our app!", createdAt: "2025-09-15" },
  { id: "2", name: "Promo Template", channel: "push", content: "Check out our latest offers!", createdAt: "2025-10-01" },
  { id: "3", name: "In-App Welcome", channel: "in-app", content: "Welcome back!", createdAt: "2025-10-10" }
];

// Funnels
export const funnels: Funnel[] = [
  {
    id: "1",
    name: "Mutual Fund Oct 2025",
    period: "Oct 2025",
    steps: [
      { name: "MFVisit (TriggerValue)", count: 8, percentage: 100 },
      { name: "MFKYCDocs (StartInvestment)", count: 3, percentage: 37.5 },
      { name: "MFInvestment (InvestmentDone)", count: 0, percentage: 0 }
    ]
  },
  {
    id: "2",
    name: "User Onboarding",
    period: "Nov 2025",
    steps: [
      { name: "App Install", count: 1000, percentage: 100 },
      { name: "Registration", count: 650, percentage: 65 },
      { name: "First Login", count: 520, percentage: 52 },
      { name: "Profile Complete", count: 380, percentage: 38 }
    ]
  }
];

// Export Reports
export const exportReports: ExportReport[] = [
  { id: "1", fileName: "FunnelExports_MF_Visit_November_10th_2025.4:03:04_pm", status: "processed", exportDate: "10 Nov 2025", processedDate: "11 Nov 2025" },
  { id: "2", fileName: "FunnelExports_Mutual_Fund_Oct_2025_October_29th_2025.4:18:13_pm", status: "processed", exportDate: "29 Oct 2025", processedDate: "29 Oct 2025" },
  { id: "3", fileName: "FunnelExports_LoginTest_October_28th_2025.11:55:14_am", status: "processed", exportDate: "28 Oct 2025", processedDate: "28 Oct 2025" },
  { id: "4", fileName: "FunnelExports_MF_Journey_October_23rd_2025.5:18:12_pm", status: "processed", exportDate: "23 Oct 2025", processedDate: "23 Oct 2025" },
  { id: "5", fileName: "FunnelExports_MF_Journey_October_23rd_2025.5:16:02_pm", status: "processed", exportDate: "23 Oct 2025", processedDate: "23 Oct 2025" }
];

// Journey Events
export const journeyEvents: JourneyEvent[] = [
  { name: "age", displayName: "Age", type: "Number", display: true },
  { name: "UserId", displayName: "Customer ID", type: "String", display: true },
  { name: "gender", displayName: "Gender", type: "String", display: true },
  { name: "_custom", displayName: "", type: "object", display: true },
  { name: "_custom_UserId", displayName: "", type: "object", display: true },
  { name: "_custom_Language", displayName: "", type: "String", display: true },
  { name: "_custom_Nationality", displayName: "", type: "String", display: true }
];

// Profile Attributes
export const profileAttributes: ProfileAttribute[] = [
  { name: "age", displayName: "Age", type: "Number", display: true },
  { name: "UserId", displayName: "Customer ID", type: "String", display: true },
  { name: "gender", displayName: "Gender", type: "String", display: true },
  { name: "_custom", displayName: "", type: "object", display: true },
  { name: "_custom_UserId", displayName: "", type: "object", display: true },
  { name: "_custom_Language", displayName: "", type: "String", display: true },
  { name: "_custom_Nationality", displayName: "", type: "String", display: true }
];

// Apps
export const apps: App[] = [
  {
    id: "1",
    name: "Test App",
    platforms: {
      android: { active: 20, inactive: "NA" },
      ios: { active: 3, inactive: "NA" },
      web: { active: "NA" as any, inactive: "NA" }
    }
  },
  {
    id: "2",
    name: "BOI-UA-UAT",
    platforms: {
      android: { active: 3367, inactive: "NA" },
      ios: { active: 1212, inactive: "NA" },
      web: { active: 9360, inactive: "NA" }
    }
  }
];

// Display Preferences
export const displayPreferences: DisplayPreferenceItem[] = [
  { id: "dashboard", label: "Dashboard" },
  {
    id: "setup-apps",
    label: "Setup Apps",
    children: [
      { id: "setup-new-app", label: "Setup New App" },
      { id: "setup-new-chatbot", label: "Setup New Chatbot" }
    ]
  },
  {
    id: "users",
    label: "Users",
    children: [
      { id: "demographics", label: "Demographics" },
      { id: "audience-segments", label: "Audience Segments" }
    ]
  },
  {
    id: "acquisition",
    label: "Acquisition",
    children: [
      { id: "app-acquisition", label: "App Acquisition" },
      { id: "upload-past-data", label: "Upload Past Data" }
    ]
  },
  {
    id: "activities",
    label: "Activities",
    children: [
      { id: "inside-app", label: "Inside the app" },
      { id: "outside-app", label: "Outside the app" }
    ]
  },
  {
    id: "engagement",
    label: "Engagement",
    children: [
      { id: "campaigns", label: "Campaigns" },
      { id: "transactional", label: "Transactional Campaigns" },
      { id: "utm-builder", label: "Utm Builder" }
    ]
  },
  { id: "churn", label: "Churn" },
  { id: "settings", label: "Settings" },
  { id: "documentation", label: "Documentation" }
];
