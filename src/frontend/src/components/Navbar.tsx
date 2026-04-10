import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useNetworkStore } from "@/store/networkStore";
import type { AlertSeverity } from "@/types/network";
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  ChevronDown,
  Info,
  LogOut,
  Search,
  Settings,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const SEVERITY_ICON: Record<AlertSeverity, React.ElementType> = {
  critical: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};
const SEVERITY_COLOR: Record<AlertSeverity, string> = {
  critical: "text-red-400",
  warning: "text-amber-400",
  info: "text-primary",
};

function timeAgo(ts: number) {
  const diff = Math.floor((Date.now() - ts) / 60000);
  if (diff < 1) return "just now";
  if (diff < 60) return `${diff}m ago`;
  return `${Math.floor(diff / 60)}h ago`;
}

export function Navbar() {
  const searchQuery = useNetworkStore((s) => s.searchQuery);
  const setSearchQuery = useNetworkStore((s) => s.setSearchQuery);
  const alerts = useNetworkStore((s) => s.alerts);
  const resolveAlert = useNetworkStore((s) => s.resolveAlert);

  const unresolvedAlerts = alerts.filter((a) => !a.resolved);
  const criticalCount = unresolvedAlerts.filter(
    (a) => a.severity === "critical",
  ).length;

  const [alertOpen, setAlertOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const alertRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (alertRef.current && !alertRef.current.contains(e.target as Node))
        setAlertOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setProfileOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <header className="h-14 flex items-center gap-4 px-5 bg-card border-b border-border/50 z-30 flex-shrink-0">
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <span className="font-display text-xs tracking-[0.2em] text-muted-foreground uppercase">
          NOC Global Operational Dashboard
        </span>
      </div>

      {/* Search */}
      <div className="relative w-64" data-ocid="navbar-search">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search devices…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 bg-muted/50 border border-border/50 rounded-lg text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-muted transition-smooth"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label="Clear search"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Alerts */}
      <div className="relative" ref={alertRef}>
        <button
          type="button"
          onClick={() => {
            setAlertOpen((v) => !v);
            setProfileOpen(false);
          }}
          data-ocid="navbar-alerts"
          className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
          aria-label={`${unresolvedAlerts.length} alerts`}
        >
          <Bell className="w-4 h-4" />
          {unresolvedAlerts.length > 0 && (
            <span
              className={cn(
                "absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center rounded-full text-[9px] font-mono font-bold text-foreground",
                criticalCount > 0 ? "bg-red-500" : "bg-amber-500",
              )}
            >
              {unresolvedAlerts.length}
            </span>
          )}
        </button>

        <AnimatePresence>
          {alertOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-80 glass-elevated rounded-xl overflow-hidden shadow-noc-elevated z-50"
              data-ocid="alerts-dropdown"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
                <span className="font-display text-xs tracking-widest text-foreground uppercase">
                  Alerts
                </span>
                <Badge
                  variant="destructive"
                  className="text-[9px] font-mono px-1.5 py-0.5"
                >
                  {criticalCount} CRITICAL
                </Badge>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-border/30">
                {unresolvedAlerts.length === 0 ? (
                  <p className="text-center text-muted-foreground text-xs py-6">
                    No active alerts
                  </p>
                ) : (
                  unresolvedAlerts.map((alert) => {
                    const Icon = SEVERITY_ICON[alert.severity];
                    return (
                      <div
                        key={alert.id}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-muted/30 transition-smooth"
                      >
                        <Icon
                          className={cn(
                            "w-3.5 h-3.5 mt-0.5 flex-shrink-0",
                            SEVERITY_COLOR[alert.severity],
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-mono text-foreground truncate">
                            {alert.deviceName}
                          </p>
                          <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">
                            {alert.issueType}
                          </p>
                          <p className="text-[10px] text-muted-foreground/60 mt-1 font-mono">
                            {timeAgo(alert.timestamp)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => resolveAlert(alert.id)}
                          className="text-muted-foreground/50 hover:text-muted-foreground flex-shrink-0"
                          aria-label="Dismiss"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* User profile */}
      <div className="relative" ref={profileRef}>
        <button
          type="button"
          onClick={() => {
            setProfileOpen((v) => !v);
            setAlertOpen(false);
          }}
          data-ocid="navbar-profile"
          className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg text-sm hover:bg-muted/50 transition-smooth border border-border/30"
        >
          <div className="w-6 h-6 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-primary" />
          </div>
          <span className="font-body text-xs text-foreground hidden sm:block">
            Engineer
          </span>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </button>

        <AnimatePresence>
          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-44 glass-elevated rounded-xl overflow-hidden shadow-noc-elevated z-50"
            >
              <div className="px-4 py-3 border-b border-border/50">
                <p className="text-xs font-mono text-foreground">
                  Lorine Smith
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  System Engineer
                </p>
              </div>
              <div className="p-1">
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
                >
                  <Settings className="w-3.5 h-3.5" />
                  Settings
                </button>
                <button
                  type="button"
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-400/10 transition-smooth"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign out
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
