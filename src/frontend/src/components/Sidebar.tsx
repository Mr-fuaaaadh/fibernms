import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useNetworkStore } from "@/store/networkStore";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { Plan } from "@/types/subscription";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  Building2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Crown,
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
  Radio,
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
import { AnimatePresence, motion } from "motion/react";

// ─── Super Admin Navigation ───────────────────────────────────────────────────

const SUPER_ADMIN_NAV = [
  { label: "SA Dashboard", icon: Zap, to: "/super-admin" },
  { label: "Companies", icon: Building2, to: "/super-admin/companies" },
  { label: "Usage & Limits", icon: TrendingUp, to: "/super-admin/usage" },
  { label: "Global Users", icon: Users, to: "/super-admin/users" },
  { label: "Global Billing", icon: CreditCard, to: "/super-admin/billing" },
  { label: "Orders & Invoices", icon: FileText, to: "/super-admin/orders" },
  { label: "Platform Audit", icon: ClipboardList, to: "/super-admin/audit" },
  { label: "Access Control", icon: Lock, to: "/super-admin/access" },
  { label: "System Alerts", icon: ShieldAlert, to: "/super-admin/alerts" },
  { label: "Security", icon: ShieldCheck, to: "/super-admin/security" },
  { label: "SA Analytics", icon: TrendingUp, to: "/super-admin/analytics" },
  {
    label: "Tenant Panel",
    icon: LayoutDashboard,
    to: "/tenant-admin/company-0001",
  },
] as const;

// ─── NOC Navigation ───────────────────────────────────────────────────────────

const CORE_NAV = [
  { label: "Map Dashboard", icon: MapIcon, to: "/" },
  { label: "Devices", icon: Server, to: "/devices" },
  { label: "Topology", icon: GitFork, to: "/topology" },
  { label: "Monitoring", icon: Activity, to: "/monitoring" },
  { label: "Tools", icon: Wrench, to: "/tools" },
  { label: "Analytics", icon: BarChart3, to: "/analytics" },
  { label: "Workflows", icon: Workflow, to: "/workflows" },
  { label: "AI Assistant", icon: Bot, to: "/ai" },
] as const;

const ENTERPRISE_NAV = [
  { label: "SLA Dashboard", icon: ShieldCheck, to: "/sla" },
  { label: "Predictive AI", icon: Brain, to: "/predictive" },
  { label: "Capacity Plan", icon: Database, to: "/capacity" },
  { label: "Audit Logs", icon: ClipboardList, to: "/audit" },
] as const;

const BILLING_NAV = [
  { label: "Plans", icon: LayoutList, to: "/plans", ultraOnly: false },
  { label: "Billing", icon: CreditCard, to: "/billing", ultraOnly: false },
  { label: "Usage", icon: BarChart3, to: "/usage", ultraOnly: false },
] as const;

const ADMIN_NAV = [
  {
    label: "Integrations",
    icon: Puzzle,
    to: "/integrations",
    ultraOnly: false,
  },
  { label: "Multi-Tenant", icon: Building2, to: "/tenants", ultraOnly: true },
  {
    label: "White-Labeling",
    icon: Palette,
    to: "/settings/branding",
    ultraOnly: true,
  },
  { label: "License", icon: Key, to: "/settings/license", ultraOnly: false },
  {
    label: "Documentation",
    icon: BookOpen,
    to: "/docs",
    ultraOnly: false,
  },
] as const;

type NavItem = {
  label: string;
  icon: React.ElementType;
  to: string;
  ultraOnly?: boolean;
};

