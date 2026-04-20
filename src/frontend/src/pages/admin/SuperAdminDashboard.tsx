import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MOCK_AUDIT_EVENTS,
  MOCK_COMPANIES,
  MOCK_SYSTEM_ALERTS,
  REVENUE_METRICS,
} from "@/data/superAdminMockData";
import { useIsMobile } from "@/hooks/use-mobile";
import { Plan } from "@/types/subscription";
import { useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  CreditCard,
  Globe,
  Info,
  MapPin,
  Shield,
  TrendingDown,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// ─── Deterministic MRR trend (12 months) ────────────────────────────────────
const MRR_TREND = (() => {
  const base = REVENUE_METRICS.totalMRR;
  const months = [
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
  ];
  // grow from ~72% of current to 100%, with slight noise
  const noise = [0, 2, -1, 3, -2, 4, 1, 5, -1, 3, 2, 0];
  return months.map((month, i) => ({
    month,
    revenue: Math.round(base * (0.72 + i * 0.026 + noise[i] * 0.004)),
  }));
})();

// ─── Helpers ─────────────────────────────────────────────────────────────────
function fmtMoney(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n}`;
}
function fmtNum(n: number, compact = false): string {
  if (compact && n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (compact && n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString();
}
function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60_000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

// ─── Plan config ─────────────────────────────────────────────────────────────
const PLAN_CFG: Record<
  Plan,
  { bar: string; text: string; border: string; fill: string }
> = {
  [Plan.BASIC]: {
    bar: "bg-emerald-500/60",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    fill: "#34d399",
  },
  [Plan.PROFESSIONAL]: {
    bar: "bg-blue-500/60",
    text: "text-blue-400",
    border: "border-blue-500/30",
    fill: "#60a5fa",
  },
  [Plan.ENTERPRISE]: {
    bar: "bg-violet-500/60",
    text: "text-violet-400",
    border: "border-violet-500/30",
    fill: "#a78bfa",
  },
  [Plan.ULTRA]: {
    bar: "bg-amber-500/60",
    text: "text-amber-400",
    border: "border-amber-500/30",
    fill: "#fbbf24",
  },
};

const STATUS_CFG: Record<string, { dot: string; badge: string }> = {
  active: {
    dot: "bg-emerald-400",
    badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  trial: {
    dot: "bg-blue-400",
    badge: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  suspended: {
    dot: "bg-amber-400",
    badge: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  },
  expired: {
    dot: "bg-rose-400",
    badge: "bg-rose-500/10 text-rose-400 border-rose-500/20",
  },
};

const SEVERITY_CFG: Record<string, { cls: string; Icon: React.ElementType }> = {
  critical: {
    cls: "bg-red-500/10 text-red-400 border-red-500/30",
    Icon: AlertCircle,
  },
  high: {
    cls: "bg-orange-500/10 text-orange-400 border-orange-500/30",
    Icon: AlertTriangle,
  },
  medium: {
    cls: "bg-yellow-500/10 text-yellow-400 border-yellow-500/30",
    Icon: AlertTriangle,
  },
  low: { cls: "bg-blue-500/10 text-blue-400 border-blue-500/30", Icon: Info },
};

const AUDIT_CAT_COLORS: Record<string, string> = {
  device: "text-blue-400",
  user: "text-violet-400",
  billing: "text-emerald-400",
  auth: "text-amber-400",
  workflow: "text-cyan-400",
  company: "text-rose-400",
  system: "text-muted-foreground",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  iconCls,
  trend,
  delay = 0,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ElementType;
  iconCls: string;
  trend?: "up" | "down" | "neutral";
  delay?: number;
}) {
  const TrendIcon =
    trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.32 }}
    >
      <div className="admin-stat-card rounded-xl h-full">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${iconCls}`}
          >
            <Icon className="w-4.5 h-4.5" />
          </div>
          {TrendIcon && (
            <TrendIcon
              className={`w-4 h-4 mt-1 ${trend === "up" ? "text-emerald-400" : "text-rose-400"}`}
            />
          )}
        </div>
        <p className="admin-stat-value">{value}</p>
        <p className="admin-stat-label mt-1 truncate">{label}</p>
        {sub && (
          <p className="text-xs text-muted-foreground/70 mt-0.5 truncate">
            {sub}
          </p>
        )}
      </div>
    </motion.div>
  );
}

