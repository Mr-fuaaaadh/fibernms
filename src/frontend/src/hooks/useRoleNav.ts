/**
 * useRoleNav — Returns role-filtered navigation config for the current user.
 * Used by Sidebar, MobileBottomNav, and MobileNavDrawer.
 */

import { type UserRole, useAuthStore } from "@/store/authStore";
import {
  Activity,
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  Building2,
  ClipboardList,
  CreditCard,
  Database,
  FileText,
  GitFork,
  Key,
  LayoutDashboard,
  LayoutList,
  Lock,
  Map as MapIcon,
  Palette,
  Puzzle,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  TrendingUp,
  Users,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";

// ─── Shared nav item / section types ──────────────────────────────────────────

export type NavItem = {
  label: string;
  icon: React.ElementType;
  to: string;
  ultraOnly?: boolean;
};

export type NavSection = {
  id: string;
  label: string;
  accent?: string;
  icon?: React.ElementType;
  items: NavItem[];
};

export type BottomTab = {
  label: string;
  icon: React.ElementType;
  to: string;
};

// ─── All possible items (source of truth) ─────────────────────────────────────

const ALL_SECTIONS = {
  superAdmin: {
    id: "super-admin",
    label: "Super Admin",
    accent: "text-amber-400",
    icon: Shield,
    items: [
      { label: "SA Dashboard", icon: Zap, to: "/super-admin" },
      { label: "Companies", icon: Building2, to: "/super-admin/companies" },
      { label: "Usage & Limits", icon: TrendingUp, to: "/super-admin/usage" },
      { label: "Global Users", icon: Users, to: "/super-admin/users" },
      { label: "Global Billing", icon: CreditCard, to: "/super-admin/billing" },
      { label: "Orders & Invoices", icon: FileText, to: "/super-admin/orders" },
      {
        label: "Platform Audit",
        icon: ClipboardList,
        to: "/super-admin/audit",
      },
      { label: "Access Control", icon: Lock, to: "/super-admin/access" },
      { label: "System Alerts", icon: ShieldAlert, to: "/super-admin/alerts" },
      { label: "Security", icon: ShieldCheck, to: "/super-admin/security" },
      { label: "SA Analytics", icon: TrendingUp, to: "/super-admin/analytics" },
      {
        label: "Tenant Panel",
        icon: LayoutDashboard,
        to: "/tenant-admin/company-0001",
      },
    ],
  } satisfies NavSection,

  core: {
    id: "core",
    label: "NOC Platform",
    accent: "text-primary/80",
    items: [
      { label: "Map Dashboard", icon: MapIcon, to: "/" },
      { label: "Devices", icon: Server, to: "/devices" },
      { label: "Topology", icon: GitFork, to: "/topology" },
      { label: "Monitoring", icon: Activity, to: "/monitoring" },
      { label: "Tools", icon: Wrench, to: "/tools" },
      { label: "Analytics", icon: BarChart3, to: "/analytics" },
      { label: "Workflows", icon: Workflow, to: "/workflows" },
      { label: "AI Assistant", icon: Bot, to: "/ai" },
    ],
  } satisfies NavSection,

  coreReadOnly: {
    id: "core",
    label: "NOC Platform",
    accent: "text-primary/80",
    items: [
      { label: "Map Dashboard", icon: MapIcon, to: "/" },
      { label: "Devices", icon: Server, to: "/devices" },
      { label: "Topology", icon: GitFork, to: "/topology" },
      { label: "Monitoring", icon: Activity, to: "/monitoring" },
      { label: "Analytics", icon: BarChart3, to: "/analytics" },
    ],
  } satisfies NavSection,

  enterprise: {
    id: "enterprise",
    label: "Enterprise",
    accent: "text-cyan-400/70",
    items: [
      { label: "SLA Dashboard", icon: ShieldCheck, to: "/sla" },
      { label: "Predictive AI", icon: Brain, to: "/predictive" },
      { label: "Capacity Plan", icon: Database, to: "/capacity" },
      { label: "Audit Logs", icon: ClipboardList, to: "/audit" },
    ],
  } satisfies NavSection,

  billing: {
    id: "billing",
    label: "Billing & Plans",
    accent: "text-indigo-400/80",
    items: [
      { label: "Plans", icon: LayoutList, to: "/plans" },
      { label: "Billing", icon: CreditCard, to: "/billing" },
      { label: "Usage", icon: BarChart3, to: "/usage" },
    ],
  } satisfies NavSection,

  admin: {
    id: "admin",
    label: "Admin",
    accent: "text-violet-400/60",
    items: [
      { label: "Integrations", icon: Puzzle, to: "/integrations" },
      {
        label: "Multi-Tenant",
        icon: Building2,
        to: "/tenants",
        ultraOnly: true,
      },
      {
        label: "White-Labeling",
        icon: Palette,
        to: "/settings/branding",
        ultraOnly: true,
      },
      { label: "License", icon: Key, to: "/settings/license" },
      { label: "Documentation", icon: BookOpen, to: "/docs" },
    ],
  } satisfies NavSection,
} as const;

// ─── Role labels ───────────────────────────────────────────────────────────────

export const ROLE_LABELS: Record<UserRole, string> = {
  superAdmin: "Super Admin",
  admin: "Tenant Admin",
  engineer: "Network Engineer",
  operator: "NOC Operator",
  viewer: "Viewer",
};

export function getRoleLabel(role: string): string {
  return ROLE_LABELS[role as UserRole] ?? role;
}

// ─── Role → sidebar sections ───────────────────────────────────────────────────

function getSectionsForRole(role: string): NavSection[] {
  switch (role as UserRole) {
    case "superAdmin":
      return [
        ALL_SECTIONS.superAdmin,
        ALL_SECTIONS.core,
        ALL_SECTIONS.enterprise,
        ALL_SECTIONS.billing,
        ALL_SECTIONS.admin,
      ];
    case "admin":
      return [
        ALL_SECTIONS.core,
        ALL_SECTIONS.enterprise,
        ALL_SECTIONS.billing,
        ALL_SECTIONS.admin,
      ];
    case "engineer":
      return [ALL_SECTIONS.core, ALL_SECTIONS.enterprise];
    case "operator":
      return [ALL_SECTIONS.core];
    case "viewer":
      return [ALL_SECTIONS.coreReadOnly];
    default:
      return [ALL_SECTIONS.core];
  }
}

// ─── Role → bottom nav tabs ────────────────────────────────────────────────────

function getBottomTabsForRole(role: string): BottomTab[] {
  switch (role as UserRole) {
    case "superAdmin":
      return [
        { label: "Dashboard", icon: LayoutDashboard, to: "/" },
        { label: "Companies", icon: Building2, to: "/super-admin/companies" },
        { label: "Users", icon: Users, to: "/super-admin/users" },
        { label: "Billing", icon: CreditCard, to: "/billing" },
        { label: "Alerts", icon: Activity, to: "/monitoring" },
      ];
    case "admin":
      return [
        { label: "Dashboard", icon: LayoutDashboard, to: "/" },
        { label: "Billing", icon: CreditCard, to: "/billing" },
        { label: "Alerts", icon: Activity, to: "/monitoring" },
        { label: "Users", icon: Users, to: "/super-admin/users" },
        { label: "Docs", icon: BookOpen, to: "/docs" },
      ];
    case "engineer":
      return [
        { label: "Dashboard", icon: LayoutDashboard, to: "/" },
        { label: "Devices", icon: Server, to: "/devices" },
        { label: "Topology", icon: GitFork, to: "/topology" },
        { label: "Monitoring", icon: Activity, to: "/monitoring" },
        { label: "Alerts", icon: ShieldAlert, to: "/monitoring" },
      ];
    case "operator":
      return [
        { label: "Dashboard", icon: LayoutDashboard, to: "/" },
        { label: "Devices", icon: Server, to: "/devices" },
        { label: "Monitoring", icon: Activity, to: "/monitoring" },
        { label: "Topology", icon: GitFork, to: "/topology" },
        { label: "Alerts", icon: ShieldAlert, to: "/monitoring" },
      ];
    default:
      return [
        { label: "Dashboard", icon: LayoutDashboard, to: "/" },
        { label: "Devices", icon: Server, to: "/devices" },
        { label: "Topology", icon: GitFork, to: "/topology" },
        { label: "Monitoring", icon: Activity, to: "/monitoring" },
        { label: "Alerts", icon: ShieldAlert, to: "/monitoring" },
      ];
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useRoleNav() {
  const currentUser = useAuthStore((s) => s.currentUser);
  const isSuperAdmin = useAuthStore((s) => s.isSuperAdmin);

  const role: string = isSuperAdmin
    ? "superAdmin"
    : (currentUser?.role ?? "viewer");
  const roleLabel = getRoleLabel(role);

  const sections = getSectionsForRole(role);
  const bottomTabs = getBottomTabsForRole(role);

  return { role, roleLabel, sections, bottomTabs };
}
