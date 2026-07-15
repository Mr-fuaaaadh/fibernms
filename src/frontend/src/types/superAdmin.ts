// ─── Super Admin Type Definitions ─────────────────────────────────────────────

export type CompanyStatus = "active" | "suspended" | "trial" | "expired";
export type CompanyPlan = "BASIC" | "PROFESSIONAL" | "ENTERPRISE" | "ULTRA";
export type CompanyRegion = "India" | "US" | "EU" | "APAC" | "MENA";
export type AdminUserRole =
  | "Admin"
  | "Network Engineer"
  | "NOC Operator"
  | "Viewer";
export type AdminUserStatus = "active" | "disabled";
export type OrderStatus = "paid" | "pending" | "failed";
export type BillingCycle = "monthly" | "yearly";
export type AuditCategory = "user" | "company" | "billing" | "device" | "auth";
export type AuditSeverity = "info" | "warning" | "critical";
export type AlertSeverity = "critical" | "high" | "medium" | "low";
export type SystemAlertCategory = "outage" | "error_rate" | "api" | "resource";
export type SystemAlertStatus = "active" | "resolved";

// Compat type aliases used by existing pages
export type UserRole = AdminUserRole;
export type UserStatus = AdminUserStatus;

export interface Session {
  id: string;
  userId: string;
  loginTime: string;
  lastActivity: string;
  deviceInfo: string;
  ipAddress: string;
  isActive: boolean;
}

export interface Company {
  id: string;
  name: string;
  domain: string;
  subdomain: string;
  region: CompanyRegion;
  plan: CompanyPlan;
  status: CompanyStatus;
  createdAt: string;
  logoUrl?: string;
  contactEmail: string;
  contactPhone: string;
  address?: string;
  country: string;
  // Usage
  devicesUsed: number;
  devicesLimit: number;
  apiUsed: number;
  apiLimit: number;
  dataUsedGB: number;
  dataLimitGB: number;
  alertsUsed: number;
  alertsLimit: number;
  // Stats
  activeUsers: number;
  totalAlerts: number;
  mrr: number;
  // Lifecycle
  isSoftDeleted?: boolean;
  deletedAt?: string;
  lastActiveAt: string;
  trialEndsAt?: string;
  // Compat aliases
  onboardedAt: string;
  monthlyRevenue: number;
  alertsGenerated: number;
  deviceLimit: number;
  contactName?: string;
  lastActivity: string;
}

export interface AdminUser {
  id: string;
  companyId: string;
  companyName: string;
  name: string;
  email: string;
  role: AdminUserRole;
  status: AdminUserStatus;
  lastLogin: string;
  assignedRegion: string;
  mfaEnabled: boolean;
  activeSessions: Session[];
  // Compat aliases
  company: string;
  region: string;
  sessionActive: boolean;
}

export interface Order {
  id: string;
  companyId: string;
  companyName: string;
  plan: CompanyPlan;
  price: number;
  billingCycle: BillingCycle;
  status: OrderStatus;
  createdAt: string;
  dueDate: string;
  nextRenewal?: string;
  paidAt?: string;
}

export interface InvoiceLineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string;
  orderId: string;
  companyId: string;
  companyName: string;
  invoiceNumber: string;
  amount: number;
  tax: number;
  taxType: "GST" | "VAT" | "NONE";
  taxRate: number;
  subtotal: number;
  total: number;
  status: "paid" | "pending" | "overdue" | "failed";
  createdAt: string;
  dueDate: string;
  paidAt?: string;
  lineItems: InvoiceLineItem[];
  region: CompanyRegion;
  // Compat aliases
  issuedAt: string;
  dueAt: string;
  taxAmount: number;
}

export interface AuditEvent {
  id: string;
  userId: string;
  userEmail: string;
  companyId: string;
  companyName: string;
  action: string;
  targetType: string;
  targetId: string;
  targetName: string;
  details: string;
  timestamp: string;
  severity: AuditSeverity;
  category: AuditCategory;
  ipAddress: string;
  // Compat alias
  userName: string;
}

export interface SecurityEvent {
  id: string;
  userId?: string;
  userEmail?: string;
  companyId?: string;
  ipAddress: string;
  geoLocation: string;
  eventType: string;
  success: boolean;
  timestamp: string;
  failedAttempts?: number;
  isBlocked?: boolean;
  // Compat aliases
  type: string;
  resolved: boolean;
  severity: AlertSeverity;
  userName?: string;
  companyName?: string;
  description?: string;
}

export interface IPTrackingEntry {
  ipAddress: string;
  userEmail?: string;
  companyName?: string;
  successCount: number;
  failedAttempts: number;
  lastSeen: string;
  geoLocation: string;
  isBlocked: boolean;
}

export interface SystemAlert {
  id: string;
  type: string;
  severity: AlertSeverity;
  title: string;
  message: string;
  affectedCompanies: number;
  timestamp: string;
  isResolved: boolean;
  resolvedAt?: string;
  category: SystemAlertCategory;
  // Compat aliases
  description: string;
  startedAt: string;
  affectedService: string;
  status: SystemAlertStatus;
}

export interface LoginAttempt {
  timestamp: string;
  success: boolean;
  count: number;
}

export interface SuspiciousActivity {
  id: string;
  ipAddress: string;
  userEmail?: string;
  reason: string;
  detectedAt: string;
  severity: AlertSeverity;
  actionsCount: number;
}

export interface MFAStatus {
  userId: string;
  userEmail: string;
  companyName: string;
  mfaEnabled: boolean;
  lastMFAEvent?: string;
  backupCodesAvailable: boolean;
}

export interface UsageMetric {
  companyId: string;
  companyName: string;
  plan: CompanyPlan;
  devices: { used: number; limit: number };
  api: { used: number; limit: number };
  data: { used: number; limit: number };
  alerts: { used: number; limit: number };
}

export interface CompanyActivity {
  id: string;
  companyId: string;
  action: string;
  actor: string;
  timestamp: string;
  details: string;
}

export interface RevenueMetrics {
  mrr: number;
  arr: number;
  totalRevenue: number;
  revenueGrowthPct: number;
  churnRate: number;
  avgRevenuePerUser: number;
  newMRR: number;
  expansionMRR: number;
  churnedMRR: number;
  netNewMRR: number;
  revenueByPlan: Record<CompanyPlan, number>;
  revenueByRegion: Record<string, number>;
  monthlyRevenueTrend: Array<{ month: string; revenue: number }>;
}

export interface PlatformStats {
  totalCompanies: number;
  activeCompanies: number;
  trialCompanies: number;
  suspendedCompanies: number;
  totalUsers: number;
  activeSubscriptions: number;
  mrr: number;
  arr: number;
  churnRate: number;
  totalDevices: number;
  systemUptime: number;
}
