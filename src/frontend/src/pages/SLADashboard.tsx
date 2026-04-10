import { GlassCard } from "@/components/GlassCard";
import { cn } from "@/lib/utils";
import { useNetworkStore } from "@/store/networkStore";
import type { SLARecord, SLAStatus } from "@/types/network";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  RefreshCw,
  Shield,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
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

// ── Types ──────────────────────────────────────────────────────────────────────

type TimeRange = "24h" | "7d" | "30d";

// ── SLA Status Badge ──────────────────────────────────────────────────────────

function SLABadge({ status }: { status: SLAStatus }) {
  const cfg = {
    compliant: {
      label: "COMPLIANT",
      cls: "bg-emerald-500/15 border border-emerald-500/35 text-emerald-400",
      dot: "bg-emerald-400",
    },
    warning: {
      label: "WARNING",
      cls: "bg-amber-400/15 border border-amber-400/35 text-amber-400",
      dot: "bg-amber-400",
    },
    breach: {
      label: "BREACH",
      cls: "bg-red-500/15 border border-red-500/35 text-red-400",
      dot: "bg-red-400",
    },
  }[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-widest font-mono",
        cfg.cls,
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", cfg.dot)} />
      {cfg.label}
    </span>
  );
}

// ── KPI Card ──────────────────────────────────────────────────────────────────

function KPICard({
  label,
  value,
  unit,
  icon: Icon,
  accentClass,
  bgClass,
  delay,
}: {
  label: string;
  value: string | number;
  unit?: string;
  icon: React.ElementType;
  accentClass: string;
  bgClass: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay }}
    >
      <GlassCard elevated className="p-4 h-full">
        <div className="flex items-start justify-between mb-3">
          <div
            className={cn(
              "w-9 h-9 rounded-xl flex items-center justify-center",
              bgClass,
            )}
          >
            <Icon size={16} className={accentClass} />
          </div>
        </div>
        <p className="text-2xl font-display font-bold tabular-nums text-foreground">
          {value}
          {unit && (
            <span className="text-sm font-normal text-muted-foreground ml-1">
              {unit}
            </span>
          )}
        </p>
        <p className="text-[11px] text-muted-foreground mt-1">{label}</p>
      </GlassCard>
    </motion.div>
  );
}

// ── SLA Trend Chart ───────────────────────────────────────────────────────────

function deterministic30DayTrend(): {
  day: string;
  compliance: number;
  warnings: number;
  breaches: number;
}[] {
  const base = new Date();
  return Array.from({ length: 30 }, (_, i) => {
    const d = new Date(base);
    d.setDate(d.getDate() - (29 - i));
    const seed = (i * 17 + 42) % 100;
    const compliance = 78 + ((seed * 3) % 20);
    const warnings = 4 + ((seed * 2) % 8);
    const breaches = seed % 5;
    return {
      day: `${d.getMonth() + 1}/${d.getDate()}`,
      compliance,
      warnings,
      breaches,
    };
  });
}

const TREND_DATA = deterministic30DayTrend();

function SLATrendChart({ timeRange }: { timeRange: TimeRange }) {
  const sliceMap: Record<TimeRange, number> = { "24h": 1, "7d": 7, "30d": 30 };
  const data = TREND_DATA.slice(-sliceMap[timeRange]);

  return (
    <GlassCard elevated className="p-5 h-full">
      <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5">
        <Activity size={11} className="text-primary" />
        SLA Compliance Trend
      </p>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={data}
          margin={{ top: 4, right: 4, left: -16, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="oklch(0.26 0.01 265 / 0.5)"
          />
          <XAxis
            dataKey="day"
            tick={{ fontSize: 10, fill: "oklch(0.52 0.008 260)" }}
            tickLine={false}
            axisLine={false}
            interval={timeRange === "30d" ? 6 : 0}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "oklch(0.52 0.008 260)" }}
            tickLine={false}
            axisLine={false}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              background: "oklch(0.18 0.008 265 / 0.95)",
              border: "1px solid oklch(0.26 0.01 265)",
              borderRadius: 8,
              fontSize: 11,
              color: "oklch(0.92 0.005 260)",
            }}
          />
          <Legend wrapperStyle={{ fontSize: 10 }} />
          <Line
            type="monotone"
            dataKey="compliance"
            name="Compliance %"
            stroke="oklch(0.72 0.22 210)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="warnings"
            name="Warnings"
            stroke="oklch(0.70 0.25 55)"
            strokeWidth={1.5}
            dot={false}
            strokeDasharray="4 2"
          />
          <Line
            type="monotone"
            dataKey="breaches"
            name="Breaches"
            stroke="oklch(0.62 0.28 22)"
            strokeWidth={1.5}
            dot={false}
            strokeDasharray="4 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}