// ─── Custom tooltip ───────────────────────────────────────────────────────────
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass-elevated px-3 py-2 rounded-lg text-xs border border-border/40">
      <p className="text-muted-foreground mb-0.5">{label}</p>
      <p className="font-mono font-semibold text-foreground">
        {fmtMoney(payload[0].value)}
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SuperAdminDashboard(): React.ReactElement {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  // ── Derived stats ──────────────────────────────────────────────────────────
  const totalDevices = MOCK_COMPANIES.reduce((s, c) => s + c.devicesUsed, 0);
  const totalUsers = MOCK_COMPANIES.reduce((s, c) => s + c.activeUsers, 0);
  const activeAlerts = MOCK_SYSTEM_ALERTS.filter(
    (a) => a.status === "active",
  ).length;
  const criticalAlerts = MOCK_SYSTEM_ALERTS.filter(
    (a) => a.status === "active" && a.severity === "critical",
  ).length;

  const healthStatus =
    criticalAlerts === 0
      ? {
          label: "Healthy",
          cls: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
        }
      : criticalAlerts <= 4
        ? {
            label: "Warning",
            cls: "bg-amber-500/15 text-amber-400 border-amber-500/30",
          }
        : {
            label: "Critical",
            cls: "bg-red-500/15 text-red-400 border-red-500/30",
          };

  const planCounts = Object.values(Plan).map((p) => ({
    plan: p,
    count: MOCK_COMPANIES.filter((c) => c.plan === p).length,
  }));

  const statusCounts = ["active", "trial", "suspended", "expired"].map((s) => ({
    name: s.charAt(0).toUpperCase() + s.slice(1),
    value: MOCK_COMPANIES.filter((c) => c.status === s).length,
  }));

  const top5ByRevenue = [...MOCK_COMPANIES]
    .sort((a, b) => b.monthlyRevenue - a.monthlyRevenue)
    .slice(0, 5);

  const recentAlerts = [...MOCK_SYSTEM_ALERTS]
    .sort(
      (a, b) =>
        new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
    )
    .slice(0, 5);

  const recentAudit = [...MOCK_AUDIT_EVENTS]
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    )
    .slice(0, 5);

  const regions = ["India", "US", "EU", "APAC", "MENA"];
  const regionCounts = regions.map((r) => ({
    region: r,
    count: MOCK_COMPANIES.filter((c) => c.region === r).length,
  }));
  const maxRegionCount = Math.max(...regionCounts.map((r) => r.count));

  const mrrGrowthPct = (() => {
    const last = MRR_TREND[MRR_TREND.length - 1].revenue;
    const prev = MRR_TREND[MRR_TREND.length - 2].revenue;
    return (((last - prev) / prev) * 100).toFixed(1);
  })();

  const newCompaniesThisMonth = [...MOCK_COMPANIES].filter((c) => {
    const ms = new Date(c.onboardedAt).getTime();
    const monthAgo = Date.now() - 30 * 86_400_000;
    return ms >= monthAgo;
  }).length;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6 max-w-[1600px] mx-auto">
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center gap-3"
        data-ocid="super-admin-header"
      >
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center">
          <Shield className="w-5 h-5 text-amber-400" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-display font-bold text-foreground">
            Super Admin Control Panel
          </h1>
          <p className="text-xs text-muted-foreground truncate">
            {fmtNum(MOCK_COMPANIES.length)} tenants · {fmtNum(totalUsers, true)}{" "}
            users · {fmtNum(totalDevices, true)} devices · MRR{" "}
            {fmtMoney(REVENUE_METRICS.totalMRR)}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Badge className={`font-mono text-[10px] border ${healthStatus.cls}`}>
            SYSTEM {healthStatus.label.toUpperCase()}
          </Badge>
          <Badge className="bg-amber-500/15 text-amber-400 border-amber-500/30 font-mono text-[10px]">
            SUPER ADMIN
          </Badge>
          <Button
            size="sm"
            variant="outline"
            className="text-xs border-border/50 gap-1.5 h-8"
            data-ocid="view-all-alerts-btn"
            onClick={() => navigate({ to: "/super-admin/alerts" as string })}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">View All Alerts</span>
            <span className="sm:hidden">Alerts</span>
            {activeAlerts > 0 && (
              <span className="bg-red-500/20 text-red-400 font-mono text-[9px] px-1.5 py-0.5 rounded-full border border-red-500/20">
                {activeAlerts}
              </span>
            )}
          </Button>
        </div>
      </motion.div>

      {/* ── Mobile Compact Stats Row ── */}
      {isMobile && (
        <div className="grid grid-cols-2 gap-2" data-ocid="mobile-stat-summary">
          {[
            {
              label: "MRR",
              value: fmtMoney(REVENUE_METRICS.totalMRR),
              color: "text-emerald-400",
            },
            {
              label: "Companies",
              value: fmtNum(MOCK_COMPANIES.length),
              color: "text-blue-400",
            },
            {
              label: "Devices",
              value: fmtNum(totalDevices, true),
              color: "text-violet-400",
            },
            {
              label: "Health",
              value: healthStatus.label,
              color:
                criticalAlerts === 0 ? "text-emerald-400" : "text-amber-400",
            },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="rounded-xl border border-border/30 bg-card/60 backdrop-blur-sm px-4 py-3"
            >
              <p className="text-[10px] text-muted-foreground">{label}</p>
              <p className={`text-base font-display font-bold ${color}`}>
                {value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* ── KPI Row 1 ── */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4"
        data-ocid="kpi-row-1"
      >
        <KpiCard
          label="Total Companies"
          value={fmtNum(MOCK_COMPANIES.length)}
          sub={`${REVENUE_METRICS.activeSubscriptions} active · ${REVENUE_METRICS.trialSubscriptions} trial`}
          icon={Building2}
          iconCls="bg-blue-500/15 text-blue-400 border border-blue-500/30"
          trend="up"
          delay={0}
        />
        <KpiCard
          label="Monthly Revenue"
          value={fmtMoney(REVENUE_METRICS.totalMRR)}
          sub={`ARR ${fmtMoney(REVENUE_METRICS.totalARR)}`}
          icon={CreditCard}
          iconCls="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
          trend="up"
          delay={0.05}
        />
        <KpiCard
          label="Total Devices"
          value={fmtNum(totalDevices, true)}
          sub="across all tenants"
          icon={Activity}
          iconCls="bg-violet-500/15 text-violet-400 border border-violet-500/30"
          trend="up"
          delay={0.1}
        />
        <KpiCard
          label="Total Users"
          value={fmtNum(totalUsers, true)}
          sub="registered platform users"
          icon={Users}
          iconCls="bg-cyan-500/15 text-cyan-400 border border-cyan-500/30"
          delay={0.15}
        />
        <KpiCard
          label="System Health"
          value={healthStatus.label}
          sub={`${criticalAlerts} critical · ${activeAlerts} total active`}
          icon={Zap}
          iconCls={
            criticalAlerts === 0
              ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
              : criticalAlerts <= 4
                ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                : "bg-red-500/15 text-red-400 border border-red-500/30"
          }
          trend={criticalAlerts === 0 ? "up" : "down"}
          delay={0.2}
        />
      </div>

      {/* ── KPI Row 2 ── */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        data-ocid="kpi-row-2"
      >
        <KpiCard
          label="New This Month"
          value={fmtNum(newCompaniesThisMonth)}
          sub="companies onboarded"
          icon={Building2}
          iconCls="bg-teal-500/15 text-teal-400 border border-teal-500/30"
          trend="up"
          delay={0.22}
        />
        <KpiCard
          label="Active Subscriptions"
          value={fmtNum(REVENUE_METRICS.activeSubscriptions)}
          sub={`${REVENUE_METRICS.trialSubscriptions} on trial`}
          icon={CheckCircle2}
          iconCls="bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
          delay={0.25}
        />
        <KpiCard
          label="MRR Growth"
          value={`+${mrrGrowthPct}%`}
          sub="month-over-month"
          icon={TrendingUp}
          iconCls="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
          trend="up"
          delay={0.28}
        />
        <KpiCard
          label="Churn Rate"
          value={`${REVENUE_METRICS.churnRate.toFixed(1)}%`}
          sub="suspended + expired"
          icon={TrendingDown}
          iconCls="bg-rose-500/15 text-rose-400 border border-rose-500/30"
          trend="down"
          delay={0.3}
        />
      </div>

      {/* ── Charts Row ── */}
      <div className="overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 min-w-[600px] md:min-w-0">
          {/* MRR Area Chart */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            data-ocid="mrr-chart"
          >
            <div className="admin-card rounded-xl p-5 h-full">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-display font-semibold text-foreground">
                    Monthly Recurring Revenue
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    12-month trend
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-display font-bold text-foreground">
                    {fmtMoney(REVENUE_METRICS.totalMRR)}
                  </p>
                  <p className="text-xs text-emerald-400">
                    +{mrrGrowthPct}% this month
                  </p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart
                  data={MRR_TREND}
                  margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="mrrGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a78bfa" stopOpacity={0.4} />
                      <stop
                        offset="95%"
                        stopColor="#a78bfa"
                        stopOpacity={0.02}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 10, fill: "currentColor", opacity: 0.5 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tickFormatter={(v: number) => fmtMoney(v)}
                    tick={{ fontSize: 9, fill: "currentColor", opacity: 0.5 }}
                    axisLine={false}
                    tickLine={false}
                    width={52}
                  />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#a78bfa"
                    strokeWidth={2}
                    fill="url(#mrrGrad)"
                    dot={false}
                    activeDot={{ r: 4, fill: "#a78bfa" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Status Pie */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38 }}
            data-ocid="status-pie"
          >
            <div className="admin-card rounded-xl p-5 h-full">
              <h2 className="text-sm font-display font-semibold text-foreground mb-1">
                Company Status
              </h2>
              <p className="text-xs text-muted-foreground mb-3">
                {MOCK_COMPANIES.length} total tenants
              </p>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie
                    data={statusCounts}
                    cx="50%"
                    cy="50%"
                    innerRadius={44}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {statusCounts.map((entry) => (
                      <Cell
                        key={entry.name}
                        fill={
                          entry.name === "Active"
                            ? "#34d399"
                            : entry.name === "Trial"
                              ? "#60a5fa"
                              : entry.name === "Suspended"
                                ? "#fbbf24"
                                : "#fb7185"
                        }
                        fillOpacity={0.85}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    content={({ active, payload }) =>
                      active && payload?.length ? (
                        <div className="glass-elevated px-2.5 py-1.5 rounded-lg text-xs border border-border/40">
                          <p className="text-foreground font-medium">
                            {payload[0].name}
                          </p>
                          <p className="font-mono text-muted-foreground">
                            {payload[0].value} companies
                          </p>
                        </div>
                      ) : null
                    }
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-1.5 mt-1">
                {statusCounts.map((s) => (
                  <div key={s.name} className="flex items-center gap-1.5">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${STATUS_CFG[s.name.toLowerCase()]?.dot ?? "bg-muted"}`}
                    />
                    <span className="text-[10px] text-muted-foreground">
                      {s.name}
                    </span>
                    <span className="text-[10px] font-mono text-foreground ml-auto">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Plan Distribution BarChart + Top 5 Revenue ── */}
      <div className="overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 min-w-[560px] md:min-w-0">
          {/* Plan Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.42 }}
            data-ocid="plan-distribution"
          >
            <div className="admin-card rounded-xl p-5 h-full">
              <h2 className="text-sm font-display font-semibold text-foreground mb-1">
                Plan Distribution
              </h2>
              <p className="text-xs text-muted-foreground mb-4">
                Revenue by plan tier
              </p>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart
                  data={planCounts}
                  layout="vertical"
                  margin={{ top: 0, right: 8, left: 0, bottom: 0 }}
                  barSize={14}
                >
                  <XAxis
                    type="number"
                    tick={{ fontSize: 9, fill: "currentColor", opacity: 0.5 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="plan"
                    type="category"
                    tick={{ fontSize: 10, fill: "currentColor", opacity: 0.7 }}
                    axisLine={false}
                    tickLine={false}
                    width={90}
                  />
                  <Tooltip
                    content={({ active, payload, label }) =>
                      active && payload?.length ? (
                        <div className="glass-elevated px-2.5 py-1.5 rounded-lg text-xs border border-border/40">
                          <p className="text-muted-foreground">{label}</p>
                          <p className="font-mono font-semibold text-foreground">
                            {payload[0].value} companies
                          </p>
                        </div>
                      ) : null
                    }
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                    {planCounts.map((entry) => (
                      <Cell
                        key={entry.plan}
                        fill={PLAN_CFG[entry.plan].fill}
                        fillOpacity={0.8}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {planCounts.map(({ plan, count }) => (
                  <div
                    key={plan}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg border ${PLAN_CFG[plan].border} bg-muted/10`}
                  >
                    <span
                      className={`text-[10px] font-mono font-medium ${PLAN_CFG[plan].text}`}
                    >
                      {plan}
                    </span>
                    <span className="text-[10px] font-mono text-foreground">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Top 5 by Revenue */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.42 }}
            data-ocid="top-revenue-table"
          >
            <div className="admin-card rounded-xl p-5 h-full">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-sm font-display font-semibold text-foreground">
                    Top Companies by Revenue
                  </h2>
                  <p className="text-xs text-muted-foreground">
                    Highest MRR tenants
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                {top5ByRevenue.map((c, i) => (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.06 }}
                    className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/15 border border-border/20 hover:bg-muted/25 transition-smooth"
                  >
                    <span className="w-5 text-[10px] font-mono text-muted-foreground text-center flex-shrink-0">
                      #{i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">
                        {c.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {c.region} · {c.activeUsers} users
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-xs font-mono font-semibold text-foreground">
                        {fmtMoney(c.monthlyRevenue)}
                      </p>
                      <p className="text-[9px] text-muted-foreground">/mo</p>
                    </div>
                    <Badge
                      className={`text-[9px] font-mono border ${PLAN_CFG[c.plan].border} ${PLAN_CFG[c.plan].text} bg-transparent`}
                    >
                      {c.plan}
                    </Badge>
                    <Badge
                      className={`text-[9px] border ${STATUS_CFG[c.status]?.badge ?? ""}`}
                    >
                      {c.status}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Alerts + Audit + Regional ── */}
      <div className="overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 min-w-[560px] md:min-w-0">
          {/* System Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48 }}
            data-ocid="system-alerts-panel"
          >
            <div className="admin-card rounded-xl p-5 h-full">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-display font-semibold text-foreground">
                  Platform Alerts
                </h2>
                <Badge
                  className={`text-[9px] border ${
                    criticalAlerts > 0
                      ? "bg-red-500/10 text-red-400 border-red-500/20"
                      : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  }`}
                >
                  {activeAlerts} active
                </Badge>
              </div>
              <ScrollArea className="h-[260px] noc-scrollbar">
                <div className="space-y-2 pr-2">
                  {recentAlerts.map((alert) => {
                    const sev =
                      SEVERITY_CFG[alert.severity] ?? SEVERITY_CFG.low;
                    return (
                      <div
                        key={alert.id}
                        className="p-2.5 rounded-lg bg-muted/15 border border-border/20 space-y-1"
                      >
                        <div className="flex items-start gap-2">
                          <sev.Icon
                            className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${sev.cls.split(" ")[1]}`}
                          />
                          <p className="text-xs font-medium text-foreground leading-tight flex-1 min-w-0">
                            {alert.title}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 pl-5">
                          <Badge
                            className={`text-[8px] font-mono border ${sev.cls}`}
                          >
                            {alert.severity}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground truncate">
                            {alert.affectedService}
                          </span>
                          <span className="text-[10px] text-muted-foreground ml-auto flex-shrink-0">
                            {relativeTime(alert.startedAt)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </motion.div>

          {/* Recent Audit Events */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52 }}
            data-ocid="audit-events-panel"
          >
            <div className="admin-card rounded-xl p-5 h-full">
              <h2 className="text-sm font-display font-semibold text-foreground mb-3">
                Recent Audit Events
              </h2>
              <div className="space-y-0">
                {recentAudit.map((ev, i) => (
                  <motion.div
                    key={ev.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 + i * 0.05 }}
                    className="audit-timeline-item border-l border-border/30 last:border-transparent"
                  >
                    <div className="absolute left-[-5px] top-3 w-2.5 h-2.5 rounded-full border-2 border-background bg-border" />
                    <div className="pb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-[10px] font-mono font-semibold uppercase ${AUDIT_CAT_COLORS[ev.severity] ?? "text-muted-foreground"}`}
                        >
                          {ev.severity}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          ·
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {relativeTime(ev.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-foreground mt-0.5 leading-tight">
                        {ev.action}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 truncate">
                        {ev.userName} · {ev.companyName}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Regional Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.56 }}
            data-ocid="regional-distribution"
          >
            <div className="admin-card rounded-xl p-5 h-full">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <h2 className="text-sm font-display font-semibold text-foreground">
                  Regional Distribution
                </h2>
              </div>
              <div className="space-y-3">
                {regionCounts.map(({ region, count }, i) => {
                  const pct = Math.round((count / maxRegionCount) * 100);
                  const rev = REVENUE_METRICS.revenueByRegion[region] ?? 0;
                  return (
                    <motion.div
                      key={region}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + i * 0.06 }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <MapPin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
                        <span className="text-xs font-medium text-foreground flex-1">
                          {region}
                        </span>
                        <span className="text-xs font-mono text-muted-foreground">
                          {count}
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-violet-500/70 to-violet-400/50"
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{
                            delay: 0.65 + i * 0.06,
                            duration: 0.55,
                          }}
                        />
                      </div>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {fmtMoney(rev)}/mo
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Revenue by plan mini bars */}
              <div className="mt-5 pt-4 border-t border-border/20">
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono mb-3">
                  Revenue by Plan
                </p>
                <div className="space-y-2">
                  {Object.values(Plan).map((plan) => {
                    const rev = REVENUE_METRICS.revenueByPlan[plan] ?? 0;
                    const maxRev = Math.max(
                      ...Object.values(REVENUE_METRICS.revenueByPlan),
                    );
                    const pct = Math.round((rev / maxRev) * 100);
                    return (
                      <div key={plan} className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-mono w-24 ${PLAN_CFG[plan].text}`}
                        >
                          {plan}
                        </span>
                        <div className="flex-1 h-1.5 bg-muted/20 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full rounded-full ${PLAN_CFG[plan].bar}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                          />
                        </div>
                        <span className="text-[9px] font-mono text-muted-foreground w-14 text-right">
                          {fmtMoney(rev)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
