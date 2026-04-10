import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type AlertSeverity,
  type SecurityEvent,
  mockIPTracking,
  mockLoginAttempts,
  mockMFAStatus,
  mockSecurityEvents,
  mockSuspiciousActivity,
  mockUsers,
} from "@/data/superAdminMockData";
import type {
  IPTrackingEntry,
  MFAStatus,
  SuspiciousActivity,
} from "@/types/superAdmin";
import {
  Activity,
  Ban,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Globe,
  KeyRound,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldOff,
  X,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

const SEV_COLORS: Record<AlertSeverity, string> = {
  critical: "bg-red-500/15 text-red-400 border-red-500/30",
  high: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  medium: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  low: "bg-blue-500/15 text-blue-400 border-blue-500/30",
};

const TOOLTIP_STYLE = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "6px",
  fontSize: 11,
  color: "hsl(var(--foreground))",
};

// ─── Build 30-day login chart data ────────────────────────────────────────────
function buildLoginChartData() {
  const days: Record<
    string,
    { date: string; success: number; failed: number }
  > = {};
  for (let d = 29; d >= 0; d--) {
    const dt = new Date(Date.now() - d * 86_400_000);
    const key = dt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    days[key] = { date: key, success: 0, failed: 0 };
  }
  for (const attempt of mockLoginAttempts) {
    const key = new Date(attempt.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    if (!days[key]) continue;
    if (attempt.success) {
      days[key].success += attempt.count;
    } else {
      days[key].failed += attempt.count;
    }
  }
  return Object.values(days);
}

// ─── KPI Cards ────────────────────────────────────────────────────────────────
function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  color,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  color: "blue" | "red" | "orange" | "emerald" | "violet";
}) {
  const cfg = {
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      ring: "ring-blue-500/20",
    },
    red: { bg: "bg-red-500/10", text: "text-red-400", ring: "ring-red-500/20" },
    orange: {
      bg: "bg-orange-500/10",
      text: "text-orange-400",
      ring: "ring-orange-500/20",
    },
    emerald: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-400",
      ring: "ring-emerald-500/20",
    },
    violet: {
      bg: "bg-violet-500/10",
      text: "text-violet-400",
      ring: "ring-violet-500/20",
    },
  }[color];

  return (
    <GlassCard className="p-4 flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ring-1 ${cfg.bg} ${cfg.ring}`}
      >
        <Icon className={`w-5 h-5 ${cfg.text}`} />
      </div>
      <div className="min-w-0">
        <p className="text-[11px] text-muted-foreground leading-tight truncate">
          {label}
        </p>
        <p className={`text-2xl font-display font-bold mt-0.5 ${cfg.text}`}>
          {value}
        </p>
        {sub && (
          <p className="text-[10px] text-muted-foreground truncate">{sub}</p>
        )}
      </div>
    </GlassCard>
  );
}

