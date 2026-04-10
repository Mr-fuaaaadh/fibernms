import { cn } from "@/lib/utils";
import { useNetworkStore } from "@/store/networkStore";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BarChart3,
  Bot,
  ChevronLeft,
  ChevronRight,
  GitFork,
  Map as MapIcon,
  Radio,
  Server,
  Workflow,
  Wrench,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const NAV_ITEMS = [
  { label: "Map Dashboard", icon: MapIcon, to: "/" },
  { label: "Devices", icon: Server, to: "/devices" },
  { label: "Topology", icon: GitFork, to: "/topology" },
  { label: "Monitoring", icon: Activity, to: "/monitoring" },
  { label: "Tools", icon: Wrench, to: "/tools" },
  { label: "Analytics", icon: BarChart3, to: "/analytics" },
  { label: "Workflows", icon: Workflow, to: "/workflows" },
  { label: "AI Assistant", icon: Bot, to: "/ai" },
] as const;

export function Sidebar() {
  const collapsed = useNetworkStore((s) => s.sidebarCollapsed);
  const toggle = useNetworkStore((s) => s.toggleSidebar);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

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
        {NAV_ITEMS.map(({ label, icon: Icon, to }) => {
          const isActive =
            to === "/" ? currentPath === "/" : currentPath.startsWith(to);
          return (
            <Link
              key={to}
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
                className={cn(
                  "w-4 h-4 flex-shrink-0",
                  isActive && "text-primary",
                )}
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
        })}
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
