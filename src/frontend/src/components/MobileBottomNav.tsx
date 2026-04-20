import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Building2,
  CreditCard,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const BOTTOM_TABS: Array<{
  label: string;
  icon: React.ElementType;
  to: string;
}> = [
  { label: "Dashboard", icon: LayoutDashboard, to: "/" },
  { label: "Companies", icon: Building2, to: "/super-admin/companies" },
  { label: "Users", icon: Users, to: "/super-admin/users" },
  { label: "Billing", icon: CreditCard, to: "/billing" },
  { label: "Alerts", icon: Activity, to: "/monitoring" },
];

export function MobileBottomNav() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  function isActive(to: string) {
    if (to === "/") return currentPath === "/";
    return currentPath.startsWith(to);
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 h-16 md:hidden flex-shrink-0"
      data-ocid="mobile-bottom-nav"
      aria-label="Mobile navigation"
    >
      {/* Glassmorphism background */}
      <div className="absolute inset-0 bg-card/90 backdrop-blur-xl border-t border-border/60" />

      <div className="relative flex items-center justify-around h-full px-1">
        {BOTTOM_TABS.map((tab) => {
          const active = isActive(tab.to);
          const Icon = tab.icon;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              data-ocid={`mobile-nav-${tab.label.toLowerCase()}`}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 min-w-[44px] min-h-[44px] px-3 py-2 rounded-xl transition-all duration-200 relative",
                active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-label={tab.label}
              aria-current={active ? "page" : undefined}
            >
              {active && (
                <motion.div
                  layoutId="mobile-nav-active-pill"
                  className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div
                animate={active ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative z-10"
              >
                <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 1.75} />
              </motion.div>
              <span
                className={cn(
                  "relative z-10 text-[10px] font-body tracking-wide leading-none",
                  active ? "font-semibold" : "font-normal",
                )}
              >
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