// ─── Suspicious Activity Panel ───────────────────────────────────────────────
function SuspiciousPanel({
  items,
  blockedIps,
  dismissedIds,
  onBlock,
  onDismiss,
}: {
  items: SuspiciousActivity[];
  blockedIps: Set<string>;
  dismissedIds: Set<string>;
  onBlock: (ip: string) => void;
  onDismiss: (id: string) => void;
}) {
  const visible = items.filter((i) => !dismissedIds.has(i.id));

  if (visible.length === 0) {
    return (
      <div className="flex flex-col items-center py-12 gap-2 text-muted-foreground">
        <ShieldCheck className="w-8 h-8 text-emerald-400 opacity-60" />
        <p className="text-sm font-medium">No suspicious activity detected</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-border/20">
      {visible.map((item) => (
        <div
          key={item.id}
          className="p-4 hover:bg-muted/10 transition-colors"
          data-ocid={`suspicious-item-${item.id}`}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <code className="text-[11px] bg-muted/30 px-1.5 py-0.5 rounded font-mono text-foreground">
                  {item.ipAddress}
                </code>
                {item.userEmail && (
                  <span className="text-[11px] text-muted-foreground truncate max-w-[200px]">
                    {item.userEmail}
                  </span>
                )}
                <Badge
                  className={`text-[9px] border capitalize ${SEV_COLORS[item.severity]}`}
                >
                  {item.severity}
                </Badge>
              </div>
              <p className="text-xs text-foreground/80 mb-1">{item.reason}</p>
              <p className="text-[10px] text-muted-foreground">
                Detected {fmtRelative(item.detectedAt)} · {item.actionsCount}{" "}
                actions
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className={`h-7 px-2.5 text-[10px] gap-1.5 ${blockedIps.has(item.ipAddress) ? "text-red-400 bg-red-500/10" : "text-muted-foreground hover:text-red-400 hover:bg-red-500/10"}`}
                onClick={() => onBlock(item.ipAddress)}
                data-ocid={`btn-block-${item.id}`}
              >
                <Ban className="w-3 h-3" />
                {blockedIps.has(item.ipAddress) ? "Blocked" : "Block IP"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2.5 text-[10px] gap-1.5 text-muted-foreground hover:text-foreground"
                onClick={() => onDismiss(item.id)}
                data-ocid={`btn-dismiss-${item.id}`}
              >
                <X className="w-3 h-3" />
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── IP Tracking Table ────────────────────────────────────────────────────────
const IP_PAGE_SIZE = 20;

function IPTrackingTable({
  entries,
  blockedIps,
  onToggleBlock,
}: {
  entries: IPTrackingEntry[];
  blockedIps: Set<string>;
  onToggleBlock: (ip: string) => void;
}) {
  const [search, setSearch] = useState("");
  const [filterBlocked, setFilterBlocked] = useState<
    "all" | "blocked" | "active"
  >("all");
  const [page, setPage] = useState(0);

  const filtered = useMemo(() => {
    let result = entries;
    if (filterBlocked === "blocked")
      result = result.filter((e) => e.isBlocked || blockedIps.has(e.ipAddress));
    if (filterBlocked === "active")
      result = result.filter(
        (e) => !e.isBlocked && !blockedIps.has(e.ipAddress),
      );
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.ipAddress.includes(q) ||
          e.userEmail?.toLowerCase().includes(q) ||
          e.companyName?.toLowerCase().includes(q),
      );
    }
    return result;
  }, [entries, search, filterBlocked, blockedIps]);

  const totalPages = Math.ceil(filtered.length / IP_PAGE_SIZE);
  const page_items = filtered.slice(
    page * IP_PAGE_SIZE,
    (page + 1) * IP_PAGE_SIZE,
  );

  return (
    <div>
      {/* Filters */}
      <div className="p-3 border-b border-border/30 flex items-center gap-3 flex-wrap">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search IP, email, company..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="pl-8 h-8 text-xs bg-background/50 w-52"
            data-ocid="input-ip-search"
          />
        </div>
        <div className="flex items-center gap-1">
          <Filter className="w-3.5 h-3.5 text-muted-foreground" />
          {(["all", "blocked", "active"] as const).map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => {
                setFilterBlocked(val);
                setPage(0);
              }}
              className={`px-2.5 py-1 text-[10px] font-medium rounded-md capitalize transition-colors ${filterBlocked === val ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}
              data-ocid={`filter-ip-${val}`}
            >
              {val}
            </button>
          ))}
        </div>
        <span className="ml-auto text-[10px] text-muted-foreground">
          {filtered.length} entries
        </span>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="border-b border-border/40 bg-muted/10">
            <tr>
              {[
                "IP Address",
                "User Email",
                "Company",
                "Successful",
                "Failed",
                "Last Seen",
                "Location",
                "Status",
                "",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left py-2.5 px-3 font-medium text-[10px] uppercase tracking-wide text-muted-foreground whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {page_items.map((entry) => {
              const isBlocked =
                entry.isBlocked || blockedIps.has(entry.ipAddress);
              return (
                <tr
                  key={entry.ipAddress}
                  className={`border-b border-border/15 transition-colors ${isBlocked ? "bg-red-500/5 hover:bg-red-500/10" : "hover:bg-muted/10"}`}
                  data-ocid={`ip-row-${entry.ipAddress.replace(/\./g, "-")}`}
                >
                  <td className="py-2.5 px-3 font-mono text-[10px] text-foreground">
                    {entry.ipAddress}
                  </td>
                  <td className="py-2.5 px-3 text-[10px] text-muted-foreground truncate max-w-[140px]">
                    {entry.userEmail ?? "—"}
                  </td>
                  <td className="py-2.5 px-3 text-[10px] text-muted-foreground truncate max-w-[120px]">
                    {entry.companyName ?? "—"}
                  </td>
                  <td className="py-2.5 px-3 text-[11px] font-mono text-emerald-400 text-right">
                    {entry.successCount}
                  </td>
                  <td className="py-2.5 px-3 text-[11px] font-mono text-red-400 text-right">
                    {entry.failedAttempts}
                  </td>
                  <td className="py-2.5 px-3 text-[10px] text-muted-foreground whitespace-nowrap">
                    {fmtRelative(entry.lastSeen)}
                  </td>
                  <td className="py-2.5 px-3 text-[10px] text-muted-foreground whitespace-nowrap">
                    {entry.geoLocation}
                  </td>
                  <td className="py-2.5 px-3">
                    <Badge
                      className={`text-[9px] border capitalize ${isBlocked ? "bg-red-500/15 text-red-400 border-red-500/30" : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"}`}
                    >
                      {isBlocked ? "Blocked" : "Active"}
                    </Badge>
                  </td>
                  <td className="py-2.5 px-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`h-6 px-2 text-[10px] gap-1 whitespace-nowrap ${isBlocked ? "text-emerald-400 hover:bg-emerald-500/10" : "text-red-400 hover:bg-red-500/10"}`}
                      onClick={() => onToggleBlock(entry.ipAddress)}
                      data-ocid={`toggle-ip-${entry.ipAddress.replace(/\./g, "-")}`}
                    >
                      <Ban className="w-3 h-3" />
                      {isBlocked ? "Unblock" : "Block"}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="px-4 py-3 border-t border-border/30 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">
          Page {page + 1} of {Math.max(totalPages, 1)} · {filtered.length}{" "}
          results
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            data-ocid="btn-ip-prev"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            data-ocid="btn-ip-next"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── MFA Status Panel ─────────────────────────────────────────────────────────
const MFA_PAGE_SIZE = 25;

function MFAPanel({ mfaStatuses }: { mfaStatuses: MFAStatus[] }) {
  const [companyFilter, setCompanyFilter] = useState("all");
  const [mfaFilter, setMfaFilter] = useState<"all" | "enabled" | "disabled">(
    "all",
  );
  const [page, setPage] = useState(0);

  const companies = useMemo(() => {
    const set = new Set(mfaStatuses.map((m) => m.companyName));
    return ["all", ...Array.from(set).sort().slice(0, 15)];
  }, [mfaStatuses]);

  const filtered = useMemo(() => {
    let result = mfaStatuses;
    if (companyFilter !== "all")
      result = result.filter((m) => m.companyName === companyFilter);
    if (mfaFilter === "enabled") result = result.filter((m) => m.mfaEnabled);
    if (mfaFilter === "disabled") result = result.filter((m) => !m.mfaEnabled);
    return result;
  }, [mfaStatuses, companyFilter, mfaFilter]);

  const totalPages = Math.ceil(filtered.length / MFA_PAGE_SIZE);
  const page_items = filtered.slice(
    page * MFA_PAGE_SIZE,
    (page + 1) * MFA_PAGE_SIZE,
  );
  const enabledCount = mfaStatuses.filter((m) => m.mfaEnabled).length;
  const enrollmentRate = (
    (enabledCount / Math.max(mfaStatuses.length, 1)) *
    100
  ).toFixed(1);

  return (
    <div>
      {/* Summary */}
      <div className="p-4 border-b border-border/30 grid grid-cols-3 gap-4">
        {[
          {
            label: "MFA Enabled",
            value: enabledCount,
            color: "text-emerald-400",
          },
          {
            label: "MFA Disabled",
            value: mfaStatuses.length - enabledCount,
            color: "text-red-400",
          },
          {
            label: "Enrollment Rate",
            value: `${enrollmentRate}%`,
            color: "text-blue-400",
          },
        ].map(({ label, value, color }) => (
          <div key={label} className="text-center">
            <p className={`text-2xl font-display font-bold ${color}`}>
              {value}
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5">{label}</p>
          </div>
        ))}
      </div>
      {/* Filters */}
      <div className="p-3 border-b border-border/20 flex items-center gap-3 flex-wrap">
        <select
          value={companyFilter}
          onChange={(e) => {
            setCompanyFilter(e.target.value);
            setPage(0);
          }}
          className="h-7 text-[11px] bg-background/50 border border-border/50 rounded-md px-2 text-foreground"
          data-ocid="select-mfa-company"
        >
          {companies.map((c) => (
            <option key={c} value={c}>
              {c === "all" ? "All Companies" : c}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-1">
          {(["all", "enabled", "disabled"] as const).map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => {
                setMfaFilter(val);
                setPage(0);
              }}
              className={`px-2.5 py-1 text-[10px] font-medium rounded-md capitalize transition-colors ${mfaFilter === val ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"}`}
              data-ocid={`filter-mfa-${val}`}
            >
              {val}
            </button>
          ))}
        </div>
        <span className="ml-auto text-[10px] text-muted-foreground">
          {filtered.length} users
        </span>
      </div>
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead className="border-b border-border/40 bg-muted/10">
            <tr>
              {[
                "User Email",
                "Company",
                "MFA Enabled",
                "Last MFA Event",
                "Backup Codes",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left py-2.5 px-3 font-medium text-[10px] uppercase tracking-wide text-muted-foreground"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {page_items.map((item) => (
              <tr
                key={item.userId}
                className="border-b border-border/15 hover:bg-muted/10 transition-colors"
                data-ocid={`mfa-row-${item.userId}`}
              >
                <td className="py-2.5 px-3 text-[11px] text-foreground truncate max-w-[200px]">
                  {item.userEmail}
                </td>
                <td className="py-2.5 px-3 text-[10px] text-muted-foreground truncate max-w-[140px]">
                  {item.companyName}
                </td>
                <td className="py-2.5 px-3">
                  <Badge
                    className={`text-[9px] border gap-1 ${item.mfaEnabled ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" : "bg-red-500/15 text-red-400 border-red-500/30"}`}
                  >
                    {item.mfaEnabled ? (
                      <ShieldCheck className="w-2.5 h-2.5" />
                    ) : (
                      <ShieldOff className="w-2.5 h-2.5" />
                    )}
                    {item.mfaEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </td>
                <td className="py-2.5 px-3 text-[10px] text-muted-foreground">
                  {item.lastMFAEvent ? fmtRelative(item.lastMFAEvent) : "—"}
                </td>
                <td className="py-2.5 px-3">
                  <Badge
                    className={`text-[9px] border ${item.backupCodesAvailable ? "bg-blue-500/15 text-blue-400 border-blue-500/30" : "bg-muted/20 text-muted-foreground border-border/40"}`}
                  >
                    {item.backupCodesAvailable ? "Available" : "None"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="px-4 py-3 border-t border-border/30 flex items-center justify-between">
        <span className="text-[10px] text-muted-foreground">
          Page {page + 1} of {Math.max(totalPages, 1)} · {filtered.length} users
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            data-ocid="btn-mfa-prev"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-7 px-2"
            disabled={page >= totalPages - 1}
            onClick={() => setPage((p) => p + 1)}
            data-ocid="btn-mfa-next"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Security Events Timeline ─────────────────────────────────────────────────
function SecurityTimeline({ events }: { events: SecurityEvent[] }) {
  const recent = useMemo(
    () =>
      [...events]
        .sort(
          (a, b) =>
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
        )
        .slice(0, 20),
    [events],
  );

  return (
    <div className="divide-y divide-border/20">
      {recent.map((e) => (
        <div
          key={e.id}
          className="flex items-start gap-3 py-3 px-4 hover:bg-muted/10 transition-colors"
          data-ocid={`timeline-event-${e.id}`}
        >
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${e.success ? "bg-emerald-500/15" : "bg-red-500/15"}`}
          >
            {e.success ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <XCircle className="w-3.5 h-3.5 text-red-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-medium text-foreground truncate">
                {e.userName ?? e.userEmail ?? "Unknown User"}
              </span>
              <code className="text-[9px] text-muted-foreground font-mono bg-muted/20 px-1 rounded">
                {e.ipAddress}
              </code>
              <Badge
                className={`text-[8px] border capitalize ${SEV_COLORS[e.severity]}`}
              >
                {e.type?.replace(/_/g, " ")}
              </Badge>
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              {e.description ?? e.companyName}
            </p>
          </div>
          <span className="text-[10px] text-muted-foreground whitespace-nowrap flex-shrink-0">
            {fmtRelative(e.timestamp)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type TabKey = "overview" | "suspicious" | "ips" | "mfa" | "events";

export default function SecurityDashboard(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [lastRefreshed] = useState(new Date());
  const [blockedIps, setBlockedIps] = useState<Set<string>>(new Set());
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  const loginChartData = useMemo(() => buildLoginChartData(), []);

  const stats = useMemo(() => {
    const total = loginChartData.reduce((s, d) => s + d.success + d.failed, 0);
    const failed = loginChartData.reduce((s, d) => s + d.failed, 0);
    const failurePct = total > 0 ? Math.round((failed / total) * 100) : 0;
    const blockedCount = mockIPTracking.filter(
      (e) => e.isBlocked || blockedIps.has(e.ipAddress),
    ).length;
    return { total, failed, failurePct, blockedCount };
  }, [loginChartData, blockedIps]);

  const tabs: Array<{ key: TabKey; label: string; icon: React.ElementType }> = [
    { key: "overview", label: "Overview", icon: Activity },
    { key: "suspicious", label: "Suspicious Activity", icon: ShieldAlert },
    { key: "ips", label: "IP Tracking", icon: Globe },
    { key: "mfa", label: "MFA Status", icon: KeyRound },
    { key: "events", label: "Security Events", icon: Shield },
  ];

  const handleBlock = (ip: string) =>
    setBlockedIps((prev) => {
      const next = new Set(prev);
      next.has(ip) ? next.delete(ip) : next.add(ip);
      return next;
    });

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-foreground">
              Security Dashboard
            </h1>
            <p className="text-[11px] text-muted-foreground">
              Last refreshed: {lastRefreshed.toLocaleTimeString()}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto h-8 gap-1.5 text-xs"
          data-ocid="btn-refresh-security"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard
          label="Login Attempts Today"
          value={(stats.total / 30).toFixed(0)}
          sub="avg daily logins"
          icon={Activity}
          color="blue"
        />
        <KpiCard
          label="Failed Logins"
          value={`${stats.failed.toLocaleString()}`}
          sub={`${stats.failurePct}% failure rate`}
          icon={ShieldOff}
          color="red"
        />
        <KpiCard
          label="Suspicious Activities"
          value={mockSuspiciousActivity.length}
          sub={`${mockSuspiciousActivity.filter((s) => s.severity === "critical").length} critical`}
          icon={ShieldAlert}
          color="orange"
        />
        <KpiCard
          label="Blocked IPs"
          value={stats.blockedCount + blockedIps.size}
          sub="total blocked addresses"
          icon={Ban}
          color="violet"
        />
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-0 border-b border-border/40 overflow-x-auto">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            type="button"
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
              activeTab === key
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
            data-ocid={`tab-${key}`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab: Overview — Login Chart */}
      {activeTab === "overview" && (
        <div className="space-y-5">
          <GlassCard className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-display font-semibold text-foreground">
                Login Attempts — Last 30 Days
              </h2>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={loginChartData}
                  margin={{ top: 4, right: 12, bottom: 0, left: -8 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border) / 0.3)"
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                    interval={4}
                  />
                  <YAxis
                    tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    labelStyle={{
                      color: "hsl(var(--foreground))",
                      fontWeight: 600,
                      marginBottom: 4,
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line
                    type="monotone"
                    dataKey="success"
                    name="Successful Logins"
                    stroke="#34d399"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="failed"
                    name="Failed Logins"
                    stroke="#f87171"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Quick stats below chart */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              {
                label: "MFA Enabled Users",
                value: mockUsers.filter((u) => u.mfaEnabled).length,
                icon: ShieldCheck,
                color: "text-emerald-400",
              },
              {
                label: "Active Sessions",
                value: mockUsers.filter((u) => u.sessionActive).length,
                icon: Activity,
                color: "text-violet-400",
              },
              {
                label: "High Severity Events",
                value: mockSecurityEvents.filter(
                  (e) => e.severity === "critical" || e.severity === "high",
                ).length,
                icon: ShieldAlert,
                color: "text-orange-400",
              },
              {
                label: "Resolved Events",
                value: mockSecurityEvents.filter((e) => e.resolved).length,
                icon: Check,
                color: "text-blue-400",
              },
            ].map(({ label, value, icon: Icon, color }) => (
              <GlassCard key={label} className="p-3 flex items-center gap-2.5">
                <Icon className={`w-4 h-4 flex-shrink-0 ${color}`} />
                <div className="min-w-0">
                  <p className="text-[10px] text-muted-foreground truncate">
                    {label}
                  </p>
                  <p className={`text-xl font-display font-bold ${color}`}>
                    {value.toLocaleString()}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Suspicious Activity */}
      {activeTab === "suspicious" && (
        <GlassCard className="overflow-hidden">
          <div className="p-4 border-b border-border/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-orange-400" />
              <h2 className="text-sm font-display font-semibold text-foreground">
                Suspicious Activity
              </h2>
              <Badge className="bg-orange-500/15 text-orange-400 border-orange-500/30 text-[9px]">
                {
                  mockSuspiciousActivity.filter((i) => !dismissedIds.has(i.id))
                    .length
                }{" "}
                active
              </Badge>
            </div>
          </div>
          <SuspiciousPanel
            items={mockSuspiciousActivity}
            blockedIps={blockedIps}
            dismissedIds={dismissedIds}
            onBlock={handleBlock}
            onDismiss={(id) =>
              setDismissedIds((prev) => new Set([...prev, id]))
            }
          />
        </GlassCard>
      )}

      {/* Tab: IP Tracking */}
      {activeTab === "ips" && (
        <GlassCard className="overflow-hidden">
          <div className="p-4 border-b border-border/30 flex items-center gap-2">
            <Globe className="w-4 h-4 text-cyan-400" />
            <h2 className="text-sm font-display font-semibold text-foreground">
              IP Address Tracking
            </h2>
            <Badge className="bg-muted/40 text-muted-foreground border-border text-[9px] ml-auto">
              {mockIPTracking.length} tracked IPs
            </Badge>
          </div>
          <IPTrackingTable
            entries={mockIPTracking}
            blockedIps={blockedIps}
            onToggleBlock={handleBlock}
          />
        </GlassCard>
      )}

      {/* Tab: MFA Status */}
      {activeTab === "mfa" && (
        <GlassCard className="overflow-hidden">
          <div className="p-4 border-b border-border/30 flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-amber-400" />
            <h2 className="text-sm font-display font-semibold text-foreground">
              MFA Status
            </h2>
            <Badge className="bg-muted/40 text-muted-foreground border-border text-[9px] ml-auto">
              {mockMFAStatus.length} users
            </Badge>
          </div>
          <MFAPanel mfaStatuses={mockMFAStatus} />
        </GlassCard>
      )}

      {/* Tab: Security Events Timeline */}
      {activeTab === "events" && (
        <GlassCard className="overflow-hidden">
          <div className="p-4 border-b border-border/30 flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-display font-semibold text-foreground">
              Recent Security Events
            </h2>
            <Badge className="bg-muted/40 text-muted-foreground border-border text-[9px] ml-auto">
              Last 20 events
            </Badge>
          </div>
          <SecurityTimeline events={mockSecurityEvents} />
        </GlassCard>
      )}
    </div>
  );
}
