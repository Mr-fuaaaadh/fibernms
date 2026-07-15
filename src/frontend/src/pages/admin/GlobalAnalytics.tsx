import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { REVENUE_METRICS, mockCompanies } from "@/data/superAdminMockData";
import type { CompanyPlan } from "@/types/superAdmin";
import {
  BarChart3,
  Building2,
  DollarSign,
  Server,
  TrendingDown,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Constants ────────────────────────────────────────────────────────────────

const DATE_RANGES = [
  "Last 30 Days",
  "Last 60 Days",
  "Last 90 Days",
  "Last 12 Months",
] as const;
type DateRange = (typeof DATE_RANGES)[number];

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const PLAN_COLORS: Record<CompanyPlan, string> = {
  BASIC: "#60a5fa",
  PROFESSIONAL: "#a78bfa",
  ENTERPRISE: "#34d399",
  ULTRA: "#f59e0b",
};

const REGION_COLORS: Record<string, string> = {
  India: "#3b82f6",
  US: "#10b981",
  EU: "#8b5cf6",
  APAC: "#f59e0b",
  MENA: "#ef4444",
};

const TOOLTIP_STYLE = {
  background: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: 12,
  color: "hsl(var(--foreground))",
};

// ─── Formatters ───────────────────────────────────────────────────────────────
function fmtK(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  return `${v}`;
}
function fmtCurrency(v: number) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(2)}M`;
  if (v >= 1_000) return `$${(v / 1_000).toFixed(0)}K`;
  return `$${v}`;
}

// ─── Data Generators ──────────────────────────────────────────────────────────
function buildDeviceGrowthData() {
  const totalDevices = mockCompanies.reduce((s, c) => s + c.devicesUsed, 0);
  return MONTH_LABELS.map((month, i) => {
    const factor = 0.6 + (i / 12) * 0.4 + Math.sin(i) * 0.02;
    return {
      month,
      BASIC: Math.round(
        mockCompanies
          .filter((c) => c.plan === "BASIC")
          .reduce((s, c) => s + c.devicesUsed, 0) * factor,
      ),
      PROFESSIONAL: Math.round(
        mockCompanies
          .filter((c) => c.plan === "PROFESSIONAL")
          .reduce((s, c) => s + c.devicesUsed, 0) * factor,
      ),
      ENTERPRISE: Math.round(
        mockCompanies
          .filter((c) => c.plan === "ENTERPRISE")
          .reduce((s, c) => s + c.devicesUsed, 0) * factor,
      ),
      ULTRA: Math.round(
        mockCompanies
          .filter((c) => c.plan === "ULTRA")
          .reduce((s, c) => s + c.devicesUsed, 0) * factor,
      ),
      total: Math.round(totalDevices * factor),
    };
  });
}

function buildAlertStackData() {
  return Array.from({ length: 13 }, (_, i) => {
    const weekLabel = i === 0 ? "W-12" : i === 12 ? "Now" : `W-${12 - i}`;
    const base = 800 + Math.sin(i * 0.5) * 200;
    return {
      week: weekLabel,
      Critical: Math.round(base * 0.15 + Math.random() * 50),
      Warning: Math.round(base * 0.35 + Math.random() * 100),
      Info: Math.round(base * 0.5 + Math.random() * 150),
    };
  });
}

function buildHeatmapData() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map((day, di) =>
    Array.from({ length: 24 }, (_, hi) => {
      const isWeekday = di < 5;
      const isPeak = hi >= 9 && hi <= 17;
      const isMorning = hi >= 7 && hi <= 8;
      const isEvening = hi >= 18 && hi <= 20;
      let base = 0;
      if (isWeekday && isPeak) base = 800 + Math.sin(di * 3 + hi) * 200;
      else if (isWeekday && (isMorning || isEvening))
        base = 400 + Math.sin(di * 2 + hi) * 100;
      else if (isWeekday) base = 100 + Math.sin(di + hi) * 40;
      else if (isPeak) base = 300 + Math.sin(di * 5 + hi) * 80;
      else base = 50 + Math.sin(di * 4 + hi * 2) * 20;
      return {
        day,
        hour: hi,
        value: Math.max(0, Math.round(base + Math.sin(di * 7 + hi * 3) * 30)),
      };
    }),
  );
}

function buildRevenueTrendData() {
  const mrr = REVENUE_METRICS.totalMRR;
  return MONTH_LABELS.map((month, i) => ({
    month,
    mrr: Math.round(mrr * (0.65 + (i / 12) * 0.35 + Math.sin(i) * 0.02)),
    arr: Math.round(mrr * 12 * (0.65 + (i / 12) * 0.35 + Math.sin(i) * 0.02)),
  }));
}

function buildRegionalRevenueData() {
  const regions = ["India", "US", "EU", "APAC", "MENA"];
  return regions.map((region) => {
    const cos = mockCompanies.filter((c) => c.region === region);
    return {
      region,
      mrr: cos.reduce((s, c) => s + c.mrr, 0),
      companies: cos.length,
    };
  });
}

function buildTopCustomers() {
  return [...mockCompanies]
    .sort((a, b) => b.monthlyRevenue - a.monthlyRevenue)
    .slice(0, 10)
    .map((c) => ({
      name: c.name.length > 22 ? `${c.name.slice(0, 22)}…` : c.name,
      revenue: c.monthlyRevenue,
      plan: c.plan,
    }));
}

function buildRevenuePieData() {
  return (
    ["ULTRA", "ENTERPRISE", "PROFESSIONAL", "BASIC"] as CompanyPlan[]
  ).map((plan) => ({
    name: plan.charAt(0) + plan.slice(1).toLowerCase(),
    value: REVENUE_METRICS.revenueByPlan[plan],
    plan,
    color: PLAN_COLORS[plan],
  }));
}

// ─── Usage Heatmap ────────────────────────────────────────────────────────────
function UsageHeatmap() {
  const data = useMemo(() => buildHeatmapData(), []);
  const maxVal = 1200;
  const hourLabels = [0, 3, 6, 9, 12, 15, 18, 21].map((h) => {
    const period = h < 12 ? "AM" : "PM";
    const display = h === 0 ? "12" : h > 12 ? `${h - 12}` : `${h}`;
    return `${display}${period}`;
  });

  return (
    <GlassCard className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-4 h-4 text-violet-400" />
        <h3 className="text-sm font-display font-semibold text-foreground">
          API Call Volume Heatmap
        </h3>
        <span className="text-xs text-muted-foreground ml-1">
          — by day of week &amp; hour
        </span>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Hour labels */}
          <div className="flex ml-10 mb-1.5">
            {Array.from({ length: 24 }, (_, i) => i).map((h) => (
              <div
                key={`hour-${h}`}
                className="text-center"
                style={{
                  width: `${100 / 24}%`,
                  fontSize: 9,
                  color: "hsl(var(--muted-foreground))",
                }}
              >
                {h % 3 === 0 ? hourLabels[Math.floor(h / 3)] : ""}
              </div>
            ))}
          </div>
          {/* Grid rows */}
          {data.map((row) => (
            <div key={row[0].day} className="flex items-center gap-0.5 mb-1">
              <span
                className="text-muted-foreground w-9 flex-shrink-0 text-right pr-1.5"
                style={{ fontSize: 10 }}
              >
                {row[0].day}
              </span>
              {row.map((cell) => {
                const intensity = Math.min(cell.value / maxVal, 1);
                const r = Math.round(100 + intensity * 55);
                const g = Math.round(30 + intensity * 20);
                const b = Math.round(200 + intensity * 55);
                const alpha = 0.08 + intensity * 0.88;
                return (
                  <div
                    key={`${cell.day}-${cell.hour}`}
                    className="rounded-sm flex-1 cursor-default transition-transform hover:scale-125 hover:z-10 relative"
                    style={{
                      height: 16,
                      backgroundColor: `rgba(${r}, ${g}, ${b}, ${alpha})`,
                    }}
                    title={`${cell.day} ${cell.hour}:00 — ${cell.value.toLocaleString()} API calls`}
                  />
                );
              })}
            </div>
          ))}
          {/* Legend */}
          <div className="flex items-center gap-2 mt-3 justify-end">
            <span className="text-xs text-muted-foreground">Low</span>
            {[0.05, 0.2, 0.4, 0.65, 0.85].map((v) => (
              <div
                key={v}
                className="w-5 h-3.5 rounded-sm"
                style={{
                  backgroundColor: `rgba(${Math.round(100 + v * 55)}, ${Math.round(30 + v * 20)}, ${Math.round(200 + v * 55)}, ${0.08 + v * 0.88})`,
                }}
              />
            ))}
            <span className="text-xs text-muted-foreground">High</span>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-display font-semibold text-muted-foreground uppercase tracking-widest mb-4">
      {children}
    </h3>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function GlobalAnalytics() {
  const [dateRange, setDateRange] = useState<DateRange>("Last 12 Months");

  const deviceGrowthData = useMemo(() => buildDeviceGrowthData(), []);
  const alertStackData = useMemo(() => buildAlertStackData(), []);
  const revenueTrendData = useMemo(() => buildRevenueTrendData(), []);
  const regionalData = useMemo(() => buildRegionalRevenueData(), []);
  const topCustomers = useMemo(() => buildTopCustomers(), []);
  const revenuePie = useMemo(() => buildRevenuePieData(), []);

  const totalDevices = mockCompanies.reduce((s, c) => s + c.devicesUsed, 0);
  const totalCompanies = mockCompanies.length;

  const kpis = [
    {
      label: "Total Companies",
      value: totalCompanies,
      sub: "+3 this month",
      icon: Building2,
      color: "blue" as const,
      trend: "+5.6%",
      up: true,
    },
    {
      label: "Total MRR",
      value: fmtCurrency(REVENUE_METRICS.totalMRR),
      sub: `ARR: ${fmtCurrency(REVENUE_METRICS.totalARR)}`,
      icon: DollarSign,
      color: "emerald" as const,
      trend: "+8.2%",
      up: true,
    },
    {
      label: "Total Devices",
      value: fmtK(totalDevices),
      sub: "across all tenants",
      icon: Server,
      color: "violet" as const,
      trend: "+12%",
      up: true,
    },
    {
      label: "System Uptime",
      value: "99.97%",
      sub: "30-day rolling avg",
      icon: Zap,
      color: "amber" as const,
      trend: "stable",
      up: true,
    },
  ];

  const colorMap = {
    blue: {
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      ring: "ring-blue-500/20",
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
    amber: {
      bg: "bg-amber-500/10",
      text: "text-amber-400",
      ring: "ring-amber-500/20",
    },
  };

  return (
    <div className="p-4 md:p-6 space-y-6 md:space-y-8 max-w-[1600px]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-4 flex-wrap"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              Platform Analytics
            </h1>
            <p className="text-xs text-muted-foreground">
              Global platform metrics, revenue &amp; growth trends
            </p>
          </div>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {DATE_RANGES.map((r) => (
            <Button
              key={r}
              size="sm"
              variant={dateRange === r ? "default" : "outline"}
              className="h-7 text-xs"
              onClick={() => setDateRange(r)}
              data-ocid={`date-range-${r.replace(/\s+/g, "-").toLowerCase()}`}
            >
              {r}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {kpis.map(({ label, value, sub, icon: Icon, color, trend, up }, i) => {
          const cfg = colorMap[color];
          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <GlassCard className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl ring-1 flex items-center justify-center flex-shrink-0 ${cfg.bg} ${cfg.ring}`}
                  >
                    <Icon className={`w-4.5 h-4.5 ${cfg.text}`} />
                  </div>
                  <div
                    className={`flex items-center gap-1 text-[10px] font-medium ${up ? "text-emerald-400" : "text-red-400"}`}
                  >
                    {trend !== "stable" ? (
                      up ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )
                    ) : null}
                    {trend}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-2xl font-display font-bold text-foreground mt-0.5">
                  {value}
                </p>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                  {sub}
                </p>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Top Customers by Revenue */}
      <GlassCard className="p-5">
        <SectionTitle>Top 10 Companies by Monthly Revenue</SectionTitle>
        <div className="overflow-x-auto">
          <div className="min-w-[500px]">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={topCustomers} layout="vertical" barSize={14}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border) / 0.3)"
                  horizontal={false}
                />
                <XAxis
                  type="number"
                  tickFormatter={(v) => `$${fmtK(v as number)}`}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                  width={160}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(v) => [
                    `$${Number(v).toLocaleString()}`,
                    "Monthly Revenue",
                  ]}
                />
                <Bar dataKey="revenue" radius={[0, 4, 4, 0]}>
                  {topCustomers.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={PLAN_COLORS[entry.plan as CompanyPlan]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        {/* Plan legend */}
        <div className="flex items-center gap-4 mt-3 flex-wrap">
          {(Object.entries(PLAN_COLORS) as [CompanyPlan, string][]).map(
            ([plan, color]) => (
              <div
                key={plan}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <div
                  className="w-3 h-2.5 rounded-sm"
                  style={{ background: color }}
                />
                {plan.charAt(0) + plan.slice(1).toLowerCase()}
              </div>
            ),
          )}
        </div>
      </GlassCard>

      {/* Device Growth Trends */}
      <GlassCard className="p-5">
        <SectionTitle>
          Device Growth Trends — By Plan Tier (12 Months)
        </SectionTitle>
        <div className="overflow-x-auto">
          <div className="min-w-[500px]">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={deviceGrowthData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border) / 0.3)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={fmtK}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(v, name) => [fmtK(Number(v)), name]}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                {(
                  [
                    "BASIC",
                    "PROFESSIONAL",
                    "ENTERPRISE",
                    "ULTRA",
                  ] as CompanyPlan[]
                ).map((plan) => (
                  <Line
                    key={plan}
                    type="monotone"
                    dataKey={plan}
                    name={plan.charAt(0) + plan.slice(1).toLowerCase()}
                    stroke={PLAN_COLORS[plan]}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </GlassCard>

      {/* Alert Trends Stacked Bar */}
      <GlassCard className="p-5">
        <SectionTitle>
          Alert Trends — Last 13 Weeks (Quarterly View)
        </SectionTitle>
        <div className="overflow-x-auto">
          <div className="min-w-[500px]">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={alertStackData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border) / 0.3)"
                  vertical={false}
                />
                <XAxis
                  dataKey="week"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={fmtK}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(v, name) => [Number(v).toLocaleString(), name]}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="Critical" stackId="a" fill="#ef4444" />
                <Bar dataKey="Warning" stackId="a" fill="#f59e0b" />
                <Bar
                  dataKey="Info"
                  stackId="a"
                  fill="#3b82f6"
                  radius={[3, 3, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </GlassCard>

      {/* Usage Heatmap */}
      <UsageHeatmap />

      {/* Revenue + Churn row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscription Distribution Pie */}
        <GlassCard className="p-5">
          <SectionTitle>Subscription Distribution by Plan</SectionTitle>
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <ResponsiveContainer width={180} height={180}>
                <PieChart>
                  <Pie
                    data={revenuePie}
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={82}
                    dataKey="value"
                    paddingAngle={3}
                  >
                    {revenuePie.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(v) => [fmtCurrency(Number(v)), "MRR"]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 space-y-2.5">
              {revenuePie.map((entry) => {
                const total = revenuePie.reduce((s, e) => s + e.value, 0) || 1;
                const pct = ((entry.value / total) * 100).toFixed(1);
                const count = mockCompanies.filter(
                  (c) => c.plan === entry.plan,
                ).length;
                return (
                  <div
                    key={entry.name}
                    className="flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                        style={{ background: entry.color }}
                      />
                      <span className="text-foreground font-medium">
                        {entry.name}
                      </span>
                      <span className="text-muted-foreground text-[10px]">
                        {count} cos
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground font-mono">
                        {fmtCurrency(entry.value)}
                      </span>
                      <Badge
                        variant="outline"
                        className="text-[9px] px-1.5 py-0 border-border font-mono"
                      >
                        {pct}%
                      </Badge>
                    </div>
                  </div>
                );
              })}
              <div className="pt-2 border-t border-border/40 flex justify-between text-xs">
                <span className="text-muted-foreground">Total MRR</span>
                <span className="font-semibold text-foreground">
                  {fmtCurrency(REVENUE_METRICS.totalMRR)}
                </span>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Churn Analysis */}
        <GlassCard className="p-5">
          <SectionTitle>Churn Analysis</SectionTitle>
          {/* Status cards */}
          <div className="grid grid-cols-4 gap-2 mb-5">
            {[
              {
                label: "Active",
                value: REVENUE_METRICS.activeSubscriptions,
                color: "text-emerald-400",
                bg: "bg-emerald-500/10",
              },
              {
                label: "Trial",
                value: REVENUE_METRICS.trialSubscriptions,
                color: "text-blue-400",
                bg: "bg-blue-500/10",
              },
              {
                label: "Suspended",
                value: REVENUE_METRICS.suspendedSubscriptions,
                color: "text-orange-400",
                bg: "bg-orange-500/10",
              },
              {
                label: "Expired",
                value: REVENUE_METRICS.expiredSubscriptions,
                color: "text-red-400",
                bg: "bg-red-500/10",
              },
            ].map(({ label, value, color, bg }) => (
              <div key={label} className={`rounded-lg p-2 text-center ${bg}`}>
                <p className={`text-xl font-display font-bold ${color}`}>
                  {value}
                </p>
                <p className="text-[9px] text-muted-foreground mt-0.5">
                  {label}
                </p>
              </div>
            ))}
          </div>
          {/* Churn rate sparkline */}
          <div className="flex items-center gap-3 mb-3">
            <div>
              <p className="text-[10px] text-muted-foreground">
                Current Churn Rate
              </p>
              <p className="text-2xl font-display font-bold text-foreground">
                {REVENUE_METRICS.churnRate}%
              </p>
            </div>
            <div className="flex items-center gap-1 text-emerald-400 text-xs">
              <TrendingDown className="w-4 h-4" />
              <span>Below 3.5% benchmark</span>
            </div>
          </div>
          <div className="overflow-x-auto">
            <div className="min-w-[400px]">
              <ResponsiveContainer width="100%" height={100}>
                <LineChart
                  data={MONTH_LABELS.map((month, i) => ({
                    month,
                    churn: +(2.8 + Math.sin(i * 0.8) * 0.8 + i * 0.05).toFixed(
                      2,
                    ),
                    benchmark: 3.5,
                  }))}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border) / 0.3)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 5]}
                    tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(v) => [`${v}%`, ""]}
                  />
                  <Line
                    type="monotone"
                    dataKey="churn"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                    name="Churn Rate"
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmark"
                    stroke="hsl(var(--border))"
                    strokeWidth={1.5}
                    strokeDasharray="4 4"
                    dot={false}
                    name="Benchmark"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Revenue by Region */}
      <GlassCard className="p-5">
        <SectionTitle>Revenue by Region</SectionTitle>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="overflow-x-auto">
            <div className="min-w-[400px]">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={regionalData} barSize={40}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border) / 0.3)"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="region"
                    tick={{
                      fontSize: 12,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(v) => `$${fmtK(v as number)}`}
                    tick={{
                      fontSize: 11,
                      fill: "hsl(var(--muted-foreground))",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={TOOLTIP_STYLE}
                    formatter={(v) => [fmtCurrency(Number(v)), "MRR"]}
                  />
                  <Bar dataKey="mrr" name="MRR" radius={[4, 4, 0, 0]}>
                    {regionalData.map((entry) => (
                      <Cell
                        key={entry.region}
                        fill={REGION_COLORS[entry.region] ?? "#8b5cf6"}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Regional table */}
          <div className="space-y-2">
            {regionalData
              .sort((a, b) => b.mrr - a.mrr)
              .map((row) => {
                const totalMrr =
                  regionalData.reduce((s, r) => s + r.mrr, 0) || 1;
                const pct = ((row.mrr / totalMrr) * 100).toFixed(1);
                const color = REGION_COLORS[row.region] ?? "#8b5cf6";
                return (
                  <div key={row.region} className="flex items-center gap-3">
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: color }}
                    />
                    <span className="text-xs font-medium text-foreground w-12">
                      {row.region}
                    </span>
                    <div className="flex-1 h-1.5 bg-muted/40 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${pct}%`, background: color }}
                      />
                    </div>
                    <span className="text-xs font-mono text-foreground w-16 text-right">
                      {fmtCurrency(row.mrr)}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono w-10 text-right">
                      {pct}%
                    </span>
                    <span className="text-[10px] text-muted-foreground w-16 text-right">
                      {row.companies} cos
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      </GlassCard>

      {/* Revenue Trend */}
      <GlassCard className="p-5">
        <SectionTitle>MRR &amp; ARR Trend — 12 Month View</SectionTitle>
        <div className="overflow-x-auto">
          <div className="min-w-[500px]">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenueTrendData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border) / 0.3)"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v) => `$${fmtK(v as number)}`}
                  tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={TOOLTIP_STYLE}
                  formatter={(v, name) => [
                    fmtCurrency(Number(v)),
                    name === "mrr" ? "MRR" : "ARR",
                  ]}
                />
                <Legend
                  wrapperStyle={{ fontSize: 11 }}
                  formatter={(v) => (v === "mrr" ? "MRR" : "ARR")}
                />
                <Line
                  type="monotone"
                  dataKey="mrr"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="arr"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  dot={false}
                  activeDot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
