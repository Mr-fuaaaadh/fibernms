import { useRoleNav } from "@/hooks/useRoleNav";
import { cn } from "@/lib/utils";
import { useNetworkStore } from "@/store/networkStore";
import { Menu, Radio, Search, Shield } from "lucide-react";
import { useState } from "react";
import { MobileNavDrawer } from "./MobileNavDrawer";

interface MobileHeaderProps {
  className?: string;
}

export function MobileHeader({ className }: MobileHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const alerts = useNetworkStore((s) => s.alerts);
  const unresolvedCount = alerts.filter((a) => !a.resolved).length;
  const criticalCount = alerts.filter(
    (a) => !a.resolved && a.severity === "critical",
  ).length;
  const { roleLabel, role } = useRoleNav();

  // Role badge color
  const roleBadgeClass =
    role === "superAdmin"
      ? "text-amber-400 bg-amber-500/10 border-amber-500/25"
      : role === "admin"
        ? "text-blue-400 bg-blue-500/10 border-blue-500/25"
        : role === "engineer"
          ? "text-cyan-400 bg-cyan-500/10 border-cyan-500/25"
          : role === "operator"
            ? "text-green-400 bg-green-500/10 border-green-500/25"
            : "text-muted-foreground bg-muted/30 border-border/30";

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 h-14 md:hidden flex-shrink-0",
          className,
        )}
        data-ocid="mobile-header"
      >
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-card/90 backdrop-blur-xl border-b border-border/60" />

        <div className="relative flex items-center justify-between h-full px-4">
          {/* Hamburger menu */}
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            data-ocid="mobile-header-menu-button"
            className="flex items-center justify-center w-11 h-11 -ml-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Center brand */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none">
            <div className="w-6 h-6 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center noc-glow">
              <Radio className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="font-display text-sm font-semibold text-foreground tracking-wider">
              FiberNMS
            </span>
          </div>

          {/* Right actions: role badge + search + alerts */}
          <div className="flex items-center gap-1">
            {/* Role badge — compact pill, visible when not "viewer" or when it's meaningful */}
            <span
              className={cn(
                "hidden sm:flex items-center gap-1 px-1.5 py-0.5 rounded border text-[9px] font-mono font-semibold tracking-wider",
                roleBadgeClass,
              )}
              data-ocid="mobile-header-role-badge"
              title={roleLabel}
            >
              <Shield className="w-2.5 h-2.5" />
              {role === "superAdmin"
                ? "SA"
                : role === "admin"
                  ? "ADM"
                  : role === "engineer"
                    ? "ENG"
                    : role === "operator"
                      ? "OPR"
                      : "VIEW"}
            </span>

            {/* Search icon */}
            <button
              type="button"
              data-ocid="mobile-header-search"
              className="flex items-center justify-center w-11 h-11 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Alert bell with count badge */}
            <button
              type="button"
              data-ocid="mobile-header-alerts"
              className="relative flex items-center justify-center w-11 h-11 -mr-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-smooth"
              aria-label={`${unresolvedCount} active alerts`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
                <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
              </svg>
              {unresolvedCount > 0 && (
                <span
                  className={cn(
                    "absolute top-1.5 right-1.5 min-w-[16px] h-4 flex items-center justify-center rounded-full text-[9px] font-mono font-bold text-foreground px-0.5",
                    criticalCount > 0 ? "bg-red-500" : "bg-amber-500",
                  )}
                >
                  {unresolvedCount > 99 ? "99+" : unresolvedCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Nav Drawer */}
      <MobileNavDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
    </>
  );
}