function NavItemLink({
  item,
  isActive,
  collapsed,
  ultraOnly,
  variant = "default",
}: {
  item: NavItem;
  isActive: boolean;
  collapsed: boolean;
  ultraOnly?: boolean;
  variant?: "default" | "superAdmin";
}) {
  const { label, icon: Icon, to } = item;

  const activeClass =
    variant === "superAdmin"
      ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
      : "bg-primary/15 text-primary border border-primary/25 noc-glow";

  const hoverClass =
    variant === "superAdmin"
      ? "hover:text-amber-300 hover:bg-amber-500/10"
      : "hover:text-foreground hover:bg-muted/50";

  return (
    <Link
      to={to}
      data-ocid={`nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
      className={cn(
        "flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg transition-smooth text-sm relative group",
        isActive ? activeClass : `text-muted-foreground ${hoverClass}`,
      )}
    >
      <Icon
        className={cn(
          "w-4 h-4 flex-shrink-0",
          isActive && variant === "superAdmin" && "text-amber-400",
          isActive && variant === "default" && "text-primary",
        )}
      />
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.12 }}
            className="whitespace-nowrap font-body text-xs tracking-wide flex-1 min-w-0"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      {/* ULTRA badge for ultra-only items */}
      {ultraOnly && !collapsed && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.12 }}
          className="flex-shrink-0 flex items-center gap-0.5 px-1 py-0.5 rounded text-[8px] font-mono font-bold bg-violet-500/15 text-violet-400 border border-violet-500/30"
        >
          <Crown className="w-2.5 h-2.5" />
          ULTRA
        </motion.span>
      )}
      {/* Collapsed tooltip */}
      {collapsed && (
        <div className="absolute left-full ml-3 px-2 py-1 bg-popover border border-border rounded-md text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-smooth z-50 shadow-noc-elevated flex items-center gap-1.5">
          {label}
          {ultraOnly && (
            <span className="flex items-center gap-0.5 px-1 py-0.5 rounded text-[8px] font-mono font-bold bg-violet-500/15 text-violet-400 border border-violet-500/30">
              <Crown className="w-2.5 h-2.5" />
              ULTRA
            </span>
          )}
        </div>
      )}
    </Link>
  );
}

function SectionDivider({
  label,
  collapsed,
  accent,
  icon: DivIcon,
}: {
  label: string;
  collapsed: boolean;
  accent?: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="mx-2 my-3">
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-border/40" />
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              className={cn(
                "text-[9px] font-display tracking-[0.18em] uppercase whitespace-nowrap px-1 flex items-center gap-1",
                accent ?? "text-muted-foreground/50",
              )}
            >
              {DivIcon && <DivIcon className="w-2.5 h-2.5" />}
              {label}
            </motion.span>
          )}
        </AnimatePresence>
        <div className="flex-1 h-px bg-border/40" />
      </div>
    </div>
  );
}

export function Sidebar() {
  const collapsed = useNetworkStore((s) => s.sidebarCollapsed);
  const toggle = useNetworkStore((s) => s.toggleSidebar);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { currentPlan } = useSubscriptionStore();
  const isSuperAdmin = useAuthStore((s) => s.isSuperAdmin);

  function isActive(to: string) {
    if (to === "/super-admin") {
      return currentPath === "/super-admin";
    }
    return to === "/" ? currentPath === "/" : currentPath.startsWith(to);
  }

  const isUltra = currentPlan === Plan.ULTRA;

  return (
    <motion.aside
      animate={{ width: collapsed ? 64 : 220 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative flex flex-col h-full bg-card border-r border-border/50 overflow-hidden z-20 flex-shrink-0"
      data-ocid="sidebar-nav"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-border/50 flex-shrink-0">
        <div className="w-7 h-7 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0 noc-glow">
          <Radio className="w-4 h-4 text-primary" />
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="font-display text-sm font-semibold text-foreground tracking-wider whitespace-nowrap"
            >
              NOC SYSTEM
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 overflow-y-auto overflow-x-hidden">
        {/* ── Super Admin Section (only for superAdmin role) ── */}
        {isSuperAdmin && (
          <>
            <SectionDivider
              label="Super Admin"
              collapsed={collapsed}
              accent="text-amber-400/80"
              icon={Shield}
            />
            {SUPER_ADMIN_NAV.map((item) => (
              <NavItemLink
                key={item.to}
                item={item}
                isActive={isActive(item.to)}
                collapsed={collapsed}
                variant="superAdmin"
              />
            ))}
            <SectionDivider
              label="NOC Platform"
              collapsed={collapsed}
              accent="text-primary/60"
            />
          </>
        )}

        {/* Core navigation */}
        {CORE_NAV.map((item) => (
          <NavItemLink
            key={item.to}
            item={item}
            isActive={isActive(item.to)}
            collapsed={collapsed}
          />
        ))}

        {/* Enterprise separator */}
        <SectionDivider label="Enterprise" collapsed={collapsed} />

        {/* Enterprise navigation */}
        {ENTERPRISE_NAV.map((item) => (
          <NavItemLink
            key={item.to}
            item={item}
            isActive={isActive(item.to)}
            collapsed={collapsed}
          />
        ))}

        {/* Billing & Plans separator */}
        <SectionDivider
          label="Billing & Plans"
          collapsed={collapsed}
          accent="text-indigo-400/60"
        />

        {/* Billing navigation */}
        {BILLING_NAV.map((item) => (
          <NavItemLink
            key={item.to}
            item={item}
            isActive={isActive(item.to)}
            collapsed={collapsed}
          />
        ))}

        {/* Admin separator */}
        <SectionDivider
          label="Admin"
          collapsed={collapsed}
          accent={isUltra ? "text-violet-400/70" : "text-muted-foreground/50"}
        />

        {/* Admin navigation */}
        {ADMIN_NAV.map((item) => (
          <NavItemLink
            key={item.to}
            item={item}
            isActive={isActive(item.to)}
            collapsed={collapsed}
            ultraOnly={item.ultraOnly}
          />
        ))}
      </nav>

      {/* Collapse toggle */}
      <div className="border-t border-border/50 p-2">
        <button
          type="button"
          onClick={toggle}
          data-ocid="sidebar-toggle"
          className="w-full flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </motion.aside>
  );
}
