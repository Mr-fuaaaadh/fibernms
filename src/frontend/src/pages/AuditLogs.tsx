import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNetworkStore } from "@/store/networkStore";
import type { AuditLog } from "@/types/network";
import {
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Filter,
  RefreshCw,
  Search,
  Shield,
  User,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

// ─── Constants ────────────────────────────────────────────────────────────────

const ACTION_TYPE_LABELS: Record<AuditLog["actionType"], string> = {
  "device-change": "Device Change",
  "user-action": "User Action",
  "workflow-execution": "Workflow",
  system: "System",
};

const ACTION_TYPE_COLORS: Record<AuditLog["actionType"], string> = {
  "device-change": "#22d3ee",
  "user-action": "#fb923c",
  "workflow-execution": "#a78bfa",
  system: "#6b7280",
};

const ACTION_TYPE_BORDER: Record<AuditLog["actionType"], string> = {
  "device-change": "border-l-cyan-400",
  "user-action": "border-l-orange-400",
  "workflow-execution": "border-l-violet-400",
  system: "border-l-zinc-500",
};

const ACTION_TYPE_BG: Record<AuditLog["actionType"], string> = {
  "device-change": "bg-cyan-500/10 text-cyan-300",
  "user-action": "bg-orange-500/10 text-orange-300",
  "workflow-execution": "bg-violet-500/10 text-violet-300",
  system: "bg-zinc-500/10 text-zinc-400",
};

const ACTION_TYPE_DOT: Record<AuditLog["actionType"], string> = {
  "device-change": "bg-cyan-400",
  "user-action": "bg-orange-400",
  "workflow-execution": "bg-violet-400",
  system: "bg-zinc-500",
};

const DATE_RANGES = ["Last hour", "Last 24h", "Last 7 days", "Last 30 days"];

function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  if (diff < 60_000) return `${Math.floor(diff / 1000)}s ago`;
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

function absoluteTime(ts: number): string {
  return new Date(ts).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function userInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function dateRangeMs(range: string): number {
  switch (range) {
    case "Last hour":
      return 3_600_000;
    case "Last 24h":
      return 86_400_000;
    case "Last 7 days":
      return 7 * 86_400_000;
    default:
      return 30 * 86_400_000;
  }
}

// ─── CSV Export ───────────────────────────────────────────────────────────────

function exportCSV(logs: AuditLog[]) {
  const headers = [
    "Timestamp",
    "User",
    "Action",
    "Type",
    "Target",
    "Status",
    "Details",
  ];
  const rows = logs.map((l) => [
    absoluteTime(l.timestamp),
    l.userName,
    l.action,
    ACTION_TYPE_LABELS[l.actionType],
    l.targetName,
    l.status,
    l.details,
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map((v) => `"${v}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `audit-logs-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Desktop AuditEntry row ───────────────────────────────────────────────────

function AuditEntry({ log, index }: { log: AuditLog; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.5) }}
      className={`flex gap-3 p-3 rounded-lg bg-card/60 border border-border/30 border-l-2 ${ACTION_TYPE_BORDER[log.actionType]} hover:bg-card/80 transition-colors`}
      data-ocid={`audit-entry-${log.id}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-7 h-7 rounded-full bg-muted/80 border border-border/50 flex items-center justify-center">
        {log.actionType === "system" ? (
          <Shield className="w-3.5 h-3.5 text-muted-foreground" />
        ) : (
          <span className="text-[9px] font-bold text-muted-foreground">
            {userInitials(log.userName)}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${ACTION_TYPE_BG[log.actionType]}`}
          >
            {ACTION_TYPE_LABELS[log.actionType]}
          </span>
          <span className="text-xs font-medium text-foreground/90 truncate">
            {log.action}
          </span>
          {log.status === "failure" && (
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/15 text-red-400 border border-red-500/30 font-medium ml-auto">
              FAILED
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          <span className="text-foreground/70">{log.userName}</span>
          {" · "}
          <span className="text-primary/80">{log.targetName}</span>
          {" · "}
          {log.details}
        </p>
      </div>

      {/* Timestamp */}
      <div className="flex-shrink-0 text-right">
        <p className="text-[10px] text-muted-foreground whitespace-nowrap">
          {relativeTime(log.timestamp)}
        </p>
        <p className="text-[9px] text-muted-foreground/60 whitespace-nowrap mt-0.5">
          {absoluteTime(log.timestamp)}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Mobile Timeline Item ────────────────────────────────────────────────────

function MobileTimelineItem({ log, index }: { log: AuditLog; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
      className="relative pl-8"
      data-ocid={`audit-mobile-${log.id}`}
    >
      {/* Vertical line */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-border/40" />
      {/* Circle */}
      <div
        className={`absolute left-[9px] top-4 w-2.5 h-2.5 rounded-full border-2 border-card z-10 ${ACTION_TYPE_DOT[log.actionType]}`}
      />
      <div className="mb-3 rounded-lg border border-border/30 bg-card/60 p-3">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <span
            className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${ACTION_TYPE_BG[log.actionType]}`}
          >
            {ACTION_TYPE_LABELS[log.actionType]}
          </span>
          {log.status === "failure" && (
            <Badge className="text-[9px] bg-red-500/15 text-red-400 border border-red-500/30 border-transparent">
              FAILED
            </Badge>
          )}
        </div>
        <p className="text-xs font-medium text-foreground/90 leading-snug">
          {log.action}
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">
          <span className="text-foreground/70">{log.userName}</span>
          {" · "}
          <span className="text-primary/80">{log.targetName}</span>
        </p>
        <p className="text-[10px] text-muted-foreground/70 mt-0.5 line-clamp-2">
          {log.details}
        </p>
        <p className="text-[9px] text-muted-foreground/60 mt-1.5 font-mono">
          {relativeTime(log.timestamp)} · {absoluteTime(log.timestamp)}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 50;

export default function AuditLogs() {
  const auditLogs = useNetworkStore((s) => s.auditLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [actionTypeFilter, setActionTypeFilter] = useState("all");
  const [dateRange, setDateRange] = useState("Last 30 days");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    // refreshKey is referenced so memo invalidates on refresh
    void refreshKey;
    const cutoff = Date.now() - dateRangeMs(dateRange);
    return auditLogs
      .filter((l: AuditLog) => {
        if (l.timestamp < cutoff) return false;
        if (actionTypeFilter !== "all" && l.actionType !== actionTypeFilter)
          return false;
        if (statusFilter !== "all" && l.status !== statusFilter) return false;
        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          return (
            l.userName.toLowerCase().includes(q) ||
            l.targetName.toLowerCase().includes(q) ||
            l.action.toLowerCase().includes(q) ||
            l.details.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a: AuditLog, b: AuditLog) => b.timestamp - a.timestamp);
  }, [
    auditLogs,
    actionTypeFilter,
    dateRange,
    statusFilter,
    searchQuery,
    refreshKey,
  ]);

  const paginated = useMemo(
    () => filtered.slice(0, (page + 1) * PAGE_SIZE),
    [filtered, page],
  );
  const hasMore = paginated.length < filtered.length;

  const today = useMemo(() => {
    const cutoff = Date.now() - 86_400_000;
    return filtered.filter((l: AuditLog) => l.timestamp > cutoff).length;
  }, [filtered]);

  const successRate = useMemo(() => {
    if (!filtered.length) return 100;
    const success = filtered.filter(
      (l: AuditLog) => l.status === "success",
    ).length;
    return Math.round((success / filtered.length) * 100);
  }, [filtered]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {
      "device-change": 0,
      "user-action": 0,
      "workflow-execution": 0,
      system: 0,
    };
    for (const l of filtered) {
      counts[l.actionType] = (counts[l.actionType] ?? 0) + 1;
    }
    return Object.entries(counts).map(([type, value]) => ({
      name: ACTION_TYPE_LABELS[type as AuditLog["actionType"]],
      value,
      color: ACTION_TYPE_COLORS[type as AuditLog["actionType"]],
    }));
  }, [filtered]);

  const topUsers = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const l of filtered) {
      counts[l.userName] = (counts[l.userName] ?? 0) + 1;
    }
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
  }, [filtered]);

  const failureCount = useMemo(
    () => filtered.filter((l: AuditLog) => l.status === "failure").length,
    [filtered],
  );

  const handleRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
    setPage(0);
  }, []);

  const activeFilterCount = [
    searchQuery,
    actionTypeFilter !== "all" ? actionTypeFilter : "",
    dateRange !== "Last 30 days" ? dateRange : "",
    statusFilter !== "all" ? statusFilter : "",
  ].filter(Boolean).length;

  return (
    <div
      className="flex-1 overflow-y-auto bg-background p-4 md:p-6 space-y-5"
      data-ocid="audit-logs-page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
      >
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground tracking-wide">
            Audit Logs &amp; Compliance
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Track device changes, user actions, and workflow executions
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleRefresh}
            className="border-border/60 text-muted-foreground hover:text-foreground gap-1.5 min-h-[44px]"
            data-ocid="refresh-btn"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => exportCSV(filtered)}
            className="border-primary/40 text-primary hover:bg-primary/10 gap-1.5 min-h-[44px]"
            data-ocid="export-csv-btn"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </Button>
        </div>
      </motion.div>

      {/* Mobile: Filter Popover button + search */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="md:hidden"
      >
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
            <Input
              placeholder="Search user, device, action…"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(0);
              }}
              className="pl-8 bg-muted/30 border-border/50 text-sm h-11"
              data-ocid="audit-search-mobile"
            />
          </div>
          <Popover open={filterOpen} onOpenChange={setFilterOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5 h-11 px-3 relative"
                data-ocid="audit-filter-btn-mobile"
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[9px] flex items-center justify-center font-bold">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-72 p-4 space-y-4"
              data-ocid="audit-filter-popover"
            >
              <p className="text-xs font-semibold text-foreground">Filters</p>
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <p className="text-[11px] text-muted-foreground">
                    Action Type
                  </p>
                  <Select
                    value={actionTypeFilter}
                    onValueChange={(v) => {
                      setActionTypeFilter(v);
                      setPage(0);
                    }}
                  >
                    <SelectTrigger
                      className="h-9 text-xs"
                      data-ocid="type-filter-mobile"
                    >
                      <SelectValue placeholder="Action Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="device-change">
                        Device Change
                      </SelectItem>
                      <SelectItem value="user-action">User Action</SelectItem>
                      <SelectItem value="workflow-execution">
                        Workflow
                      </SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[11px] text-muted-foreground">
                    Date Range
                  </p>
                  <Select
                    value={dateRange}
                    onValueChange={(v) => {
                      setDateRange(v);
                      setPage(0);
                    }}
                  >
                    <SelectTrigger
                      className="h-9 text-xs"
                      data-ocid="date-range-filter-mobile"
                    >
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      {DATE_RANGES.map((r) => (
                        <SelectItem key={r} value={r}>
                          {r}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[11px] text-muted-foreground">Status</p>
                  <Select
                    value={statusFilter}
                    onValueChange={(v) => {
                      setStatusFilter(v);
                      setPage(0);
                    }}
                  >
                    <SelectTrigger
                      className="h-9 text-xs"
                      data-ocid="status-filter-mobile"
                    >
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="failure">Failure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className="w-full text-xs text-muted-foreground"
                  onClick={() => {
                    setSearchQuery("");
                    setActionTypeFilter("all");
                    setStatusFilter("all");
                    setDateRange("Last 30 days");
                    setPage(0);
                    setFilterOpen(false);
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </motion.div>

      {/* Desktop: Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="hidden md:block"
      >
        <GlassCard className="p-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                placeholder="Search user, device, action…"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(0);
                }}
                className="pl-8 bg-muted/30 border-border/50 text-sm h-8"
                data-ocid="audit-search"
              />
            </div>
            <Select
              value={actionTypeFilter}
              onValueChange={(v) => {
                setActionTypeFilter(v);
                setPage(0);
              }}
            >
              <SelectTrigger
                className="w-40 bg-muted/30 border-border/50 text-sm h-8"
                data-ocid="type-filter"
              >
                <SelectValue placeholder="Action Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="device-change">Device Change</SelectItem>
                <SelectItem value="user-action">User Action</SelectItem>
                <SelectItem value="workflow-execution">Workflow</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={dateRange}
              onValueChange={(v) => {
                setDateRange(v);
                setPage(0);
              }}
            >
              <SelectTrigger
                className="w-36 bg-muted/30 border-border/50 text-sm h-8"
                data-ocid="date-range-filter"
              >
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                {DATE_RANGES.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={(v) => {
                setStatusFilter(v);
                setPage(0);
              }}
            >
              <SelectTrigger
                className="w-32 bg-muted/30 border-border/50 text-sm h-8"
                data-ocid="status-filter"
              >
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="failure">Failure</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-xs text-muted-foreground ml-auto whitespace-nowrap">
              {filtered.length} entries
            </span>
          </div>
        </GlassCard>
      </motion.div>

      {/* Mobile: summary stats strip */}
      <div className="flex gap-2 overflow-x-auto pb-1 md:hidden">
        <div className="flex-shrink-0 rounded-lg bg-card/60 border border-border/30 px-3 py-2 text-center min-w-[80px]">
          <p className="text-lg font-bold text-foreground font-display">
            {today}
          </p>
          <p className="text-[10px] text-muted-foreground">Today</p>
        </div>
        <div className="flex-shrink-0 rounded-lg bg-card/60 border border-border/30 px-3 py-2 text-center min-w-[80px]">
          <p className="text-lg font-bold text-emerald-400 font-display">
            {successRate}%
          </p>
          <p className="text-[10px] text-muted-foreground">Success</p>
        </div>
        <div className="flex-shrink-0 rounded-lg bg-card/60 border border-border/30 px-3 py-2 text-center min-w-[80px]">
          <p className="text-lg font-bold text-red-400 font-display">
            {failureCount}
          </p>
          <p className="text-[10px] text-muted-foreground">Failures</p>
        </div>
        <div className="flex-shrink-0 rounded-lg bg-card/60 border border-border/30 px-3 py-2 text-center min-w-[80px]">
          <p className="text-lg font-bold text-foreground font-display">
            {filtered.length}
          </p>
          <p className="text-[10px] text-muted-foreground">Total</p>
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <motion.div
        className="md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 text-center"
            data-ocid="audit-empty-state"
          >
            <FileText className="w-10 h-10 text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground text-sm">
              No audit logs match your filters
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-xs text-primary"
              onClick={() => {
                setSearchQuery("");
                setActionTypeFilter("all");
                setStatusFilter("all");
                setDateRange("Last 30 days");
                setPage(0);
              }}
              data-ocid="clear-filters-btn-mobile"
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <div data-ocid="audit-timeline-mobile">
            {paginated.map((log, i) => (
              <MobileTimelineItem key={log.id} log={log} index={i} />
            ))}
            {hasMore && (
              <div className="pt-2 flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setPage((p) => p + 1)}
                  className="text-xs text-primary hover:bg-primary/10 min-h-[44px]"
                  data-ocid="load-more-btn-mobile"
                >
                  Load more ({filtered.length - paginated.length} remaining)
                </Button>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Desktop: Timeline + Stats sidebar */}
      <div className="hidden md:grid grid-cols-1 xl:grid-cols-4 gap-5">
        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="xl:col-span-3"
        >
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <h2 className="font-display text-sm font-semibold text-foreground tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                Event Timeline
              </h2>
              <div className="flex gap-3 flex-wrap">
                {Object.entries(ACTION_TYPE_COLORS).map(([type, color]) => (
                  <span
                    key={type}
                    className="flex items-center gap-1 text-[10px] text-muted-foreground"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: color }}
                    />
                    {ACTION_TYPE_LABELS[type as AuditLog["actionType"]]}
                  </span>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-16 text-center"
                data-ocid="audit-empty-state"
              >
                <FileText className="w-10 h-10 text-muted-foreground/40 mb-3" />
                <p className="text-muted-foreground text-sm">
                  No audit logs match your filters
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2 text-xs text-primary"
                  onClick={() => {
                    setSearchQuery("");
                    setActionTypeFilter("all");
                    setStatusFilter("all");
                    setDateRange("Last 30 days");
                    setPage(0);
                  }}
                  data-ocid="clear-filters-btn"
                >
                  Clear filters
                </Button>
              </div>
            ) : (
              <div
                className="space-y-1.5 max-h-[560px] overflow-y-auto pr-1"
                data-ocid="audit-timeline"
              >
                {paginated.map((log, i) => (
                  <AuditEntry key={log.id} log={log} index={i} />
                ))}
                {hasMore && (
                  <div className="pt-2 flex justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setPage((p) => p + 1)}
                      className="text-xs text-primary hover:bg-primary/10"
                      data-ocid="load-more-btn"
                    >
                      Load more ({filtered.length - paginated.length} remaining)
                    </Button>
                  </div>
                )}
              </div>
            )}
          </GlassCard>
        </motion.div>

        {/* Stats sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-4"
        >
          {/* Quick stats */}
          <GlassCard className="p-4 space-y-3">
            <h2 className="font-display text-xs font-semibold text-muted-foreground uppercase tracking-widest">
              Summary
            </h2>
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> Today's Events
                </span>
                <span className="text-xs font-mono font-semibold text-foreground">
                  {today}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-green-400" /> Success
                  Rate
                </span>
                <span className="text-xs font-mono font-semibold text-green-400">
                  {successRate}%
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <XCircle className="w-3 h-3 text-red-400" /> Failures
                </span>
                <span className="text-xs font-mono font-semibold text-red-400">
                  {failureCount}
                </span>
              </div>
              <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden mt-1">
                <div
                  className="h-full rounded-full bg-green-500/70 transition-all"
                  style={{ width: `${successRate}%` }}
                />
              </div>
            </div>
          </GlassCard>

          {/* Events by type donut */}
          <GlassCard className="p-4">
            <h2 className="font-display text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Events by Type
            </h2>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={typeCounts}
                  cx="50%"
                  cy="50%"
                  innerRadius={38}
                  outerRadius={58}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {typeCounts.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v, name) => [v, name]}
                  contentStyle={{
                    background: "rgba(20,22,30,0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    fontSize: 11,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-1">
              {typeCounts.map((t) => (
                <div key={t.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: t.color }}
                    />
                    {t.name}
                  </span>
                  <span className="text-[10px] font-mono text-foreground/70">
                    {t.value}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Top users */}
          <GlassCard className="p-4">
            <h2 className="font-display text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <User className="w-3 h-3" /> Top Users
            </h2>
            <div className="space-y-2">
              {topUsers.map(([name, count], i) => (
                <div
                  key={name}
                  className="flex items-center gap-2"
                  data-ocid={`top-user-${i}`}
                >
                  <div className="w-5 h-5 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-[8px] font-bold text-primary">
                      {userInitials(name)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="text-[10px] text-foreground/80 truncate">
                        {name}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground ml-1">
                        {count}
                      </span>
                    </div>
                    <div className="w-full h-1 bg-muted/40 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary/60"
                        style={{
                          width: `${(count / (topUsers[0]?.[1] ?? 1)) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