// ── Breach Alerts Panel ───────────────────────────────────────────────────────

function BreachAlertsPanel({ records }: { records: SLARecord[] }) {
  const critical = records
    .filter((r) => r.status === "breach" || r.status === "warning")
    .sort((a, b) => {
      if (a.status === "breach" && b.status !== "breach") return -1;
      if (b.status === "breach" && a.status !== "breach") return 1;
      return b.latency - a.latency;
    });

  function relTime(ts: number) {
    const m = Math.floor((Date.now() - ts) / 60000);
    if (m < 60) return `${m}m ago`;
    return `${Math.floor(m / 60)}h ago`;
  }

  return (
    <GlassCard elevated className="p-5 flex flex-col h-full">
      <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase mb-4 flex items-center gap-1.5 flex-shrink-0">
        <AlertTriangle size={11} className="text-destructive" />
        Active Breach & Warnings
        <span className="ml-auto font-mono text-[10px] text-destructive bg-destructive/10 border border-destructive/25 px-2 py-0.5 rounded-md">
          {critical.length} active
        </span>
      </p>
      <div className="space-y-2.5 overflow-y-auto flex-1 noc-scrollbar max-h-[380px]">
        {critical.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
            className={cn(
              "p-3 rounded-xl border transition-smooth cursor-default",
              r.status === "breach"
                ? "sla-breach bg-red-500/5 border-red-500/20 hover:bg-red-500/10"
                : "sla-warning bg-amber-400/5 border-amber-400/20 hover:bg-amber-400/10",
            )}
            data-ocid="breach-alert-item"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <p className="text-xs font-semibold text-foreground truncate">
                  {r.customerName}
                </p>
                <p className="text-[10px] text-muted-foreground">{r.region}</p>
              </div>
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <SLABadge status={r.status} />
                <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                  <Clock size={9} />
                  {relTime(r.lastChecked)}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-[10px]">
              <div>
                <span className="text-muted-foreground block">Latency</span>
                <span
                  className={cn(
                    "font-mono font-medium",
                    r.latency > 50 ? "text-red-400" : "text-foreground",
                  )}
                >
                  {r.latency.toFixed(1)}ms
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Pkt Loss</span>
                <span
                  className={cn(
                    "font-mono font-medium",
                    r.packetLoss > 1.5 ? "text-amber-400" : "text-foreground",
                  )}
                >
                  {r.packetLoss.toFixed(2)}%
                </span>
              </div>
              <div>
                <span className="text-muted-foreground block">Uptime</span>
                <span
                  className={cn(
                    "font-mono font-medium",
                    r.uptime < 99 ? "text-red-400" : "text-foreground",
                  )}
                >
                  {r.uptime.toFixed(2)}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
        {critical.length === 0 && (
          <div className="flex flex-col items-center justify-center py-8 gap-2">
            <CheckCircle2 size={28} className="text-emerald-400 opacity-50" />
            <p className="text-xs text-muted-foreground">All SLAs compliant</p>
          </div>
        )}
      </div>
    </GlassCard>
  );
}

// ── SLA Metrics Table ─────────────────────────────────────────────────────────

type SortKey =
  | "customerName"
  | "region"
  | "uptime"
  | "latency"
  | "packetLoss"
  | "status";
type SortDir = "asc" | "desc";

function SLATable({ records }: { records: SLARecord[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("status");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const STATUS_ORDER: Record<SLAStatus, number> = {
    breach: 0,
    warning: 1,
    compliant: 2,
  };

  const sorted = useMemo(() => {
    return [...records].sort((a, b) => {
      let va: string | number;
      let vb: string | number;
      if (sortKey === "status") {
        va = STATUS_ORDER[a.status];
        vb = STATUS_ORDER[b.status];
      } else {
        va = a[sortKey];
        vb = b[sortKey];
      }
      if (typeof va === "string" && typeof vb === "string") {
        return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      return sortDir === "asc"
        ? (va as number) - (vb as number)
        : (vb as number) - (va as number);
    });
  }, [records, sortKey, sortDir]);

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function relTime(ts: number) {
    const m = Math.floor((Date.now() - ts) / 60000);
    if (m < 60) return `${m}m ago`;
    return `${Math.floor(m / 60)}h ago`;
  }

  const cols: { key: SortKey; label: string; align?: string }[] = [
    { key: "customerName", label: "Customer" },
    { key: "region", label: "Region" },
    { key: "status", label: "Status" },
    { key: "uptime", label: "Uptime", align: "text-right" },
    { key: "latency", label: "Latency", align: "text-right" },
    { key: "packetLoss", label: "Pkt Loss", align: "text-right" },
  ];

  return (
    <GlassCard elevated className="overflow-hidden">
      <div className="p-4 border-b border-border/30 flex items-center gap-2">
        <Shield size={13} className="text-primary" />
        <p className="font-display text-[10px] tracking-widest text-muted-foreground uppercase">
          SLA Records — {records.length} customers
        </p>
      </div>
      <div className="overflow-x-auto noc-scrollbar">
        <table className="w-full text-xs" data-ocid="sla-table">
          <thead>
            <tr className="border-b border-border/20">
              {cols.map((c) => (
                <th
                  key={c.key}
                  className={cn(
                    "px-4 py-2.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider select-none",
                    c.align,
                  )}
                >
                  <button
                    type="button"
                    className="flex items-center gap-1 hover:text-foreground transition-smooth w-full"
                    onClick={() => handleSort(c.key)}
                    data-ocid={`sort-col-${c.key}`}
                  >
                    {c.label}
                    {sortKey === c.key && (
                      <span className="text-primary text-[8px]">
                        {sortDir === "asc" ? "▲" : "▼"}
                      </span>
                    )}
                  </button>
                </th>
              ))}
              <th className="px-4 py-2.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider text-right">
                Last Checked
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
              <motion.tr
                key={r.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className={cn(
                  "border-b border-border/10 transition-smooth hover:bg-card/60 group",
                  r.status === "breach" && "hover:bg-red-500/5",
                  r.status === "warning" && "hover:bg-amber-400/5",
                )}
                data-ocid="sla-table-row"
              >
                <td className="px-4 py-2.5">
                  <span className="font-medium text-foreground">
                    {r.customerName}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <span className="text-muted-foreground">{r.region}</span>
                </td>
                <td className="px-4 py-2.5">
                  <SLABadge status={r.status} />
                </td>
                <td className="px-4 py-2.5 text-right font-mono tabular-nums">
                  <span
                    className={cn(
                      r.uptime >= 99.5
                        ? "text-emerald-400"
                        : r.uptime >= 99
                          ? "text-primary"
                          : r.uptime >= 97
                            ? "text-amber-400"
                            : "text-red-400",
                    )}
                  >
                    {r.uptime.toFixed(2)}%
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right font-mono tabular-nums">
                  <span
                    className={cn(
                      r.latency <= 20
                        ? "text-emerald-400"
                        : r.latency <= 50
                          ? "text-foreground"
                          : r.latency <= 70
                            ? "text-amber-400"
                            : "text-red-400",
                    )}
                  >
                    {r.latency.toFixed(1)}ms
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right font-mono tabular-nums">
                  <span
                    className={cn(
                      r.packetLoss < 0.5
                        ? "text-emerald-400"
                        : r.packetLoss < 1.5
                          ? "text-foreground"
                          : r.packetLoss < 2.5
                            ? "text-amber-400"
                            : "text-red-400",
                    )}
                  >
                    {r.packetLoss.toFixed(2)}%
                  </span>
                </td>
                <td className="px-4 py-2.5 text-right text-muted-foreground flex items-center justify-end gap-1">
                  <Clock size={10} />
                  {relTime(r.lastChecked)}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const TIME_RANGES: TimeRange[] = ["24h", "7d", "30d"];

export default function SLADashboard() {
  const { slaRecords } = useNetworkStore();
  const [timeRange, setTimeRange] = useState<TimeRange>("30d");
  const [records, setRecords] = useState<SLARecord[]>(slaRecords);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Auto-refresh every 5s with slightly randomized values
  useEffect(() => {
    const id = setInterval(() => {
      setRecords((prev) =>
        prev.map((r) => ({
          ...r,
          latency: Math.max(1, r.latency + (Math.random() - 0.5) * 4),
          packetLoss: Math.max(
            0,
            Math.min(3, r.packetLoss + (Math.random() - 0.5) * 0.3),
          ),
          uptime: Math.max(
            90,
            Math.min(100, r.uptime + (Math.random() - 0.5) * 0.1),
          ),
          lastChecked: Date.now() - Math.floor(Math.random() * 60000),
        })),
      );
      setLastRefresh(new Date());
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const total = records.length;
  const compliantCount = records.filter((r) => r.status === "compliant").length;
  const warningCount = records.filter((r) => r.status === "warning").length;
  const breachCount = records.filter((r) => r.status === "breach").length;
  const compliancePct =
    total > 0 ? Math.round((compliantCount / total) * 100) : 0;

  return (
    <div
      className="flex flex-col h-full p-4 gap-4 overflow-y-auto noc-scrollbar"
      data-ocid="sla-dashboard"
    >
      {/* Header */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="font-display text-base font-semibold text-foreground tracking-wide flex items-center gap-2">
            <Shield size={18} className="text-primary" />
            SLA &amp; Service Assurance
          </h1>
          <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1.5">
            <RefreshCw size={9} className="text-primary/60 animate-spin-slow" />
            Auto-refreshes every 5s · Last:{" "}
            {lastRefresh.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
        </div>
        <div className="flex gap-1 glass-card rounded-xl p-1">
          {TIME_RANGES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setTimeRange(r)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-smooth",
                timeRange === r
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground",
              )}
              data-ocid="time-range-btn"
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-shrink-0">
        <KPICard
          label="Total SLA Records"
          value={total}
          icon={Shield}
          accentClass="text-primary"
          bgClass="bg-primary/15 border border-primary/25"
          delay={0}
        />
        <KPICard
          label="Compliance Rate"
          value={compliancePct}
          unit="%"
          icon={CheckCircle2}
          accentClass="text-emerald-400"
          bgClass="bg-emerald-400/15 border border-emerald-400/25"
          delay={0.06}
        />
        <KPICard
          label="SLA Warnings"
          value={warningCount}
          icon={AlertTriangle}
          accentClass="text-amber-400"
          bgClass="bg-amber-400/15 border border-amber-400/25"
          delay={0.12}
        />
        <KPICard
          label="Active Breaches"
          value={breachCount}
          icon={XCircle}
          accentClass="text-red-400"
          bgClass="bg-red-400/15 border border-red-400/25"
          delay={0.18}
        />
      </div>

      {/* Main Content: Chart + Breach Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 flex-shrink-0">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          <SLATrendChart timeRange={timeRange} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
        >
          <BreachAlertsPanel records={records} />
        </motion.div>
      </div>

      {/* SLA Table */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34 }}
        className="flex-shrink-0"
      >
        <SLATable records={records} />
      </motion.div>
    </div>
  );
}
