import { cn } from "@/lib/utils";
import { useNetworkStore } from "@/store/networkStore";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Bot,
  Brain,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Database,
  GitFork,
  Map as MapIcon,
  Radio,
  Server,
  ShieldCheck,
  Workflow,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

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

type NavItem = { label: string; icon: React.ElementType; to: string };

function NavItemLink({
  item,
  isActive,
  collapsed,
}: {
  item: NavItem;
  isActive: boolean;
  collapsed: boolean;
}) {
  const { label, icon: Icon, to } = item;
  return (
    <Link
      to={to}
      data-ocid={`nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
      className={cn(
        "flex items-center gap-3 mx-2 px-3 py-2.5 rounded-lg transition-smooth text-sm relative group",
        isActive
          ? "bg-primary/15 text-primary border border-primary/25 noc-glow"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
      )}
    >
      <Icon
        className={cn("w-4 h-4 flex-shrink-0", isActive && "text-primary")}
      />
      <AnimatePresence>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.12 }}
            className="whitespace-nowrap font-body text-xs tracking-wide"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
      {collapsed && (
        <div className="absolute left-full ml-3 px-2 py-1 bg-popover border border-border rounded-md text-xs text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-smooth z-50 shadow-noc-elevated">
          {label}
        </div>
      )}
    </Link>
  );
}

export function Sidebar() {
  const collapsed = useNetworkStore((s) => s.sidebarCollapsed);
  const toggle = useNetworkStore((s) => s.toggleSidebar);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  function isActive(to: string) {
    return to === "/" ? currentPath === "/" : currentPath.startsWith(to);
  }

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
                  className="text-[9px] font-display tracking-[0.18em] text-muted-foreground/50 uppercase whitespace-nowrap px-1"
                >
                  Enterprise
                </motion.span>
              )}
            </AnimatePresence>
            <div className="flex-1 h-px bg-border/40" />
          </div>
        </div>

        {/* Enterprise navigation */}
        {ENTERPRISE_NAV.map((item) => (
          <NavItemLink
            key={item.to}
            item={item}
            isActive={isActive(item.to)}
            collapsed={collapsed}
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
