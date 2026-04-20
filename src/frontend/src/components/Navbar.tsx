import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { useNetworkStore } from "@/store/networkStore";
import { useSubscriptionStore } from "@/store/subscriptionStore";
import type { AlertSeverity } from "@/types/network";
import { Plan } from "@/types/subscription";
import { useRouter } from "@tanstack/react-router";
import {
  AlertCircle,
  AlertTriangle,
  Bell,
  ChevronDown,
  Crown,
  Info,
  LogOut,
  Moon,
  Search,
  Settings,
  ShieldAlert,
  Star,
  Sun,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
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

// Role definitions
const ROLES = ["Admin", "Engineer", "Viewer"] as const;
type UserRole = (typeof ROLES)[number];

const ROLE_COLOR: Record<UserRole, string> = {
  Admin: "border-red-500/40 text-red-400",
  Engineer: "border-primary/40 text-primary",
  Viewer: "border-muted text-muted-foreground",
};

function timeAgo(ts: number) {
  const diff = Math.floor((Date.now() - ts) / 60000);
  if (diff < 1) return "just now";
  if (diff < 60) return `${diff}m ago`;
  return `${Math.floor(diff / 60)}h ago`;
}

function formatExpiry(ts: number) {
  return new Date(ts).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function LicenseStatusDot() {
  const { isLicenseValid, expiryDate } = useSubscriptionStore();
  const [showTooltip, setShowTooltip] = useState(false);

  const daysUntilExpiry = Math.floor(
    (expiryDate - Date.now()) / (1000 * 60 * 60 * 24),
  );

  let dotColor: string;
  let statusLabel: string;
  let tooltipText: string;

  if (!isLicenseValid || daysUntilExpiry < 0) {
    dotColor = "bg-red-500 shadow-[0_0_6px_2px_rgba(239,68,68,0.5)]";
    statusLabel = "Expired";
    tooltipText = `License expired on ${formatExpiry(expiryDate)}`;
  } else if (daysUntilExpiry <= 30) {
    dotColor = "bg-amber-400 shadow-[0_0_6px_2px_rgba(251,191,36,0.4)]";
    statusLabel = "Expiring soon";
    tooltipText = `License expires ${formatExpiry(expiryDate)} (${daysUntilExpiry}d left)`;
  } else {
    dotColor = "bg-emerald-400 shadow-[0_0_6px_2px_rgba(52,211,153,0.4)]";
    statusLabel = "Valid";
    tooltipText = `License valid · Expires ${formatExpiry(expiryDate)}`;
  }

  return (
    <div
      className="relative flex items-center gap-1.5 cursor-default"
      data-ocid="navbar-license-status"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span
        className={cn(
          "w-2 h-2 rounded-full flex-shrink-0 animate-pulse",
          dotColor,
        )}
      />
      <span className="hidden md:block text-[10px] font-mono text-muted-foreground">
        {statusLabel}
      </span>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 px-2.5 py-1.5 bg-popover border border-border rounded-lg text-[11px] font-mono text-foreground whitespace-nowrap shadow-noc-elevated z-50 pointer-events-none"
          >
            {tooltipText}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const searchQuery = useNetworkStore((s) => s.searchQuery);
  const setSearchQuery = useNetworkStore((s) => s.setSearchQuery);
  const alerts = useNetworkStore((s) => s.alerts);
  const resolveAlert = useNetworkStore((s) => s.resolveAlert);
  const slaRecords = useNetworkStore((s) => s.slaRecords);
  const setMobileSearchOpen = useNetworkStore((s) => s.setMobileSearchOpen);

  const { logout, principal, currentUser } = useAuth();
  const router = useRouter();

  const { currentPlan, trialDaysLeft } = useSubscriptionStore();

  function handleLogout() {
    setProfileOpen(false);
    logout();
    void router.navigate({ to: "/login" });
  }

  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = theme === "dark";

  const unresolvedAlerts = alerts.filter((a) => !a.resolved);
  const criticalCount = unresolvedAlerts.filter(
    (a) => a.severity === "critical",
  ).length;

  const slaBreachCount = slaRecords.filter((s) => s.status === "breach").length;

  const [alertOpen, setAlertOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [userRole] = useState<UserRole>("Admin");
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
    <header className="h-14 flex items-center gap-3 px-5 bg-card border-b border-border/50 z-30 flex-shrink-0">
      {/* Page title */}
      <div className="flex-1 min-w-0">
        <span className="font-display text-xs tracking-[0.2em] text-muted-foreground uppercase">
          NOC Global Operational Dashboard
        </span>
      </div>

      {/* SLA Breach Indicator */}
      {slaBreachCount > 0 && (
        <div
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-destructive/40 bg-destructive/10"
          data-ocid="navbar-sla-breaches"
          title={`${slaBreachCount} SLA breach${slaBreachCount !== 1 ? "es" : ""} active`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-destructive" />
          <span className="text-[11px] font-mono font-semibold text-destructive">
            {slaBreachCount} SLA BREACH{slaBreachCount !== 1 ? "ES" : ""}
          </span>
        </div>
      )}

      {/* Trial badge */}
      {trialDaysLeft > 0 && (
        <div
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-amber-500/40 bg-amber-500/10"
          data-ocid="navbar-trial-badge"
        >
          <Star className="w-3 h-3 text-amber-400" />
          <span className="text-[11px] font-mono font-semibold text-amber-400">
            Trial: {trialDaysLeft}d left
          </span>
        </div>
      )}

      {/* Upgrade button — hidden for ULTRA plan */}
      {currentPlan !== Plan.ULTRA && (
        <button
          type="button"
          data-ocid="navbar-upgrade-btn"
          onClick={() => {
            window.location.href = "/billing?upgrade_to=ULTRA";
          }}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold bg-gradient-to-r from-violet-600/80 to-indigo-600/80 hover:from-violet-500/90 hover:to-indigo-500/90 text-white border border-violet-500/40 transition-smooth shadow-sm hover:shadow-[0_0_12px_rgba(139,92,246,0.35)] whitespace-nowrap"
        >
          <Crown className="w-3.5 h-3.5" />
          Upgrade to ULTRA
        </button>
      )}

      {/* License status dot */}
      <LicenseStatusDot />

      {/* Mobile search icon — md and below only */}
      <button
        type="button"
        aria-label="Search"
        onClick={() => setMobileSearchOpen(true)}
        className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth min-w-[44px] min-h-[44px] flex items-center justify-center"
        data-ocid="mobile-search-btn"
      >
        <Search className="w-4 h-4" />
      </button>

      {/* Search — desktop only */}
      <div className="relative hidden md:block w-56" data-ocid="navbar-search">
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

      {/* Theme Toggle */}
      {mounted && (
        <div className="relative group" data-ocid="navbar-theme-toggle">
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth overflow-hidden"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isDark ? (
                <motion.span
                  key="sun"
                  initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  <Sun className="w-4 h-4" />
                </motion.span>
              ) : (
                <motion.span
                  key="moon"
                  initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  <Moon className="w-4 h-4" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          {/* Tooltip */}
          <span className="pointer-events-none absolute right-1/2 translate-x-1/2 top-full mt-1.5 whitespace-nowrap px-2 py-1 rounded bg-card border border-border/50 text-[10px] font-mono text-foreground shadow-noc-elevated opacity-0 group-hover:opacity-100 transition-smooth z-50">
            {isDark ? "Switch to light mode" : "Switch to dark mode"}
          </span>
        </div>
      )}

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
            {currentUser?.firstName ?? "Engineer"}
          </span>
          <Badge
            variant="outline"
            className={cn(
              "text-[9px] px-1 py-0 h-4 font-mono hidden sm:flex",
              ROLE_COLOR[userRole],
            )}
            data-ocid="navbar-role-badge"
          >
            {userRole}
          </Badge>
          <ChevronDown className="w-3 h-3 text-muted-foreground" />
        </button>

        <AnimatePresence>
          {profileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-52 glass-elevated rounded-xl overflow-hidden shadow-noc-elevated z-50"
            >
              <div className="px-4 py-3 border-b border-border/50">
                <p className="text-xs font-mono text-foreground truncate max-w-[180px]">
                  {currentUser
                    ? `${currentUser.firstName} ${currentUser.lastName}`
                    : principal
                      ? `${principal.slice(0, 5)}…${principal.slice(-4)}`
                      : "NOC Operator"}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {currentUser?.role ?? "System Engineer"}
                </p>
                <Badge
                  variant="outline"
                  className={cn(
                    "text-[9px] px-1.5 py-0.5 mt-1.5 font-mono",
                    ROLE_COLOR[userRole],
                  )}
                >
                  {userRole} Access
                </Badge>
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
                  onClick={handleLogout}
                  data-ocid="navbar-logout"
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
