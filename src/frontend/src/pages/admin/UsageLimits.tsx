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
  type UsageMetric,
  mockCompanies,
  mockUsageMetrics,
} from "@/data/superAdminMockData";
import type { CompanyPlan, CompanyRegion } from "@/types/superAdmin";
import { useRouter } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowUpDown,
  Bell,
  Database,
  Search,
  Server,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function pct(used: number, limit: number): number {
  return Math.min(Math.round((used / Math.max(limit, 1)) * 100), 100);
}

function fmtNum(n: number, compact = false): string {
  if (compact && n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (compact && n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}

function maxPct(m: UsageMetric): number {
  return Math.max(
    pct(m.devices.used, m.devices.limit),
    pct(m.api.used, m.api.limit),
    pct(m.data.used, m.data.limit),
    pct(m.alerts.used, m.alerts.limit),
  );
}

const REGION_FLAGS: Record<string, string> = {
  India: "🇮🇳",
  US: "🇺🇸",
  EU: "🇪🇺",
  APAC: "🌏",
  MENA: "🌍",
};

const PLAN_COLORS: Record<CompanyPlan, string> = {
  BASIC: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  PROFESSIONAL: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  ENTERPRISE: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  ULTRA: "bg-amber-500/15 text-amber-400 border-amber-500/30",
};

// ─── Mini Progress Bar ─────────────────────────────────────────────────────────

function MiniBar({
  label,
  used,
  limit,
  icon: Icon,
  unit = "",
}: {
  label: string;
  used: number;
  limit: number;
  icon: React.ElementType;
  unit?: string;
}) {
  const p = pct(used, limit);
  const barColor =
    p >= 90
      ? "capacity-fill-critical"
      : p >= 70
        ? "capacity-fill-warning"
        : "capacity-fill-healthy";

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-[10px]">
        <span className="flex items-center gap-1 text-muted-foreground">
          <Icon className="w-3 h-3" />
          {label}
        </span>
        <span
          className={`font-mono font-semibold ${
            p >= 90
              ? "text-red-400"
              : p >= 70
                ? "text-amber-400"
                : "text-muted-foreground"
          }`}
        >
          {p}%
        </span>
      </div>
      <div className="h-1.5 bg-muted/40 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${barColor}`}
          style={{ width: `${p}%` }}
        />
      </div>
      <p className="text-[9px] font-mono text-muted-foreground">
        {fmtNum(used, true)}
        {unit} / {fmtNum(limit, true)}
        {unit}
      </p>
    </div>
  );
}

// ─── Usage Card ────────────────────────────────────────────────────────────────

function UsageCard({
  metric,
  region,
  onClick,
}: {
  metric: UsageMetric;
  region: string;
  onClick: () => void;
}) {
  const highest = maxPct(metric);
  const isWarning = highest >= 70 && highest < 90;
  const isCritical = highest >= 90;

  return (
    <GlassCard
      className="p-4 space-y-3 hover:shadow-noc-elevated transition-smooth cursor-pointer group"
      onClick={onClick}
      data-ocid={`usage-card-${metric.companyId}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-xs font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {metric.companyName}
          </p>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <span className="text-[9px] text-muted-foreground">
              {REGION_FLAGS[region]} {region}
            </span>
            <Badge
              className={`text-[9px] border px-1.5 ${PLAN_COLORS[metric.plan]}`}
            >
              {metric.plan}
            </Badge>
          </div>
        </div>
        {isCritical && (
          <Badge className="text-[9px] bg-red-500/15 text-red-400 border border-red-500/30 shrink-0 flex items-center gap-1">
            <AlertTriangle className="w-2.5 h-2.5" />
            Exceeded
          </Badge>
        )}
        {isWarning && !isCritical && (
          <Badge className="text-[9px] bg-amber-500/15 text-amber-400 border border-amber-500/30 shrink-0 flex items-center gap-1">
            <AlertTriangle className="w-2.5 h-2.5" />
            Near Limit
          </Badge>
        )}
      </div>

      {/* Progress bars */}
      <div className="space-y-2.5">
        <MiniBar
          label="Devices"
          used={metric.devices.used}
          limit={metric.devices.limit}
          icon={Server}
        />
        <MiniBar
          label="API Calls"
          used={metric.api.used}
          limit={metric.api.limit}
          icon={Zap}
        />
        <MiniBar
          label="Data"
          used={metric.data.used}
          limit={metric.data.limit}
          unit=" GB"
          icon={Database}
        />
        <MiniBar
          label="Alerts"
          used={metric.alerts.used}
          limit={metric.alerts.limit}
          icon={Bell}
        />
      </div>

      {/* Highest usage indicator */}
      <div className="pt-1 border-t border-border/20 flex items-center justify-between">
        <span className="text-[9px] text-muted-foreground">Peak usage</span>
        <span
          className={`text-xs font-mono font-bold ${
            isCritical
              ? "text-red-400"
              : isWarning
                ? "text-amber-400"
                : "text-emerald-400"
          }`}
        >
          {highest}%
        </span>
      </div>
    </GlassCard>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type SortBy = "highest" | "name" | "plan";
type ThresholdFilter = "all" | "warning" | "critical";

export default function UsageLimits(): React.ReactElement {
  const router = useRouter();
  const nav = (path: string) => router.navigate({ to: path as "/" });

  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");
  const [threshold, setThreshold] = useState<ThresholdFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("highest");

  // Enrich metrics with region data
  const enriched = useMemo(() => {
    return mockUsageMetrics.map((m) => {
      const company = mockCompanies.find((c) => c.id === m.companyId);
      return { ...m, region: company?.region ?? "Unknown" };
    });
  }, []);

  // Filter + sort
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return enriched
      .filter((m) => {
        if (q && !m.companyName.toLowerCase().includes(q)) return false;
        if (regionFilter !== "all" && m.region !== regionFilter) return false;
        if (planFilter !== "all" && m.plan !== planFilter) return false;
        const highest = maxPct(m);
        if (threshold === "warning" && (highest < 70 || highest >= 90))
          return false;
        if (threshold === "critical" && highest < 90) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "highest") return maxPct(b) - maxPct(a);
        if (sortBy === "name")
          return a.companyName.localeCompare(b.companyName);
        // plan
        const planOrder = {
          BASIC: 0,
          PROFESSIONAL: 1,
          ENTERPRISE: 2,
          ULTRA: 3,
        };
        return (planOrder[b.plan] ?? 0) - (planOrder[a.plan] ?? 0);
      });
  }, [enriched, search, regionFilter, planFilter, threshold, sortBy]);

  // Summary stats
  const summary = useMemo(() => {
    const all = enriched.map((m) => maxPct(m));
    return {
      nearLimit: all.filter((p) => p >= 70 && p < 90).length,
      exceeded: all.filter((p) => p >= 90).length,
      totalDevices: enriched.reduce((s, m) => s + m.devices.used, 0),
      avgApiPct: Math.round(
        enriched.reduce((s, m) => s + pct(m.api.used, m.api.limit), 0) /
          Math.max(enriched.length, 1),
      ),
    };
  }, [enriched]);

  const REGIONS = ["all", "India", "US", "EU", "APAC", "MENA"] as const;
  const PLANS: ("all" | CompanyPlan)[] = [
    "all",
    "BASIC",
    "PROFESSIONAL",
    "ENTERPRISE",
    "ULTRA",
  ];
  const THRESHOLDS: { val: ThresholdFilter; label: string }[] = [
    { val: "all", label: "All Levels" },
    { val: "warning", label: "Near Limit (70–90%)" },
    { val: "critical", label: "Exceeded (>90%)" },
  ];

  return (
    <div className="p-6 space-y-5 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="w-8 h-8 rounded-lg bg-amber-500/15 flex items-center justify-center">
          <TrendingUp className="w-4 h-4 text-amber-400" />
        </div>
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">
            Usage &amp; Limit Tracking
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Monitor resource consumption across all tenants
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: "Near Limit",
            val: summary.nearLimit,
            sub: "70–90% usage",
            icon: AlertTriangle,
            cls: "text-amber-400",
            bg: "bg-amber-500/15",
          },
          {
            label: "Exceeded",
            val: summary.exceeded,
            sub: ">90% usage",
            icon: AlertTriangle,
            cls: "text-red-400",
            bg: "bg-red-500/15",
          },
          {
            label: "Total Devices",
            val: fmtNum(summary.totalDevices, true),
            sub: "across all tenants",
            icon: Server,
            cls: "text-blue-400",
            bg: "bg-blue-500/15",
          },
          {
            label: "Avg API Usage",
            val: `${summary.avgApiPct}%`,
            sub: "platform average",
            icon: Zap,
            cls: "text-primary",
            bg: "bg-primary/15",
          },
        ].map(({ label, val, sub, icon: Icon, cls, bg }) => (
          <GlassCard key={label} className="p-4 flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${bg}`}
            >
              <Icon className={`w-4 h-4 ${cls}`} />
            </div>
            <div>
              <p className={`text-xl font-display font-bold ${cls}`}>{val}</p>
              <p className="text-[10px] text-muted-foreground leading-snug">
                {label} · {sub}
              </p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Filters */}
      <GlassCard className="p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search companies…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-8 text-xs bg-background/50"
            data-ocid="input-usage-search"
          />
        </div>

        <Select value={regionFilter} onValueChange={setRegionFilter}>
          <SelectTrigger
            className="h-8 text-xs w-36 bg-background/50"
            data-ocid="filter-usage-region"
          >
            <SelectValue placeholder="All Regions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Regions</SelectItem>
            {REGIONS.filter((r) => r !== "all").map((r) => (
              <SelectItem key={r} value={r}>
                {REGION_FLAGS[r]} {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={planFilter} onValueChange={setPlanFilter}>
          <SelectTrigger
            className="h-8 text-xs w-36 bg-background/50"
            data-ocid="filter-usage-plan"
          >
            <SelectValue placeholder="All Plans" />
          </SelectTrigger>
          <SelectContent>
            {PLANS.map((p) => (
              <SelectItem key={p} value={p}>
                {p === "all" ? "All Plans" : p}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={threshold}
          onValueChange={(v) => setThreshold(v as ThresholdFilter)}
        >
          <SelectTrigger
            className="h-8 text-xs w-44 bg-background/50"
            data-ocid="filter-usage-threshold"
          >
            <SelectValue placeholder="All Levels" />
          </SelectTrigger>
          <SelectContent>
            {THRESHOLDS.map(({ val, label }) => (
              <SelectItem key={val} value={val}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs gap-1.5 ml-auto"
          onClick={() =>
            setSortBy((prev) =>
              prev === "highest"
                ? "name"
                : prev === "name"
                  ? "plan"
                  : "highest",
            )
          }
          data-ocid="btn-usage-sort"
        >
          <ArrowUpDown className="w-3.5 h-3.5" />
          Sort:{" "}
          {sortBy === "highest"
            ? "Highest Usage"
            : sortBy === "name"
              ? "Name"
              : "Plan"}
        </Button>

        <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">
          {filtered.length} of {enriched.length}
        </span>
      </GlassCard>

      {/* Grid */}
      {filtered.length === 0 ? (
        <GlassCard
          className="p-12 flex flex-col items-center gap-3 text-center"
          data-ocid="usage-empty-state"
        >
          <TrendingUp className="w-8 h-8 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">
            No companies match your filters
          </p>
          <Button
            variant="outline"
            size="sm"
            className="text-xs"
            onClick={() => {
              setSearch("");
              setRegionFilter("all");
              setPlanFilter("all");
              setThreshold("all");
            }}
          >
            Clear filters
          </Button>
        </GlassCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((metric) => (
            <UsageCard
              key={metric.companyId}
              metric={metric}
              region={metric.region}
              onClick={() => nav(`/super-admin/companies/${metric.companyId}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
