import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  type AuditEvent,
  type AuditSeverity,
  MOCK_AUDIT_EVENTS,
  MOCK_COMPANIES,
} from "@/data/superAdminMockData";
import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  CreditCard,
  Download,
  Info,
  List,
  Monitor,
  Network,
  Search,
  Shield,
  ShieldAlert,
  Table2,
  User,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

function fmtAbsolute(iso: string): string {
  return new Date(iso).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

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

const SEV_DOT: Record<AuditSeverity, string> = {
  info: "bg-blue-500",
  warning: "bg-amber-500",
  critical: "bg-red-500",
};

const SEV_BADGE: Record<AuditSeverity, string> = {
  info: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  warning: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  critical: "bg-red-500/15 text-red-400 border-red-500/30",
};

const SEV_ICONS: Record<AuditSeverity, React.ElementType> = {
  info: Info,
  warning: AlertTriangle,
  critical: ShieldAlert,
};

const CAT_COLORS: Record<string, string> = {
  user: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  device: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  billing: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  auth: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  workflow: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  company: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  system: "bg-muted/30 text-muted-foreground border-border",
  api_key: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  config: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  alert: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  bulk: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  session: "bg-red-500/10 text-red-400 border-red-500/20",
};

const CAT_ICONS: Record<string, React.ElementType> = {
  user: User,
  device: Monitor,
  billing: CreditCard,
  auth: Shield,
  workflow: Network,
  company: ClipboardList,
  system: ShieldAlert,
};

function getCat(action: string): string {
  return action?.split(".")[0] ?? "system";
}

function getColor(action: string): string {
  const cat = getCat(action);
  return CAT_COLORS[cat] ?? "bg-muted/30 text-muted-foreground border-border";
}

function truncate(s: string, n: number): string {
  return s.length > n ? `${s.slice(0, n)}…` : s;
}

function StatCard({
  label,
  value,
  colorClass,
  bgClass,
  icon: Icon,
}: {
  label: string;
  value: number;
  colorClass: string;
  bgClass: string;
  icon: React.ElementType;
}) {
  return (
    <GlassCard className="p-4 flex items-center gap-3">
      <div
        className={`w-9 h-9 rounded-lg flex items-center justify-center ${bgClass}`}
      >
        <Icon className={`w-4 h-4 ${colorClass}`} />
      </div>
      <div>
        <p className="text-[11px] text-muted-foreground leading-tight">
          {label}
        </p>
        <p className={`text-2xl font-display font-bold mt-0.5 ${colorClass}`}>
          {value.toLocaleString()}
        </p>
      </div>
    </GlassCard>
  );
}

function TimelineEvent({
  event,
  expanded,
  onToggle,
  relatedEvents,
}: {
  event: AuditEvent;
  expanded: boolean;
  onToggle: () => void;
  relatedEvents: AuditEvent[];
}) {
  const SevIcon = SEV_ICONS[event.severity];
  const cat = getCat(event.action);
  const CatIcon = CAT_ICONS[cat] ?? ClipboardList;

  return (
    <div className="relative pl-8" data-ocid={`timeline-event-${event.id}`}>
      <div className="absolute left-3 top-0 bottom-0 w-px bg-border/30" />
      <div
        className={`absolute left-[9px] top-4 w-2.5 h-2.5 rounded-full border-2 border-card z-10 ${SEV_DOT[event.severity]}`}
      />
      <button
        type="button"
        className="mb-3 w-full text-left rounded-lg border border-border/30 bg-card/50 hover:bg-card/80 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-start gap-3 p-3">
          <div className="flex flex-col items-center gap-1 min-w-[72px]">
            <span className="text-[10px] font-mono text-muted-foreground leading-none">
              {fmtRelative(event.timestamp)}
            </span>
            <span className="text-[9px] text-muted-foreground/60 leading-none">
              {new Date(event.timestamp).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-start gap-2 flex-1 min-w-0">
            <div
              className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 border ${getColor(event.action)}`}
            >
              <CatIcon className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <span className="font-mono text-[11px] text-foreground font-medium">
                  {event.action}
                </span>
                <Badge
                  className={`text-[9px] border ${SEV_BADGE[event.severity]}`}
                >
                  <SevIcon className="w-2.5 h-2.5 mr-0.5" />
                  {event.severity}
                </Badge>
              </div>
              <p className="text-[11px] text-foreground font-medium leading-tight truncate">
                {event.userName}
                <span className="text-muted-foreground font-normal">
                  {" "}
                  · {event.userEmail}
                </span>
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 line-clamp-1">
                {event.details}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge
              className={`text-[9px] border capitalize hidden sm:flex ${getColor(event.action)}`}
            >
              {truncate(event.companyName, 18)}
            </Badge>
            <span className="text-muted-foreground/60">
              {expanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </span>
          </div>
        </div>
        {expanded && (
          <div className="border-t border-border/30 p-3 bg-background/40 rounded-b-lg space-y-3 text-left">
            <div className="grid grid-cols-2 gap-3 text-[11px]">
              <div>
                <p className="text-muted-foreground mb-0.5">Timestamp</p>
                <p className="font-mono text-foreground">
                  {fmtAbsolute(event.timestamp)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-0.5">IP Address</p>
                <p className="font-mono text-foreground">{event.ipAddress}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-0.5">User ID</p>
                <p className="font-mono text-foreground/70">{event.userId}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-0.5">Company</p>
                <p className="text-foreground">{event.companyName}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground mb-0.5">Full Details</p>
                <p className="text-foreground bg-muted/30 rounded p-2 border border-border/30">
                  {event.details}
                </p>
              </div>
            </div>
            {relatedEvents.length > 0 && (
              <div>
                <p className="text-[10px] text-muted-foreground font-medium mb-1.5">
                  Related events from same user
                </p>
                <div className="space-y-1">
                  {relatedEvents.slice(0, 3).map((rel) => (
                    <div
                      key={rel.id}
                      className="flex items-center gap-2 text-[10px] py-1 px-2 rounded bg-muted/20 border border-border/20"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${SEV_DOT[rel.severity]}`}
                      />
                      <span className="font-mono text-foreground/70">
                        {rel.action}
                      </span>
                      <span className="text-muted-foreground ml-auto">
                        {fmtRelative(rel.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </button>
    </div>
  );
}

function AuditTableRow({
  event,
  expanded,
  onToggle,
}: {
  event: AuditEvent;
  expanded: boolean;
  onToggle: () => void;
}) {
  const SevIcon = SEV_ICONS[event.severity];
  return (
    <>
      <tr
        className="border-b border-border/20 hover:bg-muted/10 transition-colors cursor-pointer"
        onClick={onToggle}
        onKeyDown={(e) => e.key === "Enter" && onToggle()}
        tabIndex={0}
        data-ocid={`audit-row-${event.id}`}
      >
        <td className="py-2.5 px-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap">
          {fmtRelative(event.timestamp)}
          <span className="block text-[9px] opacity-60">
            {new Date(event.timestamp).toLocaleDateString()}
          </span>
        </td>
        <td className="py-2.5 px-3">
          <div className="flex items-center gap-1">
            <SevIcon
              className={`w-3 h-3 flex-shrink-0 ${SEV_BADGE[event.severity].split(" ")[1]}`}
            />
            <Badge className={`text-[9px] border ${SEV_BADGE[event.severity]}`}>
              {event.severity}
            </Badge>
          </div>
        </td>
        <td className="py-2.5 px-3">
          <Badge
            className={`text-[9px] border capitalize ${getColor(event.action)}`}
          >
            {getCat(event.action)}
          </Badge>
        </td>
        <td className="py-2.5 px-3 font-mono text-[10px] text-foreground">
          {event.action}
        </td>
        <td className="py-2.5 px-3">
          <p className="text-[11px] text-foreground font-medium leading-tight">
            {event.userName}
          </p>
          <p className="text-[10px] text-muted-foreground truncate max-w-[140px]">
            {event.userEmail}
          </p>
        </td>
        <td className="py-2.5 px-3 text-[11px] text-muted-foreground truncate max-w-[120px]">
          {event.companyName}
        </td>
        <td className="py-2.5 px-3 text-[10px] text-muted-foreground max-w-[200px]">
          <span className="line-clamp-1">{event.details}</span>
        </td>
        <td className="py-2.5 px-3 font-mono text-[10px] text-muted-foreground whitespace-nowrap">
          {event.ipAddress}
        </td>
        <td className="py-2.5 px-3">
          <ChevronRight
            className={`w-3 h-3 text-muted-foreground transition-transform ${expanded ? "rotate-90" : ""}`}
          />
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-border/20 bg-muted/5">
          <td colSpan={9} className="px-6 py-3">
            <div className="grid grid-cols-3 gap-4 text-[11px]">
              <div>
                <p className="text-muted-foreground mb-0.5">Full Timestamp</p>
                <p className="font-mono text-foreground">
                  {fmtAbsolute(event.timestamp)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-0.5">User ID</p>
                <p className="font-mono text-foreground/70">{event.userId}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-0.5">IP Address</p>
                <p className="font-mono text-foreground">{event.ipAddress}</p>
              </div>
              <div className="col-span-3">
                <p className="text-muted-foreground mb-0.5">Details</p>
                <p className="text-foreground">{event.details}</p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

const ACTION_OPTIONS = [
  "all",
  "user.created",
  "user.login",
  "user.disabled",
  "user.role_changed",
  "company.suspended",
  "company.created",
  "plan.changed",
  "billing.paid",
  "billing.failed",
  "device.added",
  "device.removed",
  "workflow.executed",
  "session.force_logout",
];

const PAGE_SIZE = 50;

export default function PlatformAudit(): React.ReactElement {
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"timeline" | "table">("timeline");
  const [page, setPage] = useState(0);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const companyOptions = useMemo(
    () => MOCK_COMPANIES.map((c) => ({ id: c.id, name: c.name })).slice(0, 30),
    [],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return MOCK_AUDIT_EVENTS.filter((e) => {
      if (
        q &&
        !e.userName.toLowerCase().includes(q) &&
        !e.action.toLowerCase().includes(q) &&
        !e.companyName.toLowerCase().includes(q) &&
        !e.userEmail.toLowerCase().includes(q) &&
        !e.details.toLowerCase().includes(q)
      )
        return false;
      if (companyFilter !== "all" && e.companyId !== companyFilter)
        return false;
      if (actionFilter !== "all" && e.action !== actionFilter) return false;
      if (severityFilter !== "all" && e.severity !== severityFilter)
        return false;
      return true;
    });
  }, [search, companyFilter, actionFilter, severityFilter]);

  const stats = useMemo(
    () => ({
      total: MOCK_AUDIT_EVENTS.length,
      critical: MOCK_AUDIT_EVENTS.filter((e) => e.severity === "critical")
        .length,
      userActions: MOCK_AUDIT_EVENTS.filter((e) => e.action.startsWith("user."))
        .length,
      billingEvents: MOCK_AUDIT_EVENTS.filter((e) =>
        e.action.startsWith("billing."),
      ).length,
    }),
    [],
  );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function handleExport() {
    const header = [
      "Timestamp",
      "Severity",
      "Category",
      "Action",
      "User",
      "Email",
      "Company",
      "IP",
      "Details",
    ];
    const rows = filtered.map((e) => [
      e.timestamp,
      e.severity,
      getCat(e.action),
      e.action,
      e.userName,
      e.userEmail,
      e.companyName,
      e.ipAddress,
      `"${e.details.replace(/"/g, '""')}"`,
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `platform-audit-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function toggleExpand(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  function getRelatedEvents(event: AuditEvent): AuditEvent[] {
    return MOCK_AUDIT_EVENTS.filter(
      (e) => e.id !== event.id && e.userId === event.userId,
    ).slice(0, 4);
  }

  const hasFilters =
    search !== "" ||
    companyFilter !== "all" ||
    actionFilter !== "all" ||
    severityFilter !== "all";

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2.5">
          <ClipboardList className="w-5 h-5 text-amber-400" />
          <h1 className="text-xl font-display font-bold text-foreground">
            Platform Audit Logs
          </h1>
          <Badge className="bg-muted/50 text-muted-foreground border-border text-[10px] font-mono">
            {filtered.length.toLocaleString()} records
          </Badge>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="flex rounded-md border border-border/50 overflow-hidden">
            <button
              type="button"
              onClick={() => setViewMode("timeline")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${viewMode === "timeline" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
              data-ocid="btn-view-timeline"
            >
              <List className="w-3 h-3" />
              Timeline
            </button>
            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors ${viewMode === "table" ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"}`}
              data-ocid="btn-view-table"
            >
              <Table2 className="w-3 h-3" />
              Table
            </button>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs h-8"
            onClick={handleExport}
            data-ocid="btn-export-audit"
          >
            <Download className="w-3 h-3" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Total Events"
          value={stats.total}
          colorClass="text-blue-400"
          bgClass="bg-blue-500/10"
          icon={ClipboardList}
        />
        <StatCard
          label="Critical Events"
          value={stats.critical}
          colorClass="text-red-400"
          bgClass="bg-red-500/10"
          icon={ShieldAlert}
        />
        <StatCard
          label="User Actions"
          value={stats.userActions}
          colorClass="text-violet-400"
          bgClass="bg-violet-500/10"
          icon={User}
        />
        <StatCard
          label="Billing Events"
          value={stats.billingEvents}
          colorClass="text-emerald-400"
          bgClass="bg-emerald-500/10"
          icon={CreditCard}
        />
      </div>

      {/* Filters */}
      <GlassCard className="p-3 flex flex-wrap gap-2.5 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
          <Input
            placeholder="Search user, action, company, IP..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="pl-8 h-8 text-xs bg-background/50"
            data-ocid="input-audit-search"
          />
        </div>
        <Select
          value={companyFilter}
          onValueChange={(v) => {
            setCompanyFilter(v);
            setPage(0);
          }}
        >
          <SelectTrigger
            className="h-8 text-xs w-44 bg-background/50"
            data-ocid="filter-audit-company"
          >
            <SelectValue placeholder="All Companies" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            <SelectItem value="all">All Companies</SelectItem>
            {companyOptions.map((c) => (
              <SelectItem key={c.id} value={c.id} className="text-xs">
                {truncate(c.name, 28)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={actionFilter}
          onValueChange={(v) => {
            setActionFilter(v);
            setPage(0);
          }}
        >
          <SelectTrigger
            className="h-8 text-xs w-44 bg-background/50"
            data-ocid="filter-audit-action"
          >
            <SelectValue placeholder="All Actions" />
          </SelectTrigger>
          <SelectContent>
            {ACTION_OPTIONS.map((a) => (
              <SelectItem key={a} value={a} className="text-xs font-mono">
                {a === "all" ? "All Actions" : a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={severityFilter}
          onValueChange={(v) => {
            setSeverityFilter(v);
            setPage(0);
          }}
        >
          <SelectTrigger
            className="h-8 text-xs w-32 bg-background/50"
            data-ocid="filter-audit-severity"
          >
            <SelectValue placeholder="All Severities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="info">Info</SelectItem>
          </SelectContent>
        </Select>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs gap-1 text-muted-foreground"
            onClick={() => {
              setSearch("");
              setCompanyFilter("all");
              setActionFilter("all");
              setSeverityFilter("all");
              setPage(0);
            }}
            data-ocid="btn-clear-filters"
          >
            <X className="w-3 h-3" />
            Clear
          </Button>
        )}
        <span className="text-[11px] text-muted-foreground ml-auto">
          {filtered.length.toLocaleString()} events
        </span>
      </GlassCard>

      {/* Content */}
      {viewMode === "timeline" ? (
        <div>
          {paged.length === 0 ? (
            <GlassCard className="flex flex-col items-center py-16 gap-3">
              <ClipboardList className="w-8 h-8 opacity-20" />
              <p className="text-sm text-muted-foreground">
                No audit events match your filters
              </p>
            </GlassCard>
          ) : (
            paged.map((event) => (
              <TimelineEvent
                key={event.id}
                event={event}
                expanded={expandedId === event.id}
                onToggle={() => toggleExpand(event.id)}
                relatedEvents={
                  expandedId === event.id ? getRelatedEvents(event) : []
                }
              />
            ))
          )}
        </div>
      ) : (
        <GlassCard className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="border-b border-border/40 bg-muted/10">
                <tr className="text-muted-foreground">
                  {[
                    "Time",
                    "Severity",
                    "Category",
                    "Action",
                    "User",
                    "Company",
                    "Details",
                    "IP",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left py-2.5 px-3 font-medium text-[10px] uppercase tracking-wide"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="py-16 text-center text-muted-foreground text-sm"
                    >
                      No audit events match your filters
                    </td>
                  </tr>
                ) : (
                  paged.map((event) => (
                    <AuditTableRow
                      key={event.id}
                      event={event}
                      expanded={expandedId === event.id}
                      onToggle={() => toggleExpand(event.id)}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{`Showing ${(page * PAGE_SIZE + 1).toLocaleString()}–${Math.min((page + 1) * PAGE_SIZE, filtered.length).toLocaleString()} of ${filtered.length.toLocaleString()} events`}</span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
              data-ocid="btn-audit-prev"
            >
              Prev
            </Button>
            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              const pg = totalPages <= 7 ? i : page < 4 ? i : page + i - 3;
              if (pg >= totalPages) return null;
              return (
                <button
                  type="button"
                  key={pg}
                  onClick={() => setPage(pg)}
                  className={`w-7 h-7 rounded text-xs transition-colors ${pg === page ? "bg-primary text-primary-foreground" : "hover:bg-muted/50 text-muted-foreground"}`}
                >
                  {pg + 1}
                </button>
              );
            })}
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-2 text-xs"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
              data-ocid="btn-audit-next"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
