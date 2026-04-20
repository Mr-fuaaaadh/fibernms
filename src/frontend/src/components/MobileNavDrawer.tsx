import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import { Plan } from "@/types/subscription";
import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  Building2,
  ChevronDown,
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
  LogOut,
  Map as MapIcon,
  Moon,
  Palette,
  Puzzle,
  Radio,
  Server,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sun,
  TrendingUp,
  User,
  Users,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type NavItem = {
  label: string;
  icon: React.ElementType;
  to: string;
  ultraOnly?: boolean;
};

type NavSection = {
  id: string;
  label: string;
  accent?: string;
  icon?: React.ElementType;
  items: readonly NavItem[];
};

const SUPER_ADMIN_SECTION: NavSection = {
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
  ],
};

const CORE_SECTION: NavSection = {
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
};

const ENTERPRISE_SECTION: NavSection = {
  id: "enterprise",
  label: "Enterprise",
  items: [
    { label: "SLA Dashboard", icon: ShieldCheck, to: "/sla" },
    { label: "Predictive AI", icon: Brain, to: "/predictive" },
    { label: "Capacity Plan", icon: Database, to: "/capacity" },
    { label: "Audit Logs", icon: ClipboardList, to: "/audit" },
  ],
};

const BILLING_SECTION: NavSection = {
  id: "billing",
  label: "Billing & Plans",
  accent: "text-indigo-400/80",
  items: [
    { label: "Plans", icon: LayoutList, to: "/plans" },
    { label: "Billing", icon: CreditCard, to: "/billing" },
    { label: "Usage", icon: BarChart3, to: "/usage" },
  ],
};

const ADMIN_SECTION: NavSection = {
  id: "admin",
  label: "Admin",
  items: [
    { label: "Integrations", icon: Puzzle, to: "/integrations" },
    { label: "Multi-Tenant", icon: Building2, to: "/tenants", ultraOnly: true },
    {
      label: "White-Labeling",
      icon: Palette,
      to: "/settings/branding",
      ultraOnly: true,
    },
    { label: "License", icon: Key, to: "/settings/license" },
    { label: "Documentation", icon: BookOpen, to: "/docs" },
  ],
};

function CollapsibleSection({
  section,
  currentPath,
  onNavigate,
  isUltra,
}: {
  section: NavSection;
  currentPath: string;
  onNavigate: () => void;
  isUltra: boolean;
}) {
  const [open, setOpen] = useState(true);

  function isActive(to: string) {
    if (to === "/super-admin") return currentPath === "/super-admin";
    if (to === "/") return currentPath === "/";
    return currentPath.startsWith(to);
  }

  const isSuperAdminSection = section.id === "super-admin";

  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "w-full flex items-center gap-2 px-3 py-2 text-[10px] font-display tracking-[0.15em] uppercase rounded-lg transition-smooth",
          section.accent ?? "text-muted-foreground/60",
          "hover:bg-muted/30",
        )}
        data-ocid={`mobile-drawer-section-${section.id}`}
      >
        {section.icon && <section.icon className="w-3 h-3 flex-shrink-0" />}
        <span className="flex-1 text-left">{section.label}</span>
        <motion.div
          animate={{ rotate: open ? 0 : -90 }}
          transition={{ duration: 0.15 }}
        >
          <ChevronDown className="w-3 h-3" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="py-0.5 space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.to);
                const Icon = item.icon;
                const isLocked = item.ultraOnly && !isUltra;

                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onNavigate}
                    data-ocid={`mobile-nav-drawer-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                    className={cn(
                      "flex items-center gap-3 mx-1 px-3 py-2.5 rounded-lg transition-smooth text-sm min-h-[44px]",
                      active
                        ? isSuperAdminSection
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                          : "bg-primary/15 text-primary border border-primary/25"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 flex-shrink-0",
                        active && isSuperAdminSection && "text-amber-400",
                        active && !isSuperAdminSection && "text-primary",
                      )}
                    />
                    <span className="flex-1 text-xs font-body tracking-wide min-w-0 truncate">
                      {item.label}
                    </span>
                    {item.ultraOnly && !isUltra && (
                      <span className="flex items-center gap-0.5 px-1 py-0.5 rounded text-[8px] font-mono font-bold bg-violet-500/15 text-violet-400 border border-violet-500/30 flex-shrink-0">
                        <Crown className="w-2.5 h-2.5" />
                        ULTRA
                      </span>
                    )}
                    {isLocked && (
                      <Lock className="w-3 h-3 text-muted-foreground/40 flex-shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface MobileNavDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNavDrawer({ open, onOpenChange }: MobileNavDrawerProps) {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const isSuperAdmin = useAuthStore((s) => s.isSuperAdmin);
  const { currentPlan } = useSubscriptionStore();
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = theme === "dark";
  const isUltra = currentPlan === Plan.ULTRA;

  function handleNavigate() {
    onOpenChange(false);
  }

  function handleLogout() {
    onOpenChange(false);
    logout();
    void router.navigate({ to: "/login" });
  }

  const sections = [
    ...(isSuperAdmin ? [SUPER_ADMIN_SECTION] : []),
    CORE_SECTION,
    ENTERPRISE_SECTION,
    BILLING_SECTION,
    ADMIN_SECTION,
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="w-[280px] p-0 bg-card border-r border-border/60 flex flex-col gap-0"
        data-ocid="mobile-nav-drawer"
      >
        {/* Header */}
        <SheetHeader className="flex-shrink-0 px-4 h-14 border-b border-border/50 flex flex-row items-center gap-3 space-y-0">
          <div className="w-7 h-7 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center noc-glow flex-shrink-0">
            <Radio className="w-4 h-4 text-primary" />
          </div>
          <SheetTitle className="font-display text-sm font-semibold text-foreground tracking-wider flex-1">
            FiberNMS
          </SheetTitle>
          {isSuperAdmin && (
            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
              <Shield className="w-2.5 h-2.5" />
              SA
            </span>
          )}
        </SheetHeader>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
          {sections.map((section) => (
            <CollapsibleSection
              key={section.id}
              section={section}
              currentPath={currentPath}
              onNavigate={handleNavigate}
              isUltra={isUltra}
            />
          ))}
        </nav>

        {/* User footer */}
        <div className="flex-shrink-0 border-t border-border/50 p-3 space-y-2">
          {/* User info */}
          <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-muted/30">
            <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-mono text-foreground truncate">
                {currentUser
                  ? `${currentUser.firstName} ${currentUser.lastName}`
                  : "NOC Operator"}
              </p>
              <p className="text-[10px] text-muted-foreground truncate">
                {currentUser?.email ?? "engineer@fibernms.com"}
              </p>
            </div>
          </div>

          {/* Actions row */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(isDark ? "light" : "dark")}
                data-ocid="mobile-drawer-theme-toggle"
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth border border-border/40 min-h-[44px]"
                aria-label={
                  isDark ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
                <span className="font-body">{isDark ? "Light" : "Dark"}</span>
              </button>
            )}

            {/* Logout */}
            <button
              type="button"
              onClick={handleLogout}
              data-ocid="mobile-drawer-logout"
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-400/10 transition-smooth border border-red-400/20 min-h-[44px]"
            >
              <LogOut className="w-4 h-4" />
              <span className="font-body">Sign out</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
